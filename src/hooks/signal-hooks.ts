/**
 * Hooks that fix two gaps in the generated request pipeline without editing
 * generated files:
 *
 * 1. Timeouts and signals compose (#1123). The generated `_createRequest`
 *    skips `timeoutMs` whenever the caller passes `signal`. This hook restores
 *    the timeout on the hook context so `_do` combines it with the signal and
 *    the request aborts on whichever fires first.
 *
 * 2. Aborts survive garbage collection in Node (#1315). The generated
 *    `HTTPClient` calls `fetch(request)` with only a `Request`. In undici, a
 *    `Request`'s signal follows its source signal through a weak reference, so
 *    after a GC an abort can stop reaching the network
 *    (https://github.com/nodejs/undici/issues/4068). Passing the caller's
 *    signal again in the `fetch` init avoids this. The hook links each
 *    outgoing `Request` to a signal built directly from the caller's signal
 *    and the per-attempt timeout, and a wrapped fetcher passes it as `init`.
 */

import type { Fetcher } from "../lib/http.js";
import { combineSignals } from "../lib/primitives.js";
import type {
  BeforeCreateRequestContext,
  BeforeCreateRequestHook,
  BeforeRequestContext,
  BeforeRequestHook,
  HookContext,
  SDKInitHook,
} from "./types.js";
import type { RequestInput } from "../lib/http.js";
import type { SDKOptions } from "../lib/config.js";

/** The caller's own signal for each in-flight operation. */
const callerSignals = new WeakMap<HookContext, AbortSignal>();

/** The signal to pass in the `fetch` init for each outgoing request. */
const fetchSignals = new WeakMap<Request, AbortSignal>();

/** HTTP clients whose fetcher has already been wrapped. */
const wrappedClients = new WeakSet<object>();

function hasFetcher(value: unknown): value is { fetcher: Fetcher } {
  return (
    typeof value === "object"
    && value !== null
    && "fetcher" in value
    && typeof value.fetcher === "function"
  );
}

function perRequestTimeoutMs(options: unknown): number | undefined {
  if (
    typeof options === "object"
    && options !== null
    && "timeoutMs" in options
    && typeof options.timeoutMs === "number"
  ) {
    return options.timeoutMs;
  }
  return undefined;
}

function resolveTimeoutMs(
  hookCtx: HookContext,
  options: RequestInit | undefined,
): number | undefined {
  // `_createRequest` spreads the per-call RequestOptions into the fetch
  // options, so a per-request `timeoutMs` is visible here.
  const timeoutMs = perRequestTimeoutMs(options) || hookCtx.options.timeoutMs;
  return timeoutMs != null && timeoutMs > 0 ? timeoutMs : undefined;
}

export class SignalTimeoutHook
  implements SDKInitHook, BeforeCreateRequestHook, BeforeRequestHook
{
  sdkInit(opts: SDKOptions): SDKOptions {
    const client: unknown = opts.httpClient;
    // `fetcher` is a private field of the generated HTTPClient. If a future
    // regen renames it, skip the wrap rather than break requests; the unit
    // tests flag that case.
    if (hasFetcher(client) && !wrappedClients.has(client)) {
      const inner = client.fetcher;
      client.fetcher = (input, init) => {
        const signal = input instanceof Request
          ? fetchSignals.get(input)
          : undefined;
        if (signal && init?.signal == null) {
          return inner(input, { ...init, signal });
        }
        return inner(input, init);
      };
      wrappedClients.add(client);
    }
    return opts;
  }

  beforeCreateRequest(
    hookCtx: BeforeCreateRequestContext,
    input: RequestInput,
  ): RequestInput {
    const signal = input.options?.signal;
    if (signal) {
      callerSignals.set(hookCtx, signal);
      if (hookCtx.timeoutMs == null || hookCtx.timeoutMs <= 0) {
        const timeoutMs = resolveTimeoutMs(hookCtx, input.options);
        if (timeoutMs != null) {
          hookCtx.timeoutMs = timeoutMs;
        }
      }
    }
    return input;
  }

  beforeRequest(hookCtx: BeforeRequestContext, request: Request): Request {
    // Runs once per attempt, so each retry gets a fresh timeout.
    const timeoutSignal = hookCtx.timeoutMs != null && hookCtx.timeoutMs > 0
      ? AbortSignal.timeout(hookCtx.timeoutMs)
      : undefined;
    const signal = combineSignals(callerSignals.get(hookCtx), timeoutSignal);
    if (signal) {
      fetchSignals.set(request, signal);
    }
    return request;
  }
}
