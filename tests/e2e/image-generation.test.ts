import { beforeAll, describe, expect, it } from 'vitest';
import { OpenRouter } from '../../src/sdk/sdk.js';

describe('Image Generation E2E Tests', () => {
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

  describe('chat.send() - Image Generation', () => {
    it('should return images field in response from image generation model', async () => {
      const response = await client.chat.send({
        chatGenerationParams: {
          model: 'openai/gpt-5-image-mini',
          messages: [
            {
              role: 'user',
              content: 'Generate a simple red circle on a white background.',
            },
          ],
          stream: false,
        },
      });

      expect(response).toBeDefined();
      expect(Array.isArray(response.choices)).toBe(true);
      expect(response.choices.length).toBeGreaterThan(0);

      const message = response.choices[0]?.message;
      expect(message).toBeDefined();

      // The key assertion: images field should be present and not stripped by Zod
      expect(message?.images).toBeDefined();
      expect(Array.isArray(message?.images)).toBe(true);
      expect(message?.images?.length).toBeGreaterThan(0);

      // Verify image structure
      const firstImage = message?.images?.[0];
      expect(firstImage).toBeDefined();
      expect(firstImage?.imageUrl).toBeDefined();
      expect(firstImage?.imageUrl?.url).toBeDefined();
      expect(typeof firstImage?.imageUrl?.url).toBe('string');
      // URL can be either http(s) or data URI (base64)
      expect(firstImage?.imageUrl?.url).toMatch(/^(https?:\/\/|data:image\/)/);
    }, 60000); // Image generation can take longer
  });
});
