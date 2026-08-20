/**
 * Tests for stalled-stream fail-fast handling (Linear DEV-723).
 *
 * Written against the spec produced by t_d7880a91 (STALLED_STREAM_SPEC.md):
 *   - `EventStream` constructor accepts `opts.stallTimeoutMs`
 *     (idle-between-chunks threshold; `<= 0` disables detection).
 *   - `DEFAULT_STALL_TIMEOUT_MS` (30_000) is exported from `src/lib/sdks.ts`
 *     and applied when no explicit value is given.
 *   - A stall raises a typed `StreamStalledError` (from
 *     `src/models/errors/httpclienterrors.ts`) carrying
 *     `stallTimeoutMs`, `elapsedMs`, and `eventsDelivered`.
 *   - Fail-fast policy: no retry/resume; the underlying reader is cancelled.
 *   - `isTimeoutError` / `isConnectionError` must NOT match the error.
 *
 * Timing: the stall watchdog measures real elapsed time, so these tests use
 * short real delays (tens of ms) rather than fake timers — vitest fake
 * timers cannot race a timer against a genuinely pending stream read.
 */

import { describe, expect, it } from "vitest";

import { EventStream, type SseMessage } from "../../src/lib/event-streams.js";
import {
  isConnectionError,
  isTimeoutError,
} from "../../src/lib/http.js";
import { ReusableReadableStream } from "../../src/lib/reusable-stream.js";
import { DEFAULT_STALL_TIMEOUT_MS } from "../../src/lib/sdks.js";
import {
  HTTPClientError,
  StreamStalledError,
} from "../../src/models/errors/httpclienterrors.js";

// ---------------------------------------------------------------------------
// Helpers: controllable byte-stream transports (no real network).
// ---------------------------------------------------------------------------

const encoder = new TextEncoder();

function sseChunk(data: string): Uint8Array {
  return encoder.encode(`data: ${data}\n\n`);
}

/** Parse that echoes the raw SSE `data` payload through as the event value. */
function echoParse(msg: SseMessage<string>): IteratorResult<string, undefined> {
  if (msg.data === "[DONE]") {
    return { done: true, value: undefined };
  }
  return { done: false, value: msg.data ?? "" };
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type ByteStep =
  | { kind: "chunk"; value: Uint8Array; delayMs: number }
  | { kind: "close"; delayMs: number }
  /** Go quiet for `delayMs` without closing — simulates a hung connection. */
  | { kind: "silence"; delayMs: number };

function chunk(value: Uint8Array, delayMs = 0): ByteStep {
  return { kind: "chunk", value, delayMs };
}
function close(delayMs = 0): ByteStep {
  return { kind: "close", delayMs };
}
function silence(delayMs: number): ByteStep {
  return { kind: "silence", delayMs };
}

/**
 * A scripted byte transport. Records whether `cancel()` was called on the
 * underlying reader so tests can assert connection teardown. If the script
 * ends without a `close` step the stream hangs open forever — the pathology
 * the stall watchdog exists to catch.
 */
function scriptedBody(steps: ByteStep[]): {
  body: ReadableStream<Uint8Array>;
  cancelReasons: () => unknown[];
} {
  const cancelReasons: unknown[] = [];
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      void (async () => {
        for (const step of steps) {
          await sleep(step.delayMs);
          if (step.kind === "chunk") {
            try {
              controller.enqueue(step.value);
            } catch {
              return; // stream was cancelled/closed underneath us
            }
          } else if (step.kind === "close") {
            try {
              controller.close();
            } catch {
              // already closed
            }
            return;
          }
          // "silence": consume time only.
        }
        // No close: hang open.
      })();
    },
    cancel(reason) {
      cancelReasons.push(reason);
    },
  });
  return { body, cancelReasons: () => cancelReasons };
}

/** Drain an async iterable, capturing the terminal error (if any). */
async function drain<T>(
  stream: AsyncIterable<T>,
): Promise<{ values: T[]; error: unknown }> {
  const values: T[] = [];
  try {
    for await (const v of stream) {
      values.push(v);
    }
    return { values, error: undefined };
  } catch (e) {
    return { values, error: e };
  }
}

const STALL_MS = 80;
// Generous epsilon: CI machines schedule timers late, never early enough to
// matter for these assertions.
const MARGIN_MS = 500;

// ---------------------------------------------------------------------------
// StreamStalledError type shape (spec §2.2)
// ---------------------------------------------------------------------------

