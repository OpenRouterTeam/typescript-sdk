import { describe, expect, it } from 'vitest';
import { ToolEventBroadcaster } from '../../src/lib/tool-event-broadcaster.js';

describe('ToolEventBroadcaster', () => {
  describe('single consumer', () => {
    it('should deliver events to a single consumer', async () => {
      const broadcaster = new ToolEventBroadcaster<number>();
      const consumer = broadcaster.createConsumer();

      broadcaster.push(1);
      broadcaster.push(2);
      broadcaster.push(3);
      broadcaster.complete();

      const results: number[] = [];
      for await (const event of consumer) {
        results.push(event);
      }

      expect(results).toEqual([1, 2, 3]);
    });

    it('should handle empty stream', async () => {
      const broadcaster = new ToolEventBroadcaster<string>();
      const consumer = broadcaster.createConsumer();

      broadcaster.complete();

      const results: string[] = [];
      for await (const event of consumer) {
        results.push(event);
      }

      expect(results).toEqual([]);
    });

    it('should handle consumer cancellation via return()', async () => {
      const broadcaster = new ToolEventBroadcaster<number>();
      const consumer = broadcaster.createConsumer();

      broadcaster.push(1);
      broadcaster.push(2);

      // Get first value
      const first = await consumer.next();
      expect(first.done).toBe(false);
      expect(first.value).toBe(1);

      // Cancel consumer
      await consumer.return!();

      // Should be done now
      const after = await consumer.next();
      expect(after.done).toBe(true);
    });
  });

  describe('multiple consumers', () => {
    it('should deliver same events to multiple consumers', async () => {
      const broadcaster = new ToolEventBroadcaster<string>();
      const consumer1 = broadcaster.createConsumer();
      const consumer2 = broadcaster.createConsumer();

      broadcaster.push('a');
      broadcaster.push('b');
      broadcaster.complete();

      const results1: string[] = [];
      const results2: string[] = [];

      await Promise.all([
        (async () => {
          for await (const e of consumer1) results1.push(e);
        })(),
        (async () => {
          for await (const e of consumer2) results2.push(e);
        })(),
      ]);

      expect(results1).toEqual(['a', 'b']);
      expect(results2).toEqual(['a', 'b']);
    });

    it('should allow consumers at different read positions', async () => {
      const broadcaster = new ToolEventBroadcaster<number>();
      const consumer1 = broadcaster.createConsumer();

      broadcaster.push(1);
      broadcaster.push(2);

      // Consumer 1 reads first event
      const first = await consumer1.next();
      expect(first.value).toBe(1);

      // Consumer 2 joins after events pushed
      const consumer2 = broadcaster.createConsumer();

      broadcaster.push(3);
      broadcaster.complete();

      // Consumer 1 continues from position 1
      const remaining1: number[] = [];
      for await (const e of consumer1) remaining1.push(e);
      expect(remaining1).toEqual([2, 3]);

      // Consumer 2 gets all events from position 0
      const all2: number[] = [];
      for await (const e of consumer2) all2.push(e);
      expect(all2).toEqual([1, 2, 3]);
    });
  });

  describe('async waiting', () => {
    it('should wait for events when consumer is ahead of buffer', async () => {
      const broadcaster = new ToolEventBroadcaster<number>();
      const consumer = broadcaster.createConsumer();

      // Start consuming before events arrive
      const consumePromise = (async () => {
        const results: number[] = [];
        for await (const event of consumer) {
          results.push(event);
        }
        return results;
      })();

      // Push events after consumer starts waiting
      await new Promise((r) => setTimeout(r, 10));
      broadcaster.push(1);
      await new Promise((r) => setTimeout(r, 10));
      broadcaster.push(2);
      broadcaster.complete();

      const results = await consumePromise;
      expect(results).toEqual([1, 2]);
    });

    it('should handle rapid push/consume interleaving', async () => {
      const broadcaster = new ToolEventBroadcaster<number>();
      const consumer = broadcaster.createConsumer();

      const received: number[] = [];
      const consumePromise = (async () => {
        for await (const event of consumer) {
          received.push(event);
        }
      })();

      // Push events with minimal delay
      for (let i = 0; i < 10; i++) {
        broadcaster.push(i);
        await new Promise((r) => setTimeout(r, 1));
      }
      broadcaster.complete();

      await consumePromise;
      expect(received).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
  });

  describe('error handling', () => {
    it('should propagate errors to consumers', async () => {
      const broadcaster = new ToolEventBroadcaster<number>();
      const consumer = broadcaster.createConsumer();

      broadcaster.push(1);
      broadcaster.complete(new Error('Test error'));

      const results: number[] = [];
      let caughtError: Error | null = null;

      try {
        for await (const event of consumer) {
          results.push(event);
        }
      } catch (e) {
        caughtError = e as Error;
      }

      expect(results).toEqual([1]);
      expect(caughtError).not.toBeNull();
      expect(caughtError!.message).toBe('Test error');
    });

    it('should propagate errors to waiting consumers', async () => {
      const broadcaster = new ToolEventBroadcaster<number>();
      const consumer = broadcaster.createConsumer();

      // Start consuming (will wait)
      const consumePromise = (async () => {
        const results: number[] = [];
        for await (const event of consumer) {
          results.push(event);
        }
        return results;
      })();

      // Complete with error while consumer is waiting
      await new Promise((r) => setTimeout(r, 10));
      broadcaster.complete(new Error('Async error'));

      await expect(consumePromise).rejects.toThrow('Async error');
    });
  });

  describe('ignore after complete', () => {
    it('should ignore pushes after complete', async () => {
      const broadcaster = new ToolEventBroadcaster<number>();
      const consumer = broadcaster.createConsumer();

      broadcaster.push(1);
      broadcaster.complete();
      broadcaster.push(2); // Should be ignored

      const results: number[] = [];
      for await (const event of consumer) {
        results.push(event);
      }

      expect(results).toEqual([1]);
    });
  });

  describe('completion between iterations', () => {
    it('should handle completion between consumer iterations', async () => {
      const broadcaster = new ToolEventBroadcaster<number>();
      const consumer = broadcaster.createConsumer();

      broadcaster.push(1);
      const first = await consumer.next();
      expect(first.done).toBe(false);
      expect(first.value).toBe(1);

      // Complete while consumer is between iterations
      broadcaster.complete();

      const second = await consumer.next();
      expect(second.done).toBe(true);
    });

    it('should handle completion with remaining buffered events', async () => {
      const broadcaster = new ToolEventBroadcaster<number>();
      const consumer = broadcaster.createConsumer();

      broadcaster.push(1);
      broadcaster.push(2);
      broadcaster.push(3);

      // Read first event
      const first = await consumer.next();
      expect(first.value).toBe(1);

      // Complete with events still in buffer
      broadcaster.complete();

      // Should still get remaining buffered events
      const second = await consumer.next();
      expect(second.value).toBe(2);

      const third = await consumer.next();
      expect(third.value).toBe(3);

      // Now should be done
      const fourth = await consumer.next();
      expect(fourth.done).toBe(true);
    });
  });

  describe('typed events', () => {
    it('should work with typed tool events', async () => {
      type ToolEvent =
        | { type: 'delta'; content: string }
        | { type: 'preliminary_result'; toolCallId: string; result: unknown };

      const broadcaster = new ToolEventBroadcaster<ToolEvent>();
      const consumer = broadcaster.createConsumer();

      broadcaster.push({ type: 'delta', content: 'test' });
      broadcaster.push({
        type: 'preliminary_result',
        toolCallId: 'call_123',
        result: { progress: 50 },
      });
      broadcaster.complete();

      const events: ToolEvent[] = [];
      for await (const event of consumer) {
        events.push(event);
      }

      expect(events).toHaveLength(2);
      expect(events[0]).toEqual({ type: 'delta', content: 'test' });
      expect(events[1]).toEqual({
        type: 'preliminary_result',
        toolCallId: 'call_123',
        result: { progress: 50 },
      });
    });
  });
});
