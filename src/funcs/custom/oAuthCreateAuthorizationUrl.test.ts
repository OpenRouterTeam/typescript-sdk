import { describe, it, expect } from "vitest";
import { OpenRouterCore } from "../../core.js";
import { oAuthCreateAuthorizationUrl } from "./oAuthCreateAuthorizationUrl.js";

describe("oAuthCreateAuthorizationUrl", () => {
  const createMockClient = (serverURL?: string) => {
    return new OpenRouterCore({ serverURL });
  };

  it("should generate authorization URL with callback URL", () => {
    const client = createMockClient("https://openrouter.ai/api/v1");
    const result = oAuthCreateAuthorizationUrl(client, {
      callbackUrl: "https://example.com/callback",
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      const url = new URL(result.value);
      expect(url.searchParams.get("callback_url")).toBe(
        "https://example.com/callback",
      );
    }
  });

  it("should generate authorization URL with URL object as callback", () => {
    const client = createMockClient("https://openrouter.ai/api/v1");
    const callbackUrl = new URL("https://example.com/callback");
    const result = oAuthCreateAuthorizationUrl(client, {
      callbackUrl,
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      const url = new URL(result.value);
      expect(url.searchParams.get("callback_url")).toBe(
        "https://example.com/callback",
      );
    }
  });

  it("should include code challenge with S256 method", () => {
    const client = createMockClient("https://openrouter.ai/api/v1");
    const result = oAuthCreateAuthorizationUrl(client, {
      callbackUrl: "https://example.com/callback",
      codeChallenge: "test-code-challenge-abc123",
      codeChallengeMethod: "S256",
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      const url = new URL(result.value);
      expect(url.searchParams.get("code_challenge")).toBe(
        "test-code-challenge-abc123",
      );
      expect(url.searchParams.get("code_challenge_method")).toBe("S256");
    }
  });

  it("should include code challenge with plain method", () => {
    const client = createMockClient("https://openrouter.ai/api/v1");
    const result = oAuthCreateAuthorizationUrl(client, {
      callbackUrl: "https://example.com/callback",
      codeChallenge: "plain-code-challenge",
      codeChallengeMethod: "plain",
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      const url = new URL(result.value);
      expect(url.searchParams.get("code_challenge")).toBe(
        "plain-code-challenge",
      );
      expect(url.searchParams.get("code_challenge_method")).toBe("plain");
    }
  });

  it("should include limit parameter when provided", () => {
    const client = createMockClient("https://openrouter.ai/api/v1");
    const result = oAuthCreateAuthorizationUrl(client, {
      callbackUrl: "https://example.com/callback",
      limit: 100,
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      const url = new URL(result.value);
      expect(url.searchParams.get("limit")).toBe("100");
    }
  });

  it("should handle callback URL with query parameters", () => {
    const client = createMockClient("https://openrouter.ai/api/v1");
    const result = oAuthCreateAuthorizationUrl(client, {
      callbackUrl: "https://example.com/callback?state=abc123&redirect=true",
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      const url = new URL(result.value);
      expect(url.searchParams.get("callback_url")).toBe(
        "https://example.com/callback?state=abc123&redirect=true",
      );
    }
  });

  it("should handle callback URL with special characters", () => {
    const client = createMockClient("https://openrouter.ai/api/v1");
    const result = oAuthCreateAuthorizationUrl(client, {
      callbackUrl: "https://example.com/callback?data=hello%20world",
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      const url = new URL(result.value);
      expect(url.searchParams.get("callback_url")).toBe(
        "https://example.com/callback?data=hello%20world",
      );
    }
  });

  it("should return error for invalid callback URL string", () => {
    const client = createMockClient("https://openrouter.ai/api/v1");
    const result = oAuthCreateAuthorizationUrl(client, {
      callbackUrl: "not-a-valid-url" as any,
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBeDefined();
    }
  });

  it("should handle callback URL with localhost", () => {
    const client = createMockClient("https://openrouter.ai/api/v1");
    const result = oAuthCreateAuthorizationUrl(client, {
      callbackUrl: "http://localhost:3000/callback",
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      const url = new URL(result.value);
      expect(url.searchParams.get("callback_url")).toBe(
        "http://localhost:3000/callback",
      );
    }
  });

  it("should use default production server when no serverURL provided", () => {
    const client = createMockClient();
    const result = oAuthCreateAuthorizationUrl(client, {
      callbackUrl: "https://example.com/callback",
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      const url = new URL(result.value);
      expect(url.origin).toBe("https://openrouter.ai");
      expect(url.pathname).toBe("/auth");
    }
  });

  it("should use custom server URL when provided", () => {
    const client = createMockClient("https://custom.example.com/api");
    const result = oAuthCreateAuthorizationUrl(client, {
      callbackUrl: "https://example.com/callback",
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      const url = new URL(result.value);
      expect(url.origin).toBe("https://custom.example.com");
      expect(url.pathname).toBe("/auth");
    }
  });

  it("should preserve all parameters with PKCE", () => {
    const client = createMockClient("https://openrouter.ai/api/v1");
    const result = oAuthCreateAuthorizationUrl(client, {
      callbackUrl: "https://example.com/callback?state=xyz",
      codeChallenge: "challenge123",
      codeChallengeMethod: "S256",
      limit: 50,
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      const url = new URL(result.value);
      expect(url.searchParams.get("callback_url")).toBe(
        "https://example.com/callback?state=xyz",
      );
      expect(url.searchParams.get("code_challenge")).toBe("challenge123");
      expect(url.searchParams.get("code_challenge_method")).toBe("S256");
      expect(url.searchParams.get("limit")).toBe("50");
    }
  });

  it("should handle callback URL with fragment", () => {
    const client = createMockClient("https://openrouter.ai/api/v1");
    const result = oAuthCreateAuthorizationUrl(client, {
      callbackUrl: "https://example.com/callback#section",
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      const url = new URL(result.value);
      expect(url.searchParams.get("callback_url")).toBe(
        "https://example.com/callback#section",
      );
    }
  });

  it("should return error for invalid input types", () => {
    const client = createMockClient("https://openrouter.ai/api/v1");
    const result = oAuthCreateAuthorizationUrl(client, {
      callbackUrl: 12345 as any,
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBeDefined();
    }
  });

  it("should handle URL with port number in callback", () => {
    const client = createMockClient("https://openrouter.ai/api/v1");
    const result = oAuthCreateAuthorizationUrl(client, {
      callbackUrl: "https://example.com:8443/callback",
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      const url = new URL(result.value);
      expect(url.searchParams.get("callback_url")).toBe(
        "https://example.com:8443/callback",
      );
    }
  });

  it("should not omit limit parameter when value is 0", () => {
    const client = createMockClient("https://openrouter.ai/api/v1");
    const result = oAuthCreateAuthorizationUrl(client, {
      callbackUrl: "https://example.com/callback",
      limit: 0,
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      const url = new URL(result.value);
      expect(url.searchParams.get("limit")).toBe("0");
    }
  });

  it("should omit limit parameter when not provided", () => {
    const client = createMockClient("https://openrouter.ai/api/v1");
    const result = oAuthCreateAuthorizationUrl(client, {
      callbackUrl: "https://example.com/callback",
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      const url = new URL(result.value);
      expect(url.searchParams.has("limit")).toBe(false);
    }
  });
});
