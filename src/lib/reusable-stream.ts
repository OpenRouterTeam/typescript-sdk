/**
 * A reusable readable stream that allows multiple consumers to read from the same source stream
 * concurrently while it's actively streaming, without forcing consumers to wait for full buffering.
 *
 * Key features:
 * - Multiple concurrent consumers with independent read positions
 * - New consumers can attach while streaming is active
 * - Full replay for delayed and sequential consumers by default
 * - Opt-in active-consumer replay compaction for bounded memory
 * - Each consumer can read at their own pace
 */
export type StreamReplay = 'full' | 'active-consumers';

export interface ReusableReadableStreamOptions<T> {
  streamReplay?: StreamReplay;
  onValue?: (value: T) => void;
  isTerminalValue?: (value: T) => boolean;
}

export class ReusableReadableStream<T> {
  private buffer: (T | undefined)[] = [];
  private bufferHead = 0;
  // Consumer positions are absolute. Buffer index = bufferHead + position - trimOffset.
  private trimOffset = 0;
  private consumers = new Map<number, ConsumerState>();
  private nextConsumerId = 0;
  private sourceReader: ReadableStreamDefaultReader<T> | null = null;
  private sourceComplete = false;
  private sourceError: Error | null = null;
  private pumpStarted = false;
  private sourceCancelPromise: Promise<void> | null = null;
  private readonly streamReplay: StreamReplay;
  private readonly onValue: ((value: T) => void) | undefined;
  private readonly isTerminalValue: ((value: T) => boolean) | undefined;

  constructor(
    private sourceStream: ReadableStream<T>,
    options: ReusableReadableStreamOptions<T> = {},
  ) {
    this.streamReplay = options.streamReplay ?? 'full';
    this.onValue = options.onValue;
    this.isTerminalValue = options.isTerminalValue;
  }

  /**
   * Create a new consumer that can independently iterate over the stream.
   * Full-replay consumers start at position 0. Active-consumer replay starts
   * at the current trim watermark. Multiple attached consumers advance
   * independently in either mode.
   */
  createConsumer(): AsyncIterableIterator<T> {
    const consumerId = this.nextConsumerId++;
    const state: ConsumerState = {
      position: this.trimOffset,
      waitingPromise: null,
      cancelled: false,
    };
    this.consumers.set(consumerId, state);

    // Start pumping the source stream if not already started
    if (!this.pumpStarted) {
      this.startPump();
    }

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    return {
      async next(): Promise<IteratorResult<T>> {
        const consumer = self.consumers.get(consumerId);
        if (!consumer) {
          return {
            done: true,
            value: undefined,
          };
        }

        if (consumer.cancelled) {
          return {
            done: true,
            value: undefined,
          };
        }

        // If we have buffered data at this position, return it
        const bufferIndex =
          self.bufferHead + consumer.position - self.trimOffset;
        if (bufferIndex < self.buffer.length) {
          const value = self.buffer[bufferIndex]!;
          consumer.position++;
          self.trimConsumed();
          return {
            done: false,
            value,
          };
        }

        // If source is complete and we've read everything, we're done
        if (self.sourceComplete) {
          self.consumers.delete(consumerId);
          return {
            done: true,
            value: undefined,
          };
        }

        // If source had an error, propagate it
        if (self.sourceError) {
          self.consumers.delete(consumerId);
          throw self.sourceError;
        }

        // Set up the waiting promise FIRST to avoid race condition
        // where source completes after the check but before promise is set
        const waitPromise = new Promise<void>((resolve, reject) => {
          consumer.waitingPromise = {
            resolve,
            reject,
          };

          // Immediately check if we should resolve after setting up the promise
          // This handles the case where data arrived or source completed
          // between our initial checks and promise creation
          if (
            self.sourceComplete ||
            self.sourceError ||
            self.bufferHead + consumer.position - self.trimOffset <
              self.buffer.length
          ) {
            resolve();
          }
        });

        await waitPromise;

        // Clear the promise reference after it resolves
        consumer.waitingPromise = null;

        // Recursively try again after waking up
        return this.next();
      },

      async return(): Promise<IteratorResult<T>> {
        const consumer = self.consumers.get(consumerId);
        if (consumer) {
          consumer.cancelled = true;
          self.consumers.delete(consumerId);
          self.trimConsumed();
        }
        return {
          done: true,
          value: undefined,
        };
      },

      async throw(e?: unknown): Promise<IteratorResult<T>> {
        const consumer = self.consumers.get(consumerId);
        if (consumer) {
          consumer.cancelled = true;
          self.consumers.delete(consumerId);
          self.trimConsumed();
        }
        throw e;
      },

      [Symbol.asyncIterator]() {
        return this;
      },
    };
  }

