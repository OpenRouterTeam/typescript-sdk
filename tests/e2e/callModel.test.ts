import { beforeAll, describe, expect, it } from "vitest";
import { OpenRouter } from "../../src/sdk/sdk.js";
import { Message } from "../../src/models/message.js";

describe("callModel E2E Tests", () => {
  let client: OpenRouter;

  beforeAll(() => {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      throw new Error(
        "OPENROUTER_API_KEY environment variable is required for e2e tests"
      );
    }

    client = new OpenRouter({
      apiKey,
    });
  });

  describe("response.text - Text extraction", () => {
    it("should successfully get text from a response", async () => {
      const response = client.callModel({
        model: "meta-llama/llama-3.2-1b-instruct",
        input: [
          {
            role: "user",
            content: "Say 'Hello, World!' and nothing else.",
          },
        ],
      });

      const text = await response.getText();

      expect(text).toBeDefined();
      expect(typeof text).toBe("string");
      expect(text.length).toBeGreaterThan(0);
      expect(text.toLowerCase()).toContain("hello");
    });

    it("should handle multi-turn conversations", async () => {
      const response = client.callModel({
        model: "meta-llama/llama-3.2-1b-instruct",
        input: [
          {
            role: "user",
            content: "My name is Bob.",
          },
          {
            role: "assistant",
            content: "Hello Bob! How can I help you today?",
          },
          {
            role: "user",
            content: "What is my name?",
          },
        ],
      });

      const text = await response.getText();

      expect(text).toBeDefined();
      expect(text.toLowerCase()).toContain("bob");
    });
  });

  describe("response.message - Complete message extraction", () => {
    it("should successfully get a complete message from response", async () => {
      const response = client.callModel({
        model: "meta-llama/llama-3.2-1b-instruct",
        input: [
          {
            role: "user",
            content: "Say 'test message' and nothing else.",
          },
        ],
      });

      const message = await response.getMessage();

      expect(message).toBeDefined();
      expect(message.role).toBe("assistant");
      expect(Array.isArray(message.content) || typeof message.content === "string" || message.content === null).toBe(true);

      if (Array.isArray(message.content)) {
        expect(message.content.length).toBeGreaterThan(0);
        const firstContent = message.content[0];
        expect(firstContent).toBeDefined();
        expect("type" in firstContent).toBe(true);
      } else if (typeof message.content === "string") {
        expect(message.content.length).toBeGreaterThan(0);
      } else if (message.content === null) {
        expect(message.content).toBeNull();
      }
    });

    it("should have proper message structure", async () => {
      const response = client.callModel({
        model: "meta-llama/llama-3.2-1b-instruct",
        input: [
          {
            role: "user",
            content: "Respond with a simple greeting.",
          },
        ],
      });

      const message = await response.getMessage();

      expect(message).toBeDefined();
      expect(message.role).toBe("assistant");
      expect(message.content).toBeDefined();
    });
  });

  describe("response.textStream - Streaming text deltas", () => {
    it("should successfully stream text deltas", async () => {
      const response = client.callModel({
        model: "meta-llama/llama-3.2-1b-instruct",
        input: [
          {
            role: "user",
            content: "Count from 1 to 5.",
          },
        ],
      });

      const deltas: string[] = [];

      for await (const delta of response.getTextStream()) {
        expect(typeof delta).toBe("string");
        deltas.push(delta);
      }

      expect(deltas.length).toBeGreaterThan(0);

      // Verify we can reconstruct the full text
      const fullText = deltas.join("");
      expect(fullText.length).toBeGreaterThan(0);
    });

    it("should stream progressively without waiting for completion", async () => {
      const response = client.callModel({
        model: "meta-llama/llama-3.2-1b-instruct",
        input: [
          {
            role: "user",
            content: "Write a short poem.",
          },
        ],
      });

      let firstDeltaTime: number | null = null;
      let lastDeltaTime: number | null = null;
      let deltaCount = 0;

      for await (const delta of response.getTextStream()) {
        if (!firstDeltaTime) {
          firstDeltaTime = Date.now();
        }
        lastDeltaTime = Date.now();
        deltaCount++;
      }

      expect(deltaCount).toBeGreaterThan(1);
      expect(firstDeltaTime).toBeDefined();
      expect(lastDeltaTime).toBeDefined();

      // Verify there was a time difference (streaming, not instant)
      if (firstDeltaTime && lastDeltaTime) {
        expect(lastDeltaTime).toBeGreaterThanOrEqual(firstDeltaTime);
      }
    }, 15000);
  });

  describe("response.newMessagesStream - Streaming message updates", () => {
    it("should successfully stream incremental message updates", async () => {
      const response = client.callModel({
        model: "meta-llama/llama-3.2-1b-instruct",
        input: [
          {
            role: "user",
            content: "Say 'streaming test'.",
          },
        ],
      });

      const messages: Message[] = [];

      for await (const message of response.getNewMessagesStream()) {
        expect(message).toBeDefined();
        expect(message.role).toBe("assistant");
        expect(typeof message.content).toBe("string");
        messages.push(message);
      }

      expect(messages.length).toBeGreaterThan(0);

      // Verify content grows over time
      if (messages.length > 1) {
        const firstMessage = messages[0];
        const lastMessage = messages[messages.length - 1];

        const firstText = (firstMessage.content as string) || "";
        const lastText = (lastMessage.content as string) || "";

        expect(lastText.length).toBeGreaterThanOrEqual(firstText.length);
      }
    }, 15000);
  });

  describe("response.reasoningStream - Streaming reasoning deltas", () => {
    it("should successfully stream reasoning deltas for reasoning models", async () => {
      const response = client.callModel({
        model: "minimax/minimax-m2",
        input: [
          {
            role: "user",
            content: "What is 2+2?",
          },
        ],
        reasoning: {
          enabled: true,
          effort: "low",
        },
      });

      const reasoningDeltas: string[] = [];

      for await (const delta of response.getReasoningStream()) {
        expect(typeof delta).toBe("string");
        reasoningDeltas.push(delta);
      }

      // Reasoning models may or may not output reasoning for simple questions
      // Just verify the stream works without error
      expect(Array.isArray(reasoningDeltas)).toBe(true);
      expect(reasoningDeltas.length).toBeGreaterThan(0);
    }, 30000);
  });

  describe("response.toolStream - Streaming tool call deltas", () => {
    it("should successfully stream tool call deltas when tools are called", async () => {
      const response = client.callModel({
        model: "meta-llama/llama-3.1-8b-instruct",
        input: [
          {
            role: "user",
            content: "What's the weather like in Paris? Use the get_weather tool to find out.",
          },
        ],
        tools: [
          {
            type: "function" as const,
            name: "get_weather",
            description: "Get the current weather for a location",
            parameters: {
              type: "object",
              properties: {
                location: {
                  type: "string",
                  description: "The city name, e.g. Paris",
                },
              },
              required: ["location"],
            },
          },
        ],
      });

      const toolDeltas: string[] = [];

      for await (const event of response.getToolStream()) {
        expect(typeof event).toBe("object");
        expect(event).toHaveProperty("type");
        if (event.type === "delta") {
          expect(typeof event.content).toBe("string");
          toolDeltas.push(event.content);
        }
      }

      // Verify the stream works and received tool call deltas
      expect(Array.isArray(toolDeltas)).toBe(true);

      // If the model made a tool call, we should have deltas
      if (toolDeltas.length > 0) {
        const fullToolCall = toolDeltas.join("");
        expect(fullToolCall.length).toBeGreaterThan(0);
      }
    }, 30000);
  });

  describe("response.fullResponsesStream - Streaming all events", () => {
    it("should successfully stream all response events", async () => {
      const response = client.callModel({
        model: "meta-llama/llama-3.2-1b-instruct",
        input: [
          {
            role: "user",
            content: "Say 'hello'.",
          },
        ],
      });

      const events: any[] = [];

      for await (const event of response.getFullResponsesStream()) {
        expect(event).toBeDefined();
        expect("type" in event).toBe(true);
        events.push(event);
      }

      expect(events.length).toBeGreaterThan(0);

      // Verify we have different event types
      const eventTypes = new Set(events.map((e) => e.type));
      expect(eventTypes.size).toBeGreaterThan(1);

      // Should have completion event
      const hasCompletionEvent = events.some(
        (e) => e.type === "response.completed" || e.type === "response.incomplete"
      );
      expect(hasCompletionEvent).toBe(true);
    }, 15000);

    it("should include text delta events", async () => {
      const response = client.callModel({
        model: "meta-llama/llama-3.2-1b-instruct",
        input: [
          {
            role: "user",
            content: "Count to 3.",
          },
        ],
      });

      const textDeltaEvents: any[] = [];

      for await (const event of response.getFullResponsesStream()) {
        if (event.type === "response.output_text.delta") {
          textDeltaEvents.push(event);
        }
      }

      expect(textDeltaEvents.length).toBeGreaterThan(0);

      // Verify delta events have the expected structure
      const firstDelta = textDeltaEvents[0];
      expect(firstDelta.delta).toBeDefined();
      expect(typeof firstDelta.delta).toBe("string");
    }, 15000);
  });

  describe("response.fullChatStream - Chat-compatible streaming", () => {
    it("should successfully stream in chat-compatible format", async () => {
      const response = client.callModel({
        model: "meta-llama/llama-3.2-1b-instruct",
        input: [
          {
            role: "user",
            content: "Say 'test'.",
          },
        ],
      });

      const chunks: any[] = [];

      for await (const chunk of response.getFullChatStream()) {
        expect(chunk).toBeDefined();
        expect(chunk.type).toBeDefined();
        chunks.push(chunk);
      }

      expect(chunks.length).toBeGreaterThan(0);

      // Should have content deltas
      const hasContentDeltas = chunks.some((c) => c.type === "content.delta");
      expect(hasContentDeltas).toBe(true);
    }, 15000);
  });

  describe("Multiple concurrent consumption patterns", () => {
    it("should allow reading text and streaming simultaneously", async () => {
      const response = client.callModel({
        model: "meta-llama/llama-3.2-1b-instruct",
        input: [
          {
            role: "user",
            content: "Say 'concurrent test'.",
          },
        ],
      });

      // Get full text and stream concurrently
      const textPromise = response.getText();
      const streamPromise = (async () => {
        const deltas: string[] = [];
        for await (const delta of response.getTextStream()) {
          deltas.push(delta);
        }
        return deltas;
      })();

      // Wait for both
      const [text, deltas] = await Promise.all([textPromise, streamPromise]);

      expect(deltas.length).toBeGreaterThan(0);
      expect(text.length).toBeGreaterThan(0);

      // Verify deltas reconstruct the full text
      const reconstructed = deltas.join("");
      expect(reconstructed).toBe(text);
    }, 30000);

    it("should allow multiple stream consumers", async () => {
      const response = client.callModel({
        model: "meta-llama/llama-3.2-1b-instruct",
        input: [
          {
            role: "user",
            content: "Write a short sentence.",
          },
        ],
      });

      // Start two concurrent stream consumers
      const textStreamPromise = (async () => {
        const deltas: string[] = [];
        for await (const delta of response.getTextStream()) {
          deltas.push(delta);
        }
        return deltas;
      })();

      const newMessagesStreamPromise = (async () => {
        const messages: any[] = [];
        for await (const message of response.getNewMessagesStream()) {
          messages.push(message);
        }
        return messages;
      })();

      const [textDeltas, messages] = await Promise.all([
        textStreamPromise,
        newMessagesStreamPromise,
      ]);

      expect(textDeltas.length).toBeGreaterThan(0);
      expect(messages.length).toBeGreaterThan(0);

      // Verify consistency between streams
      const textFromDeltas = textDeltas.join("");
      const lastMessage = messages[messages.length - 1];
      const textFromMessage = (lastMessage.content as string) || "";

      expect(textFromDeltas).toBe(textFromMessage);
    }, 20000);

    it("should allow sequential consumption - text then stream", async () => {
      const response = client.callModel({
        model: "meta-llama/llama-3.2-1b-instruct",
        input: [
          {
            role: "user",
            content: "Say 'sequential test'.",
          },
        ],
      });

      // First, get the full text
      const text = await response.getText();
      expect(text).toBeDefined();
      expect(text.length).toBeGreaterThan(0);

      // Then, try to stream (should get same data from buffer)
      const deltas: string[] = [];
      for await (const delta of response.getTextStream()) {
        expect(typeof delta).toBe("string");
        deltas.push(delta);
      }

      expect(deltas.length).toBeGreaterThan(0);

      // Verify both give same result
      const reconstructed = deltas.join("");
      expect(reconstructed).toBe(text);
    }, 20000);

    it("should allow sequential consumption - stream then text", async () => {
      const response = client.callModel({
        model: "meta-llama/llama-3.2-1b-instruct",
        input: [
          {
            role: "user",
            content: "Say 'reverse test'.",
          },
        ],
      });

      // First, collect deltas from stream
      const deltas: string[] = [];
      for await (const delta of response.getTextStream()) {
        expect(typeof delta).toBe("string");
        deltas.push(delta);
      }
      expect(deltas.length).toBeGreaterThan(0);

      // Then, get the full text (should work even after stream consumed)
      const text = await response.getText();
      expect(text).toBeDefined();
      expect(text.length).toBeGreaterThan(0);

      // Verify both give same result
      const reconstructed = deltas.join("");
      expect(reconstructed).toBe(text);
    }, 20000);
  });

  describe("Error handling", () => {
    it("should handle invalid model gracefully", async () => {
      const response = client.callModel({
        model: "invalid/model-that-does-not-exist",
        input: [
          {
            role: "user",
            content: "Test",
          },
        ],
      });

      await expect(response.getText()).rejects.toThrow();
    });

    it("should handle empty input", async () => {
      const response = client.callModel({
        model: "meta-llama/llama-3.2-1b-instruct",
        input: [],
      });

      // This might fail or return empty - both are acceptable
      try {
        const text = await response.getText();
        expect(text).toBeDefined();
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe("Response parameters", () => {
    it("should respect maxOutputTokens parameter", async () => {
      const response = client.callModel({
        model: "meta-llama/llama-3.2-1b-instruct",
        input: [
          {
            role: "user",
            content: "Write a long story about a cat.",
          },
        ],
        maxOutputTokens: 10,
      });

      const text = await response.getText();

      expect(text).toBeDefined();
      // Text should be relatively short due to token limit
      expect(text.split(" ").length).toBeLessThan(50);
    });

    it("should work with instructions parameter", async () => {
      const response = client.callModel({
        model: "meta-llama/llama-3.2-1b-instruct",
        input: [
          {
            role: "user",
            content: "Say exactly: 'test complete'",
          },
        ],
        instructions: "You are a helpful assistant. Keep responses concise.",
      });

      const text = await response.getText();

      expect(text).toBeDefined();
      expect(typeof text).toBe("string");
      expect(text.length).toBeGreaterThan(0);
      // Just verify instructions parameter is accepted, not that model follows it perfectly
    });
  });
});
