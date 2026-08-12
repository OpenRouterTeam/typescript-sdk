import { describe, expect, it } from 'vitest';

import { ReusableReadableStream } from '../../src/lib/reusable-stream.js';
import { ToolEventBroadcaster } from '../../src/lib/tool-event-broadcaster.js';

const LARGE_BACKLOG_SIZE = 4097;
const PARTIAL_DRAIN_SIZE = 3073;
const APPENDED_BACKLOG_SIZE = 4096;

describe('SDK replay-buffer compaction', () => {
  it('keeps full broadcaster replay by default for sequential post-completion consumers', async () => {
    const broadcaster = new ToolEventBroadcaster<number>();
    broadcaster.push(1);
    broadcaster.push(2);
    broadcaster.complete();

    expect(await Array.fromAsync(broadcaster.createConsumer())).toEqual([1, 2]);
    expect(await Array.fromAsync(broadcaster.createConsumer())).toEqual([1, 2]);
  });

  it('delivers a large buffered event backlog in order to every attached consumer', async () => {
    const values = numberedValues(LARGE_BACKLOG_SIZE);
    const broadcaster = new ToolEventBroadcaster<number>('active-consumers');
    const fast = broadcaster.createConsumer();
    const slow = broadcaster.createConsumer();

    values.forEach((value) => broadcaster.push(value));
    broadcaster.complete();
    const fastValues = await Array.fromAsync(fast);
    const slowValues = await Array.fromAsync(slow);

    expect(fastValues).toEqual(values);
    expect(slowValues).toEqual(values);
  });

  it('starts late event consumers after data released when a lagging consumer returns', async () => {
    const broadcaster = new ToolEventBroadcaster<number>('active-consumers');
    const fast = broadcaster.createConsumer();
    const slow = broadcaster.createConsumer();
    [1, 2, 3].forEach((value) => broadcaster.push(value));
    expect((await fast.next()).value).toBe(1);
    expect((await fast.next()).value).toBe(2);
    expect((await fast.next()).value).toBe(3);

    expect(await slow.return?.()).toEqual({ done: true, value: undefined });
    const late = broadcaster.createConsumer();
    broadcaster.push(4);
    broadcaster.complete();

    expect(await Array.fromAsync(late)).toEqual([4]);
    expect(await Array.fromAsync(fast)).toEqual([4]);
  });

  it('starts late event consumers after data released when a lagging consumer throws', async () => {
    const broadcaster = new ToolEventBroadcaster<number>('active-consumers');
    const fast = broadcaster.createConsumer();
    const slow = broadcaster.createConsumer();
    [1, 2, 3].forEach((value) => broadcaster.push(value));
    expect((await fast.next()).value).toBe(1);
    expect((await fast.next()).value).toBe(2);
    expect((await fast.next()).value).toBe(3);
    const error = new Error('stop lagging event consumer');

    await expect(slow.throw?.(error)).rejects.toBe(error);
    const late = broadcaster.createConsumer();
    broadcaster.push(4);
    broadcaster.complete();

    expect(await Array.fromAsync(late)).toEqual([4]);
    expect(await Array.fromAsync(fast)).toEqual([4]);
  });

  it('preserves the unread event suffix after the last consumer returns', async () => {
    const broadcaster = new ToolEventBroadcaster<number>('active-consumers');
    const first = broadcaster.createConsumer();
    [1, 2, 3].forEach((value) => broadcaster.push(value));
    expect((await first.next()).value).toBe(1);

    expect(await first.return?.()).toEqual({ done: true, value: undefined });
    const late = broadcaster.createConsumer();
    broadcaster.push(4);
    broadcaster.complete();

    expect(await Array.fromAsync(late)).toEqual([2, 3, 4]);
  });

  it('preserves event order across repeated compactions and later appends', async () => {
    const initial = valuesWithUndefined(0, LARGE_BACKLOG_SIZE);
    const appended = valuesWithUndefined(LARGE_BACKLOG_SIZE, APPENDED_BACKLOG_SIZE);
    const expected = [...initial, ...appended];
    const broadcaster = new ToolEventBroadcaster<number | undefined>('active-consumers');
    const fast = broadcaster.createConsumer();
    const slow = broadcaster.createConsumer();
    initial.forEach((value) => broadcaster.push(value));

    const [fastPrefix, slowPrefix] = await readInLockstep(fast, slow, PARTIAL_DRAIN_SIZE);
    expect(fastPrefix).toEqual(initial.slice(0, PARTIAL_DRAIN_SIZE));
    expect(slowPrefix).toEqual(initial.slice(0, PARTIAL_DRAIN_SIZE));
    expect(replayBufferState(broadcaster)).toEqual({
      bufferLength: LARGE_BACKLOG_SIZE - PARTIAL_DRAIN_SIZE,
      bufferHead: 0,
      trimOffset: PARTIAL_DRAIN_SIZE,
    });

    appended.forEach((value) => broadcaster.push(value));
    expect(replayBufferState(broadcaster).bufferLength).toBe(
      LARGE_BACKLOG_SIZE - PARTIAL_DRAIN_SIZE + APPENDED_BACKLOG_SIZE,
    );
    broadcaster.complete();

    expect([...fastPrefix, ...(await Array.fromAsync(fast))]).toEqual(expected);
    expect([...slowPrefix, ...(await Array.fromAsync(slow))]).toEqual(expected);
    expect(replayBufferState(broadcaster)).toEqual({
      bufferLength: 0,
      bufferHead: 0,
      trimOffset: expected.length,
    });
  });

  it('delivers buffered events before throwing the terminal error', async () => {
    const broadcaster = new ToolEventBroadcaster<number>('active-consumers');
    const consumer = broadcaster.createConsumer();
    const error = new Error('terminal broadcaster error');
    broadcaster.push(1);
    broadcaster.push(2);
    broadcaster.complete(error);

    expect((await consumer.next()).value).toBe(1);
    expect((await consumer.next()).value).toBe(2);
    await expect(consumer.next()).rejects.toBe(error);
  });

  it('keeps full stream replay by default for sequential post-completion consumers', async () => {
    const stream = new ReusableReadableStream<number>(streamOf([1, 2]));

    expect(await Array.fromAsync(stream.createConsumer())).toEqual([1, 2]);
    expect(await Array.fromAsync(stream.createConsumer())).toEqual([1, 2]);
  });

  it('treats a terminal value as authoritative when source cancellation fails', async () => {
    let cancellationCount = 0;
    const source = new ReadableStream<number>({
      start(controller): void {
        controller.enqueue(1);
        controller.enqueue(2);
      },
      cancel(): void {
        cancellationCount++;
        throw new Error('source cancellation failed');
      },
    });
    const stream = new ReusableReadableStream(source, {
      isTerminalValue: (value) => value === 2,
    });

    expect(await Array.fromAsync(stream.createConsumer())).toEqual([1, 2]);
    await yieldToStreamPump();
    expect(cancellationCount).toBe(1);
    expect(source.locked).toBe(false);
  });

  it('delivers a large buffered stream backlog including undefined values in order', async () => {
    const values = Array.from({ length: LARGE_BACKLOG_SIZE }, (_, index) =>
      index % 1024 === 0 ? undefined : index,
    );
    const stream = new ReusableReadableStream<number | undefined>(streamOf(values), {
      streamReplay: 'active-consumers',
    });
    const fast = stream.createConsumer();
    const slow = stream.createConsumer();

    const fastValues = await Array.fromAsync(fast);
    const slowValues = await Array.fromAsync(slow);

    expect(fastValues).toEqual(values);
    expect(slowValues).toEqual(values);
  });

  it('starts late stream consumers after data released when a lagging consumer returns', async () => {
    const stream = new ReusableReadableStream<number>(streamOf([1, 2, 3]), {
      streamReplay: 'active-consumers',
    });
    const fast = stream.createConsumer();
    const slow = stream.createConsumer();
    expect((await fast.next()).value).toBe(1);
    expect((await fast.next()).value).toBe(2);
    expect((await fast.next()).value).toBe(3);

    expect(await slow.return?.()).toEqual({ done: true, value: undefined });
    const late = stream.createConsumer();

    expect(await Array.fromAsync(late)).toEqual([]);
    expect((await fast.next()).done).toBe(true);
  });

  it('starts late stream consumers after data released when a lagging consumer throws', async () => {
    const stream = new ReusableReadableStream<number>(streamOf([1, 2, 3]), {
      streamReplay: 'active-consumers',
    });
    const fast = stream.createConsumer();
    const slow = stream.createConsumer();
    expect((await fast.next()).value).toBe(1);
    expect((await fast.next()).value).toBe(2);
    expect((await fast.next()).value).toBe(3);
    const error = new Error('stop lagging stream consumer');

    await expect(slow.throw?.(error)).rejects.toBe(error);
    const late = stream.createConsumer();

    expect(await Array.fromAsync(late)).toEqual([]);
    expect((await fast.next()).done).toBe(true);
  });

  it('preserves the unread stream suffix after the last consumer returns', async () => {
    const stream = new ReusableReadableStream<number>(streamOf([1, 2, 3]), {
      streamReplay: 'active-consumers',
    });
    const first = stream.createConsumer();
    expect((await first.next()).value).toBe(1);

    expect(await first.return?.()).toEqual({ done: true, value: undefined });
    const late = stream.createConsumer();

    expect(await Array.fromAsync(late)).toEqual([2, 3]);
  });

  it('preserves stream order across repeated compactions and later appends', async () => {
    const initial = valuesWithUndefined(0, LARGE_BACKLOG_SIZE);
    const appended = valuesWithUndefined(LARGE_BACKLOG_SIZE, APPENDED_BACKLOG_SIZE);
    const expected = [...initial, ...appended];
    const sourceState: {
      controller?: ReadableStreamDefaultController<number | undefined>;
    } = {};
    const source = new ReadableStream<number | undefined>({
      start(controller): void {
        sourceState.controller = controller;
      },
    });
    const controller = sourceState.controller;
    if (!controller) {
      throw new Error('ReadableStream did not initialize its controller');
    }
    initial.forEach((value) => controller.enqueue(value));
    const stream = new ReusableReadableStream<number | undefined>(source, {
      streamReplay: 'active-consumers',
    });
    const fast = stream.createConsumer();
    const slow = stream.createConsumer();
    await yieldToStreamPump();

    const [fastPrefix, slowPrefix] = await readInLockstep(fast, slow, PARTIAL_DRAIN_SIZE);
    expect(fastPrefix).toEqual(initial.slice(0, PARTIAL_DRAIN_SIZE));
    expect(slowPrefix).toEqual(initial.slice(0, PARTIAL_DRAIN_SIZE));
    expect(replayBufferState(stream)).toEqual({
      bufferLength: LARGE_BACKLOG_SIZE - PARTIAL_DRAIN_SIZE,
      bufferHead: 0,
      trimOffset: PARTIAL_DRAIN_SIZE,
    });

    appended.forEach((value) => controller.enqueue(value));
    controller.close();
    await yieldToStreamPump();
    expect(replayBufferState(stream).bufferLength).toBe(
      LARGE_BACKLOG_SIZE - PARTIAL_DRAIN_SIZE + APPENDED_BACKLOG_SIZE,
    );

    expect([...fastPrefix, ...(await Array.fromAsync(fast))]).toEqual(expected);
    expect([...slowPrefix, ...(await Array.fromAsync(slow))]).toEqual(expected);
    expect(replayBufferState(stream)).toEqual({
      bufferLength: 0,
      bufferHead: 0,
      trimOffset: expected.length,
    });
  });
});

