import { OpenRouterCore } from '../../../src/core.ts';

export function run() {
  const client = new OpenRouterCore({
    apiKey: 'benchmark-key',
    serverURL: 'https://benchmark.invalid/api/v1',
  });
  return {
    baseURL: client._baseURL?.toString(),
  };
}
