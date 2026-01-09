/**
 * A reusable readable stream that allows multiple consumers to read from the same source stream
 * concurrently while it's actively streaming, without forcing consumers to wait for full buffering.
 *
 * Key features:
 * - Multiple concurrent consumers with independent read positions
 * - New consumers can attach while streaming is active
 * - Efficient memory management with automatic cleanup
 * - Each consumer can read at their own pace
 */
export class ReusableReadableStream<T> {
  private buffer: T[] = [];
  private consumers = new Map<number, ConsumerState>();
  private nextConsumerId = 0;
  private sourceReader: ReadableStreamDefaultReader<T> | null = null;
  private sourceComplete = false;
  private sourceError: Error | null = null;
  private pumpStarted = false;

  constructor(private sourceStream: ReadableStream<T>) {}

  /**
   * Create a new consumer that can independently iterate over the stream.
   * Multiple consumers can be created and will all receive the same data.
   */
  createConsumer(): AsyncIterableIterator<T> {
    const consumerId = this.nextConsumerId++;
    const state: ConsumerState = {
      position: 0,
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
        if (consumer.position < self.buffer.length) {
          const value = self.buffer[consumer.position]!;
          consumer.position++;
          // Note: We don't clean up buffer to allow sequential/reusable access
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
          if (self.sourceComplete || self.sourceError || consumer.position < self.buffer.length) {
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
        }
        throw e;
      },

      [Symbol.asyncIterator]() {
        return this;
      },
    };
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

    void (async () => {
      try {
        while (true) {
          const result = await this.sourceReader!.read();

          if (result.done) {
            this.sourceComplete = true;
            this.notifyAllConsumers();
            break;
          }

          // Add to buffer
          this.buffer.push(result.value);

          // Notify waiting consumers
          this.notifyAllConsumers();
        }
      } catch (error) {
        this.sourceError = error instanceof Error ? error : new Error(String(error));
        this.notifyAllConsumers();
      } finally {
        if (this.sourceReader) {
          this.sourceReader.releaseLock();
        }
      }
    })();
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
      await this.sourceReader.cancel();
      this.sourceReader.releaseLock();
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
