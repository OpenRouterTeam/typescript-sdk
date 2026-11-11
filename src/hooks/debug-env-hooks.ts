/**
 * Hook that makes `OPENROUTER_DEBUG` behave like a boolean (#519) without
 * editing generated files.
 *
 * The generated `src/lib/env.ts` parses the variable with
 * `z.coerce.boolean()`, which is `Boolean(value)`: every non-empty string is
 * true. So `OPENROUTER_DEBUG=false`, `0`, `off` and `no` all turn on the
 * console debug logger, which prints request headers including
 * `Authorization`.
 *
 * The generated `ClientSDK` constructor runs the SDK init hooks first and
 * only afterwards decides on a logger:
 *
 *     this.#logger = this._options.debugLogger;
 *     if (!this.#logger && env().OPENROUTER_DEBUG) {
 *       this.#logger = console;
 *     }
 *
 * `env()` returns one memoized object, so this hook parses the raw variable
 * strictly and writes the result onto that object before the constructor
 * reads it. If that write does not take effect (for example a future regen
 * makes `env()` return a copy), the hook falls back to supplying a logger
 * that discards everything, which also stops the constructor from choosing
 * `console`.
 *
 * Accepted values, after trimming and ignoring case:
 *
 * - `1`, `true`, `yes`, `on`: debug logging on.
 * - Anything else that is set, including `0`, `false`, `no`, `off`, the empty
 *   string and unrecognised values such as `disabled`: debug logging off.
 *   Unrecognised values fail closed because the log contains credentials.
 * - Unset: left alone (off).
 *
 * A `debugLogger` passed to the SDK is never replaced or removed. The
 * variable only ever chose whether to default to `console`.
 */

import type { SDKOptions } from "../lib/config.js";
import type { Env } from "../lib/env.js";
import type { Logger } from "../lib/logger.js";
import type { SDKInitHook } from "./types.js";

import { env } from "../lib/env.js";

const DEBUG_ENV_VAR = "OPENROUTER_DEBUG";

const TRUE_VALUES: ReadonlySet<string> = new Set(["1", "true", "yes", "on"]);

function isObject(value: unknown): value is object {
  return typeof value === "object" && value !== null;
}

/**
 * Strictly parses a raw `OPENROUTER_DEBUG` value. Returns `undefined` when
 * the variable is unset, `true` for `1`, `true`, `yes` and `on` (trimmed,
 * case-insensitive), and `false` for every other value.
 */
export function parseDebugEnv(raw: string | undefined): boolean | undefined {
  if (typeof raw === "undefined") {
    return undefined;
  }
  return TRUE_VALUES.has(raw.trim().toLowerCase());
}

/**
 * Reads the raw `OPENROUTER_DEBUG` value from the same place the generated
 * `env()` does: `Deno.env` on Deno, otherwise `process.env`. Returns
 * `undefined` on runtimes that have neither.
 */
export function readRawDebugEnv(): string | undefined {
  let vars: unknown;
  if ("Deno" in globalThis) {
    const deno: unknown = Reflect.get(globalThis, "Deno");
    const denoEnv: unknown = isObject(deno)
      ? Reflect.get(deno, "env")
      : undefined;
    const toObject: unknown = isObject(denoEnv)
      ? Reflect.get(denoEnv, "toObject")
      : undefined;
    vars = typeof toObject === "function"
      ? Reflect.apply(toObject, denoEnv, [])
      : undefined;
  } else {
    const proc: unknown = Reflect.get(globalThis, "process");
    vars = isObject(proc) ? Reflect.get(proc, "env") : undefined;
  }
  const value: unknown = isObject(vars)
    ? Reflect.get(vars, DEBUG_ENV_VAR)
    : undefined;
  return typeof value === "string" ? value : undefined;
}

/** A logger that discards everything. */
export const silentLogger: Logger = {
  group() {},
  groupEnd() {},
  log() {},
};

export type DebugEnvHookOptions = {
  /** Reads the raw variable. Defaults to {@link readRawDebugEnv}. */
  readRaw?: () => string | undefined;
  /** Returns the SDK's parsed environment. Defaults to the generated `env`. */
  readEnv?: () => Env;
};

export class DebugEnvHook implements SDKInitHook {
  readonly #readRaw: () => string | undefined;
  readonly #readEnv: () => Env;

  constructor(options: DebugEnvHookOptions = {}) {
    this.#readRaw = options.readRaw ?? readRawDebugEnv;
    this.#readEnv = options.readEnv ?? env;
  }

  sdkInit(opts: SDKOptions): SDKOptions {
    const enabled = parseDebugEnv(this.#readRaw());
    if (typeof enabled === "undefined") {
      return opts;
    }

    // The generated parser turns every non-empty string into `true`. Write
    // the strict result onto the memoized object that the constructor reads
    // right after this hook.
    try {
      const parsed = this.#readEnv();
      if (parsed.OPENROUTER_DEBUG !== enabled) {
        parsed.OPENROUTER_DEBUG = enabled;
      }
    } catch {
      // Fall through to the check below.
    }
    if (enabled) {
      return opts;
    }

    let stillEnabled = true;
    try {
      stillEnabled = Boolean(this.#readEnv().OPENROUTER_DEBUG);
    } catch {
      stillEnabled = false;
      // `env()` throws on an invalid environment (for example a malformed
      // OPENROUTER_BASE_URL). The constructor will throw the same error on
      // its own, so leave reporting to it.
    }

    if (stillEnabled && !opts.debugLogger) {
      // The correction did not stick. A silent logger costs a body clone per
      // request, but keeps the constructor from defaulting to `console`.
      return { ...opts, debugLogger: silentLogger };
    }
    return opts;
  }
}
