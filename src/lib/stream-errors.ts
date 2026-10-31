/**
 * Errors for client-side stalled-stream detection (DEV-723).
 *
 * A streaming response can return headers quickly and then never emit a
 * content-bearing event (a "stalled stream"). The stream watchdog
 * (`stream-watchdog.ts`) enforces the configured deadlines and raises
 * `StreamStalledError` when one expires.
 */

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
