import type { SDKOptions } from "../lib/config.js";
import type { SDKInitHook } from "./types.js";

export const BASE_URL_ENV_VAR = "OPENROUTER_BASE_URL";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readEnvVar(name: string): string | undefined {
  const globals: unknown = globalThis;
  if (!isRecord(globals)) {
    return undefined;
  }

  const deno = globals["Deno"];
  if (isRecord(deno)) {
    const denoEnv = deno["env"];
    if (isRecord(denoEnv) && typeof denoEnv["get"] === "function") {
      const value: unknown = denoEnv["get"](name);
      return typeof value === "string" ? value : undefined;
    }
    return undefined;
  }

  const proc = globals["process"];
  if (isRecord(proc) && isRecord(proc["env"])) {
    const value = proc["env"][name];
    return typeof value === "string" ? value : undefined;
  }
  return undefined;
}

/**
 * Uses the `OPENROUTER_BASE_URL` environment variable as the default server
 * URL, so gateways and hosting platforms that inject a base URL work with zero
 * config (matching `OPENAI_BASE_URL`, `ANTHROPIC_BASE_URL`, etc.).
 *
 * Resolution order, highest first:
 *   1. `options.serverURL`
 *   2. `options.server` (a named server from `ServerList`)
 *   3. `OPENROUTER_BASE_URL`
 *   4. The production server, `https://openrouter.ai/api/v1`
 *
 * The value must be the complete base URL including the version path. A value
 * that is not a valid URL throws when the client is constructed rather than at
 * request time.
 *
 * This lives in a hook rather than in the generated `lib/config.ts` /
 * `lib/env.ts` so that it survives Speakeasy regeneration without relying on
 * persistent edits.
 */
export class BaseURLEnvHook implements SDKInitHook {
  sdkInit(opts: SDKOptions): SDKOptions {
    if (opts.serverURL || opts.server) {
      return opts;
    }

    const baseURL = readEnvVar(BASE_URL_ENV_VAR);
    if (!baseURL) {
      return opts;
    }

    try {
      new URL(baseURL);
    } catch {
      throw new TypeError(
        `${BASE_URL_ENV_VAR} must be a valid absolute URL, got: ${baseURL}`,
      );
    }

    return { ...opts, serverURL: baseURL };
  }
}
