import { beforeAll, describe, expect, it } from "vitest";
import { OpenRouter } from "../../src/sdk/sdk.js";

describe("Embeddings E2E Tests", () => {
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

  describe("embeddings.generate()", () => {
    it("should successfully generate embeddings for a single text input", async () => {
      const response = await client.embeddings.generate({
        input: "The quick brown fox jumps over the lazy dog",
        model: "openai/text-embedding-3-small",
      });

      expect(response).toBeDefined();

      // Check if response is an object (not a string)
      if (typeof response === "object") {
        expect(response.data).toBeDefined();
        expect(Array.isArray(response.data)).toBe(true);
        expect(response.data.length).toBeGreaterThan(0);

        const firstEmbedding = response.data[0];
        expect(firstEmbedding).toBeDefined();
        expect(firstEmbedding?.embedding).toBeDefined();

        // Handle both array and base64 string embeddings
        if (Array.isArray(firstEmbedding?.embedding)) {
          expect(firstEmbedding.embedding.length).toBeGreaterThan(0);
          // Verify embedding values are numbers
          const firstValue = firstEmbedding.embedding[0];
          expect(typeof firstValue).toBe("number");
        } else {
          expect(typeof firstEmbedding?.embedding).toBe("string");
        }

        // Verify usage information if available
        if (response.usage) {
          expect(response.usage.totalTokens).toBeGreaterThan(0);
        }
      }
    });

    it("should generate embeddings for multiple text inputs", async () => {
      const inputs = [
        "Hello, world!",
        "OpenRouter is amazing",
        "Embeddings are vector representations of text",
      ];

      const response = await client.embeddings.generate({
        input: inputs,
        model: "openai/text-embedding-3-small",
      });

      expect(response).toBeDefined();

      if (typeof response === "object") {
        expect(response.data).toBeDefined();
        expect(Array.isArray(response.data)).toBe(true);
        expect(response.data.length).toBe(inputs.length);

        // Verify each embedding
        response.data.forEach((embedding, index) => {
          expect(embedding).toBeDefined();
          expect(embedding?.embedding).toBeDefined();

          if (Array.isArray(embedding?.embedding)) {
            expect(embedding.embedding.length).toBeGreaterThan(0);
          } else {
            expect(typeof embedding?.embedding).toBe("string");
          }

          expect(embedding?.index).toBe(index);
        });
      }
    });

    it("should generate consistent embedding dimensions", async () => {
      const response = await client.embeddings.generate({
        input: ["First text", "Second text"],
        model: "openai/text-embedding-3-small",
      });

      expect(response).toBeDefined();

      if (typeof response === "object") {
        expect(response.data.length).toBe(2);

        const firstEmbedding = response.data[0]?.embedding;
        const secondEmbedding = response.data[1]?.embedding;

        // Only check dimensions if both are arrays
        if (Array.isArray(firstEmbedding) && Array.isArray(secondEmbedding)) {
          const firstDimension = firstEmbedding.length;
          const secondDimension = secondEmbedding.length;

          expect(firstDimension).toBe(secondDimension);
          expect(firstDimension).toBeGreaterThan(0);
        }
      }
    });

    it("should handle empty string input gracefully", async () => {
      const response = await client.embeddings.generate({
        input: "",
        model: "openai/text-embedding-3-small",
      });

      expect(response).toBeDefined();

      if (typeof response === "object") {
        expect(response.data).toBeDefined();
        expect(Array.isArray(response.data)).toBe(true);

        if (response.data.length > 0) {
          const embedding = response.data[0];
          expect(embedding?.embedding).toBeDefined();
        }
      }
    });

    it("should include model information in response", async () => {
      const modelName = "openai/text-embedding-3-small";
      const response = await client.embeddings.generate({
        input: "Test input for model verification",
        model: modelName,
      });

      expect(response).toBeDefined();

      if (typeof response === "object") {
        expect(response.model).toBeDefined();
        expect(typeof response.model).toBe("string");

        if (response.usage) {
          expect(response.usage.promptTokens).toBeDefined();
          expect(response.usage.totalTokens).toBeDefined();
          expect(typeof response.usage.promptTokens).toBe("number");
          expect(typeof response.usage.totalTokens).toBe("number");
          expect(response.usage.totalTokens).toBeGreaterThan(0);
        }
      }
    });
  });
});
