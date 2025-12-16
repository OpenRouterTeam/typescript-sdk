import { describe, expect, it } from "vitest";
import { fromChatMessages, toChatMessage } from "./chat-compat.js";
import type * as models from "../models/index.js";

/**
 * Creates a properly typed mock OpenResponsesNonStreamingResponse for testing.
 * This factory provides all required fields with sensible defaults.
 */
function createMockResponse(
  overrides: Partial<models.OpenResponsesNonStreamingResponse> & {
    output: models.OpenResponsesNonStreamingResponse["output"];
  }
): models.OpenResponsesNonStreamingResponse {
  return {
    id: "resp_test",
    object: "response",
    createdAt: Date.now(),
    model: "openai/gpt-4",
    status: "completed",
    error: null,
    incompleteDetails: null,
    temperature: null,
    topP: null,
    metadata: null,
    tools: [],
    toolChoice: "auto",
    parallelToolCalls: false,
    ...overrides,
  };
}

describe("fromChatMessages", () => {
  describe("basic message conversion", () => {
    it("converts user message with string content", () => {
      const messages: models.Message[] = [
        { role: "user", content: "Hello, how are you?" },
      ];

      const result = fromChatMessages(messages);

      expect(result).toEqual([
        { role: "user", content: "Hello, how are you?" },
      ]);
    });

    it("converts assistant message with string content", () => {
      const messages: models.Message[] = [
        { role: "assistant", content: "I am doing well, thank you!" },
      ];

      const result = fromChatMessages(messages);

      expect(result).toEqual([
        { role: "assistant", content: "I am doing well, thank you!" },
      ]);
    });

    it("converts system message with string content", () => {
      const messages: models.Message[] = [
        { role: "system", content: "You are a helpful assistant." },
      ];

      const result = fromChatMessages(messages);

      expect(result).toEqual([
        { role: "system", content: "You are a helpful assistant." },
      ]);
    });

    it("converts developer message with string content", () => {
      const messages: models.Message[] = [
        { role: "developer", content: "Developer instructions here." },
      ];

      const result = fromChatMessages(messages);

      expect(result).toEqual([
        { role: "developer", content: "Developer instructions here." },
      ]);
    });

    it("converts multiple messages in conversation", () => {
      const messages: models.Message[] = [
        { role: "system", content: "You are helpful." },
        { role: "user", content: "Hi" },
        { role: "assistant", content: "Hello!" },
        { role: "user", content: "How are you?" },
      ];

      const result = fromChatMessages(messages);

      expect(result).toEqual([
        { role: "system", content: "You are helpful." },
        { role: "user", content: "Hi" },
        { role: "assistant", content: "Hello!" },
        { role: "user", content: "How are you?" },
      ]);
    });
  });

  describe("tool response message conversion", () => {
    it("converts tool message to function_call_output", () => {
      const messages: models.Message[] = [
        {
          role: "tool",
          content: "The weather is sunny and 72F",
          toolCallId: "call_abc123",
        },
      ];

      const result = fromChatMessages(messages);

      expect(result).toEqual([
        {
          type: "function_call_output",
          callId: "call_abc123",
          output: "The weather is sunny and 72F",
        },
      ]);
    });

    it("converts tool message with object content by stringifying", () => {
      const messages: models.Message[] = [
        {
          role: "tool",
          content: [{ type: "text", text: "Structured response" }],
          toolCallId: "call_def456",
        },
      ];

      const result = fromChatMessages(messages);

      expect(result).toEqual([
        {
          type: "function_call_output",
          callId: "call_def456",
          output: JSON.stringify([{ type: "text", text: "Structured response" }]),
        },
      ]);
    });
  });

  describe("content array handling", () => {
    it("stringifies array content for user messages", () => {
      const messages: models.Message[] = [
        {
          role: "user",
          content: [{ type: "text", text: "Hello from array" }],
        },
      ];

      const result = fromChatMessages(messages);

      expect(result).toEqual([
        {
          role: "user",
          content: JSON.stringify([{ type: "text", text: "Hello from array" }]),
        },
      ]);
    });

    it("stringifies array content for assistant messages", () => {
      const messages: models.Message[] = [
        {
          role: "assistant",
          content: [{ type: "text", text: "Response in array" }],
        },
      ];

      const result = fromChatMessages(messages);

      expect(result).toEqual([
        {
          role: "assistant",
          content: JSON.stringify([{ type: "text", text: "Response in array" }]),
        },
      ]);
    });
  });

  describe("null and empty content handling", () => {
    it("handles null content in assistant message", () => {
      const messages: models.Message[] = [
        { role: "assistant", content: null },
      ];

      const result = fromChatMessages(messages);

      expect(result).toEqual([{ role: "assistant", content: "" }]);
    });

    it("handles empty string content", () => {
      const messages: models.Message[] = [{ role: "user", content: "" }];

      const result = fromChatMessages(messages);

      expect(result).toEqual([{ role: "user", content: "" }]);
    });

    it("handles empty messages array", () => {
      const result = fromChatMessages([]);
      expect(result).toEqual([]);
    });
  });

});

