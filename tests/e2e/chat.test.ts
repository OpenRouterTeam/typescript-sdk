import type { ChatStreamingResponseChunkData } from '../../src/models/chatstreamingresponsechunk.js';
import type { ChatMessageContentItemFile } from '../../src/models/chatmessagecontentitemfile.js';

import { beforeAll, describe, expect, it } from 'vitest';
import { OpenRouter } from '../../src/sdk/sdk.js';

describe('Chat E2E Tests', () => {
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

  describe('chat.send() - Non-streaming', () => {
    it('should successfully send a chat request and get a response', async () => {
      const response = await client.chat.send({
        model: 'anthropic/claude-haiku-4.5',
        messages: [
          {
            role: 'user',
            content: "Say 'Hello, World!' and nothing else.",
          },
        ],
        stream: false,
      });

      expect(response).toBeDefined();

      expect(Array.isArray(response.choices)).toBe(true);
      expect(response.choices.length).toBeGreaterThan(0);

      const firstChoice = response.choices[0];
      expect(firstChoice).toBeDefined();
      expect(firstChoice?.message).toBeDefined();
      expect(firstChoice?.message?.content).toBeDefined();
      expect(typeof firstChoice?.message?.content).toBe('string');

      // Verify it has usage information
      expect(response.usage).toBeDefined();
      expect(response.usage?.totalTokens).toBeGreaterThan(0);
    });

    it('should handle multi-turn conversations', async () => {
      const response = await client.chat.send({
        model: 'anthropic/claude-haiku-4.5',
        messages: [
          {
            role: 'user',
            content: 'My name is Alice.',
          },
          {
            role: 'assistant',
            content: 'Hello Alice! How can I help you today?',
          },
          {
            role: 'user',
            content: 'What is my name?',
          },
        ],
        stream: false,
      });

      expect(response).toBeDefined();

      const content =
        typeof response.choices[0]?.message?.content === 'string'
          ? response.choices[0]?.message?.content?.toLowerCase()
          : response.choices[0]?.message?.content
              ?.map((item) => (item.type === 'text' ? item.text : ''))
              .join('')
              .toLowerCase();
      expect(content).toBeDefined();
      expect(content).toContain('alice');
    });

    it('should respect max_tokens parameter', async () => {
      const response = await client.chat.send({
        model: 'anthropic/claude-haiku-4.5',
        messages: [
          {
            role: 'user',
            content: 'Write a long story about a cat.',
          },
        ],
        maxTokens: 10,
        stream: false,
      });

      expect(response).toBeDefined();

      expect(response.usage?.completionTokens).toBeLessThanOrEqual(10);
    });
  });

  describe('chat.send() - Streaming', () => {
    it('should successfully stream chat responses', async () => {
      const response = await client.chat.send({
        model: 'anthropic/claude-haiku-4.5',
        messages: [
          {
            role: 'user',
            content: 'Count from 1 to 5.',
          },
        ],
        stream: true,
      });

      expect(response).toBeDefined();

      const chunks: ChatStreamingResponseChunkData[] = [];

      for await (const chunk of response) {
        expect(chunk).toBeDefined();
        chunks.push(chunk);
      }

      expect(chunks.length).toBeGreaterThan(0);

      // Verify chunks have expected structure
      const firstChunk = chunks[0];
      expect(firstChunk?.choices).toBeDefined();
      expect(Array.isArray(firstChunk?.choices)).toBe(true);
    });

    it('should stream complete content progressively', async () => {
      const response = await client.chat.send({
        model: 'anthropic/claude-haiku-4.5',
        messages: [
          {
            role: 'user',
            content: "Say 'test'.",
          },
        ],
        stream: true,
      });

      expect(response).toBeDefined();

      let fullContent = '';
      let chunkCount = 0;

      for await (const chunk of response) {
        chunkCount++;
        const delta = chunk.choices?.[0]?.delta;
        if (delta?.content) {
          fullContent += delta.content;
        }
      }

      expect(chunkCount).toBeGreaterThan(0);
      expect(fullContent.length).toBeGreaterThan(0);
    }, 10000);

    it('should include finish_reason in final chunk', async () => {
      const response = await client.chat.send({
        model: 'anthropic/claude-haiku-4.5',
        messages: [
          {
            role: 'user',
            content: "Say 'done'.",
          },
        ],
        stream: true,
      });

      expect(response).toBeDefined();

      let foundFinishReason = false;

      for await (const chunk of response) {
        const finishReason = chunk.choices?.[0]?.finishReason;
        if (finishReason) {
          foundFinishReason = true;
          expect(typeof finishReason).toBe('string');
        }
      }

      expect(foundFinishReason).toBe(true);
    }, 10000);
  });

  describe('chat.send() - File Content Type', () => {
    it('should successfully send a request with file content (PDF via URL)', async () => {
      const fileContent: ChatMessageContentItemFile = {
        type: 'file',
        file: {
          filename: 'bitcoin.pdf',
          fileData: 'https://bitcoin.org/bitcoin.pdf',
        },
      };

      const response = await client.chat.send({
        model: 'anthropic/claude-sonnet-4',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: 'What is the title of this document? Reply in 10 words or less.' },
              fileContent,
            ],
          },
        ],
        maxTokens: 50,
        stream: false,
      });

      expect(response).toBeDefined();
      expect(Array.isArray(response.choices)).toBe(true);
      expect(response.choices.length).toBeGreaterThan(0);

      const content = response.choices[0]?.message?.content;
      expect(content).toBeDefined();
      expect(typeof content).toBe('string');
      // The response should mention Bitcoin or the paper title
      expect((content as string).toLowerCase()).toMatch(/bitcoin|peer|electronic|cash/);
    }, 30000);
  });
});
