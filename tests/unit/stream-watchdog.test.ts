import type { StreamEvents } from '../../src/models/streamevents.js';
import type { TextDeltaEvent } from '../../src/models/textdeltaevent.js';
import type { ReasoningDeltaEvent } from '../../src/models/reasoningdeltaevent.js';
import type { FunctionCallArgsDeltaEvent } from '../../src/models/functioncallargsdeltaevent.js';
import type { OpenResponsesCreatedEvent } from '../../src/models/openresponsescreatedevent.js';
import type { OpenResponsesResult } from '../../src/models/openresponsesresult.js';
import type { StreamEventsResponseCompleted } from '../../src/models/streamevents.js';
import type { StreamEventsResponseOutputItemAdded } from '../../src/models/streamevents.js';

import { describe, expect, it } from 'vitest';
import { StreamStalledError } from '../../src/lib/stream-errors.js';
import {
  applyResponsesStreamWatchdog,
  applyStreamWatchdog,
  isContentBearingStreamEvent,
  isTerminalStreamEvent,
} from '../../src/lib/stream-watchdog.js';

// ============================================================================
// Scripted stream helpers
//
// The watchdog measures real elapsed time between events, so these tests use
// short real delays (tens of ms) rather than fake timers: vitest fake timers
// cannot advance a timer that races a genuinely pending microtask-driven
// stream read without also stepping the stream's own delays.
// ============================================================================

type ScriptStep<T> =
  | { kind: 'event'; value: T; delayMs: number }
  | { kind: 'close'; delayMs: number }
  | { kind: 'silence'; delayMs: number };

function event<T>(value: T, delayMs = 0): ScriptStep<T> {
  return { kind: 'event', value, delayMs };
}

function close<T>(delayMs = 0): ScriptStep<T> {
  return { kind: 'close', delayMs };
}