  /**
   * Drop buffered chunks every registered consumer has already consumed.
   * Clear slots immediately so payloads are collectable, but physically
   * slice only at 1,024 dead slots and 50% waste to amortize compaction.
   * This is enabled only for active-consumer replay.
   */
  private trimConsumed(): void {
    if (this.streamReplay === 'full' || this.consumers.size === 0) {
      return;
    }

    let min = Infinity;
    for (const consumer of this.consumers.values()) {
      if (consumer.position < min) {
        min = consumer.position;
      }
    }

    const nextHead = this.bufferHead + min - this.trimOffset;
    if (nextHead <= this.bufferHead) {
      return;
    }

    this.trimOffset = min;
    if (nextHead === this.buffer.length) {
      if (nextHead >= BUFFER_COMPACTION_MIN_HEAD) {
        this.buffer = [];
      } else {
        this.buffer.length = 0;
      }
      this.bufferHead = 0;
      return;
    }

    this.buffer.fill(undefined, this.bufferHead, nextHead);
    if (
      nextHead >= BUFFER_COMPACTION_MIN_HEAD &&
      nextHead * 2 >= this.buffer.length
    ) {
      this.buffer = this.buffer.slice(nextHead);
      this.bufferHead = 0;
      return;
    }
    this.bufferHead = nextHead;
  }

  /**
   * Start pumping data from the source stream into the buffer
   */
  private startPump(): void {
    if (this.pumpStarted) {
      return;
    }
    this.pumpStarted = true;
    this.sourceReader = this.sourceStream.getReader();

    const sourceReader = this.sourceReader;
    void (async () => {
      try {
        while (true) {
          const result = await sourceReader.read();

          if (result.done) {
            this.sourceComplete = true;
            this.notifyAllConsumers();
            break;
          }

          // Add to buffer
          this.buffer.push(result.value);
          this.onValue?.(result.value);

          // Notify waiting consumers
          this.notifyAllConsumers();

          if (this.isTerminalValue?.(result.value)) {
            this.sourceComplete = true;
            this.notifyAllConsumers();
            try {
              await this.cancelSourceReader(sourceReader);
            } catch {
              // The terminal event is authoritative; cancellation is cleanup only.
            }
            break;
          }
        }
      } catch (error) {
        this.sourceError = error instanceof Error ? error : new Error(String(error));
        this.notifyAllConsumers();
      } finally {
        sourceReader.releaseLock();
        if (this.sourceReader === sourceReader) {
          this.sourceReader = null;
        }
      }
    })();
  }

  /** Cancel the source reader at most once across terminal and public cancellation. */
  private cancelSourceReader(
    sourceReader: ReadableStreamDefaultReader<T>,
  ): Promise<void> {
    if (!this.sourceCancelPromise) {
      this.sourceCancelPromise = sourceReader.cancel();
    }
    return this.sourceCancelPromise;
  }

  /**
   * Notify all waiting consumers that new data is available
   */
  private notifyAllConsumers(): void {
    for (const consumer of this.consumers.values()) {
      if (consumer.waitingPromise) {
        if (this.sourceError) {
          consumer.waitingPromise.reject(this.sourceError);
        } else {
          consumer.waitingPromise.resolve();
        }
        consumer.waitingPromise = null;
      }
    }
  }

  /**
   * Cancel the source stream and all consumers
   */
  async cancel(): Promise<void> {
    // Cancel all consumers
    for (const consumer of this.consumers.values()) {
      consumer.cancelled = true;
      if (consumer.waitingPromise) {
        consumer.waitingPromise.resolve();
      }
    }
    this.consumers.clear();

    // Cancel the source stream
    if (this.sourceReader) {
      await this.cancelSourceReader(this.sourceReader);
    }
  }
}

interface ConsumerState {
  position: number;
  waitingPromise: {
    resolve: () => void;
    reject: (error: Error) => void;
  } | null;
  cancelled: boolean;
}

const BUFFER_COMPACTION_MIN_HEAD = 1024;
