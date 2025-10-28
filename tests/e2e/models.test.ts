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

      expect(Array.isArray(response.data)).toBe(true);
      expect(response.data.length).toBeGreaterThan(0);
    });

    it("should return models with expected properties", async () => {
      const response = await client.models.list();

      const firstModel = response.data[0];
      expect(firstModel).toBeDefined();
      expect(firstModel?.id).toBeDefined();
      expect(typeof firstModel?.id).toBe("string");
      expect(firstModel?.name).toBeDefined();
    });


  });

  describe("models.count()", () => {
    it("should successfully fetch models count", async () => {
      const response = await client.models.count();

      expect(response).toBeDefined();
      expect(response.data.count).toBeDefined();
      expect(typeof response.data.count).toBe("number");
      expect(response.data.count).toBeGreaterThan(0);
    });
  });
});
