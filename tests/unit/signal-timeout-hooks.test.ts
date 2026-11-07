import type { HookContext } from '../../src/hooks/types.js';
import type { Fetcher } from '../../src/lib/http.js';
import type { RetryConfig } from '../../src/lib/retries.js';
import type { ChatRequest } from '../../src/models/chatrequest.js';

import { readdirSync, readFileSync } from 'node:fs';
import http from 'node:http';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { isNodeRuntime, SignalTimeoutHook } from '../../src/hooks/signal-hooks.js';
import { HTTPClient } from '../../src/lib/http.js';
import {
  RequestAbortedError,
  RequestTimeoutError,
} from '../../src/models/errors/httpclienterrors.js';
import { OpenRouter } from '../../src/sdk/sdk.js';

// A server that never finishes a response, so only an abort or a timeout can
// end a request. By default it never sends anything. With `x-test-mode:
// stream` it sends SSE response headers and then hangs mid-body.
let server: http.Server;
let serverURL: string;

const streamHeaders = { 'x-test-mode': 'stream' };

beforeAll(async () => {
  server = http.createServer((req, res) => {
    if (req.headers['x-test-mode'] === 'stream') {
      res.writeHead(200, { 'content-type': 'text/event-stream' });
      res.write(': ping\n\n');
    }
  });
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  if (address === null || typeof address === 'string') {
    throw new Error('expected a TCP server address');
  }
  serverURL = `http://127.0.0.1:${address.port}/api/v1`;
});

afterAll(async () => {
  server.closeAllConnections();
  await new Promise<void>((resolve) => server.close(() => resolve()));
});

const chatRequest: ChatRequest = {
  model: 'openai/gpt-5-mini',
  messages: [{ role: 'user', content: 'hi' }],
};

const noRetries: RetryConfig = { strategy: 'none' };

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Settles with the error a promise rejects with, or 'STILL RUNNING'. */
async function outcome(p: Promise<unknown>, withinMs: number): Promise<unknown> {
  return Promise.race([
    p.then(
      () => 'resolved',
      (err: unknown) => err,
    ),
    wait(withinMs).then(() => 'STILL RUNNING'),
  ]);
}

// `gc` is exposed by `--expose-gc` in the unit project's execArgv
// (vitest.config.ts).
function forceGC(): void {
  const gc: unknown = Reflect.get(globalThis, 'gc');
  if (typeof gc !== 'function') {
    throw new Error('gc is not available; run with --expose-gc');
  }
  gc();
}

/** Aborts `controller` after forcing GCs, as in the #1315 repro. */
async function abortAfterGC(controller: AbortController): Promise<void> {
  await wait(50);
  forceGC();
  await wait(50);
  forceGC();
  controller.abort();
}

/** Reads every event of a stream, settling when it ends or fails. */
async function drain(stream: AsyncIterable<unknown>): Promise<void> {
  for await (const _event of stream) {
    // Discard events.
  }
}

describe('timeoutMs with a caller signal (#1123)', () => {
  it('applies the client timeoutMs when a never-aborted signal is passed', async () => {
    const client = new OpenRouter({ apiKey: 'test', serverURL, timeoutMs: 200 });
    const controller = new AbortController();

    const started = Date.now();
    const result = await outcome(
      client.chat.send({ chatRequest }, { signal: controller.signal, retries: noRetries }),
      3000,
    );

    expect(result).toBeInstanceOf(RequestTimeoutError);
    expect(Date.now() - started).toBeLessThan(2000);
  });

  it('applies a per-request timeoutMs when a signal is passed', async () => {
    const client = new OpenRouter({ apiKey: 'test', serverURL });
    const controller = new AbortController();

    const result = await outcome(
      client.chat.send(
        { chatRequest },
        { signal: controller.signal, timeoutMs: 200, retries: noRetries },
      ),
      3000,
    );

    expect(result).toBeInstanceOf(RequestTimeoutError);
  });

  it('reports a caller abort as RequestAbortedError, not a timeout', async () => {
    const client = new OpenRouter({ apiKey: 'test', serverURL, timeoutMs: 5000 });
    const controller = new AbortController();

    const p = client.chat.send({ chatRequest }, { signal: controller.signal, retries: noRetries });
    await wait(50);
    controller.abort();

    expect(await outcome(p, 1000)).toBeInstanceOf(RequestAbortedError);
  });
});