describe("toChatMessage", () => {
  describe("basic message conversion", () => {
    it("converts response with text output to AssistantMessage", () => {
      const response = createMockResponse({
        id: "resp_123",
        output: [
          {
            id: "msg_1",
            type: "message",
            role: "assistant",
            status: "completed",
            content: [
              {
                type: "output_text",
                text: "Hello! How can I help you?",
                annotations: [],
              },
            ],
          },
        ],
        usage: {
          inputTokens: 10,
          outputTokens: 20,
          totalTokens: 30,
          inputTokensDetails: { cachedTokens: 0 },
          outputTokensDetails: { reasoningTokens: 0 },
        },
      });

      const result = toChatMessage(response);

      expect(result).toEqual({
        role: "assistant",
        content: "Hello! How can I help you?",
      });
    });

    it("combines multiple text parts into single content string", () => {
      const response = createMockResponse({
        id: "resp_456",
        output: [
          {
            id: "msg_1",
            type: "message",
            role: "assistant",
            status: "completed",
            content: [
              { type: "output_text", text: "Part 1. ", annotations: [] },
              { type: "output_text", text: "Part 2.", annotations: [] },
            ],
          },
        ],
        usage: {
          inputTokens: 5,
          outputTokens: 10,
          totalTokens: 15,
          inputTokensDetails: { cachedTokens: 0 },
          outputTokensDetails: { reasoningTokens: 0 },
        },
      });

      const result = toChatMessage(response);

      expect(result).toEqual({
        role: "assistant",
        content: "Part 1. Part 2.",
      });
    });

    it("returns null content when message has no text", () => {
      const response = createMockResponse({
        id: "resp_789",
        output: [
          {
            id: "msg_1",
            type: "message",
            role: "assistant",
            status: "completed",
            content: [],
          },
        ],
        usage: {
          inputTokens: 5,
          outputTokens: 0,
          totalTokens: 5,
          inputTokensDetails: { cachedTokens: 0 },
          outputTokensDetails: { reasoningTokens: 0 },
        },
      });

      const result = toChatMessage(response);

      expect(result).toEqual({
        role: "assistant",
        content: null,
      });
    });
  });

  describe("error handling", () => {
    it("throws error when no message found in output", () => {
      const response = createMockResponse({
        id: "resp_err",
        output: [
          {
            type: "function_call",
            callId: "call_1",
            name: "test_tool",
            arguments: "{}",
            id: "fc_1",
            status: "completed",
          },
        ],
        usage: {
          inputTokens: 5,
          outputTokens: 10,
          totalTokens: 15,
          inputTokensDetails: { cachedTokens: 0 },
          outputTokensDetails: { reasoningTokens: 0 },
        },
      });

      expect(() => toChatMessage(response)).toThrow(
        "No message found in response output"
      );
    });
  });
});
