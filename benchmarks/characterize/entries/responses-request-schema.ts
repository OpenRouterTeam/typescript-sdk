import { ResponsesRequest$outboundSchema } from '../../../src/models/responsesrequest.ts';

const request = {
  model: 'openai/gpt-5.6-luna',
  input: 'Return a deterministic response.',
  maxOutputTokens: 64,
  stream: true,
};

export function run({ sample }: { sample: () => void }) {
  let output: ReturnType<typeof ResponsesRequest$outboundSchema.parse> | undefined;
  for (let iteration = 0; iteration < 1_000; iteration++) {
    output = ResponsesRequest$outboundSchema.parse(request);
    if (iteration % 50 === 0) {
      sample();
    }
  }
  return output;
}
