/**
 * Hooks that fix two gaps in the generated request pipeline without editing
 * generated files:
 *
 * 1. Timeouts and signals compose (#1123). The generated `_createRequest`
 *    skips `timeoutMs` whenever the caller passes `signal`. This hook restores
 *    the timeout on the hook context so `_do` combines it with the signal and
 *    the request aborts on whichever fires first. The timeout covers the whole
 *    attempt, including reading a streamed response body, the same as for
 *    calls made without a signal.
 *
 * 2. Aborts survive garbage collection in Node (#1315). The generated
 *    `HTTPClient` calls `fetch(request)` with only a `Request`. In undici, a
 *    `Request`'s signal follows its source signal through a weak reference, so
 *    after a GC an abort can stop reaching the network
 *    (https://github.com/nodejs/undici/issues/4068). Passing the caller's
 *    signal again in the `fetch` init avoids this. The hook links each
 *    outgoing `Request` to a signal built directly from the caller's signal
 *    and the per-attempt timeout, and a wrapped fetcher passes it as `init`.
 *    This part only runs on Node: other runtimes don't have the bug, and Bun
 *    mishandles a `Request` combined with an `init` argument.
 */

import type { SDKOptions } from "../lib/config.js";
import type {
  BeforeRequestHook as HTTPBeforeRequestHook,
  Fetcher,
  RequestInput,
} from "../lib/http.js";
import type {
  BeforeCreateRequestContext,
  BeforeCreateRequestHook,
  BeforeRequestContext,
  BeforeRequestHook,
  HookContext,
  SDKInitHook,
} from "./types.js";

import { combineSignals } from "../lib/primitives.js";

/** The caller's own signal for each in-flight operation. */
const callerSignals = new WeakMap<HookContext, AbortSignal>();

/** The signal to pass in the `fetch` init for each outgoing request. */
const fetchSignals = new WeakMap<Request, AbortSignal>();

/** HTTP clients whose fetcher and hooks have already been wrapped. */
const wrappedClients = new WeakSet<object>();

/** Wrapped version of each user `HTTPClient` beforeRequest hook. */
const wrappedHooks = new WeakMap<HTTPBeforeRequestHook, HTTPBeforeRequestHook>();

function isObject(value: unknown): value is object {
  return typeof value === "object" && value !== null;
}

function hasFetcher(value: unknown): value is { fetcher: Fetcher } {
  return (
    isObject(value)
    && "fetcher" in value
    && typeof value.fetcher === "function"
  );
}

function hasRequestHooks(value: unknown): value is { requestHooks: unknown[] } {
  return (
    isObject(value)
    && "requestHooks" in value
    && Array.isArray(value.requestHooks)
  );
}

function isHTTPBeforeRequestHook(value: unknown): value is HTTPBeforeRequestHook {
  return typeof value === "function";
}

/** True on Node.js, false on Bun, Deno, browsers and other runtimes. */
export function isNodeRuntime(): boolean {
  const proc: unknown = Reflect.get(globalThis, "process");
  if (!isObject(proc) || !("versions" in proc) || !isObject(proc.versions)) {
    return false;
  }
  const versions = proc.versions;
  return (
    "node" in versions
    && typeof versions.node === "string"
    && !("bun" in versions)
    && !("deno" in versions)
  );
}

function perRequestTimeoutMs(options: unknown): number | undefined {
  if (
    isObject(options)
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
  // Mirrors the generated `options?.timeoutMs || client._options.timeoutMs`
  // in each `src/funcs/*` operation. `_createRequest` spreads the per-call
  // RequestOptions into the fetch options, so a per-request `timeoutMs` is
  // visible here. A unit test fails if a regen adds per-operation timeout
  // defaults that this lookup would miss.
  const timeoutMs = perRequestTimeoutMs(options) || hookCtx.options.timeoutMs;
  return timeoutMs != null && timeoutMs > 0 ? timeoutMs : undefined;
}

/**
 * Wraps a user `HTTPClient` beforeRequest hook so that a replacement
 * `Request` it returns keeps the fetch signal linked to the original.
 */
function wrapUserHook(fn: HTTPBeforeRequestHook): HTTPBeforeRequestHook {
  const existing = wrappedHooks.get(fn);
  if (existing) {
    return existing;
  }
  const wrapped: HTTPBeforeRequestHook = async (req) => {
    const next = await fn(req);
    if (next instanceof Request && next !== req) {
      const signal = fetchSignals.get(req);
      if (signal) {
        // Keep any signal the user's hook set on the new request too.
        fetchSignals.set(next, combineSignals(signal, next.signal) ?? signal);
      }
    }
    return next;
  };
  wrappedHooks.set(fn, wrapped);
  return wrapped;
}

/**
 * Wraps beforeRequest hooks already on the client, and patches `addHook` and
 * `removeHook` so hooks added or removed later are handled the same way.
 */
function wrapClientHooks(client: object): void {
  if (hasRequestHooks(client)) {
    client.requestHooks = client.requestHooks.map((hook) =>
      isHTTPBeforeRequestHook(hook) ? wrapUserHook(hook) : hook
    );
  }

  const addHook: unknown = Reflect.get(client, "addHook");
  const removeHook: unknown = Reflect.get(client, "removeHook");
  if (typeof addHook !== "function" || typeof removeHook !== "function") {
    return;
  }

  Reflect.set(client, "addHook", (...args: unknown[]): unknown => {
    const [kind, fn] = args;
    if (kind === "beforeRequest" && isHTTPBeforeRequestHook(fn)) {
      Reflect.apply(addHook, client, [kind, wrapUserHook(fn)]);
      return client;
    }
    Reflect.apply(addHook, client, args);
    return client;
  });

  Reflect.set(client, "removeHook", (...args: unknown[]): unknown => {
    const [kind, fn] = args;
    if (kind === "beforeRequest" && isHTTPBeforeRequestHook(fn)) {
      Reflect.apply(removeHook, client, [kind, wrappedHooks.get(fn) ?? fn]);
      return client;
    }
    Reflect.apply(removeHook, client, args);
    return client;
  });
}

export type SignalTimeoutHookOptions = {
  /**
   * Whether to apply the abort-after-GC fix (#1315). Defaults to true on
   * Node.js only.
   */
  fixAbortAfterGC?: boolean;
};

export class SignalTimeoutHook
  implements SDKInitHook, BeforeCreateRequestHook, BeforeRequestHook
{
  readonly #fixAbortAfterGC: boolean;

  constructor(options: SignalTimeoutHookOptions = {}) {
    this.#fixAbortAfterGC = options.fixAbortAfterGC ?? isNodeRuntime();
  }

  sdkInit(opts: SDKOptions): SDKOptions {
    if (!this.#fixAbortAfterGC) {
      return opts;
    }
    const client: unknown = opts.httpClient;
    // `fetcher` and `requestHooks` are private fields of the generated
    // HTTPClient. If a future regen renames them, skip the wrap rather than
    // break requests; the unit tests flag that case.
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
      wrapClientHooks(client);
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
      if (this.#fixAbortAfterGC) {
        callerSignals.set(hookCtx, signal);
      }
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
    if (!this.#fixAbortAfterGC) {
      return request;
    }
    // Runs once per attempt, so each retry gets a fresh timeout.
    //
    // `_do` has already started an `AbortSignal.timeout` of the same length
    // for this attempt, but it only reaches us through `request.signal`, which
    // is the weakly linked signal that #1315 is about. So we start a second
    // timer and build the fetch signal from strong references only. The fetch
    // uses this one; the `_do` timer is redundant but harmless.
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
