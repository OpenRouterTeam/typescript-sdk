/**
 * A push-based event broadcaster that supports multiple concurrent consumers.
 * Similar to ReusableReadableStream but for push-based events from tool execution.
 *
 * Each consumer gets their own position in the buffer and receives all events
 * from their join point onward. This enables real-time streaming of generator
 * tool preliminary results to multiple consumers simultaneously.
 *
 * @template T - The event type being broadcast
 */
export class ToolEventBroadcaster<T> {
  private buffer: T[] = [];
  private consumers = new Map<number, ConsumerState>();
  private nextConsumerId = 0;
  private isComplete = false;
  private completionError: Error | null = null;

  /**
   * Push a new event to all consumers.
   * Events are buffered so late-joining consumers can catch up.
   */
  push(event: T): void {
    if (this.isComplete) return;
    this.buffer.push(event);
    this.notifyWaitingConsumers();
  }

  /**
   * Mark the broadcaster as complete - no more events will be pushed.
   * Optionally pass an error to signal failure to all consumers.
   */
  complete(error?: Error): void {
    this.isComplete = true;
    this.completionError = error ?? null;
    this.notifyWaitingConsumers();
  }

  /**
   * Create a new consumer that can independently iterate over events.
   * Consumers can join at any time and will receive events from position 0.
   * Multiple consumers can be created and will all receive the same events.
   */
  createConsumer(): AsyncIterableIterator<T> {
    const consumerId = this.nextConsumerId++;
    const state: ConsumerState = {
      position: 0,
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
        if (consumer.position < self.buffer.length) {
          const value = self.buffer[consumer.position]!;
          consumer.position++;
          return { done: false, value };
        }

        // If complete and caught up, we're done
        if (self.isComplete) {
          self.consumers.delete(consumerId);
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
            consumer.position < self.buffer.length
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
        }
        return { done: true, value: undefined };
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
