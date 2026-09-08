/**
 * Client-side stalled-stream detection (DEV-723).
 *
 * A streaming response can return headers quickly, emit only keep-alive
 * framing or metadata events, and then stall indefinitely without producing
 * content. Transport-level timeouts cannot catch this: keep-alive SSE
 * comments reset socket idle timers even though no content is flowing.
 *
 * The watchdog wraps a parsed event stream and enforces two semantic,
 * opt-in deadlines:
 *
 * - `firstContentMs` — armed when the stream starts; satisfied (and
 *   permanently disarmed) by the first content-bearing event.
 * - `contentIntervalMs` — after content has started, the maximum gap
 *   allowed between content-bearing events.
 *
 * Classification follows the parsed event's type, not transport activity:
 * empty role preludes (`response.output_item.added` for message shells),
 * status events (`response.created`, `response.in_progress`, ...), and
 * SSE keep-alive comments (which the SSE parser drops before events reach
 * this layer) neither satisfy nor reset a deadline.
 *
 * When a deadline expires, the wrapped stream errors with
 * {@link StreamStalledError} and the source stream is cancelled.
 */

import type * as models from '../models/index.js';

import { StreamStalledError, type StreamStallPhase } from './stream-errors.js';

/**
 * Opt-in stream stall timeouts. Both are unset by default (no watchdog).
 * Non-finite or non-positive values disable the corresponding deadline.
 */
export type StreamTimeoutOptions = {
  /**
   * Maximum milliseconds between the response stream starting (headers
   * received, body stream available) and the first content-bearing event.
   * Unset by default.
   */
  firstContentMs?: number | undefined;
  /**
   * Maximum milliseconds between consecutive content-bearing events once
   * content has started flowing. Does not govern the pre-first-content
   * window — that is `firstContentMs`'s job. Unset by default.
   */
  contentIntervalMs?: number | undefined;
  /**
   * How many times to transparently re-issue a turn's request when it
   * stalls before producing any content (`callModel` only; raw-stream
   * helpers ignore it). Only pre-content stalls are retried — they are
   * provably safe because no output has been observed. Stalls after
   * content started are never retried. Defaults to 0 (no retries).
   */
  maxStallRetries?: number | undefined;
};

/**
 * Event classification hooks for {@link applyStreamWatchdog}.
 */
export type StreamWatchdogHooks<T> = {
  /**
   * Returns true when the event carries model-generated output (or a
   * completed sub-result). Content events satisfy and re-arm deadlines.
   */
  isContentEvent: (event: T) => boolean;
  /**
   * Returns true when the event signals the response is finishing
   * (completed / failed / incomplete / error). Terminal events permanently
   * disarm the watchdog so trailing bookkeeping events are never killed.
   */
  isTerminalEvent?: ((event: T) => boolean) | undefined;
  /**
   * Invoked once, before the wrapped stream errors, when a deadline
   * expires. Phase 2 uses this to abort the underlying HTTP request.
   */
  onStall?: ((error: StreamStalledError) => void) | undefined;
};

/**
 * Wrap `source` with stall deadlines. Returns `source` unchanged when no
 * deadline is configured.
 *
 * The wrapper pumps eagerly (it does not propagate backpressure); parsed
 * SSE events are small and downstream consumers buffer regardless.
 */
