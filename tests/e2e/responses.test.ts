import { beforeAll, describe, expect, it } from "vitest";
import { OpenRouter } from "../../src/sdk/sdk.js";
import { ResponsesOutputMessage } from "../../esm/models/responsesoutputmessage.js";

describe("Beta Responses E2E Tests", () => {
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

  describe("beta.responses.send() - Non-streaming", () => {
    it("should successfully send a responses request and get a response", async () => {
      const response = await client.beta.responses.send({
        model: "meta-llama/llama-3.2-1b-instruct",
        input: [
          {
            type: "message",
            role: "user",
            content: "Say 'Hello, World!' and nothing else.",
          },
        ],
        stream: false,
      });

      expect(response).toBeDefined();
      expect(response.id).toBeDefined();
      expect(typeof response.id).toBe("string");
      expect(response.object).toBe("response");
      expect(response.model).toBeDefined();
      expect(response.createdAt).toBeGreaterThan(0);

      // Verify output structure
      expect(Array.isArray(response.output)).toBe(true);
      expect(response.output.length).toBeGreaterThan(0);

      const firstOutput = response.output[0];
      expect(firstOutput).toBeDefined();
      expect(firstOutput?.type).toBe("message");
      expect((firstOutput as ResponsesOutputMessage).role).toBe("assistant");

      // Verify usage information
      expect(response.usage).toBeDefined();
      expect(response.usage?.totalTokens).toBeGreaterThan(0);
      expect(response.usage?.inputTokens).toBeGreaterThan(0);
      expect(response.usage?.outputTokens).toBeGreaterThan(0);
    });

    it("should handle multi-turn conversations", async () => {
      const response = await client.beta.responses.send({
        model: "meta-llama/llama-3.2-1b-instruct",
        input: [
          {
            type: "message",
            role: "user",
            content: "My name is Alice.",
          },
          {
            type: "message",
            role: "assistant",
            content: "Hello Alice! How can I help you today?",
          },
          {
            type: "message",
            role: "user",
            content: "What is my name?",
          },
        ],
        stream: false,
      });

      expect(response).toBeDefined();
      expect(response.output).toBeDefined();
      expect(Array.isArray(response.output)).toBe(true);

      const firstOutput = response.output[0];
      expect(firstOutput).toBeDefined();

      // Verify the response includes a valid message response
      if (firstOutput?.type === "message" && Array.isArray(firstOutput.content)) {
        const textContent = firstOutput.content
          .filter((item) => item.type === "output_text")
          .map((item) => item.type === "output_text" ? item.text : "")
          .join("");

        // Just verify we got a text response (some models may not recall context perfectly)
        expect(textContent.length).toBeGreaterThan(0);
      }
    });

    it("should respect maxOutputTokens parameter", async () => {
      const response = await client.beta.responses.send({
        model: "meta-llama/llama-3.2-1b-instruct",
        input: [
          {
            type: "message",
            role: "user",
            content: "Write a long story about a cat.",
          },
        ],
        maxOutputTokens: 10,
        stream: false,
      });

      expect(response).toBeDefined();
      expect(response.usage?.outputTokens).toBeLessThanOrEqual(10);
    });

    it("should handle metadata in request", async () => {
      const response = await client.beta.responses.send({
        model: "meta-llama/llama-3.2-1b-instruct",
        input: [
          {
            type: "message",
            role: "user",
            content: "Say hello.",
          },
        ],
        metadata: {
          user_id: "test-user-123",
          session_id: "test-session-456",
        },
        stream: false,
      });

      expect(response).toBeDefined();
      expect(response.id).toBeDefined();
      // Metadata should be echoed back in the response
      expect(response.metadata).toBeDefined();
    });

    it("should handle instructions parameter", async () => {
      const response = await client.beta.responses.send({
        model: "meta-llama/llama-3.2-1b-instruct",
        input: [
          {
            type: "message",
            role: "user",
            content: "What should I do?",
          },
        ],
        instructions: "Always respond in a friendly and helpful manner.",
        stream: false,
      });

      expect(response).toBeDefined();
      expect(response.output).toBeDefined();
      expect(response.output.length).toBeGreaterThan(0);
    });
  });

  describe("beta.responses.send() - Streaming", () => {
    it("should successfully stream responses", async () => {
      const response = await client.beta.responses.send({
        model: "meta-llama/llama-3.2-1b-instruct",
        input: [
          {
            type: "message",
            role: "user",
            content: "Count from 1 to 5.",
          },
        ],
        stream: true,
      });

      expect(response).toBeDefined();

      const events: any[] = [];

      for await (const event of response) {
        expect(event).toBeDefined();
        events.push(event);
      }

      expect(events.length).toBeGreaterThan(0);

      // Verify we got a response.created event
      const createdEvent = events.find((e) => e.type === "response.created");
      expect(createdEvent).toBeDefined();

      // Verify we got response.in_progress or response.completed events
      const hasProgressOrCompleted = events.some(
        (e) => e.type === "response.in_progress" || e.type === "response.completed"
      );
      expect(hasProgressOrCompleted).toBe(true);
    }, 10000);

    it("should stream complete content progressively", async () => {
      const response = await client.beta.responses.send({
        model: "meta-llama/llama-3.2-1b-instruct",
        input: [
          {
            type: "message",
            role: "user",
            content: "Say 'test'.",
          },
        ],
        stream: true,
      });

      expect(response).toBeDefined();

      let eventCount = 0;
      let hasContent = false;

      for await (const event of response) {
        eventCount++;

        // Check for content in various event types
        if (
          event.type === "response.output_text.delta" ||
          event.type === "response.output_text.done"
        ) {
          hasContent = true;
        }
      }

      expect(eventCount).toBeGreaterThan(0);
      expect(hasContent).toBe(true);
    }, 10000);

    it("should include response.completed event in stream", async () => {
      const response = await client.beta.responses.send({
        model: "meta-llama/llama-3.2-1b-instruct",
        input: [
          {
            type: "message",
            role: "user",
            content: "Say 'done'.",
          },
        ],
        stream: true,
      });

      expect(response).toBeDefined();

      let foundCompleted = false;

      for await (const event of response) {
        if (event.type === "response.completed") {
          foundCompleted = true;
          expect(event.response).toBeDefined();
          expect(event.response?.usage).toBeDefined();
        }
      }

      expect(foundCompleted).toBe(true);
    }, 10000);

    it("should handle streaming with metadata", async () => {
      const response = await client.beta.responses.send({
        model: "meta-llama/llama-3.2-1b-instruct",
        input: [
          {
            type: "message",
            role: "user",
            content: "Hello",
          },
        ],
        metadata: {
          test_key: "test_value",
        },
        stream: true,
      });

      expect(response).toBeDefined();

      let eventCount = 0;

      for await (const event of response) {
        eventCount++;
        expect(event).toBeDefined();
      }

      expect(eventCount).toBeGreaterThan(0);
    }, 10000);

    it("should concatenate streaming chunks into complete sentence", async () => {
      const response = await client.beta.responses.send({
        model: "meta-llama/llama-3.2-1b-instruct",
        input: [
          {
            type: "message",
            role: "user",
            content: "Say exactly 'The quick brown fox jumps over the lazy dog' and nothing else.",
          },
        ],
        stream: true,
      });

      expect(response).toBeDefined();

      let fullText = "";

      for await (const event of response) {
        // Collect text deltas
        if (event.type === "response.output_text.delta" && "delta" in event) {
          fullText += event.delta;
        }
      }

      expect(fullText.length).toBeGreaterThan(0);

      // The response should contain the key words from our sentence
      const lowerText = fullText.toLowerCase();
      expect(lowerText).toContain("quick");
      expect(lowerText).toContain("brown");
      expect(lowerText).toContain("fox");
    }, 10000);
  });
});