describe('abort after garbage collection (#1315)', () => {
  it('still aborts the request after a GC', async () => {
    const client = new OpenRouter({ apiKey: 'test', serverURL });
    const controller = new AbortController();

    const p = client.chat.send({ chatRequest }, { signal: controller.signal, retries: noRetries });
    await abortAfterGC(controller);

    expect(await outcome(p, 1000)).toBeInstanceOf(RequestAbortedError);
  });

  it('still aborts after a GC when a timeoutMs is also set', async () => {
    const client = new OpenRouter({ apiKey: 'test', serverURL, timeoutMs: 5000 });
    const controller = new AbortController();

    const p = client.chat.send({ chatRequest }, { signal: controller.signal, retries: noRetries });
    await abortAfterGC(controller);

    expect(await outcome(p, 1000)).toBeInstanceOf(RequestAbortedError);
  });

  it.each([
    ['without', undefined],
    ['with', 5000],
  ])('aborts a stream mid-body after a GC, %s a timeoutMs', async (_label, timeoutMs) => {
    const client = new OpenRouter({
      apiKey: 'test',
      serverURL,
      ...(timeoutMs !== undefined ? { timeoutMs } : {}),
    });
    const controller = new AbortController();

    const stream = await client.chat.send(
      { chatRequest: { ...chatRequest, stream: true } },
      { signal: controller.signal, retries: noRetries, headers: streamHeaders },
    );
    const p = drain(stream);
    await abortAfterGC(controller);

    const result = await outcome(p, 1000);
    expect(result).not.toBe('STILL RUNNING');
    expect(result).not.toBe('resolved');
  });

  it('still aborts after a GC when an HTTPClient hook replaces the request', async () => {
    const httpClient = new HTTPClient();
    // One hook added before the client reaches the SDK, one after.
    httpClient.addHook('beforeRequest', (req) => {
      const headers = new Headers(req.headers);
      headers.set('x-before', '1');
      return new Request(req, { headers });
    });
    const client = new OpenRouter({ apiKey: 'test', serverURL, httpClient });
    httpClient.addHook('beforeRequest', (req) => {
      const headers = new Headers(req.headers);
      headers.set('x-after', '1');
      return new Request(req, { headers });
    });
    const controller = new AbortController();

    const p = client.chat.send({ chatRequest }, { signal: controller.signal, retries: noRetries });
    await abortAfterGC(controller);

    expect(await outcome(p, 1000)).toBeInstanceOf(RequestAbortedError);
  });

  it('passes the signal in init when an HTTPClient hook replaces the request', async () => {
    const seen: Array<{ init: RequestInit | undefined; header: string | null }> = [];
    const fetcher: Fetcher = async (input, init) => {
      seen.push({
        init,
        header: input instanceof Request ? input.headers.get('x-replaced') : null,
      });
      return new Response('{}', { status: 500 });
    };
    const httpClient = new HTTPClient({ fetcher });
    const client = new OpenRouter({ apiKey: 'test', serverURL, httpClient });
    httpClient.addHook('beforeRequest', (req) => {
      const headers = new Headers(req.headers);
      headers.set('x-replaced', '1');
      return new Request(req, { headers });
    });

    await outcome(
      client.chat.send(
        { chatRequest },
        { signal: new AbortController().signal, retries: noRetries },
      ),
      1000,
    );

    expect(seen).toHaveLength(1);
    expect(seen[0]?.header).toBe('1');
    expect(seen[0]?.init?.signal).toBeInstanceOf(AbortSignal);
  });

  it('removes a user HTTPClient hook by its original function', async () => {
    let calls = 0;
    const hook = (): void => {
      calls++;
    };
    const fetcher: Fetcher = async () => new Response('{}', { status: 500 });
    const httpClient = new HTTPClient({ fetcher });
    const client = new OpenRouter({ apiKey: 'test', serverURL, httpClient });
    httpClient.addHook('beforeRequest', hook);
    httpClient.removeHook('beforeRequest', hook);

    await outcome(client.chat.send({ chatRequest }, { retries: noRetries }), 1000);

    expect(calls).toBe(0);
  });

  it('removes a hook by its original function on a cloned HTTPClient', async () => {
    let calls = 0;
    const hook = (): void => {
      calls++;
    };
    const fetcher: Fetcher = async () => new Response('{}');
    const httpClient = new HTTPClient({ fetcher });
    httpClient.addHook('beforeRequest', hook);
    // Constructing the SDK wraps the client's existing hooks.
    new OpenRouter({ apiKey: 'test', serverURL, httpClient });

    const child = httpClient.clone();
    child.removeHook('beforeRequest', hook);
    await child.request(new Request(serverURL));

    expect(calls).toBe(0);
  });

  it('keeps a signal a later hook put on the request', async () => {
    const inits: Array<RequestInit | undefined> = [];
    const fetcher: Fetcher = async (_input, init) => {
      inits.push(init);
      return new Response('{}');
    };
    const httpClient = new HTTPClient({ fetcher });
    const hook = new SignalTimeoutHook({ fixAbortAfterGC: true });
    hook.sdkInit({ httpClient });
    const hookCtx: HookContext = {
      baseURL: serverURL,
      operationID: 'test',
      oAuth2Scopes: null,
      retryConfig: noRetries,
      resolvedSecurity: null,
      options: {},
    };

    // The caller's signal is captured, then a later hook swaps in another one.
    const caller = new AbortController();
    hook.beforeCreateRequest(hookCtx, {
      url: new URL(serverURL),
      options: { signal: caller.signal },
    });
    const replacement = new AbortController();
    const request = new Request(serverURL, { signal: replacement.signal });
    hook.beforeRequest(hookCtx, request);
    await httpClient.request(request);
    replacement.abort();

    expect(inits[0]?.signal?.aborted).toBe(true);
  });

  it('passes the signal to the fetcher in init', async () => {
    const inits: Array<RequestInit | undefined> = [];
    const fetcher: Fetcher = (input, init) => {
      inits.push(init);
      return fetch(input, init);
    };
    const client = new OpenRouter({
      apiKey: 'test',
      serverURL,
      httpClient: new HTTPClient({ fetcher }),
    });
    const controller = new AbortController();

    const p = client.chat.send({ chatRequest }, { signal: controller.signal, retries: noRetries });
    await wait(50);
    controller.abort();
    await outcome(p, 1000);

    // If this fails after a regen, the generated HTTPClient no longer stores
    // its fetcher in a `fetcher` field and the hook's wrap is skipped.
    expect(inits).toHaveLength(1);
    expect(inits[0]?.signal).toBeInstanceOf(AbortSignal);
  });

  it('leaves init undefined when there is no signal or timeout', async () => {
    const inits: Array<RequestInit | undefined> = [];
    const fetcher: Fetcher = async (_input, init) => {
      inits.push(init);
      return new Response('{}', { status: 500 });
    };
    const client = new OpenRouter({
      apiKey: 'test',
      serverURL,
      httpClient: new HTTPClient({ fetcher }),
    });

    await outcome(client.chat.send({ chatRequest }, { retries: noRetries }), 1000);

    expect(inits).toEqual([undefined]);
  });
});