export function applyStreamWatchdog<T>(
  source: ReadableStream<T>,
  timeouts: StreamTimeoutOptions,
  hooks: StreamWatchdogHooks<T>,
): ReadableStream<T> {
  const firstContentMs = normalizeTimeout(timeouts.firstContentMs);
  const contentIntervalMs = normalizeTimeout(timeouts.contentIntervalMs);

  if (firstContentMs === undefined && contentIntervalMs === undefined) {
    return source;
  }

  const reader = source.getReader();

  let timer: ReturnType<typeof setTimeout> | undefined;
  let armedPhase: StreamStallPhase = 'first_content';
  let armedTimeoutMs = 0;
  let armedAtMs = 0;
  let receivedContent = false;
  /** Set by a terminal event: deadlines permanently stop applying. */
  let disarmedForever = false;
  /** Set once the wrapped stream has closed, errored, or stalled. */
  let settled = false;

  const clearTimer = (): void => {
    if (timer !== undefined) {
      clearTimeout(timer);
      timer = undefined;
    }
  };

  return new ReadableStream<T>({
    start(controller) {
      const onDeadlineExpired = (): void => {
        if (settled) {
          return;
        }
        settled = true;
        timer = undefined;
        const error = new StreamStalledError({
          phase: armedPhase,
          timeoutMs: armedTimeoutMs,
          elapsedMs: Date.now() - armedAtMs,
          receivedAnyContent: receivedContent,
        });
        hooks.onStall?.(error);
        controller.error(error);
        // Cancelling the reader resolves the pump's pending read; the
        // settled flag makes the pump bail without touching the controller.
        void reader.cancel(error).catch(() => {
          // Cancellation failures are irrelevant once the stream errored.
        });
      };

      const arm = (phase: StreamStallPhase, timeoutMs: number): void => {
        clearTimer();
        armedPhase = phase;
        armedTimeoutMs = timeoutMs;
        armedAtMs = Date.now();
        timer = setTimeout(onDeadlineExpired, timeoutMs);
      };

      // The pre-first-content deadline arms the moment the stream starts.
      // `contentIntervalMs` alone does not cover that window.
      if (firstContentMs !== undefined) {
        arm('first_content', firstContentMs);
      }

      void (async () => {
        try {
          while (true) {
            const result = await reader.read();
            if (settled) {
              return;
            }
            if (result.done) {
              settled = true;
              clearTimer();
              controller.close();
              return;
            }

            const event = result.value;
            if (hooks.isTerminalEvent?.(event)) {
              // Response is finishing; deadlines permanently stop applying
              // so trailing bookkeeping events are never treated as stalls.
              disarmedForever = true;
              clearTimer();
            } else if (!disarmedForever && hooks.isContentEvent(event)) {
              receivedContent = true;
              if (contentIntervalMs !== undefined) {
                arm('between_content', contentIntervalMs);
              } else {
                clearTimer();
              }
            }
            controller.enqueue(event);
          }
        } catch (error) {
          if (settled) {
            return;
          }
          settled = true;
          clearTimer();
          controller.error(error);
        }
      })();
    },
    cancel(reason) {
      settled = true;
      clearTimer();
      return reader.cancel(reason);
    },
  });
}

/**
 * Stream event types that carry model-generated output or a completed
 * sub-result. These satisfy and re-arm watchdog deadlines.
 *
 * Deliberately excluded (neutral — neither satisfy nor reset):
 * - `response.created` / `response.in_progress` / `response.debug` — status.
 * - `response.output_item.added` — an empty item shell (role prelude); the
 *   content it introduces arrives as subsequent delta events.
 * - `response.content_part.added` / `response.reasoning_summary_part.added`
 *   — part shells preceding their deltas.
 * - in-progress markers of server-side tools (web search, image
 *   generation, fusion) — status, not output.
 * - Unknown event types — a healthy stream of only unknown types is
 *   indistinguishable from a stall; mixed streams disarm via known events.
 */
