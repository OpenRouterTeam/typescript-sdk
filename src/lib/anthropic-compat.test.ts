import type * as models from '../models/index.js';

import { describe, expect, it } from 'vitest';
import { fromClaudeMessages, toClaudeMessage } from './anthropic-compat.js';

/**
 * Creates a properly typed mock OpenResponsesNonStreamingResponse for testing.
 * This factory provides all required fields with sensible defaults.
 */
function createMockResponse(
  overrides: Partial<models.OpenResponsesNonStreamingResponse> & {
    output: models.OpenResponsesNonStreamingResponse['output'];
  },
): models.OpenResponsesNonStreamingResponse {
  return {
    id: 'resp_test',
    object: 'response',
    createdAt: Date.now(),
    model: 'openai/gpt-4',
    status: 'completed',
    error: null,
    incompleteDetails: null,
    temperature: null,
    topP: null,
    metadata: null,
    tools: [],
    toolChoice: 'auto',
    parallelToolCalls: false,
    ...overrides,
  };
}

describe('fromClaudeMessages', () => {
  describe('basic message conversion', () => {
    it('converts user message with string content', () => {
      const claudeMessages: models.ClaudeMessageParam[] = [
        {
          role: 'user',
          content: 'Hello, how are you?',
        },
      ];

      const result = fromClaudeMessages(claudeMessages);

      expect(result).toEqual([
        {
          role: 'user',
          content: 'Hello, how are you?',
        },
      ]);
    });

    it('converts assistant message with string content', () => {
      const claudeMessages: models.ClaudeMessageParam[] = [
        {
          role: 'assistant',
          content: 'I am doing well, thank you!',
        },
      ];

      const result = fromClaudeMessages(claudeMessages);

      expect(result).toEqual([
        {
          role: 'assistant',
          content: 'I am doing well, thank you!',
        },
      ]);
    });

    it('converts multiple messages in conversation', () => {
      const claudeMessages: models.ClaudeMessageParam[] = [
        {
          role: 'user',
          content: 'Hi',
        },
        {
          role: 'assistant',
          content: 'Hello!',
        },
        {
          role: 'user',
          content: 'How are you?',
        },
      ];

      const result = fromClaudeMessages(claudeMessages);

      expect(result).toEqual([
        {
          role: 'user',
          content: 'Hi',
        },
        {
          role: 'assistant',
          content: 'Hello!',
        },
        {
          role: 'user',
          content: 'How are you?',
        },
      ]);
    });
  });

  describe('text block content conversion', () => {
    it('converts user message with text block array', () => {
      const claudeMessages: models.ClaudeMessageParam[] = [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Hello from text block',
            },
          ],
        },
      ];

      const result = fromClaudeMessages(claudeMessages);

      expect(result).toEqual([
        {
          role: 'user',
          content: 'Hello from text block',
        },
      ]);
    });

    it('combines multiple text blocks into single content string', () => {
      const claudeMessages: models.ClaudeMessageParam[] = [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'First part. ',
            },
            {
              type: 'text',
              text: 'Second part.',
            },
          ],
        },
      ];

      const result = fromClaudeMessages(claudeMessages);

      expect(result).toEqual([
        {
          role: 'user',
          content: 'First part. Second part.',
        },
      ]);
    });
  });

  describe('tool_result block conversion', () => {
    it('converts tool_result with string content to function_call_output', () => {
      const claudeMessages: models.ClaudeMessageParam[] = [
        {
          role: 'user',
          content: [
            {
              type: 'tool_result',
              tool_use_id: 'tool_123',
              content: 'Tool execution result',
            },
          ],
        },
      ];

      const result = fromClaudeMessages(claudeMessages);

      expect(result).toEqual([
        {
          type: 'function_call_output',
          callId: 'tool_123',
          output: 'Tool execution result',
        },
      ]);
    });

    it('converts tool_result with text block array to function_call_output', () => {
      const claudeMessages: models.ClaudeMessageParam[] = [
        {
          role: 'user',
          content: [
            {
              type: 'tool_result',
              tool_use_id: 'tool_456',
              content: [
                {
                  type: 'text',
                  text: 'Result part 1. ',
                },
                {
                  type: 'text',
                  text: 'Result part 2.',
                },
              ],
            },
          ],
        },
      ];

      const result = fromClaudeMessages(claudeMessages);

      expect(result).toEqual([
        {
          type: 'function_call_output',
          callId: 'tool_456',
          output: 'Result part 1. Result part 2.',
        },
      ]);
    });

    it('handles mixed text and tool_result blocks', () => {
      const claudeMessages: models.ClaudeMessageParam[] = [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Here is some context. ',
            },
            {
              type: 'tool_result',
              tool_use_id: 'tool_789',
              content: 'Tool output',
            },
            {
              type: 'text',
              text: 'And some more text.',
            },
          ],
        },
      ];

      const result = fromClaudeMessages(claudeMessages);

      // Should produce both the text message and the function_call_output
      expect(result).toEqual([
        {
          type: 'function_call_output',
          callId: 'tool_789',
          output: 'Tool output',
        },
        {
          role: 'user',
          content: 'Here is some context. And some more text.',
        },
      ]);
    });
  });

  describe('tool_use blocks (should be skipped)', () => {
    it('skips tool_use blocks as they are output from assistant', () => {
      const claudeMessages: models.ClaudeMessageParam[] = [
        {
          role: 'assistant',
          content: [
            {
              type: 'text',
              text: 'Let me help you with that.',
            },
            {
              type: 'tool_use',
              id: 'tool_abc',
              name: 'get_weather',
              input: {
                location: 'SF',
              },
            },
          ],
        },
      ];

      const result = fromClaudeMessages(claudeMessages);

      // Only the text should be captured, tool_use is from previous response
      expect(result).toEqual([
        {
          role: 'assistant',
          content: 'Let me help you with that.',
        },
      ]);
    });
  });

  describe('image blocks (should be skipped)', () => {
    it('skips image blocks', () => {
      const claudeMessages: models.ClaudeMessageParam[] = [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Look at this image:',
            },
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/png',
                data: 'base64data...',
              },
            },
          ],
        },
      ];

      const result = fromClaudeMessages(claudeMessages);

      // Only the text should be captured
      expect(result).toEqual([
        {
          role: 'user',
          content: 'Look at this image:',
        },
      ]);
    });
  });

  describe('empty and edge cases', () => {
    it('handles empty messages array', () => {
      const result = fromClaudeMessages([]);
      expect(result).toEqual([]);
    });

    it('handles message with empty string content', () => {
      const claudeMessages: models.ClaudeMessageParam[] = [
        {
          role: 'user',
          content: '',
        },
      ];

      const result = fromClaudeMessages(claudeMessages);

      expect(result).toEqual([
        {
          role: 'user',
          content: '',
        },
      ]);
    });

    it('handles message with empty content array', () => {
      const claudeMessages: models.ClaudeMessageParam[] = [
        {
          role: 'user',
          content: [],
        },
      ];

      const result = fromClaudeMessages(claudeMessages);

      // Should produce empty array since no text and no tool_results
      expect(result).toEqual([]);
    });
  });
});

