import { StreamEvents$inboundSchema } from '../../../src/models/streamevents.ts';

const event = {
  type: 'response.output_text.delta',
  sequence_number: 1,
  item_id: 'message_1',
  output_index: 0,
  content_index: 0,
  delta: 'deterministic delta',
  logprobs: [],
};

export function run({ sample }: { sample: () => void }) {
  let output: ReturnType<typeof StreamEvents$inboundSchema.parse> | undefined;
  for (let iteration = 0; iteration < 10_000; iteration++) {
    output = StreamEvents$inboundSchema.parse(event);
    if (iteration % 100 === 0) {
      sample();
    }
  }
  return output?.type;
}