const CONTENT_BEARING_EVENT_TYPES: ReadonlySet<string> = new Set([
  'response.output_text.delta',
  'response.output_text.done',
  'response.output_text.annotation.added',
  'response.refusal.delta',
  'response.refusal.done',
  'response.reasoning_text.delta',
  'response.reasoning_text.done',
  'response.reasoning_summary_text.delta',
  'response.reasoning_summary_text.done',
  'response.reasoning_summary_part.done',
  'response.function_call_arguments.delta',
  'response.function_call_arguments.done',
  'response.custom_tool_call_input.delta',
  'response.custom_tool_call_input.done',
  'response.apply_patch_call_operation_diff.delta',
  'response.apply_patch_call_operation_diff.done',
  'response.content_part.done',
  'response.output_item.done',
  'response.web_search_call.completed',
  'response.image_generation_call.partial_image',
  'response.image_generation_call.completed',
  'response.fusion_call.panel.delta',
  'response.fusion_call.panel.reasoning.delta',
  'response.fusion_call.panel.completed',
  'response.fusion_call.panel.failed',
  'response.fusion_call.completed',
]);

/**
 * Stream event types that signal the response is finishing. They disarm
 * the watchdog permanently: the server has produced its verdict, so stall
 * deadlines no longer apply (server-reported failures surface through
 * their own error paths, not as stalls).
 */
const TERMINAL_EVENT_TYPES: ReadonlySet<string> = new Set([
  'response.completed',
  'response.failed',
  'response.incomplete',
  'error',
]);

/**
 * True when the event carries model output (text / refusal / reasoning
 * deltas, tool-call arguments, completed output items or sub-results).
 */
export function isContentBearingStreamEvent(event: models.StreamEvents): boolean {
  return (
    'type' in event && typeof event.type === 'string' && CONTENT_BEARING_EVENT_TYPES.has(event.type)
  );
}

/**
 * True when the event signals the response is finishing (completed,
 * failed, incomplete, or a server-emitted error event).
 */
export function isTerminalStreamEvent(event: models.StreamEvents): boolean {
  return 'type' in event && typeof event.type === 'string' && TERMINAL_EVENT_TYPES.has(event.type);
}

/**
 * Convenience wrapper of {@link applyStreamWatchdog} for OpenResponses
 * event streams, using the standard event classification.
 */
export function applyResponsesStreamWatchdog(
  source: ReadableStream<models.StreamEvents>,
  timeouts: StreamTimeoutOptions,
  hooks?: { onStall?: ((error: StreamStalledError) => void) | undefined },
): ReadableStream<models.StreamEvents> {
  return applyStreamWatchdog(source, timeouts, {
    isContentEvent: isContentBearingStreamEvent,
    isTerminalEvent: isTerminalStreamEvent,
    onStall: hooks?.onStall,
  });
}

/**
 * True when a chat-completions stream chunk carries model output: a choice
 * delta with content, reasoning, refusal, tool-call arguments, or audio.
 * Role-only preludes (`delta: { role: 'assistant' }`) and usage-only
 * chunks are neutral.
 */
export function isContentBearingChatChunk(chunk: models.ChatStreamChunk): boolean {
  return chunk.choices.some((choice) => {
    const delta = choice.delta;
    if (!delta) {
      return false;
    }
    return (
      (typeof delta.content === 'string' && delta.content.length > 0) ||
      (typeof delta.reasoning === 'string' && delta.reasoning.length > 0) ||
      (typeof delta.refusal === 'string' && delta.refusal.length > 0) ||
      (delta.reasoningDetails !== undefined && delta.reasoningDetails.length > 0) ||
      (delta.toolCalls !== undefined && delta.toolCalls.length > 0) ||
      delta.audio !== undefined
    );
  });
}

/**
 * True when a chat-completions stream chunk signals the response is
 * finishing: a non-null finish reason on any choice, or a chunk-level
 * error payload.
 */
export function isTerminalChatChunk(chunk: models.ChatStreamChunk): boolean {
  if (chunk.error !== undefined) {
    return true;
  }
  return chunk.choices.some((choice) => choice.finishReason !== null && choice.finishReason !== undefined);
}

/**
 * Convenience wrapper of {@link applyStreamWatchdog} for chat-completions
 * chunk streams, using the standard chunk classification.
 */
