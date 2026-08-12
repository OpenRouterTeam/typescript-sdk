/**
 * A push-based event broadcaster that supports multiple concurrent consumers.
 * Similar to ReusableReadableStream but for push-based events from tool execution.
 *
 * Each consumer gets their own position in the buffer and receives all events
 * from the earliest still-buffered position. This enables real-time streaming
 * of generator tool preliminary results to multiple consumers simultaneously.
 *
 * @template T - The event type being broadcast
 */
export class ToolEventBroadcaster<T> {
  private buffer: (T | undefined)[] = [];
  private bufferHead = 0;
  // Consumer positions are absolute. Buffer index = bufferHead + position - trimOffset.
  private trimOffset = 0;
  private consumers = new Map<number, ConsumerState>();
  private nextConsumerId = 0;
  private isComplete = false;
  private completionError: Error | null = null;

  /**
   * Push a new event to all consumers.
   * Events are buffered so late-joining consumers can catch up from the trim
   * watermark.
   */
  push(event: T): void {
    if (this.isComplete) {
      return;
    }
    this.buffer.push(event);
    this.notifyWaitingConsumers();
  }

  /**
   * Mark the broadcaster as complete - no more events will be pushed.
   * Optionally pass an error to signal failure to all consumers.
   * Cleans up buffer and consumers after completion.
   */
  complete(error?: Error): void {
    this.isComplete = true;
    this.completionError = error ?? null;
    this.notifyWaitingConsumers();
    // Schedule cleanup after consumers have processed completion
    queueMicrotask(() => this.cleanup());
  }

  /**
   * Clean up resources after all consumers have finished.
   * Called automatically after complete(), but can be called manually.
   */
  private cleanup(): void {
    // Only cleanup if complete and all consumers are done
    if (this.isComplete && this.consumers.size === 0) {
      this.buffer = [];
      this.bufferHead = 0;
    }
  }

  /**
   * Create a new consumer that can independently iterate over events.
   * Consumers receive events from the earliest still-buffered position:
   * position 0 until a first consumer exists, thereafter the trim watermark.
   * Multiple consumers can be created and will all receive the same events.
   */
  createConsumer(): AsyncIterableIterator<T> {
    const consumerId = this.nextConsumerId++;
    const state: ConsumerState = {
      position: this.trimOffset,
      waitingPromise: null,
      cancelled: false,
    };
    this.consumers.set(consumerId, state);

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    return {
      async next(): Promise<IteratorResult<T>> {
        const consumer = self.consumers.get(consumerId);
        if (!consumer) {
          return { done: true, value: undefined };
        }

        if (consumer.cancelled) {
          return { done: true, value: undefined };
        }

        // Return buffered event if available
        const bufferIndex =
          self.bufferHead + consumer.position - self.trimOffset;
        if (bufferIndex < self.buffer.length) {
          const value = self.buffer[bufferIndex]!;
          consumer.position++;
          self.trimConsumed();
          return { done: false, value };
        }

        // If complete and caught up, we're done
        if (self.isComplete) {
          self.consumers.delete(consumerId);
          self.cleanup();
          if (self.completionError) {
            throw self.completionError;
          }
          return { done: true, value: undefined };
        }

        // Set up waiting promise FIRST to avoid race condition
        const waitPromise = new Promise<void>((resolve, reject) => {
          consumer.waitingPromise = { resolve, reject };

          // Immediately check if we should resolve after setting up promise
          if (
            self.isComplete ||
            self.completionError ||
            self.bufferHead + consumer.position - self.trimOffset <
              self.buffer.length
          ) {
            resolve();
          }
        });

        await waitPromise;
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
          self.cleanup();
        }
        return { done: true, value: undefined };
      },

      async throw(e?: unknown): Promise<IteratorResult<T>> {
        const consumer = self.consumers.get(consumerId);
        if (consumer) {
          consumer.cancelled = true;
          self.consumers.delete(consumerId);
          self.trimConsumed();
          self.cleanup();
        }
        throw e;
      },

      [Symbol.asyncIterator]() {
        return this;
      },
    };
  }

  /**
   * Drop buffered events every registered consumer has already consumed.
   * Clear slots immediately so payloads are collectable, but physically
   * slice only at 1,024 dead slots and 50% waste to amortize compaction.
   */
  private trimConsumed(): void {
    if (this.consumers.size === 0) {
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
   * Notify all waiting consumers that new data is available or stream completed
   */
  private notifyWaitingConsumers(): void {
    for (const consumer of this.consumers.values()) {
      if (consumer.waitingPromise) {
        if (this.completionError) {
          consumer.waitingPromise.reject(this.completionError);
        } else {
          consumer.waitingPromise.resolve();
        }
        consumer.waitingPromise = null;
      }
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