describe('toClaudeMessage', () => {
  describe('basic message conversion', () => {
    it('converts response with text output to ClaudeMessage', () => {
      const response = createMockResponse({
        id: 'resp_123',
        output: [
          {
            id: 'msg_1',
            type: 'message',
            role: 'assistant',
            status: 'completed',
            content: [
              {
                type: 'output_text',
                text: 'Hello! How can I help you?',
                annotations: [],
              },
            ],
          },
        ],
        usage: {
          inputTokens: 10,
          outputTokens: 20,
          totalTokens: 30,
          inputTokensDetails: {
            cachedTokens: 0,
          },
          outputTokensDetails: {
            reasoningTokens: 0,
          },
        },
      });

      const result = toClaudeMessage(response);

      expect(result).toEqual({
        id: 'resp_123',
        type: 'message',
        role: 'assistant',
        model: 'openai/gpt-4',
        content: [
          {
            type: 'text',
            text: 'Hello! How can I help you?',
          },
        ],
        stop_reason: 'end_turn',
        stop_sequence: null,
        usage: {
          input_tokens: 10,
          output_tokens: 20,
          cache_creation_input_tokens: 0,
          cache_read_input_tokens: 0,
        },
      });
    });
  });

  describe('function call conversion', () => {
    it('converts function_call output to tool_use block', () => {
      const response = createMockResponse({
        id: 'resp_456',
        output: [
          {
            type: 'function_call',
            callId: 'call_abc',
            name: 'get_weather',
            arguments: '{"location":"San Francisco"}',
            id: 'fc_1',
            status: 'completed',
          },
        ],
        usage: {
          inputTokens: 15,
          outputTokens: 25,
          totalTokens: 40,
          inputTokensDetails: {
            cachedTokens: 0,
          },
          outputTokensDetails: {
            reasoningTokens: 0,
          },
        },
      });

      const result = toClaudeMessage(response);

      expect(result.content).toEqual([
        {
          type: 'tool_use',
          id: 'call_abc',
          name: 'get_weather',
          input: {
            location: 'San Francisco',
          },
        },
      ]);
      expect(result.stop_reason).toBe('tool_use');
    });
  });

  describe('reasoning conversion', () => {
    it('converts reasoning output to thinking block', () => {
      const response = createMockResponse({
        id: 'resp_789',
        model: 'openai/o1',
        output: [
          {
            type: 'reasoning',
            id: 'reason_1',
            summary: [
              {
                type: 'summary_text',
                text: 'I need to think about this carefully...',
              },
            ],
          },
          {
            id: 'msg_2',
            type: 'message',
            role: 'assistant',
            status: 'completed',
            content: [
              {
                type: 'output_text',
                text: 'Here is my answer.',
                annotations: [],
              },
            ],
          },
        ],
        usage: {
          inputTokens: 20,
          outputTokens: 100,
          totalTokens: 120,
          inputTokensDetails: {
            cachedTokens: 0,
          },
          outputTokensDetails: {
            reasoningTokens: 0,
          },
        },
      });

      const result = toClaudeMessage(response);

      expect(result.content).toEqual([
        {
          type: 'thinking',
          thinking: 'I need to think about this carefully...',
          signature: '',
        },
        {
          type: 'text',
          text: 'Here is my answer.',
        },
      ]);
    });
  });

  describe('stop reason mapping', () => {
    it('maps completed status to end_turn', () => {
      const response = createMockResponse({
        id: 'resp_1',
        output: [
          {
            id: 'msg_1',
            type: 'message',
            role: 'assistant',
            status: 'completed',
            content: [
              {
                type: 'output_text',
                text: 'Done',
                annotations: [],
              },
            ],
          },
        ],
        usage: {
          inputTokens: 5,
          outputTokens: 5,
          totalTokens: 10,
          inputTokensDetails: {
            cachedTokens: 0,
          },
          outputTokensDetails: {
            reasoningTokens: 0,
          },
        },
      });

      const result = toClaudeMessage(response);
      expect(result.stop_reason).toBe('end_turn');
    });

    it('maps incomplete with max_output_tokens to max_tokens', () => {
      const response = createMockResponse({
        id: 'resp_2',
        status: 'incomplete',
        incompleteDetails: {
          reason: 'max_output_tokens',
        },
        output: [
          {
            id: 'msg_1',
            type: 'message',
            role: 'assistant',
            status: 'incomplete',
            content: [
              {
                type: 'output_text',
                text: 'Partial...',
                annotations: [],
              },
            ],
          },
        ],
        usage: {
          inputTokens: 5,
          outputTokens: 100,
          totalTokens: 105,
          inputTokensDetails: {
            cachedTokens: 0,
          },
          outputTokensDetails: {
            reasoningTokens: 0,
          },
        },
      });

      const result = toClaudeMessage(response);
      expect(result.stop_reason).toBe('max_tokens');
    });

    it('maps response with function calls to tool_use', () => {
      const response = createMockResponse({
        id: 'resp_3',
        output: [
          {
            type: 'function_call',
            callId: 'call_1',
            name: 'test_tool',
            arguments: '{}',
            id: 'fc_1',
            status: 'completed',
          },
        ],
        usage: {
          inputTokens: 5,
          outputTokens: 10,
          totalTokens: 15,
          inputTokensDetails: {
            cachedTokens: 0,
          },
          outputTokensDetails: {
            reasoningTokens: 0,
          },
        },
      });

      const result = toClaudeMessage(response);
      expect(result.stop_reason).toBe('tool_use');
    });
  });

  describe('usage mapping', () => {
    it('maps usage with cached tokens', () => {
      const response = createMockResponse({
        id: 'resp_1',
        output: [
          {
            id: 'msg_1',
            type: 'message',
            role: 'assistant',
            status: 'completed',
            content: [
              {
                type: 'output_text',
                text: 'OK',
                annotations: [],
              },
            ],
          },
        ],
        usage: {
          inputTokens: 100,
          outputTokens: 50,
          totalTokens: 150,
          inputTokensDetails: {
            cachedTokens: 80,
          },
          outputTokensDetails: {
            reasoningTokens: 0,
          },
        },
      });

      const result = toClaudeMessage(response);

      expect(result.usage).toEqual({
        input_tokens: 100,
        output_tokens: 50,
        cache_creation_input_tokens: 80,
        cache_read_input_tokens: 0,
      });
    });
  });
});