export function applyChatStreamWatchdog(
  source: ReadableStream<models.ChatStreamChunk>,
  timeouts: StreamTimeoutOptions,
  hooks?: { onStall?: ((error: StreamStalledError) => void) | undefined },
): ReadableStream<models.ChatStreamChunk> {
  return applyStreamWatchdog(source, timeouts, {
    isContentEvent: isContentBearingChatChunk,
    isTerminalEvent: isTerminalChatChunk,
    onStall: hooks?.onStall,
  });
}

/**
 * Outcome of waiting for a stream's first committed (content or terminal)
 * event. `live` carries a stream that replays everything observed so far
 * followed by the remainder of the source. `stalled` means the watchdog
 * fired before any content: nothing was handed downstream, so the caller
 * can safely retry the whole request.
 */
export type FirstContentOutcome<T> =
  | { kind: 'live'; stream: ReadableStream<T> }
  | { kind: 'stalled'; error: StreamStalledError };

/**
 * Read from `source` until an event satisfying `isCommitEvent` arrives
 * (or the stream closes), buffering everything seen. Used to make
 * pre-content stall retries safe: the returned stream only exists once
 * the attempt has proven alive, so a discarded attempt never leaks
 * events downstream.
 *
 * Non-stall errors and post-content stalls propagate as rejections.
 */
export async function awaitFirstContent<T>(
  source: ReadableStream<T>,
  isCommitEvent: (event: T) => boolean,
): Promise<FirstContentOutcome<T>> {
  const reader = source.getReader();
  const buffered: T[] = [];
  try {
    while (true) {
      const result = await reader.read();
      if (result.done) {
        return { kind: 'live', stream: replayThenPipe(buffered, reader) };
      }
      buffered.push(result.value);
      if (isCommitEvent(result.value)) {
        return { kind: 'live', stream: replayThenPipe(buffered, reader) };
      }
    }
  } catch (error) {
    if (error instanceof StreamStalledError && !error.receivedAnyContent) {
      return { kind: 'stalled', error };
    }
    throw error;
  }
}

/**
 * A stream that replays `events`, then pipes the remainder of `reader`.
 * Reading a finished reader resolves `done`, so this also covers sources
 * that closed during buffering.
 */
function replayThenPipe<T>(events: T[], reader: ReadableStreamDefaultReader<T>): ReadableStream<T> {
  return new ReadableStream<T>({
    start(controller) {
      for (const event of events) {
        controller.enqueue(event);
      }
      void (async () => {
        try {
          while (true) {
            const result = await reader.read();
            if (result.done) {
              controller.close();
              return;
            }
            controller.enqueue(result.value);
          }
        } catch (error) {
          controller.error(error);
        }
      })();
    },
    cancel(reason) {
      return reader.cancel(reason);
    },
  });
}

/**
 * Clamp `maxStallRetries` to a non-negative integer (0 = disabled).
 */
export function normalizeStallRetries(timeouts: StreamTimeoutOptions | undefined): number {
  const value = timeouts?.maxStallRetries;
  if (value === undefined || !Number.isFinite(value) || value <= 0) {
    return 0;
  }
  return Math.floor(value);
}

/**
 * True when at least one watchdog deadline is enabled (set, finite, > 0).
 * Callers use this to skip per-turn abort plumbing entirely when the
 * watchdog would be a no-op.
 */
export function hasActiveStreamTimeouts(timeouts: StreamTimeoutOptions | undefined): boolean {
  if (!timeouts) {
    return false;
  }
  return (
    normalizeTimeout(timeouts.firstContentMs) !== undefined ||
    normalizeTimeout(timeouts.contentIntervalMs) !== undefined
  );
}

/**
 * Treat non-finite and non-positive values as "disabled" so callers can
 * pass raw user input without pre-validating.
 */
function normalizeTimeout(value: number | undefined): number | undefined {
  if (value === undefined || !Number.isFinite(value) || value <= 0) {
    return undefined;
  }
  return value;
}

