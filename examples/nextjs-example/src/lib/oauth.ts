import { Buffer } from "buffer";

const DEFAULT_OPENROUTER_BASE_URL =
  process.env.NEXT_PUBLIC_OPENROUTER_BASE_URL ?? "https://openrouter.ai";
const DEFAULT_OPENROUTER_API_BASE_URL =
  process.env.NEXT_PUBLIC_OPENROUTER_API_BASE_URL ??
  `${DEFAULT_OPENROUTER_BASE_URL.replace(/\/+$/, "")}/api/v1`;

const CODE_VERIFIER_REGEX = /^[A-Za-z0-9\-._~]+$/;
const CODE_VERIFIER_MIN_LENGTH = 43;
const CODE_VERIFIER_MAX_LENGTH = 128;
const DEFAULT_RANDOM_BYTE_LENGTH = 32;
const DEFAULT_STATE_BYTE_LENGTH = 16;

export type PkceChallenge = {
  codeChallenge: string;
  codeVerifier: string;
};

export type CodeChallengeMethod = "S256" | "plain";

export type CreateAuthorizationUrlOptions = {
  callbackUrl: string | URL;
  codeChallenge?: string;
  codeChallengeMethod?: CodeChallengeMethod;
  limit?: number;
  state?: string;
  baseUrl?: string | URL;
};

export type ExchangeAuthorizationCodeOptions = {
  code: string;
  codeVerifier: string;
  codeChallengeMethod?: CodeChallengeMethod;
  apiBaseUrl?: string | URL;
};

export type ExchangeAuthorizationCodeResponse = {
  key: string;
  userId?: string;
};

/**
 * Convert an ArrayBuffer to base64url per RFC 4648.
 */
function arrayBufferToBase64Url(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  return Buffer.from(bytes)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function resolveBaseUrl(
  value: string | URL | undefined,
  fallback: string,
): URL {
  if (value) {
    return typeof value === "string" ? new URL(value) : new URL(value.toString());
  }
  return new URL(fallback);
}

function buildUrl(base: URL, path: string): URL {
  const normalized = new URL(base.toString());
  if (!normalized.pathname.endsWith("/")) {
    normalized.pathname += "/";
  }
  const relativePath = path.startsWith("/") ? path.slice(1) : path;
  return new URL(relativePath, normalized);
}

function assertCodeVerifier(verifier: string) {
  if (
    verifier.length < CODE_VERIFIER_MIN_LENGTH ||
    verifier.length > CODE_VERIFIER_MAX_LENGTH
  ) {
    throw new Error(
      `Code verifier must be between ${CODE_VERIFIER_MIN_LENGTH} and ${CODE_VERIFIER_MAX_LENGTH} characters.`,
    );
  }

  if (!CODE_VERIFIER_REGEX.test(verifier)) {
    throw new Error(
      "Code verifier must only contain unreserved characters: [A-Za-z0-9-._~].",
    );
  }
}

function assertWebCryptoSupport() {
  if (!globalThis.crypto?.getRandomValues || !globalThis.crypto?.subtle) {
    throw new Error("Web Crypto API is not available in this environment.");
  }
}

/**
 * Generate a random PKCE code verifier that satisfies RFC 7636.
 */
export function generateCodeVerifier(
  randomByteLength: number = DEFAULT_RANDOM_BYTE_LENGTH,
): string {
  if (randomByteLength < 32 || randomByteLength > 96) {
    throw new Error(
      "randomByteLength must produce a code verifier between 43 and 128 characters.",
    );
  }

  assertWebCryptoSupport();

  const randomBytes = new Uint8Array(randomByteLength);
  crypto.getRandomValues(randomBytes);
  const codeVerifier = arrayBufferToBase64Url(randomBytes);

  assertCodeVerifier(codeVerifier);
  return codeVerifier;
}

/**
 * Create a PKCE SHA-256 code challenge and verifier pair.
 */
export async function createSHA256CodeChallenge(
  codeVerifier: string = generateCodeVerifier(),
): Promise<PkceChallenge> {
  assertWebCryptoSupport();
  assertCodeVerifier(codeVerifier);

  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const hash = await crypto.subtle.digest("SHA-256", data);
  const codeChallenge = arrayBufferToBase64Url(hash);

  return { codeVerifier, codeChallenge };
}

/**
 * Generate an OAuth state token for CSRF protection.
 */
export function generateOAuthState(
  randomByteLength: number = DEFAULT_STATE_BYTE_LENGTH,
): string {
  if (randomByteLength <= 0) {
    throw new Error("randomByteLength must be a positive integer.");
  }

  assertWebCryptoSupport();
  const randomBytes = new Uint8Array(randomByteLength);
  crypto.getRandomValues(randomBytes);
  return arrayBufferToBase64Url(randomBytes);
}

/**
 * Build the OpenRouter OAuth authorization URL (step 2 of PKCE).
 */
export function createAuthorizationUrl(
  options: CreateAuthorizationUrlOptions,
): string {
  const {
    callbackUrl,
    codeChallenge,
    codeChallengeMethod,
    limit,
    state,
    baseUrl,
  } = options;

  if (!callbackUrl) {
    throw new Error("callbackUrl is required to start the OAuth flow.");
  }

  if (codeChallengeMethod && !codeChallenge) {
    throw new Error(
      "codeChallengeMethod was provided without a matching codeChallenge.",
    );
  }

  const base = resolveBaseUrl(baseUrl, DEFAULT_OPENROUTER_BASE_URL);
  const authUrl = buildUrl(base, "auth");

  authUrl.searchParams.set("callback_url", callbackUrl.toString());

  if (typeof limit === "number") {
    authUrl.searchParams.set("limit", limit.toString());
  }

  if (state) {
    authUrl.searchParams.set("state", state);
  }

  if (codeChallenge) {
    authUrl.searchParams.set("code_challenge", codeChallenge);
    authUrl.searchParams.set(
      "code_challenge_method",
      codeChallengeMethod ?? "S256",
    );
  }

  return authUrl.toString();
}

/**
 * Exchange an authorization code for an API key (step 4 of PKCE).
 */
export async function exchangeAuthorizationCode(
  options: ExchangeAuthorizationCodeOptions,
): Promise<ExchangeAuthorizationCodeResponse> {
  const {
    code,
    codeVerifier,
    codeChallengeMethod = "S256",
    apiBaseUrl,
  } = options;

  if (!code?.trim()) {
    throw new Error("Authorization code is required.");
  }

  if (!codeVerifier?.trim()) {
    throw new Error("Code verifier is required.");
  }

  const base = resolveBaseUrl(apiBaseUrl, DEFAULT_OPENROUTER_API_BASE_URL);
  const url = buildUrl(base, "auth/keys");

  let responseBody: unknown;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        code,
        code_verifier: codeVerifier,
        code_challenge_method: codeChallengeMethod,
      }),
      cache: "no-store",
    });

    responseBody = await response.json().catch(() => ({}));

    if (!response.ok) {
      const message =
        (responseBody as { error?: { message?: string } })?.error?.message ??
        `Failed to exchange authorization code (status ${response.status}).`;
      throw new Error(message);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to exchange authorization code.");
  }

  const payload = responseBody as {
    key?: string;
    user_id?: string;
    error?: { message?: string };
  };

  if (!payload?.key) {
    throw new Error("OpenRouter did not return an API key.");
  }

  return {
    key: payload.key,
    userId: payload.user_id,
  };
}
