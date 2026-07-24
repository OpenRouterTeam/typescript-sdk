import { describe, expect, it } from 'vitest';
import { OpenRouter } from '../../src/sdk/sdk.js';

describe('SDK namespaces', () => {
  const client = new OpenRouter({ apiKey: 'test-api-key' });

  it('exposes responses at the top level, not under beta', () => {
    expect(client.responses).toBeDefined();
    expect((client.beta as unknown as Record<string, unknown>).responses).toBeUndefined();
    expect(client.beta.analytics).toBeDefined();
  });
});
