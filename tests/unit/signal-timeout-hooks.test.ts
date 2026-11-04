import type { Fetcher } from '../../src/lib/http.js';
import type { RetryConfig } from '../../src/lib/retries.js';
import type { ChatRequest } from '../../src/models/chatrequest.js';

import http from 'node:http';
import { setFlagsFromString } from 'node:v8';
import { runInNewContext } from 'node:vm';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { HTTPClient } from '../../src/lib/http.js';
import {
  RequestAbortedError,
  RequestTimeoutError,
} from '../../src/models/errors/httpclienterrors.js';
import { OpenRouter } from '../../src/sdk/sdk.js';

// A server that accepts connections and never responds, so only an abort or a
// timeout can end a request.
let server: http.Server;
let serverURL: string;

beforeAll(async () => {
  server = http.createServer(() => {});
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

function forceGC(): void {
  setFlagsFromString('--expose-gc');
  const gc: unknown = runInNewContext('gc');
  if (typeof gc !== 'function') {
    throw new Error('gc is not available');
  }
  gc();
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
    await wait(50);
    forceGC();
    await wait(50);
    forceGC();
    controller.abort();

    expect(await outcome(p, 1000)).toBeInstanceOf(RequestAbortedError);
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
