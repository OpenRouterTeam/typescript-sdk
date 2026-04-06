/**
 * Regression test for GitHub issue #452
 * https://github.com/OpenRouterTeam/ai-sdk-provider/issues/452
 * (Moved from OpenRouterTeam/typescript-sdk#146)
 *
 * Reported error: ZodError invalid_union — "Invalid input: expected object, received null"
 * on response.usage path when streaming
 *
 * This test verifies that streaming schemas accept usage: null,
 * since early streaming events (e.g. response.created) and intermediate
 * chat completion chunks may have usage: null before final usage is available.
 */
import { describe, it, expect } from 'vitest';
import { ChatStreamChunk$inboundSchema } from '../../src/models/chatstreamchunk.js';
import { StreamEvents$inboundSchema } from '../../src/models/streamevents.js';

describe('Issue #452: streaming usage field accepts null', () => {
  describe('ChatStreamChunk schema', () => {
    it('should accept usage: null in a streaming chat completion chunk', () => {
      const chunk = {
        id: 'chatcmpl-test123',
        choices: [
          {
            index: 0,
            delta: { content: 'Hello' },
            finish_reason: null,
          },
        ],
        created: 1712345678,
        model: 'anthropic/claude-sonnet-4.5',
        object: 'chat.completion.chunk',
        usage: null,
      };

      const result = ChatStreamChunk$inboundSchema.parse(chunk);
      expect(result.id).toBe('chatcmpl-test123');
      expect(result.usage).toBeNull();
    });

    it('should accept usage: undefined in a streaming chat completion chunk', () => {
      const chunk = {
        id: 'chatcmpl-test456',
        choices: [
          {
            index: 0,
            delta: { content: 'World' },
            finish_reason: null,
          },
        ],
        created: 1712345678,
        model: 'anthropic/claude-sonnet-4.5',
        object: 'chat.completion.chunk',
      };

      const result = ChatStreamChunk$inboundSchema.parse(chunk);
      expect(result.id).toBe('chatcmpl-test456');
      expect(result.usage).toBeUndefined();
    });

    it('should accept a valid usage object in a streaming chat completion chunk', () => {
      const chunk = {
        id: 'chatcmpl-test789',
        choices: [
          {
            index: 0,
            delta: {},
            finish_reason: 'stop',
          },
        ],
        created: 1712345678,
        model: 'anthropic/claude-sonnet-4.5',
        object: 'chat.completion.chunk',
        usage: {
          prompt_tokens: 10,
          completion_tokens: 20,
          total_tokens: 30,
        },
      };

      const result = ChatStreamChunk$inboundSchema.parse(chunk);
      expect(result.usage).toBeDefined();
      expect(result.usage?.promptTokens).toBe(10);
      expect(result.usage?.completionTokens).toBe(20);
      expect(result.usage?.totalTokens).toBe(30);
    });
  });

  describe('StreamEvents schema (Responses API)', () => {
    it('should accept usage: null in a response.created event', () => {
      const event = {
        type: 'response.created',
        response: {
          id: 'resp_test123',
          object: 'response',
          created_at: 1712345678,
          model: 'anthropic/claude-sonnet-4.5',
          status: 'in_progress',
          completed_at: null,
          output: [],
          error: null,
          incomplete_details: null,
          usage: null,
          temperature: 1,
          top_p: 1,
          presence_penalty: 0,
          frequency_penalty: 0,
          instructions: null,
          metadata: null,
          tools: [],
          tool_choice: 'auto',
          parallel_tool_calls: true,
        },
        sequence_number: 0,
      };

      const result = StreamEvents$inboundSchema.parse(event);
      expect(result.type).toBe('response.created');
    });
  });
});