interface ReplayBufferState {
  readonly bufferLength: number;
  readonly bufferHead: number;
  readonly trimOffset: number;
}

async function readInLockstep<T>(
  first: AsyncIterableIterator<T>,
  second: AsyncIterableIterator<T>,
  count: number,
): Promise<readonly [T[], T[]]> {
  const firstValues: T[] = [];
  const secondValues: T[] = [];
  for (let index = 0; index < count; index++) {
    firstValues.push(await nextValue(first));
    secondValues.push(await nextValue(second));
  }
  return [firstValues, secondValues];
}

async function nextValue<T>(iterator: AsyncIterableIterator<T>): Promise<T> {
  const result = await iterator.next();
  if (result.done) {
    throw new Error('Replay consumer completed before the expected value');
  }
  return result.value;
}

function replayBufferState(value: object): ReplayBufferState {
  const buffer: unknown = Reflect.get(value, 'buffer');
  const bufferHead: unknown = Reflect.get(value, 'bufferHead');
  const trimOffset: unknown = Reflect.get(value, 'trimOffset');
  if (!Array.isArray(buffer) || typeof bufferHead !== 'number' || typeof trimOffset !== 'number') {
    throw new TypeError('Replay buffer internals did not match the expected SDK shape');
  }
  return {
    bufferLength: buffer.length,
    bufferHead,
    trimOffset,
  };
}

function numberedValues(size: number): number[] {
  return Array.from({ length: size }, (_, index) => index);
}

function valuesWithUndefined(start: number, size: number): (number | undefined)[] {
  return Array.from({ length: size }, (_, offset) =>
    offset % 1024 === 0 ? undefined : start + offset,
  );
}

function streamOf<T>(values: readonly T[]): ReadableStream<T> {
  return new ReadableStream<T>({
    start(controller): void {
      values.forEach((value) => controller.enqueue(value));
      controller.close();
    },
  });
}

async function yieldToStreamPump(): Promise<void> {
  await new Promise<void>((resolve) => setTimeout(resolve, 0));
}