describe('retries', () => {
  it('gives each attempt a fresh timeout', async () => {
    const signals: AbortSignal[] = [];
    const liveAfterWork: boolean[] = [];
    const fetcher: Fetcher = async (_input, init) => {
      const signal = init?.signal;
      if (!signal) {
        throw new Error('expected a signal in init');
      }
      signals.push(signal);
      // Each attempt takes 200ms of a 300ms timeout, so a timer shared
      // across attempts would have fired during the second one.
      await wait(200);
      liveAfterWork.push(!signal.aborted);
      return new Response('{}', { status: signals.length === 1 ? 503 : 500 });
    };
    const client = new OpenRouter({
      apiKey: 'test',
      serverURL,
      timeoutMs: 300,
      httpClient: new HTTPClient({ fetcher }),
    });

    await outcome(
      client.chat.send(
        { chatRequest },
        {
          signal: new AbortController().signal,
          retries: {
            strategy: 'backoff',
            backoff: { initialInterval: 1, maxInterval: 1, exponent: 1, maxElapsedTime: 5000 },
          },
          retryCodes: ['503'],
        },
      ),
      3000,
    );

    expect(signals).toHaveLength(2);
    expect(signals[0]).not.toBe(signals[1]);
    expect(liveAfterWork).toEqual([true, true]);
  });
});

describe('runtime gating', () => {
  it('detects Node.js', () => {
    expect(isNodeRuntime()).toBe(true);
  });

  it('leaves the fetcher alone when the abort-after-GC fix is off', () => {
    const fetcher: Fetcher = async () => new Response('{}');
    const httpClient = new HTTPClient({ fetcher });

    new SignalTimeoutHook({ fixAbortAfterGC: false }).sdkInit({ httpClient });

    expect(Reflect.get(httpClient, 'fetcher')).toBe(fetcher);
  });
});

describe('generated timeout lookup', () => {
  // The hook re-derives the timeout the same way the generated operations do.
  // If a regen adds per-operation defaults, the hook would ignore them, so
  // fail loudly instead.
  it('matches the timeoutMs expression in every generated operation', () => {
    const dir = new URL('../../src/funcs/', import.meta.url);
    const expected = 'timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1,';
    const mismatches: string[] = [];
    for (const name of readdirSync(dir)) {
      const source = readFileSync(new URL(name, dir), 'utf8');
      for (const line of source.split('\n')) {
        if (line.includes('timeoutMs') && line.trim() !== expected) {
          mismatches.push(`${name}: ${line.trim()}`);
        }
      }
    }
    expect(mismatches).toEqual([]);
  });
});
