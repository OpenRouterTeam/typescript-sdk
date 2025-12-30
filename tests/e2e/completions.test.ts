import { beforeAll, describe, expect, it } from 'vitest';
import { OpenRouter } from '../../src/sdk/sdk.js';

describe('Completions E2E Tests', () => {
  let client: OpenRouter;

  beforeAll(() => {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      throw new Error('OPENROUTER_API_KEY environment variable is required for e2e tests');
    }

    client = new OpenRouter({
      apiKey,
    });
  });

  describe('completions.generate()', () => {
    it('should successfully generate a text completion', async () => {
      const response = await client.completions.generate({
        model: 'meta-llama/llama-3.2-1b-instruct',
        prompt: '5 + 7 = ',
        maxTokens: 10,
        stream: false,
      });

      expect(response).toBeDefined();
      expect(response.id).toBeDefined();
      // API returns chat.completion, SDK should accept both
      expect(['text_completion', 'chat.completion']).toContain(response.object);
      expect(Array.isArray(response.choices)).toBe(true);
      expect(response.choices.length).toBeGreaterThan(0);
    }, 30000);
  });
});
