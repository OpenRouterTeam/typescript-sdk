import { describe, expect, it, vi } from 'vitest';

import { EventStream, type SseMessage } from '../../src/lib/event-streams.js';

const encoder = new TextEncoder();

function chunkBytes(input: string, splitPoints: number[]): Uint8Array[] {
  const bytes = encoder.encode(input);
  const points = [
    0,
    ...splitPoints,
    bytes.length,
  ];
  return points.slice(0, -1).map((start, index) => {
    return bytes.slice(start, points[index + 1]);
  });
}

function sourceFromChunks(
  chunks: Uint8Array[],
  onCancel = vi.fn<(reason?: unknown) => void>(),
): ReadableStream<Uint8Array> {
  let index = 0;
  return new ReadableStream<Uint8Array>(
    {
      pull(controller) {
        const chunk = chunks[index++];
        if (chunk) {
          controller.enqueue(chunk);
        } else {
          controller.close();
        }
      },
      cancel: onCancel,
    },
    {
      highWaterMark: 0,
    },
  );
}

async function collect(
  chunks: Uint8Array[],
  parse: (message: SseMessage<string>) => IteratorResult<SseMessage<string>, undefined> = (
    message,
  ) => ({
    done: false,
    value: message,
  }),
): Promise<SseMessage<string>[]> {
  const events: SseMessage<string>[] = [];
  const stream = new EventStream(sourceFromChunks(chunks), parse);
  for await (const event of stream) {
    events.push(event);
  }
  return events;
}

describe('EventStream', () => {
  it('produces identical events for every two-part and byte-by-byte fragmentation', async () => {
    const input = [
      ': comment\r\n',
      'event: update\r\n',
      'id: event-7\r\n',
      'retry: 2500\r\n',
      'data: first line\r\n',
      'data: second 👋 café 漢字\r\n',
      '\r\n',
      'data: next\r\n',
      '\r\n',
    ].join('');
    const bytes = encoder.encode(input);
    const expected = await collect([
      bytes,
    ]);

    expect(expected).toEqual([
      {
        data: 'first line\nsecond 👋 café 漢字',
        event: 'update',
        id: 'event-7',
        retry: 2500,
      },
      {
        data: 'next',
        id: 'event-7',
      },
    ]);

    for (let split = 1; split < bytes.length; split++) {
      expect(
        await collect(
          chunkBytes(input, [
            split,
          ]),
        ),
      ).toEqual(expected);
    }

    const everyByte = Array.from(bytes, (byte) => Uint8Array.of(byte));
    expect(await collect(everyByte)).toEqual(expected);
  });

  it.each([
    [
      'CRLF + CRLF',
      '\r\n\r\n',
    ],
    [
      'CRLF + CR',
      '\r\n\r',
    ],
    [
      'CRLF + LF',
      '\r\n\n',
    ],
    [
      'CR + CRLF',
      '\r\r\n',
    ],
    [
      'LF + CRLF',
      '\n\r\n',
    ],
    [
      'CR + CR',
      '\r\r',
    ],
    [
      'LF + CR',
      '\n\r',
    ],
    [
      'LF + LF',
      '\n\n',
    ],
  ])('accepts the %s event boundary across every split', async (_name, boundary) => {
    const input = `data: value${boundary}`;
    const bytes = encoder.encode(input);

    for (let split = 1; split < bytes.length; split++) {
      expect(
        await collect(
          chunkBytes(input, [
            split,
          ]),
        ),
      ).toEqual([
        {
          data: 'value',
          id: undefined,
        },
      ]);
    }
  });

  it('ignores malformed fields while preserving exact field semantics', async () => {
    const input = [
      'id: persisted\n\n',
      'id: ignored\0value\n',
      'retry: 1.5\n',
      'unknown: ignored\n',
      'data\n\n',
    ].join('');

    expect(
      await collect([
        encoder.encode(input),
      ]),
    ).toEqual([
      {
        data: '',
        id: 'persisted',
      },
    ]);
  });

  it('drops a truncated final event without invoking the parser', async () => {
    const parse = vi.fn((message: SseMessage<string>) => ({
      done: false as const,
      value: message,
    }));

    expect(
      await collect(
        [
          encoder.encode('data: incomplete'),
        ],
        parse,
      ),
    ).toEqual([]);
    expect(parse).not.toHaveBeenCalled();
  });

  it('propagates parser errors and cancels the upstream with the same error', async () => {
    const error = new Error('malformed event payload');
    const onCancel = vi.fn<(reason?: unknown) => void>();
    const stream = new EventStream(
      sourceFromChunks(
        [
          encoder.encode('data: value\n\n'),
        ],
        onCancel,
      ),
      () => {
        throw error;
      },
    );

    await expect(stream.getReader().read()).rejects.toBe(error);
    expect(onCancel).toHaveBeenCalledOnce();
    expect(onCancel).toHaveBeenCalledWith(error);
  });

  it('cancels upstream when the parser returns done', async () => {
    const onCancel = vi.fn<(reason?: unknown) => void>();
    const stream = new EventStream(
      sourceFromChunks(
        [
          encoder.encode('data: [DONE]\n\n'),
        ],
        onCancel,
      ),
      () => ({
        done: true,
        value: undefined,
      }),
    );

    await expect(stream.getReader().read()).resolves.toEqual({
      done: true,
      value: undefined,
    });
    expect(onCancel).toHaveBeenCalledWith('done');
  });

  it('forwards downstream cancellation to the upstream reader', async () => {
    const onCancel = vi.fn<(reason?: unknown) => void>();
    const stream = new EventStream(
      sourceFromChunks(
        [
          encoder.encode('data: first\n\n'),
          encoder.encode('data: second\n\n'),
        ],
        onCancel,
      ),
      (message) => ({
        done: false,
        value: message,
      }),
    );
    const reader = stream.getReader();

    await expect(reader.read()).resolves.toEqual({
      done: false,
      value: {
        data: 'first',
        id: undefined,
      },
    });
    await reader.cancel('consumer stopped');

    expect(onCancel).toHaveBeenCalledWith('consumer stopped');
  });
});
