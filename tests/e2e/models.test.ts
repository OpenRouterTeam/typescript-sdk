import { beforeAll, describe, expect, it } from "vitest";
import { OpenRouter } from "../../src/sdk/sdk.js";

describe("Models E2E Tests", () => {
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

  describe("models.list()", () => {
    it("should successfully fetch models list", async () => {
      const response = await client.models.list();

      expect(response).toBeDefined();
      expect(Array.isArray(response)).toBe(true);
      expect(response.length).toBeGreaterThan(0);
    });

    it("should return models with expected properties", async () => {
      const response = await client.models.list();

      const firstModel = response?.[0];
      expect(firstModel).toBeDefined();
      expect(firstModel?.id).toBeDefined();
      expect(typeof firstModel?.id).toBe("string");
      expect(firstModel?.name).toBeDefined();
    });

    it("should support filtering by category", async () => {
      const response = await client.models.list({
        category: "text",
      });

      expect(response).toBeDefined();
      expect(Array.isArray(response)).toBe(true);
    });
  });

  describe("models.count()", () => {
    it("should successfully fetch models count", async () => {
      const response = await client.models.count();

      expect(response).toBeDefined();
      expect(response.count).toBeDefined();
      expect(typeof response.count).toBe("number");
      expect(response.count).toBeGreaterThan(0);
    });
  });
});
