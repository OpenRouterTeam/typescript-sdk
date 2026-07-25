import { describe, expect, it } from 'vitest';
import { betaResponsesSend } from '../../src/funcs/betaResponsesSend.js';
import { responsesSend } from '../../src/funcs/responsesSend.js';
import { OpenRouter } from '../../src/sdk/sdk.js';

describe('SDK namespaces', () => {
  const client = new OpenRouter({ apiKey: 'test-api-key' });

  it('exposes responses at the top level (GA)', () => {
    expect(client.responses).toBeDefined();
    expect(client.responses.send).toBeTypeOf('function');
  });

  it('keeps beta.responses as a deprecated alias until sunset', () => {
    expect(client.beta.responses).toBeDefined();
    expect(client.beta.responses.send).toBeTypeOf('function');
  });

  it('keeps the standalone betaResponsesSend function as a deprecated alias', () => {
    expect(betaResponsesSend).toBe(responsesSend);
  });

  it('leaves other beta namespaces intact', () => {
    expect(client.beta.analytics).toBeDefined();
  });
});
