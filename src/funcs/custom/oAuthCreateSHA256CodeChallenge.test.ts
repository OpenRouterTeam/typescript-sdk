import { describe, it, expect } from "vitest";
import { oAuthCreateSHA256CodeChallenge } from "./oAuthCreateSHA256CodeChallenge.js";

describe("oAuthCreateSHA256CodeChallenge", () => {
  it("should generate code challenge from provided code verifier", async () => {
    // Use RFC 7636 compliant verifier (43 chars minimum)
    const codeVerifier = "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk";
    const result = await oAuthCreateSHA256CodeChallenge({ codeVerifier });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.codeVerifier).toBe(codeVerifier);
      expect(result.value.codeChallenge).toBeTruthy();
      expect(typeof result.value.codeChallenge).toBe("string");
      // Code challenge should be base64url encoded (no +, /, or = characters)
      expect(result.value.codeChallenge).not.toMatch(/[+/=]/);
    }
  });

  it("should generate consistent code challenge for same verifier", async () => {
    // RFC compliant verifier (43+ chars)
    const codeVerifier = "a".repeat(43);
    const result1 = await oAuthCreateSHA256CodeChallenge({ codeVerifier });
    const result2 = await oAuthCreateSHA256CodeChallenge({ codeVerifier });

    expect(result1.ok).toBe(true);
    expect(result2.ok).toBe(true);
    if (result1.ok && result2.ok) {
      expect(result1.value.codeChallenge).toBe(result2.value.codeChallenge);
    }
  });

  it("should generate RFC 7636 compliant random code verifier when not provided", async () => {
    const result = await oAuthCreateSHA256CodeChallenge();

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.codeVerifier).toBeTruthy();
      expect(result.value.codeChallenge).toBeTruthy();
      expect(typeof result.value.codeVerifier).toBe("string");
      // RFC 7636: verifier should be exactly 43 characters (32 bytes base64url encoded)
      expect(result.value.codeVerifier.length).toBe(43);
      // Should only contain base64url characters
      expect(result.value.codeVerifier).toMatch(/^[A-Za-z0-9_-]+$/);
    }
  });

  it("should generate different code verifiers on successive calls", async () => {
    const result1 = await oAuthCreateSHA256CodeChallenge();
    const result2 = await oAuthCreateSHA256CodeChallenge();

    expect(result1.ok).toBe(true);
    expect(result2.ok).toBe(true);
    if (result1.ok && result2.ok) {
      expect(result1.value.codeVerifier).not.toBe(result2.value.codeVerifier);
      expect(result1.value.codeChallenge).not.toBe(result2.value.codeChallenge);
    }
  });

  it("should generate base64url encoded challenge (RFC 7636)", async () => {
    const codeVerifier = "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk";
    const result = await oAuthCreateSHA256CodeChallenge({ codeVerifier });

    expect(result.ok).toBe(true);
    if (result.ok) {
      // Should be base64url encoded (no standard base64 chars)
      expect(result.value.codeChallenge).not.toMatch(/\+/);
      expect(result.value.codeChallenge).not.toMatch(/\//);
      expect(result.value.codeChallenge).not.toMatch(/=/);
      // Should only contain base64url characters
      expect(result.value.codeChallenge).toMatch(/^[A-Za-z0-9_-]+$/);
    }
  });

  it("should handle invalid input type", async () => {
    const result = await oAuthCreateSHA256CodeChallenge({
      codeVerifier: 123 as any,
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBeDefined();
    }
  });

  it("should produce SHA-256 hash of correct length", async () => {
    const codeVerifier = "a".repeat(43); // RFC compliant length
    const result = await oAuthCreateSHA256CodeChallenge({ codeVerifier });

    expect(result.ok).toBe(true);
    if (result.ok) {
      // SHA-256 produces 256 bits = 32 bytes
      // Base64url encoding of 32 bytes should be 43 characters (no padding)
      expect(result.value.codeChallenge.length).toBe(43);
    }
  });

  it("should reject empty string code verifier (RFC 7636 violation)", async () => {
    const result = await oAuthCreateSHA256CodeChallenge({ codeVerifier: "" });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBeDefined();
      expect((result.error as Error).message).toContain("at least 43 characters");
    }
  });

  it("should reject code verifier shorter than 43 characters", async () => {
    const result = await oAuthCreateSHA256CodeChallenge({
      codeVerifier: "too-short",
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBeDefined();
      expect((result.error as Error).message).toContain("at least 43 characters");
    }
  });

  it("should reject code verifier longer than 128 characters (RFC 7636)", async () => {
    const longVerifier = "a".repeat(129);
    const result = await oAuthCreateSHA256CodeChallenge({
      codeVerifier: longVerifier,
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBeDefined();
      expect((result.error as Error).message).toContain("at most 128 characters");
    }
  });

  it("should accept code verifier at maximum length (128 characters)", async () => {
    const maxVerifier = "a".repeat(128);
    const result = await oAuthCreateSHA256CodeChallenge({
      codeVerifier: maxVerifier,
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.codeVerifier).toBe(maxVerifier);
      expect(result.value.codeChallenge).toBeTruthy();
      // SHA-256 always produces same length output regardless of input length
      expect(result.value.codeChallenge.length).toBe(43);
    }
  });

  it("should accept RFC 7636 unreserved characters in code verifier", async () => {
    // RFC 7636 allows: [A-Z] / [a-z] / [0-9] / "-" / "." / "_" / "~"
    const validVerifier = "aZ09-._~" + "a".repeat(35); // 43 chars total
    const result = await oAuthCreateSHA256CodeChallenge({
      codeVerifier: validVerifier,
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.codeVerifier).toBe(validVerifier);
      expect(result.value.codeChallenge).toBeTruthy();
      expect(result.value.codeChallenge.length).toBe(43);
    }
  });

  it("should reject code verifier with invalid characters", async () => {
    // Contains invalid characters like ! @ # $ etc.
    const invalidVerifier = "test!@#$%^&*()+=[]{}|;:',.<>?/`" + "a".repeat(13);
    const result = await oAuthCreateSHA256CodeChallenge({
      codeVerifier: invalidVerifier,
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBeDefined();
      expect((result.error as Error).message).toContain("unreserved characters");
    }
  });

  it("should reject code verifier with spaces", async () => {
    const verifierWithSpaces = "test verifier with spaces" + "a".repeat(18);
    const result = await oAuthCreateSHA256CodeChallenge({
      codeVerifier: verifierWithSpaces,
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBeDefined();
      expect((result.error as Error).message).toContain("unreserved characters");
    }
  });
});