/** A gap with no events and no close — the stream just goes quiet. */
function silence<T>(delayMs: number): ScriptStep<T> {
  return { kind: 'silence', delayMs };
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Build a ReadableStream that plays back the scripted steps. If the script
 * ends without an explicit `close`, the stream stays open forever (hung
 * connection) — exactly the pathology the watchdog exists to catch.
 */
function scriptedStream<T>(steps: ScriptStep<T>[]): ReadableStream<T> {
  let cancelled = false;
  return new ReadableStream<T>({
    start(controller) {
      void (async () => {
        for (const step of steps) {
          await sleep(step.delayMs);
          if (cancelled) {
            return;
          }
          if (step.kind === 'event') {
            controller.enqueue(step.value);
          } else if (step.kind === 'close') {
            controller.close();
            return;
          }
          // 'silence' steps only consume time.
        }
        // No explicit close: leave the stream hanging open.
      })();
    },
    cancel() {
      cancelled = true;
    },
  });
}

async function collect<T>(stream: ReadableStream<T>): Promise<T[]> {
  const reader = stream.getReader();
  const out: T[] = [];
  while (true) {
    const result = await reader.read();
    if (result.done) {
      return out;
    }
    out.push(result.value);
  }
}

async function collectError<T>(stream: ReadableStream<T>): Promise<{ events: T[]; error: unknown }> {
  const reader = stream.getReader();
  const events: T[] = [];
  try {
    while (true) {
      const result = await reader.read();
      if (result.done) {
        throw new Error('Expected the stream to error, but it closed cleanly');
      }
      events.push(result.value);
    }
  } catch (error) {
    return { events, error };
  }
}

// ============================================================================
// Typed OpenResponses event fixtures
// ============================================================================

function fakeResponse(status: OpenResponsesResult['status']): OpenResponsesResult {
  return {
    id: 'resp_1',
    object: 'response',
    createdAt: 0,
    model: 'test-model',
    status,
    completedAt: null,
    output: [],
    error: null,
    incompleteDetails: null,
    temperature: null,
    topP: null,
    presencePenalty: null,
    frequencyPenalty: null,
    metadata: null,
    tools: [],
    toolChoice: 'auto',
    parallelToolCalls: false,
  };
}

function createdEvent(): OpenResponsesCreatedEvent {
  return { type: 'response.created', response: fakeResponse('in_progress'), sequenceNumber: 0 };
}

function textDelta(delta: string): TextDeltaEvent {
  return {
    type: 'response.output_text.delta',
    delta,
    itemId: 'item_1',
    contentIndex: 0,
    outputIndex: 0,
    logprobs: [],
    sequenceNumber: 1,
  };
}

function reasoningDelta(delta: string): ReasoningDeltaEvent {
  return {
    type: 'response.reasoning_text.delta',
    delta,
    itemId: 'item_1',
    contentIndex: 0,
    outputIndex: 0,
    sequenceNumber: 1,
  };
}

function functionCallArgsDelta(delta: string): FunctionCallArgsDeltaEvent {
  return {
    type: 'response.function_call_arguments.delta',
    delta,
    itemId: 'item_1',
    outputIndex: 0,
    sequenceNumber: 1,
  };
}

/** An empty assistant-message shell: the "role prelude" that must NOT count as content. */
function emptyMessageShell(): StreamEventsResponseOutputItemAdded {
  return {
    type: 'response.output_item.added',
    outputIndex: 0,
    item: {
      type: 'message',
      id: 'item_1',
      role: 'assistant',
      status: 'in_progress',
      content: [],
    },
    sequenceNumber: 0,
  };
}

function completedEvent(): StreamEventsResponseCompleted {
  return {
    type: 'response.completed',
    response: fakeResponse('completed'),
    sequenceNumber: 9,
  };
}

// ============================================================================
// Event classification
// ============================================================================

describe('isContentBearingStreamEvent', () => {
  it('classifies output deltas as content', () => {
    expect(isContentBearingStreamEvent(textDelta('hi'))).toBe(true);
    expect(isContentBearingStreamEvent(reasoningDelta('hmm'))).toBe(true);
    expect(isContentBearingStreamEvent(functionCallArgsDelta('{'))).toBe(true);
  });

  it('does not classify status events or item shells as content', () => {
    expect(isContentBearingStreamEvent(createdEvent())).toBe(false);
    expect(isContentBearingStreamEvent(emptyMessageShell())).toBe(false);
    expect(isContentBearingStreamEvent(completedEvent())).toBe(false);
  });

  it('does not classify unknown event types as content', () => {
    const unknown = { type: 'UNKNOWN', raw: { type: 'response.mystery' }, isUnknown: true } as StreamEvents;
    expect(isContentBearingStreamEvent(unknown)).toBe(false);
  });
});

describe('isTerminalStreamEvent', () => {
  it('classifies completion / failure / error events as terminal', () => {
    expect(isTerminalStreamEvent(completedEvent())).toBe(true);
    expect(
      isTerminalStreamEvent({
        type: 'response.failed',
        response: fakeResponse('failed'),
        sequenceNumber: 3,
      }),
    ).toBe(true);
    expect(
      isTerminalStreamEvent({
        type: 'error',
        code: 'server_error',
        message: 'boom',
        param: null,
        sequenceNumber: 3,
      }),
    ).toBe(true);
  });

  it('does not classify content or status events as terminal', () => {
    expect(isTerminalStreamEvent(textDelta('hi'))).toBe(false);
    expect(isTerminalStreamEvent(createdEvent())).toBe(false);
  });
});

// ============================================================================
// Watchdog behavior (generic)
// ============================================================================

describe('applyStreamWatchdog', () => {
  const hooks = {
    isContentEvent: (e: string) => e.startsWith('content'),
    isTerminalEvent: (e: string) => e === 'terminal',
  };

  it('returns the source stream unchanged when no timeout is configured', () => {
    const source = scriptedStream<string>([close()]);
    expect(applyStreamWatchdog(source, {}, hooks)).toBe(source);
    // Also for explicitly disabled values:
    const source2 = scriptedStream<string>([close()]);
    expect(applyStreamWatchdog(source2, { firstContentMs: 0, contentIntervalMs: -5 }, hooks)).toBe(
      source2,
    );
    const source3 = scriptedStream<string>([close()]);
    expect(applyStreamWatchdog(source3, { firstContentMs: Number.NaN }, hooks)).toBe(source3);
  });

  it('passes a healthy stream through untouched', async () => {
    const wrapped = applyStreamWatchdog(
      scriptedStream([event('content-1', 5), event('content-2', 5), close(5)]),
      { firstContentMs: 1000, contentIntervalMs: 1000 },
      hooks,
    );
    expect(await collect(wrapped)).toEqual(['content-1', 'content-2']);
  });

  it('fails with first_content when no content arrives at all', async () => {
    const wrapped = applyStreamWatchdog(
      scriptedStream<string>([]), // hangs forever
      { firstContentMs: 40 },
      hooks,
    );
    const { events, error } = await collectError(wrapped);
    expect(events).toEqual([]);
    expect(error).toBeInstanceOf(StreamStalledError);
    const stall = error as StreamStalledError;
    expect(stall.phase).toBe('first_content');
    expect(stall.timeoutMs).toBe(40);
    expect(stall.receivedAnyContent).toBe(false);
    expect(stall.retryable).toBe(true);
    expect(stall.elapsedMs).toBeGreaterThanOrEqual(30);
  });

  it('fails with first_content when only non-content events arrive (metadata-then-stall)', async () => {
    const wrapped = applyStreamWatchdog(
      scriptedStream([event('meta-1', 5), event('meta-2', 10)]), // then hangs
      { firstContentMs: 50 },
      hooks,
    );
    const { events, error } = await collectError(wrapped);
    // Non-content events still flow through to the consumer...
    expect(events).toEqual(['meta-1', 'meta-2']);
    // ...but they do not reset the first-content deadline.
    expect(error).toBeInstanceOf(StreamStalledError);
    expect((error as StreamStalledError).phase).toBe('first_content');
    expect((error as StreamStalledError).retryable).toBe(true);
  });

  it('non-content events do not extend the first_content deadline', async () => {
    // Steady metadata heartbeats every 20ms, forever. If they reset the
    // deadline the watchdog would never fire.
    const heartbeats: ScriptStep<string>[] = Array.from({ length: 50 }, () => event('meta', 20));
    const wrapped = applyStreamWatchdog(scriptedStream(heartbeats), { firstContentMs: 90 }, hooks);
    const startedAt = Date.now();
    const { error } = await collectError(wrapped);
    expect(error).toBeInstanceOf(StreamStalledError);
    expect((error as StreamStalledError).phase).toBe('first_content');
    // Fired near the deadline, not after 50 * 20ms of heartbeats.
    expect(Date.now() - startedAt).toBeLessThan(500);
  });

  it('first content event disarms firstContentMs permanently', async () => {
    const wrapped = applyStreamWatchdog(
      // Content at 10ms, then a 100ms quiet gap, then close — the gap is
      // longer than firstContentMs but there is no content-interval timeout.
      scriptedStream([event('content-1', 10), event('content-2', 100), close()]),
      { firstContentMs: 50 },
      hooks,
    );
    expect(await collect(wrapped)).toEqual(['content-1', 'content-2']);
  });

  it('fails with between_content when the stream stalls mid-generation', async () => {
    const wrapped = applyStreamWatchdog(
      scriptedStream([event('content-1', 5), event('content-2', 10), silence(1000)]),
      { firstContentMs: 200, contentIntervalMs: 50 },
      hooks,
    );
    const { events, error } = await collectError(wrapped);
    expect(events).toEqual(['content-1', 'content-2']);
    expect(error).toBeInstanceOf(StreamStalledError);
    const stall = error as StreamStalledError;
    expect(stall.phase).toBe('between_content');
    expect(stall.timeoutMs).toBe(50);
    expect(stall.receivedAnyContent).toBe(true);
    // Content already flowed: NOT safe to blind-retry.
    expect(stall.retryable).toBe(false);
  });

  it('content events re-arm the between_content deadline', async () => {
    // Four content events, each 30ms apart, with a 50ms interval timeout:
    // each event must reset the clock or this would fail spuriously.
    const wrapped = applyStreamWatchdog(
      scriptedStream([
        event('content-1', 30),
        event('content-2', 30),
        event('content-3', 30),
        event('content-4', 30),
        close(10),
      ]),
      { firstContentMs: 100, contentIntervalMs: 50 },
      hooks,
    );
    expect(await collect(wrapped)).toEqual(['content-1', 'content-2', 'content-3', 'content-4']);
  });

  it('contentIntervalMs alone does not police the pre-first-content window', async () => {
    // 80ms of silence before the first content, but only contentIntervalMs
    // configured — the pre-content window is firstContentMs's job.
    const wrapped = applyStreamWatchdog(
      scriptedStream([event('content-1', 80), close()]),
      { contentIntervalMs: 30 },
      hooks,
    );
    expect(await collect(wrapped)).toEqual(['content-1']);
  });

  it('a terminal event disarms deadlines so trailing events are never stalls', async () => {
    const wrapped = applyStreamWatchdog(
      scriptedStream([
        event('content-1', 5),
        event('terminal', 5),
        // Long post-terminal gap before bookkeeping + close.
        event('meta-trailer', 100),
        close(),
      ]),
      { firstContentMs: 50, contentIntervalMs: 30 },
      hooks,
    );
    expect(await collect(wrapped)).toEqual(['content-1', 'terminal', 'meta-trailer']);
  });

  it('a clean close cancels all deadlines', async () => {
    const wrapped = applyStreamWatchdog(
      scriptedStream([event('meta', 5), close(5)]),
      { firstContentMs: 50 },
      hooks,
    );
    expect(await collect(wrapped)).toEqual(['meta']);
    // Wait past the deadline to catch a leaked timer firing on a closed stream.
    await sleep(80);
  });

  it('cancels the source stream when a deadline expires', async () => {
    let sourceCancelled = false;
    const source = new ReadableStream<string>({
      cancel() {
        sourceCancelled = true;
      },
    });
    const wrapped = applyStreamWatchdog(source, { firstContentMs: 30 }, hooks);
    const { error } = await collectError(wrapped);
    expect(error).toBeInstanceOf(StreamStalledError);
    // Reader.cancel resolves asynchronously.
    await sleep(10);
    expect(sourceCancelled).toBe(true);
  });

  it('invokes onStall exactly once before erroring', async () => {
    const stalls: StreamStalledError[] = [];
    const wrapped = applyStreamWatchdog(
      scriptedStream<string>([]),
      { firstContentMs: 30 },
      { ...hooks, onStall: (e) => stalls.push(e) },
    );
    const { error } = await collectError(wrapped);
    await sleep(50); // room for any duplicate firing
    expect(stalls).toHaveLength(1);
    expect(stalls[0]).toBe(error);
  });

  it('propagates upstream errors as-is (not wrapped in StreamStalledError)', async () => {
    const upstreamFailure = new Error('upstream exploded');
    const source = new ReadableStream<string>({
      start(controller) {
        setTimeout(() => controller.error(upstreamFailure), 10);
      },
    });
    const wrapped = applyStreamWatchdog(source, { firstContentMs: 1000 }, hooks);
    const { error } = await collectError(wrapped);
    expect(error).toBe(upstreamFailure);
  });

  it('cancelling the wrapped stream stops timers and cancels the source', async () => {
    let sourceCancelled = false;
    const source = new ReadableStream<string>({
      cancel() {
        sourceCancelled = true;
      },
    });
    const wrapped = applyStreamWatchdog(source, { firstContentMs: 30 }, hooks);
    await wrapped.cancel('consumer walked away');
    expect(sourceCancelled).toBe(true);
    // Wait past the deadline: the timer must not fire after cancellation.
    await sleep(60);
  });
});

// ============================================================================
// Responses-flavored wrapper
// ============================================================================

describe('applyResponsesStreamWatchdog', () => {
  it('stalls on the OpenRouter keepalive pathology: created + role prelude, then silence', async () => {
    // This is the exact DEV-723 scenario: headers arrive, response.created
    // and an empty message shell stream in, then nothing. (SSE keep-alive
    // comments never reach this layer — the SSE parser drops them.)
    const wrapped = applyResponsesStreamWatchdog(
      scriptedStream<StreamEvents>([event(createdEvent(), 5), event(emptyMessageShell(), 5)]),
      { firstContentMs: 60 },
    );
    const { events, error } = await collectError(wrapped);
    expect(events).toHaveLength(2);
    expect(error).toBeInstanceOf(StreamStalledError);
    const stall = error as StreamStalledError;
    expect(stall.phase).toBe('first_content');
    expect(stall.retryable).toBe(true);
  });

  it('passes a healthy responses stream through to completion', async () => {
    const wrapped = applyResponsesStreamWatchdog(
      scriptedStream<StreamEvents>([
        event(createdEvent(), 5),
        event(emptyMessageShell(), 5),
        event(textDelta('Hello'), 5),
        event(textDelta(' world'), 5),
        event(completedEvent(), 5),
        close(5),
      ]),
      { firstContentMs: 100, contentIntervalMs: 100 },
    );
    const collected = await collect(wrapped);
    expect(collected).toHaveLength(5);
    expect(collected.at(-1)?.type).toBe('response.completed');
  });

  it('reasoning deltas satisfy the first-content deadline (reasoning models)', async () => {
    const wrapped = applyResponsesStreamWatchdog(
      scriptedStream<StreamEvents>([
        event(createdEvent(), 5),
        // Reasoning streams for a while before any output text appears.
        event(reasoningDelta('thinking...'), 10),
        event(textDelta('answer'), 80),
        event(completedEvent(), 5),
        close(),
      ]),
      { firstContentMs: 50 },
    );
    const collected = await collect(wrapped);
    expect(collected).toHaveLength(4);
  });

  it('stalls mid-generation when deltas stop and nothing terminal arrives', async () => {
    const wrapped = applyResponsesStreamWatchdog(
      scriptedStream<StreamEvents>([
        event(createdEvent(), 5),
        event(textDelta('partial outp'), 5),
        silence(1000),
      ]),
      { firstContentMs: 100, contentIntervalMs: 60 },
    );
    const { error } = await collectError(wrapped);
    expect(error).toBeInstanceOf(StreamStalledError);
    const stall = error as StreamStalledError;
    expect(stall.phase).toBe('between_content');
    expect(stall.receivedAnyContent).toBe(true);
    expect(stall.retryable).toBe(false);
  });
});
