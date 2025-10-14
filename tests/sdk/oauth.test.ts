import { describe, expect, it, vi } from "vitest";
import { OAuth as OpenRouterOAuthSDK } from "../../src/sdk/oauth";

describe("oauth", () => {
  const oauthSdkInstance = new OpenRouterOAuthSDK({
    serverURL: "https://test-server-url",
  });

  describe("createSHA256CodeChallenge", () => {
    it("is defined on the oauth sdk object", () => {
      expect(oauthSdkInstance.createSHA256CodeChallenge).toBeDefined();
    });

    it("calls the custom oAuthCreateSHA256CodeChallenge function", async () => {
      const spy = vi.spyOn(
        await import("../../src/funcs/oAuthCreateSHA256CodeChallenge"),
        "oAuthCreateSHA256CodeChallenge",
      );

      oauthSdkInstance.createSHA256CodeChallenge();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe("createAuthorizationUrl", () => {
    it("is defined on the oauth sdk object", () => {
      expect(oauthSdkInstance.createAuthorizationUrl).toBeDefined();
    });

    it("calls the custom oAuthCreateAuthorizationUrl function", async () => {
      const spy = vi.spyOn(
        await import("../../src/funcs/oAuthCreateAuthorizationUrl"),
        "oAuthCreateAuthorizationUrl",
      );

      oauthSdkInstance.createAuthorizationUrl({
        callbackUrl: "https://example.com/callback",
      });

      expect(spy).toHaveBeenCalled();
    });
  });
});
