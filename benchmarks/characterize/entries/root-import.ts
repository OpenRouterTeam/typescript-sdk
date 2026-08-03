import { OpenRouter } from '../../../src/index.ts';

export function run({ sample }: { sample: () => void }) {
  const sdk = new OpenRouter({
    apiKey: 'benchmark-key',
    serverURL: 'https://benchmark.invalid/api/v1',
  });
  sample();

  return {
    callModel: typeof sdk.callModel,
    chatSend: typeof sdk.chat.send,
  };
}
