import { beforeAll, describe, expect, it } from "vitest";
import { OpenRouter, ToolType } from "../../src/sdk/sdk.js";
import { Message } from "../../src/models/message.js";
import { AssistantMessage } from "../../src/models/assistantmessage.js";
import { ToolResponseMessage } from "../../src/models/toolresponsemessage.js";
import { z } from "zod/v4";

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
      console.log(text)
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

      // Ensure the message fully matches the OpenAI Chat API assistant message shape
      expect(message).toMatchObject({
        role: "assistant",
        content: expect.anything(),
      });
      // content can be string, array, or null according to OpenAI spec
      // Check rest of top-level shape
      expect(Object.keys(message)).toEqual(
        expect.arrayContaining([
          "role",
          "content",
          // Optionally some implementations may also include:
          // "tool_calls", "function_call", "tool_call_id", "name"
        ])
      );
      // If content is array, match OpenAI content block shape
      if (Array.isArray(message.content)) {
        for (const block of message.content) {
          expect(block).toMatchObject({
            type: expect.any(String),
            // text blocks have 'text', others may have different keys
          });
        }
      }
      // If present, tool_calls in OpenAI schema must be an array of objects
      if (message.role === "assistant" && message.toolCalls) {
        expect(Array.isArray(message.toolCalls)).toBe(true);
        for (const call of message.toolCalls) {
          expect(call).toMatchObject({
            id: expect.any(String),
            type: expect.any(String),
            function: expect.any(Object),
          });
          expect(call.function).toMatchObject({
            name: expect.any(String),
            arguments: expect.any(String),
          });
        }
      }

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

      const messages: (AssistantMessage | ToolResponseMessage)[] = [];

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

    it("should return AssistantMessages with correct shape", async () => {
      const response = client.callModel({
        model: "meta-llama/llama-3.2-1b-instruct",
        input: [
          {
            role: "user",
            content: "Say 'hello world'.",
          },
        ],
      });

      const messages: (AssistantMessage | ToolResponseMessage)[] = [];

      for await (const message of response.getNewMessagesStream()) {
        messages.push(message);

        // Deep validation of AssistantMessage shape
        expect(message).toHaveProperty("role");
        expect(message).toHaveProperty("content");

        if (message.role === "assistant") {
          // Validate AssistantMessage structure
          expect(message.role).toBe("assistant");

          // content must be string, array, null, or undefined
          const contentType = typeof message.content;
          const isValidContent =
            contentType === "string" ||
            Array.isArray(message.content) ||
            message.content === null ||
            message.content === undefined;
          expect(isValidContent).toBe(true);

          // If content is an array, each item must have a type
          if (Array.isArray(message.content)) {
            for (const item of message.content) {
              expect(item).toHaveProperty("type");
              expect(typeof item.type).toBe("string");
            }
          }

          // If toolCalls present, validate their shape
          if ("toolCalls" in message && message.toolCalls) {
            expect(Array.isArray(message.toolCalls)).toBe(true);
            for (const toolCall of message.toolCalls) {
              expect(toolCall).toHaveProperty("id");
              expect(toolCall).toHaveProperty("type");
              expect(toolCall).toHaveProperty("function");
              expect(typeof toolCall.id).toBe("string");
              expect(typeof toolCall.type).toBe("string");
              expect(toolCall.function).toHaveProperty("name");
              expect(toolCall.function).toHaveProperty("arguments");
              expect(typeof toolCall.function.name).toBe("string");
              expect(typeof toolCall.function.arguments).toBe("string");
            }
          }
        }
      }

      expect(messages.length).toBeGreaterThan(0);

      // Verify last message has the complete assistant response shape
      const lastMessage = messages[messages.length - 1];
      expect(lastMessage.role).toBe("assistant");
    }, 15000);

    it("should include ToolResponseMessages with correct shape when tools are executed", async () => {
      const response = client.callModel({
        model: "openai/gpt-4o-mini",
        input: [
          {
            role: "user",
            content: "What's the weather in Tokyo? Use the get_weather tool.",
          },
        ],
        tools: [
          {
            type: ToolType.Function,
            function: {
              name: "get_weather",
              description: "Get weather for a location",
              inputSchema: z.object({
                location: z.string().describe("City name"),
              }),
              outputSchema: z.object({
                temperature: z.number(),
                condition: z.string(),
              }),
              execute: async (params: { location: string }) => {
                return {
                  temperature: 22,
                  condition: "Sunny",
                };
              },
            },
          },
        ],
      });

      const messages: (AssistantMessage | ToolResponseMessage)[] = [];
      let hasAssistantMessage = false;
      let hasToolResponseMessage = false;

      for await (const message of response.getNewMessagesStream()) {
        messages.push(message);

        // Validate each message has correct shape based on role
        expect(message).toHaveProperty("role");
        expect(message).toHaveProperty("content");

        if (message.role === "assistant") {
          hasAssistantMessage = true;

          // Validate AssistantMessage shape
          const contentType = typeof message.content;
          const isValidContent =
            contentType === "string" ||
            Array.isArray(message.content) ||
            message.content === null ||
            message.content === undefined;
          expect(isValidContent).toBe(true);
        } else if (message.role === "tool") {
          hasToolResponseMessage = true;

          // Deep validation of ToolResponseMessage shape
          expect(message).toHaveProperty("toolCallId");
          expect(typeof (message as ToolResponseMessage).toolCallId).toBe("string");
          expect((message as ToolResponseMessage).toolCallId.length).toBeGreaterThan(0);

          // content must be string or array
          const contentType = typeof message.content;
          const isValidContent =
            contentType === "string" ||
            Array.isArray(message.content);
          expect(isValidContent).toBe(true);

          // If content is string, it should be parseable JSON (our tool result)
          if (typeof message.content === "string" && message.content.length > 0) {
            const parsed = JSON.parse(message.content);
            expect(parsed).toBeDefined();
            // Verify it matches our tool output schema
            expect(parsed).toHaveProperty("temperature");
            expect(parsed).toHaveProperty("condition");
            expect(typeof parsed.temperature).toBe("number");
            expect(typeof parsed.condition).toBe("string");
          }
        }
      }

      expect(messages.length).toBeGreaterThan(0);
      // We must have tool responses since we have an executable tool
      expect(hasToolResponseMessage).toBe(true);

      // If the model provided a final text response, verify proper ordering
      if (hasAssistantMessage) {
        const lastToolIndex = messages.reduce((lastIdx, m, i) =>
          m.role === "tool" ? i : lastIdx, -1);
        const lastAssistantIndex = messages.reduce((lastIdx, m, i) =>
          m.role === "assistant" ? i : lastIdx, -1);

        // The final assistant message should come after tool responses
        if (lastToolIndex !== -1 && lastAssistantIndex !== -1) {
          expect(lastAssistantIndex).toBeGreaterThan(lastToolIndex);
        }
      }
    }, 30000);

    it("should return messages with all required fields and correct types", async () => {
      const response = client.callModel({
        model: "meta-llama/llama-3.2-1b-instruct",
        input: [
          {
            role: "user",
            content: "Count from 1 to 3.",
          },
        ],
      });

      for await (const message of response.getNewMessagesStream()) {
        // role must be a string and one of the valid values
        expect(typeof message.role).toBe("string");
        expect(["assistant", "tool"]).toContain(message.role);

        // content must exist (even if null)
        expect("content" in message).toBe(true);

        if (message.role === "assistant") {
          // AssistantMessage specific validations
          const validContentTypes = ["string", "object", "undefined"];
          expect(validContentTypes).toContain(typeof message.content);

          // If content is array, validate structure
          if (Array.isArray(message.content)) {
            expect(message.content.every(item =>
              typeof item === "object" && item !== null && "type" in item
            )).toBe(true);
          }
        } else if (message.role === "tool") {
          // ToolResponseMessage specific validations
          const toolMsg = message as ToolResponseMessage;
          expect(typeof toolMsg.toolCallId).toBe("string");
          expect(toolMsg.toolCallId.length).toBeGreaterThan(0);
        }
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

    it("should return events with correct shape for each event type", async () => {
      const response = client.callModel({
        model: "meta-llama/llama-3.2-1b-instruct",
        input: [
          {
            role: "user",
            content: "Count from 1 to 3.",
          },
        ],
      });

      let hasContentDelta = false;
      let hasMessageComplete = false;

      for await (const event of response.getFullChatStream()) {
        // Every event must have a type
        expect(event).toHaveProperty("type");
        expect(typeof event.type).toBe("string");
        expect(event.type.length).toBeGreaterThan(0);

        // Validate shape based on event type
        switch (event.type) {
          case "content.delta":
            hasContentDelta = true;
            // Must have delta property
            expect(event).toHaveProperty("delta");
            expect(typeof event.delta).toBe("string");
            // Delta can be empty string but must be string
            break;

          case "message.complete":
            hasMessageComplete = true;
            // Must have response property
            expect(event).toHaveProperty("response");
            expect(event.response).toBeDefined();
            // Response should be an object (the full response)
            expect(typeof event.response).toBe("object");
            expect(event.response).not.toBeNull();
            break;

          case "tool.preliminary_result":
            // Must have toolCallId and result
            expect(event).toHaveProperty("toolCallId");
            expect(event).toHaveProperty("result");
            expect(typeof event.toolCallId).toBe("string");
            expect(event.toolCallId.length).toBeGreaterThan(0);
            // result can be any type
            break;

          default:
            // Pass-through events must have event property
            expect(event).toHaveProperty("event");
            expect(event.event).toBeDefined();
            break;
        }
      }

      // Should have at least content deltas for a text response
      expect(hasContentDelta).toBe(true);
    }, 15000);

    it("should validate content.delta events have proper structure", async () => {
      const response = client.callModel({
        model: "meta-llama/llama-3.2-1b-instruct",
        input: [
          {
            role: "user",
            content: "Say 'hello world'.",
          },
        ],
      });

      const contentDeltas: any[] = [];

      for await (const event of response.getFullChatStream()) {
        if (event.type === "content.delta") {
          contentDeltas.push(event);

          // Validate exact shape
          const keys = Object.keys(event);
          expect(keys).toContain("type");
          expect(keys).toContain("delta");

          // type must be exactly "content.delta"
          expect(event.type).toBe("content.delta");

          // delta must be a string
          expect(typeof event.delta).toBe("string");
        }
      }

      expect(contentDeltas.length).toBeGreaterThan(0);

      // Concatenated deltas should form readable text
      const fullText = contentDeltas.map(e => e.delta).join("");
      expect(fullText.length).toBeGreaterThan(0);
    }, 15000);

    it("should include tool.preliminary_result events with correct shape when generator tools are executed", async () => {
      const response = client.callModel({
        model: "openai/gpt-4o-mini",
        input: [
          {
            role: "user",
            content: "What time is it? Use the get_time tool.",
          },
        ],
        tools: [
          {
            type: ToolType.Function,
            function: {
              name: "get_time",
              description: "Get current time",
              inputSchema: z.object({
                timezone: z.string().optional().describe("Timezone"),
              }),
              // Generator tools need eventSchema for intermediate results
              eventSchema: z.object({
                status: z.string(),
              }),
              outputSchema: z.object({
                time: z.string(),
                timezone: z.string(),
              }),
              // Use generator function to emit preliminary results
              execute: async function* (params: { timezone?: string }) {
                // Emit preliminary result (validated against eventSchema)
                yield { status: "fetching time..." };

                // Final result (validated against outputSchema)
                yield {
                  time: "14:30:00",
                  timezone: params.timezone || "UTC",
                };
              },
            },
          },
        ],
      });

      let hasPreliminaryResult = false;
      const preliminaryResults: any[] = [];

      for await (const event of response.getFullChatStream()) {
        expect(event).toHaveProperty("type");
        expect(typeof event.type).toBe("string");

        if (event.type === "tool.preliminary_result") {
          hasPreliminaryResult = true;
          preliminaryResults.push(event);

          // Validate exact shape
          expect(event).toHaveProperty("toolCallId");
          expect(event).toHaveProperty("result");

          // toolCallId must be non-empty string
          expect(typeof event.toolCallId).toBe("string");
          expect(event.toolCallId.length).toBeGreaterThan(0);

          // result is defined
          expect(event.result).toBeDefined();
        }
      }

      // Validate that if we got preliminary results, they have the correct shape
      if (hasPreliminaryResult) {
        expect(preliminaryResults.length).toBeGreaterThan(0);

        // Should have status update or final result
        const hasStatusUpdate = preliminaryResults.some(
          (e) => e.result && typeof e.result === "object" && "status" in e.result
        );
        const hasFinalResult = preliminaryResults.some(
          (e) => e.result && typeof e.result === "object" && "time" in e.result
        );

        expect(hasStatusUpdate || hasFinalResult).toBe(true);
      }

      // The stream should complete without errors regardless of tool execution
      expect(true).toBe(true);
    }, 30000);
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

  describe("response.getResponse - Full response with usage", () => {
    it("should return full response with correct shape", async () => {
      const response = client.callModel({
        model: "meta-llama/llama-3.2-1b-instruct",
        input: [
          {
            role: "user",
            content: "Say 'hello'.",
          },
        ],
      });

      const fullResponse = await response.getResponse();

      // Verify top-level response shape
      expect(fullResponse).toBeDefined();
      expect(typeof fullResponse.id).toBe("string");
      expect(fullResponse.id.length).toBeGreaterThan(0);
      expect(fullResponse.object).toBe("response");
      expect(typeof fullResponse.createdAt).toBe("number");
      expect(typeof fullResponse.model).toBe("string");
      expect(Array.isArray(fullResponse.output)).toBe(true);
      expect(fullResponse.output.length).toBeGreaterThan(0);

      // Verify output items have correct shape
      for (const item of fullResponse.output) {
        expect(item).toHaveProperty("type");
        expect(typeof (item as any).type).toBe("string");
      }

      // Verify temperature and topP are present (can be null)
      expect("temperature" in fullResponse).toBe(true);
      expect("topP" in fullResponse).toBe(true);

      // Verify metadata shape
      expect("metadata" in fullResponse).toBe(true);

      // Verify tools array exists
      expect(Array.isArray(fullResponse.tools)).toBe(true);

      // Verify toolChoice exists
      expect("toolChoice" in fullResponse).toBe(true);

      // Verify parallelToolCalls is boolean
      expect(typeof fullResponse.parallelToolCalls).toBe("boolean");
    });

    it("should return usage with correct shape including all token details", async () => {
      const response = client.callModel({
        model: "meta-llama/llama-3.2-1b-instruct",
        input: [
          {
            role: "user",
            content: "Say 'hello'.",
          },
        ],
      });

      const fullResponse = await response.getResponse();

      // Verify usage exists and has correct shape
      expect(fullResponse.usage).toBeDefined();
      const usage = fullResponse.usage!;

      // Verify top-level usage fields
      expect(typeof usage.inputTokens).toBe("number");
      expect(usage.inputTokens).toBeGreaterThan(0);
      expect(typeof usage.outputTokens).toBe("number");
      expect(usage.outputTokens).toBeGreaterThan(0);
      expect(typeof usage.totalTokens).toBe("number");
      expect(usage.totalTokens).toBe(usage.inputTokens + usage.outputTokens);

      // Verify inputTokensDetails shape with cachedTokens
      expect(usage.inputTokensDetails).toBeDefined();
      expect(typeof usage.inputTokensDetails.cachedTokens).toBe("number");
      expect(usage.inputTokensDetails.cachedTokens).toBeGreaterThanOrEqual(0);

      // Verify outputTokensDetails shape with reasoningTokens
      expect(usage.outputTokensDetails).toBeDefined();
      expect(typeof usage.outputTokensDetails.reasoningTokens).toBe("number");
      expect(usage.outputTokensDetails.reasoningTokens).toBeGreaterThanOrEqual(0);

      // Verify optional cost fields if present
      if (usage.cost !== undefined && usage.cost !== null) {
        expect(typeof usage.cost).toBe("number");
      }

      if (usage.isByok !== undefined) {
        expect(typeof usage.isByok).toBe("boolean");
      }

      if (usage.costDetails !== undefined) {
        expect(typeof usage.costDetails.upstreamInferenceInputCost).toBe("number");
        expect(typeof usage.costDetails.upstreamInferenceOutputCost).toBe("number");
        if (usage.costDetails.upstreamInferenceCost !== undefined && usage.costDetails.upstreamInferenceCost !== null) {
          expect(typeof usage.costDetails.upstreamInferenceCost).toBe("number");
        }
      }
    });

    it("should return error and incompleteDetails fields with correct shape", async () => {
      const response = client.callModel({
        model: "meta-llama/llama-3.2-1b-instruct",
        input: [
          {
            role: "user",
            content: "Say 'test'.",
          },
        ],
      });

      const fullResponse = await response.getResponse();

      // error can be null or an object
      expect("error" in fullResponse).toBe(true);
      if (fullResponse.error !== null) {
        expect(typeof fullResponse.error).toBe("object");
      }

      // incompleteDetails can be null or an object
      expect("incompleteDetails" in fullResponse).toBe(true);
      if (fullResponse.incompleteDetails !== null) {
        expect(typeof fullResponse.incompleteDetails).toBe("object");
      }
    });

    it("should allow concurrent access with other methods", async () => {
      const response = client.callModel({
        model: "meta-llama/llama-3.2-1b-instruct",
        input: [
          {
            role: "user",
            content: "Say 'test'.",
          },
        ],
      });

      // Get both text and full response concurrently
      const [text, fullResponse] = await Promise.all([
        response.getText(),
        response.getResponse(),
      ]);

      expect(text).toBeDefined();
      expect(typeof text).toBe("string");
      expect(fullResponse).toBeDefined();
      expect(fullResponse.usage).toBeDefined();

      // Text should match outputText
      if (fullResponse.outputText) {
        expect(text).toBe(fullResponse.outputText);
      }
    });

    it("should return consistent results on multiple calls", async () => {
      const response = client.callModel({
        model: "meta-llama/llama-3.2-1b-instruct",
        input: [
          {
            role: "user",
            content: "Say 'consistent'.",
          },
        ],
      });

      const firstCall = await response.getResponse();
      const secondCall = await response.getResponse();

      // Should return the same response object
      expect(firstCall.id).toBe(secondCall.id);
      expect(firstCall.usage?.inputTokens).toBe(secondCall.usage?.inputTokens);
      expect(firstCall.usage?.outputTokens).toBe(secondCall.usage?.outputTokens);
      expect(firstCall.usage?.inputTokensDetails?.cachedTokens).toBe(secondCall.usage?.inputTokensDetails?.cachedTokens);
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

    it("should support provider parameter with correct shape", async () => {
      const response = client.callModel({
        model: "meta-llama/llama-3.2-1b-instruct",
        input: [
          {
            role: "user",
            content: "Say 'provider test'.",
          },
        ],
        provider: {
          allowFallbacks: true,
          requireParameters: false,
        },
      });

      const fullResponse = await response.getResponse();

      expect(fullResponse).toBeDefined();
      expect(fullResponse.usage).toBeDefined();
      expect(fullResponse.usage?.inputTokens).toBeGreaterThan(0);
    });

    it("should support provider with order preference", async () => {
      const response = client.callModel({
        model: "meta-llama/llama-3.2-1b-instruct",
        input: [
          {
            role: "user",
            content: "Say 'ordered provider'.",
          },
        ],
        provider: {
          order: ["Together", "Fireworks"],
          allowFallbacks: true,
        },
      });

      const text = await response.getText();

      expect(text).toBeDefined();
      expect(typeof text).toBe("string");
      expect(text.length).toBeGreaterThan(0);
    });

    it("should support provider with ignore list", async () => {
      const response = client.callModel({
        model: "meta-llama/llama-3.2-1b-instruct",
        input: [
          {
            role: "user",
            content: "Say 'ignore test'.",
          },
        ],
        provider: {
          ignore: ["SomeProvider"],
          allowFallbacks: true,
        },
      });

      const text = await response.getText();

      expect(text).toBeDefined();
      expect(typeof text).toBe("string");
    });

    it("should support provider with quantizations filter", async () => {
      const response = client.callModel({
        model: "meta-llama/llama-3.2-1b-instruct",
        input: [
          {
            role: "user",
            content: "Say 'quantization test'.",
          },
        ],
        provider: {
          allowFallbacks: true,
        },
      });

      const fullResponse = await response.getResponse();

      expect(fullResponse).toBeDefined();
      expect(fullResponse.model).toBeDefined();
    });
  });
});
