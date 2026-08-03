import { EventStream } from '../../../src/lib/event-streams.ts';

const eventCount = 1_000;
const widths = [
  1,
  2,
  3,
  5,
  8,
  13,
];

function fragmentedSource(bytes: Uint8Array): ReadableStream<Uint8Array> {
  let offset = 0;
  let chunkIndex = 0;
  return new ReadableStream<Uint8Array>(
    {
      pull(controller) {
        if (offset === bytes.length) {
          controller.close();
          return;
        }
        const end = Math.min(bytes.length, offset + widths[chunkIndex % widths.length]);
        controller.enqueue(bytes.slice(offset, end));
        offset = end;
        chunkIndex++;
      },
    },
    {
      highWaterMark: 0,
    },
  );
}

export async function run({ sample }: { sample: () => void }) {
  const payload = Array.from(
    {
      length: eventCount,
    },
    (_, index) => `data: event-${index} 👋\r\ndata: second line\r\n\r\n`,
  ).join('');
  const source = fragmentedSource(new TextEncoder().encode(payload));
  const stream = new EventStream(source, (message) => ({
    done: false,
    value: message.data ?? '',
  }));
  let count = 0;
  let characterCount = 0;

  for await (const event of stream) {
    const expected = `event-${count} 👋\nsecond line`;
    if (event !== expected) {
      throw new Error(`event ${count} changed: ${JSON.stringify(event)}`);
    }
    characterCount += event.length;
    count++;
    if (count % 25 === 0) {
      sample();
    }
  }

  if (count !== eventCount) {
    throw new Error(`expected ${eventCount} events, received ${count}`);
  }
  return {
    characterCount,
    eventCount: count,
  };
}
