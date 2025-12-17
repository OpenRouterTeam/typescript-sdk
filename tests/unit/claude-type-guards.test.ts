import { describe, expect, it } from 'vitest';
import { isClaudeStyleMessages } from '../../src/lib/claude-type-guards.js';

describe('claude-type-guards', () => {
  describe('isClaudeStyleMessages', () => {
    it('should return false for empty array', () => {
      expect(isClaudeStyleMessages([])).toBe(false);
    });

    it('should return false for non-array input', () => {
      expect(isClaudeStyleMessages('hello')).toBe(false);
      expect(isClaudeStyleMessages(null)).toBe(false);
      expect(isClaudeStyleMessages(undefined)).toBe(false);
      expect(isClaudeStyleMessages(123)).toBe(false);
      expect(isClaudeStyleMessages({})).toBe(false);
    });

    it('should return false when message has system role (OpenAI-specific)', () => {
      const messages = [
        {
          role: 'system',
          content: 'You are helpful',
        },
      ];
      expect(isClaudeStyleMessages(messages)).toBe(false);
    });

    it('should return false when message has developer role (OpenAI-specific)', () => {
      const messages = [
        {
          role: 'developer',
          content: 'Instructions',
        },
      ];
      expect(isClaudeStyleMessages(messages)).toBe(false);
    });

    it('should return false when message has tool role (OpenAI-specific)', () => {
      const messages = [
        {
          role: 'tool',
          content: 'tool result',
          tool_call_id: '123',
        },
      ];
      expect(isClaudeStyleMessages(messages)).toBe(false);
    });

    it('should return true when message has tool_result block (Claude-specific)', () => {
      const messages = [
        {
          role: 'user',
          content: [
            {
              type: 'tool_result',
              tool_use_id: 'tool_123',
              content: 'Result text',
            },
          ],
        },
      ];
      expect(isClaudeStyleMessages(messages)).toBe(true);
    });

    it('should return true when message has image block with source (Claude-specific)', () => {
      const messages = [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/png',
                data: 'base64data',
              },
            },
          ],
        },
      ];
      expect(isClaudeStyleMessages(messages)).toBe(true);
    });

    it('should return true when message has tool_use block with id (Claude-specific)', () => {
      const messages = [
        {
          role: 'assistant',
          content: [
            {
              type: 'tool_use',
              id: 'tool_123',
              name: 'get_weather',
              input: {
                location: 'NYC',
              },
            },
          ],
        },
      ];
      expect(isClaudeStyleMessages(messages)).toBe(true);
    });

    it('should return false for plain OpenAI chat messages without Claude features', () => {
      const messages = [
        {
          role: 'user',
          content: 'Hello',
        },
        {
          role: 'assistant',
          content: 'Hi there!',
        },
      ];
      expect(isClaudeStyleMessages(messages)).toBe(false);
    });

    it('should return false for messages with text blocks only (ambiguous)', () => {
      const messages = [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Hello',
            },
          ],
        },
      ];
      expect(isClaudeStyleMessages(messages)).toBe(false);
    });

    it('should return false for OpenAI image_url format', () => {
      const messages = [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'What is in this image?',
            },
            {
              type: 'image_url',
              image_url: {
                url: 'https://example.com/image.png',
              },
            },
          ],
        },
      ];
      expect(isClaudeStyleMessages(messages)).toBe(false);
    });

    it('should return false when message has top-level type field', () => {
      const messages = [
        {
          role: 'user',
          content: 'Hello',
          type: 'message',
        },
      ];
      expect(isClaudeStyleMessages(messages)).toBe(false);
    });

    it('should handle mixed messages and detect Claude format from any message', () => {
      const messages = [
        {
          role: 'user',
          content: 'Hello',
        },
        {
          role: 'assistant',
          content: [
            {
              type: 'text',
              text: 'Let me check',
            },
            {
              type: 'tool_use',
              id: 'tool_1',
              name: 'search',
              input: {},
            },
          ],
        },
      ];
      expect(isClaudeStyleMessages(messages)).toBe(true);
    });

    it('should return false early when system role is found', () => {
      const messages = [
        {
          role: 'system',
          content: 'You are helpful',
        },
        {
          role: 'user',
          content: [
            {
              type: 'tool_result',
              tool_use_id: '123',
              content: 'x',
            },
          ],
        },
      ];
      expect(isClaudeStyleMessages(messages)).toBe(false);
    });
  });
});
