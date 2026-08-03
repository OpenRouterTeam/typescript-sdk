import { SendChatCompletionRequestRequest$outboundSchema } from '../../../src/models/operations/sendchatcompletionrequest.ts';

const request = {
  appCategories: 'benchmark,memory',
  appTitle: 'SDK characterization',
  chatRequest: {
    maxCompletionTokens: 64,
    messages: [
      {
        content: 'Return a deterministic short response.',
        role: 'user',
      },
    ],
    model: 'openai/gpt-5',
    stream: false,
    temperature: 0,
  },
  httpReferer: 'https://benchmark.invalid',
};

export function run({ sample }: { sample: () => void }) {
  let output: ReturnType<typeof SendChatCompletionRequestRequest$outboundSchema.parse> | undefined;

  for (let iteration = 0; iteration < 1_000; iteration++) {
    output = SendChatCompletionRequestRequest$outboundSchema.parse(request);
    if (iteration % 25 === 0) {
      sample();
    }
  }

  if (!output) {
    throw new Error('validation scenario produced no output');
  }
  return output;
}