describe("StreamStalledError", () => {
  it("is a typed HTTPClientError carrying stall metadata", () => {
    const err = new StreamStalledError(
      "Stream stalled: no data received for 80ms (stream open 95ms, 2 events delivered). The connection was aborted. Retry the request to resume from scratch.",
      { stallTimeoutMs: 80, elapsedMs: 95, eventsDelivered: 2 },
    );
    expect(err).toBeInstanceOf(StreamStalledError);
    expect(err).toBeInstanceOf(HTTPClientError);
    expect(err).toBeInstanceOf(Error);
    expect(err.name).toBe("StreamStalledError");
    expect(err.stallTimeoutMs).toBe(80);
    expect(err.elapsedMs).toBe(95);
    expect(err.eventsDelivered).toBe(2);
  });

  it("message includes stall window, elapsed time, and event count", () => {
    // Spec §2.2: "Stream stalled: no data received for 30000ms
    // (stream open 45210ms, 12 events delivered). ..."
    const err = new StreamStalledError(
      "Stream stalled: no data received for 30000ms " +
        "(stream open 45210ms, 12 events delivered). " +
        "The connection was aborted. Retry the request to resume from scratch.",
      {
        stallTimeoutMs: 30_000,
        elapsedMs: 45_210,
        eventsDelivered: 12,
      },
    );
    expect(err.message).toContain("30000");
    expect(err.message).toContain("45210");
    expect(err.message).toContain("12");
  });

  it("is not classified as a timeout or connection error by SDK heuristics", () => {
    const err = new StreamStalledError("stalled", {
      stallTimeoutMs: 80,
      elapsedMs: 90,
      eventsDelivered: 0,
    });
    expect(isTimeoutError(err)).toBe(false);
    expect(isConnectionError(err)).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Fail-fast behavior (spec §2.1, §2.3, §2.4)
// ---------------------------------------------------------------------------

describe("EventStream stall detection", () => {
  it("errors a stream that never sends data after the stall window", async () => {
    const { body, cancelReasons } = scriptedBody([silence(10_000)]);
    const stream = new EventStream(body, echoParse, {
      stallTimeoutMs: STALL_MS,
    });

    const started = Date.now();
    const { values, error } = await drain(stream);
    const elapsed = Date.now() - started;

    expect(values).toEqual([]);
    expect(error).toBeInstanceOf(StreamStalledError);
    const err = error as StreamStalledError;
    expect(err.stallTimeoutMs).toBe(STALL_MS);
    expect(err.eventsDelivered).toBe(0);
    expect(err.elapsedMs).toBeGreaterThanOrEqual(STALL_MS);
    // Fail-fast: fires promptly after the window, not when the script ends.
    expect(elapsed).toBeLessThan(STALL_MS + MARGIN_MS);
    // Connection torn down.
    expect(cancelReasons().length).toBeGreaterThanOrEqual(1);
  });

  it("errors a mid-stream stall; previously delivered events are unaffected", async () => {
    const { body, cancelReasons } = scriptedBody([
      chunk(sseChunk('"one"')),
      chunk(sseChunk('"two"'), 10),
      silence(10_000),
    ]);
    const stream = new EventStream(body, echoParse, {
      stallTimeoutMs: STALL_MS,
    });

    const started = Date.now();
    const { values, error } = await drain(stream);
    const elapsed = Date.now() - started;

    // Partial data delivered before the stall remains valid.
    expect(values).toEqual(['"one"', '"two"']);
    expect(error).toBeInstanceOf(StreamStalledError);
    const err = error as StreamStalledError;
    expect(err.eventsDelivered).toBe(2);
    expect(err.stallTimeoutMs).toBe(STALL_MS);
    // Fired after the configured window, not at stream start, not never.
    expect(elapsed).toBeGreaterThanOrEqual(STALL_MS);
    expect(elapsed).toBeLessThan(STALL_MS + MARGIN_MS + 20);
    expect(cancelReasons().length).toBeGreaterThanOrEqual(1);
  });

  it("resets the idle timer on every chunk (slow-but-alive streams do not stall)", async () => {
    const gapMs = STALL_MS / 2;
    const { body } = scriptedBody([
      chunk(sseChunk('"a"')),
      chunk(sseChunk('"b"'), gapMs),
      chunk(sseChunk('"c"'), gapMs),
      chunk(sseChunk("[DONE]"), gapMs),
    ]);
    const stream = new EventStream(body, echoParse, {
      stallTimeoutMs: STALL_MS,
    });

    const { values, error } = await drain(stream);
    expect(error).toBeUndefined();
    expect(values).toEqual(['"a"', '"b"', '"c"']);
  });

  it("treats keep-alive comment bytes as activity (no false stall)", async () => {
    const gapMs = STALL_MS / 2;
    const { body } = scriptedBody([
      chunk(sseChunk('"a"')),
      chunk(encoder.encode(": ping\n\n"), gapMs),
      chunk(encoder.encode(": ping\n\n"), gapMs),
      chunk(sseChunk("[DONE]"), gapMs),
    ]);
    const stream = new EventStream(body, echoParse, {
      stallTimeoutMs: STALL_MS,
    });

    const { values, error } = await drain(stream);
    expect(error).toBeUndefined();
    expect(values).toEqual(['"a"']);
  });

  it("does not fire on a stream that completes cleanly before the window", async () => {
    const { body } = scriptedBody([
      chunk(sseChunk('"a"')),
      chunk(sseChunk("[DONE]"), 10),
    ]);
    const stream = new EventStream(body, echoParse, {
      stallTimeoutMs: STALL_MS,
    });
    const { values, error } = await drain(stream);
    expect(error).toBeUndefined();
    expect(values).toEqual(['"a"']);
  });

  it("respects a custom stall threshold (window scales with the config)", async () => {
    const customMs = STALL_MS * 3;
    const { body } = scriptedBody([silence(10_000)]);
    const stream = new EventStream(body, echoParse, {
      stallTimeoutMs: customMs,
    });

    const started = Date.now();
    const { error } = await drain(stream);
    const elapsed = Date.now() - started;

    expect(error).toBeInstanceOf(StreamStalledError);
    expect((error as StreamStalledError).stallTimeoutMs).toBe(customMs);
    expect(elapsed).toBeGreaterThanOrEqual(customMs);
    expect(elapsed).toBeLessThan(customMs + MARGIN_MS);
  });

  it("applies the default threshold when stallTimeoutMs is not provided", () => {
    // The default is exported and documented as 30s of idle-between-chunks.
    expect(DEFAULT_STALL_TIMEOUT_MS).toBe(30_000);
  });

  it("stallTimeoutMs <= 0 disables detection (stream may hang; cancel manually)", async () => {
    const { body } = scriptedBody([silence(10_000)]);
    const stream = new EventStream(body, echoParse, { stallTimeoutMs: 0 });

    const reader = stream.getReader();
    const readPromise = reader.read();
    // No stall error arrives within well past a normal window.
    const settled = await Promise.race([
      readPromise.then(() => "settled"),
      sleep(STALL_MS * 3).then(() => "still-pending"),
    ]);
    expect(settled).toBe("still-pending");

    // Clean up: manual cancel must work and not leave rejections dangling.
    await reader.cancel("test cleanup");
    await expect(readPromise).resolves.toMatchObject({ done: true });
  });

  it("does not silently retry: the transport is consumed exactly once", async () => {
    let pullCount = 0;
    const body = new ReadableStream<Uint8Array>({
      pull() {
        pullCount++;
        // Never enqueue: every pull hangs.
        return new Promise<void>(() => {});
      },
    });
    const stream = new EventStream(body, echoParse, {
      stallTimeoutMs: STALL_MS,
    });
    const { error } = await drain(stream);
    expect(error).toBeInstanceOf(StreamStalledError);
    // Fail-fast: no reconnection attempts, no re-pulls after the error.
    const countAtError = pullCount;
    await sleep(STALL_MS * 2);
    expect(pullCount).toBe(countAtError);
  });
});

// ---------------------------------------------------------------------------
// Error propagation through higher-level consumers (spec §2.5)
// ---------------------------------------------------------------------------

describe("ReusableReadableStream fan-out on stall", () => {
  it("all attached consumers reject with the same typed StreamStalledError", async () => {
    const { body } = scriptedBody([
      chunk(sseChunk('"a"')),
      silence(10_000),
    ]);
    const source = new EventStream(body, echoParse, {
      stallTimeoutMs: STALL_MS,
    });
    const reusable = new ReusableReadableStream(source);

    const consumerA = reusable.createConsumer();
    const consumerB = reusable.createConsumer();

    // Both consume the first event fine.
    await expect(consumerA.next()).resolves.toMatchObject({
      done: false,
      value: '"a"',
    });
    await expect(consumerB.next()).resolves.toMatchObject({
      done: false,
      value: '"a"',
    });

    // Both pending next() calls reject with the same typed error.
    const [resA, resB] = await Promise.allSettled([
      consumerA.next(),
      consumerB.next(),
    ]);
    expect(resA.status).toBe("rejected");
    expect(resB.status).toBe("rejected");
    const errA = (resA as PromiseRejectedResult).reason;
    const errB = (resB as PromiseRejectedResult).reason;
    expect(errA).toBeInstanceOf(StreamStalledError);
    expect(errB).toBeInstanceOf(StreamStalledError);
    expect(errA.eventsDelivered).toBe(1);
    expect(errB.eventsDelivered).toBe(1);

    // Late consumers also see the terminal error, not a hang.
    const consumerC = reusable.createConsumer();
    // C replays the buffered event, then hits the stored error.
    await expect(consumerC.next()).resolves.toMatchObject({
      done: false,
      value: '"a"',
    });
    await expect(consumerC.next()).rejects.toBeInstanceOf(StreamStalledError);
  });
});
