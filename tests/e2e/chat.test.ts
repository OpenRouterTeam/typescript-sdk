import { beforeAll, describe, expect, it } from "vitest";
import { OpenRouter } from "../../src/sdk/sdk.js";
import { ChatError } from "../../src/models/errors/chaterror.js";

describe("Chat E2E Tests", () => {
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

  describe("chat.send() - Non-streaming", () => {
    it("should successfully send a chat request and get a response", async () => {
      const response = await client.chat.send({
        model: "meta-llama/llama-3.2-1b-instruct",
        messages: [
          {
            role: "user",
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
      expect(typeof firstChoice?.message?.content).toBe("string");

      // Verify it has usage information
      expect(response.usage).toBeDefined();
      expect(response.usage?.totalTokens).toBeGreaterThan(0);

    });

    it("should handle multi-turn conversations", async () => {
      const response = await client.chat.send({
        model: "meta-llama/llama-3.2-1b-instruct",
        messages: [
          {
            role: "user",
            content: "My name is Alice.",
          },
          {
            role: "assistant",
            content: "Hello Alice! How can I help you today?",
          },
          {
            role: "user",
            content: "What is my name?",
          },
        ],
        stream: false,
      });

      expect(response).toBeDefined();

      const content = typeof response.choices[0]?.message?.content === "string" ? response.choices[0]?.message?.content?.toLowerCase() : response.choices[0]?.message?.content?.map((item) => item.type === "text" ? item.text : "").join("").toLowerCase();
      expect(content).toBeDefined();
      expect(content).toContain("alice");

    });

    it("should respect max_tokens parameter", async () => {
      const response = await client.chat.send({
        model: "meta-llama/llama-3.2-1b-instruct",
        messages: [
          {
            role: "user",
            content: "Write a long story about a cat.",
          },
        ],
        maxTokens: 10,
        stream: false,
      });

      expect(response).toBeDefined();

      expect(response.usage?.completionTokens).toBeLessThanOrEqual(10);

    });
  });

  describe("chat.send() - Streaming", () => {
    it("should successfully stream chat responses", async () => {
      const response = await client.chat.send({
        model: "meta-llama/llama-3.2-1b-instruct",
        messages: [
          {
            role: "user",
            content: "Count from 1 to 5.",
          },
        ],
        stream: true,
      });

      expect(response).toBeDefined();

      const chunks: any[] = [];

      for await (const chunk of response) {
        chunks.push(chunk);
      }

      expect(chunks.length).toBeGreaterThan(0);

      // Verify chunks have expected structure
      const firstChunk = chunks[0];
      expect(firstChunk?.choices).toBeDefined();
      expect(Array.isArray(firstChunk?.choices)).toBe(true);

    });

    it("should stream complete content progressively", async () => {
      const response = await client.chat.send({
        model: "meta-llama/llama-3.2-1b-instruct",
        messages: [
          {
            role: "user",
            content: "Say 'test'.",
          },
        ],
        stream: true,
      });

      expect(response).toBeDefined();

      let fullContent = "";
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
    });

    it("should include finish_reason in final chunk", async () => {
      const response = await client.chat.send({
        model: "meta-llama/llama-3.2-1b-instruct",
        messages: [
          {
            role: "user",
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
          expect(typeof finishReason).toBe("string");
        }
      }

      expect(foundFinishReason).toBe(true);
    });
  });

  describe("Error Handling", () => {
    it("should throw ErrorResponse with 401 status code for invalid API key", async () => {
      const invalidClient = new OpenRouter({
        apiKey: "invalid-api-key-12345",
      });

      try {
        await invalidClient.chat.send({
          model: "meta-llama/llama-3.2-1b-instruct",
          messages: [
            {
              role: "user",
              content: "Hello",
            },
          ],
          stream: false,
        });

        // If we reach here, the test should fail
        expect.fail("Expected an error to be thrown for invalid API key");
      } catch (error) {
        // Verify it's an ErrorResponse
        expect(error).toBeInstanceOf(ChatError);

        if (error instanceof ChatError) {
          // Verify status code is 401 (Unauthorized)
          expect(error.statusCode).toBe(401);

          // Verify error structure
          expect(error.error).toBeDefined();
          expect(error.error.code).toBe(401);
          expect(error.error.message).toBeDefined();
          expect(typeof error.error.message).toBe("string");

          // Verify the error message contains relevant information
          expect(error.message.toLowerCase()).toMatch(/invalid|unauthorized|api key/i);
        }
      }
    });

    it("should throw ErrorResponse with 400 status code for invalid model", async () => {
      try {
        await client.chat.send({
          model: "this-model-does-not-exist/invalid-model-name-12345",
          messages: [
            {
              role: "user",
              content: "Hello",
            },
          ],
          stream: false,
        });

        // If we reach here, the test should fail
        expect.fail("Expected an error to be thrown for invalid model");
      } catch (error) {
        // Verify it's an ErrorResponse
        expect(error).toBeInstanceOf(ChatError);

        if (error instanceof ChatError) {
          // Verify status code is 400 (Bad Request)
          expect(error.statusCode).toBe(400);

          // Verify error structure
          expect(error.error).toBeDefined();
          expect(error.error.code).toBe(400);
          expect(error.error.message).toBeDefined();
          expect(typeof error.error.message).toBe("string");

          // Verify the error message contains relevant information about invalid model
          expect(error.message.toLowerCase()).toMatch(/model|invalid|not found/i);
        }
      }
    });

    it("should throw ErrorResponse with proper structure for invalid model in streaming mode", async () => {
      await expect(async () => {
        const response = await client.chat.send({
          model: "this-model-does-not-exist/invalid-model-name-streaming",
          messages: [
            {
              role: "user",
              content: "Hello",
            },
          ],
          stream: true,
        });

        // Consume the stream - error may be thrown here or during iteration
        for await (const _chunk of response) {
          // If we get chunks, that's unexpected
        }
      }).rejects.toThrow();

      // Now test the actual error details
      try {
        const response = await client.chat.send({
          model: "this-model-does-not-exist/invalid-model-name-streaming",
          messages: [
            {
              role: "user",
              content: "Hello",
            },
          ],
          stream: true,
        });

        for await (const _chunk of response) {
          // Continue consuming stream
        }
      } catch (error) {
        // Verify it's an ErrorResponse
        expect(error).toBeInstanceOf(ChatError);

        if (error instanceof ChatError) {
          // Verify status code is 400 (Bad Request)
          expect(error.statusCode).toBe(400);

          // Verify error structure
          expect(error.error).toBeDefined();
          expect(error.error.code).toBe(400);
          expect(error.error.message).toBeDefined();
          expect(typeof error.error.message).toBe("string");
        }
      }
    });
  });
});
