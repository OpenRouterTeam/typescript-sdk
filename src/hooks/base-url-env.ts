import * as z from "zod/v4";
import type { SDKOptions } from "../lib/config.js";
import type { SDKInitHook } from "./types.js";

export const BASE_URL_ENV_VAR = "OPENROUTER_BASE_URL";

/**
 * Same shape and rule the env var had when it was validated as part of the
 * generated `envSchema`, so an invalid value still fails with a `ZodError`
 * whose issue path is `["OPENROUTER_BASE_URL"]`.
 */
const baseURLEnvSchema = z.object({
  [BASE_URL_ENV_VAR]: z.string().url().optional(),
});

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readEnvVar(name: string): string | undefined {
  const globals: unknown = globalThis;
  if (!isRecord(globals)) {
    return undefined;
  }

  // Mirrors the runtime detection in the generated `lib/env.ts`.
  if ("Deno" in globals) {
    const deno = globals["Deno"];
    const denoEnv = isRecord(deno) ? deno["env"] : undefined;
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
 * that is set but is not a valid URL throws a `ZodError` when the client is
 * constructed, whether or not the value would have been used.
 *
 * This lives in a hook rather than in the generated `lib/config.ts` /
 * `lib/env.ts` so that it survives Speakeasy regeneration without relying on
 * persistent edits. As a result, only client construction honors the env var:
 * calling the generated `serverURLFromOptions()` directly does not read it.
 */
export class BaseURLEnvHook implements SDKInitHook {
  sdkInit(opts: SDKOptions): SDKOptions {
    const baseURL = baseURLEnvSchema.parse({
      [BASE_URL_ENV_VAR]: readEnvVar(BASE_URL_ENV_VAR),
    })[BASE_URL_ENV_VAR];

    if (opts.serverURL || opts.server || !baseURL) {
      return opts;
    }

    return { ...opts, serverURL: baseURL };
  }
}
