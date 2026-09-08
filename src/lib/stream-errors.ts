/**
 * Errors for graceful stalled-stream and stream-failure handling (DEV-723).
 *
 * A streaming response can return headers quickly and then never emit a
 * content-bearing event (a "stalled stream"). The stream watchdog
 * (`stream-watchdog.ts`) enforces the configured deadlines and raises
 * `StreamStalledError` when one expires.
 *
 * Separately, the server can report a failure mid-stream — a
 * `response.failed` event (carrying the failed response) or an `error`
 * event (carrying code/message). Those surface as `StreamFailedError`
 * instead of a bare `Error`, so callers can branch on the error code and
 * retryability.
 */

import type * as models from '../models/index.js';

/**
 * Which watchdog deadline expired.
 *
 * - `first_content`: the response stream started (headers received) but no
 *   content-bearing event arrived within `firstContentMs`.
 * - `between_content`: content started flowing, but the gap since the last
 *   content-bearing event exceeded `contentIntervalMs`.
 */
export type StreamStallPhase = 'first_content' | 'between_content';

/**
 * Raised when a streaming response stalls: the connection stays open (and may
 * even receive keep-alive framing) but no content-bearing event arrives within
 * the configured deadline.
 */
export class StreamStalledError extends Error {
  override readonly name = 'StreamStalledError';

  /** Which deadline expired. */
  readonly phase: StreamStallPhase;
  /** The configured deadline that expired, in milliseconds. */
  readonly timeoutMs: number;
  /**
   * Milliseconds elapsed since the deadline was armed (stream start for
   * `first_content`, the last content-bearing event for `between_content`).
   */
  readonly elapsedMs: number;
  /** Whether any content-bearing event was received before the stall. */
  readonly receivedAnyContent: boolean;

  constructor(options: {
    phase: StreamStallPhase;
    timeoutMs: number;
    elapsedMs: number;
    receivedAnyContent: boolean;
  }) {
    const message =
      options.phase === 'first_content'
        ? `Stream stalled: no content received within ${options.timeoutMs}ms of the response stream starting`
        : `Stream stalled: no content received for ${options.timeoutMs}ms after the last content event`;
    super(message);

    this.phase = options.phase;
    this.timeoutMs = options.timeoutMs;
    this.elapsedMs = options.elapsedMs;
    this.receivedAnyContent = options.receivedAnyContent;

    // In older runtimes the prototype chain is not set up correctly by
    // super() calls on subclasses of built-ins.
    Object.setPrototypeOf(this, StreamStalledError.prototype);
  }

  /**
   * Whether the request is safe to retry without risking duplicated output.
   * Only true when the stall happened before any content was received.
   */
  get retryable(): boolean {
    return !this.receivedAnyContent;
  }
}

/**
 * Error codes that indicate a transient condition where retrying the
 * request (ideally with backoff) is reasonable. Sourced from both the
 * Responses error-field codes (e.g. `server_error`) and the canonical
 * OpenRouter `ApiErrorType` values (e.g. `provider_overloaded`).
 */
const TRANSIENT_FAILURE_CODES: ReadonlySet<string> = new Set([
  'server_error',
  'server',
  'timeout',
  'rate_limit_exceeded',
  'provider_overloaded',
  'provider_unavailable',
]);

/**
 * Raised when the server reports a failure during streaming: a
 * `response.failed` event, a stream-level `error` event, or a stream that
 * ends after emitting an error without ever completing.
 *
 * Replaces the bare `new Error(...)` these paths used to throw, so
 * consumers can inspect the code, canonical error type, and the failed
 * response instead of string-matching messages.
 */
export class StreamFailedError extends Error {
  override readonly name = 'StreamFailedError';

  /** Provider/API error code (e.g. `server_error`), when reported. */
  readonly code: string | null;
  /** Canonical OpenRouter error type (`ApiErrorType`), when reported. */
  readonly errorType: string | null;
  /** The failed response object, when the failure came from `response.failed`. */
  readonly response: models.OpenResponsesResult | null;

  constructor(options: {
    message: string;
    code?: string | null | undefined;
    errorType?: string | null | undefined;
    response?: models.OpenResponsesResult | null | undefined;
  }) {
    super(options.message);
    this.code = options.code ?? null;
    this.errorType = options.errorType ?? null;
    this.response = options.response ?? null;

    Object.setPrototypeOf(this, StreamFailedError.prototype);
  }

  /**
   * Whether the failure looks transient (server error, timeout, rate
   * limit, provider overloaded/unavailable) and a retry with backoff is
   * reasonable. Validation-style failures (invalid prompt, content
   * policy, ...) return false.
   */
  get retryable(): boolean {
    return (
      (this.code !== null && TRANSIENT_FAILURE_CODES.has(this.code)) ||
      (this.errorType !== null && TRANSIENT_FAILURE_CODES.has(this.errorType))
    );
  }

  /** Build from a `response.failed` event's response payload. */
  static fromFailedResponse(response: models.OpenResponsesResult): StreamFailedError {
    const code = typeof response.error?.code === 'string' ? response.error.code : null;
    const errorType = typeof response.errorType === 'string' ? response.errorType : null;
    const detail = response.error?.message ?? 'no error detail provided';
    return new StreamFailedError({
      message: `Response failed${code ? ` (${code})` : ''}: ${detail}`,
      code,
      errorType,
      response,
    });
  }

  /** Build from a stream-level `error` event. */
  static fromErrorEvent(event: { code: string | null; message: string }): StreamFailedError {
    return new StreamFailedError({
      message: `Stream error${event.code ? ` (${event.code})` : ''}: ${event.message}`,
      code: event.code,
    });
  }
}
