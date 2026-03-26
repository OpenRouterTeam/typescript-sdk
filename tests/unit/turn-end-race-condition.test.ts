/**
 * Tests for the turn.end race condition bug introduced in PR #14925.
 *
 * Bug: In startTurnBroadcasterExecution(), startInitialStreamPipe() launches a
 * fire-and-forget async IIFE that pushes turn.start, pipes stream events, then
 * pushes turn.end. Concurrently, executeToolsIfNeeded() runs and its .finally()
 * calls broadcaster.complete(). If the IIFE hasn't pushed turn.end yet when
 * complete() fires, the event is silently dropped.
 *
 * The fix: startInitialStreamPipe() stores the IIFE's promise, which
 * startTurnBroadcasterExecution() awaits before calling broadcaster.complete().
 */
import { describe, expect, it } from 'vitest';
import { ToolEventBroadcaster } from '../../src/lib/tool-event-broadcaster.js';
import { ReusableReadableStream } from '../../src/lib/reusable-stream.js';

/**
 * Helper: creates a ReadableStream that enqueues events with a delay between
 * each, simulating real network streaming latency.
 */
function createDelayedStream(
  events: Array<{ type: string }>,
  delayMs: number,
): ReadableStream<{ type: string }> {
  return new ReadableStream<{ type: string }>({
    async start(controller) {
      for (const event of events) {
        await new Promise((r) => setTimeout(r, delayMs));
        controller.enqueue(event);
      }
      controller.close();
    },
  });
}

describe('turn.end race condition', () => {
  /**
   * Characterization test: proves that ToolEventBroadcaster.push() silently
   * drops events after complete() is called. This is the root cause of the
   * turn.end drop bug - NOT a bug in the broadcaster itself, but a contract
   * that callers must respect.
   */
  it('ToolEventBroadcaster silently drops events pushed after complete()', async () => {
    const broadcaster = new ToolEventBroadcaster<{ type: string }>();
    const consumer = broadcaster.createConsumer();

    broadcaster.push({ type: 'turn.start' });
    broadcaster.push({ type: 'event1' });
    broadcaster.complete();
    broadcaster.push({ type: 'turn.end' }); // Silently dropped!

    const events: { type: string }[] = [];
    for await (const event of consumer) {
      events.push(event);
    }

    // Proves the mechanism: events after complete() are dropped
    expect(events.map((e) => e.type)).toEqual(['turn.start', 'event1']);
    expect(events.filter((e) => e.type === 'turn.end')).toHaveLength(0);
  });

  /**
   * Simulates the BUGGY pattern from the original startTurnBroadcasterExecution().
   *
   * The pipe (async IIFE) pushes turn.start, iterates the stream, then pushes
   * turn.end. Meanwhile, executeToolsIfNeeded completes quickly and calls
   * broadcaster.complete() WITHOUT awaiting the pipe. The pipe is still
   * iterating the delayed stream, so turn.end is pushed after complete()
   * and silently dropped.
   *
   * This test documents the bug by asserting that turn.end IS dropped.
   */
  it('buggy pattern: turn.end is dropped when complete() fires before pipe finishes', async () => {
    const broadcaster = new ToolEventBroadcaster<{ type: string; turnNumber?: number }>();

    const stream = createDelayedStream(
      [{ type: 'response.output_text.delta' }, { type: 'response.completed' }],
      20,
    );
    const reusableStream = new ReusableReadableStream(stream);

    // Fire-and-forget pipe (the buggy pattern)
    const pipePromise = (async () => {
      broadcaster.push({ type: 'turn.start', turnNumber: 0 });

      const consumer = reusableStream.createConsumer();
      for await (const event of consumer) {
        broadcaster.push(event);
      }

      broadcaster.push({ type: 'turn.end', turnNumber: 0 });
    })();

    const broadcastConsumer = broadcaster.createConsumer();

    // Simulate executeToolsIfNeeded completing before the pipe finishes
    const executionPromise = (async () => {
      await new Promise((r) => setTimeout(r, 5));
    })().finally(() => {
      // BUG: complete() is called without awaiting pipePromise
      broadcaster.complete();
    });

    const collectedEvents: { type: string; turnNumber?: number }[] = [];
    for await (const event of broadcastConsumer) {
      collectedEvents.push(event);
    }

    await executionPromise;
    await pipePromise;

    // turn.start is present (pushed synchronously before first await in the IIFE)
    expect(collectedEvents.filter((e) => e.type === 'turn.start')).toHaveLength(1);

    // BUG: turn.end is dropped because complete() was called before the pipe finished
    expect(collectedEvents.filter((e) => e.type === 'turn.end')).toHaveLength(0);
  });

  /**
   * Simulates the FIXED pattern: await the pipe promise before calling
   * complete(). This ensures turn.end is always pushed before the
   * broadcaster is marked complete.
   *
   * This matches the fix applied in model-result.ts where
   * startTurnBroadcasterExecution() now awaits initialPipePromise
   * in the .finally() block before calling broadcaster.complete().
   */
  it('fixed pattern: turn.end is preserved when pipe is awaited before complete()', async () => {
    const broadcaster = new ToolEventBroadcaster<{ type: string; turnNumber?: number }>();

    const stream = createDelayedStream(
      [{ type: 'response.output_text.delta' }, { type: 'response.completed' }],
      20,
    );
    const reusableStream = new ReusableReadableStream(stream);

    const pipePromise = (async () => {
      broadcaster.push({ type: 'turn.start', turnNumber: 0 });

      const consumer = reusableStream.createConsumer();
      for await (const event of consumer) {
        broadcaster.push(event);
      }

      broadcaster.push({ type: 'turn.end', turnNumber: 0 });
    })();

    const broadcastConsumer = broadcaster.createConsumer();

    // FIX: await pipePromise before calling complete()
    const executionPromise = (async () => {
      await new Promise((r) => setTimeout(r, 5));
    })().finally(async () => {
      await pipePromise; // THE FIX: ensures turn.end is pushed first
      broadcaster.complete();
    });

    const collectedEvents: { type: string; turnNumber?: number }[] = [];
    for await (const event of broadcastConsumer) {
      collectedEvents.push(event);
    }

    await executionPromise;

    // turn.start is present
    expect(collectedEvents.filter((e) => e.type === 'turn.start')).toHaveLength(1);

    // FIX: turn.end is now preserved
    expect(collectedEvents.filter((e) => e.type === 'turn.end')).toHaveLength(1);

    // Verify ordering: turn.start comes before turn.end
    const startIdx = collectedEvents.findIndex((e) => e.type === 'turn.start');
    const endIdx = collectedEvents.findIndex((e) => e.type === 'turn.end');
    expect(startIdx).toBeLessThan(endIdx);

    // Verify turn numbers
    const turnStart = collectedEvents.find((e) => e.type === 'turn.start');
    const turnEnd = collectedEvents.find((e) => e.type === 'turn.end');
    expect(turnStart).toHaveProperty('turnNumber', 0);
    expect(turnEnd).toHaveProperty('turnNumber', 0);
  });
});
