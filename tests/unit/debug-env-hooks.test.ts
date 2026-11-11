import type { Env } from '../../src/lib/env.js';
import type { Logger } from '../../src/lib/logger.js';

import http from 'node:http';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  DebugEnvHook,
  parseDebugEnv,
  readRawDebugEnv,
  silentLogger,
} from '../../src/hooks/debug-env-hooks.js';
import { env, resetEnv } from '../../src/lib/env.js';
import { OpenRouterCore } from '../../src/core.js';
import { modelsList } from '../../src/funcs/modelsList.js';
import { OpenRouter } from '../../src/sdk/sdk.js';

const FALSE_LIKE = ['false', 'FALSE', 'False', '0', 'off', 'OFF', 'no', 'No', ' false '];
const TRUE_LIKE = ['true', 'TRUE', 'True', '1', 'on', 'ON', 'yes', 'Yes', ' true '];
const UNRECOGNISED = ['disabled', 'enabled', '2', 'y', 'n', 'null', 'undefined', ' '];

const API_KEY = 'sk-test-secret';

// A local server so the tests stay offline. It answers every request with a
// 400 so the tests do not depend on any generated response schema: the SDK
// logs the request and response before it turns the status into an error.
let server: http.Server;
let serverURL: string;

beforeAll(async () => {
  server = http.createServer((_req, res) => {
    res.writeHead(400, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ error: { code: 400, message: 'stub' } }));
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

const originalDebug = process.env['OPENROUTER_DEBUG'];

function setDebugEnv(value: string | undefined): void {
  if (typeof value === 'undefined') {
    delete process.env['OPENROUTER_DEBUG'];
  } else {
    process.env['OPENROUTER_DEBUG'] = value;
  }
  resetEnv();
}

beforeEach(() => {
  setDebugEnv(undefined);
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  setDebugEnv(originalDebug);
});

type Recorder = { logger: Logger; lines: string[] };

/** Sends one request and waits for it to settle; the stub always fails it. */
async function sendRequest(client: OpenRouter): Promise<void> {
  await client.models.list().then(
    () => {},
    () => {},
  );
}

function recorder(): Recorder {
  const lines: string[] = [];
  const record = (...args: unknown[]) => {
    lines.push(args.map(String).join(' '));
  };
  return { logger: { group: record, groupEnd: () => {}, log: record }, lines };
}

/** Records what the SDK writes to `console` while `run` executes. */
async function consoleOutputDuring(run: () => Promise<unknown>): Promise<string[]> {
  const lines: string[] = [];
  const record = (...args: unknown[]) => {
    lines.push(args.map(String).join(' '));
  };
  vi.spyOn(console, 'group').mockImplementation(record);
  vi.spyOn(console, 'groupEnd').mockImplementation(() => {});
  vi.spyOn(console, 'log').mockImplementation(record);

  await run().then(
    () => {},
    () => {},
  );

  vi.restoreAllMocks();
  return lines;
}

/** Records what the SDK writes to `console` during one request. */
async function consoleOutputForRequest(): Promise<string[]> {
  return consoleOutputDuring(() => sendRequest(new OpenRouter({ apiKey: API_KEY, serverURL })));
}

/**
 * Same, through `OpenRouterCore` and a standalone function. This path builds
 * exactly one client, so the hook runs once, before the constructor chooses
 * its logger.
 */
async function consoleOutputForCoreRequest(): Promise<string[]> {
  return consoleOutputDuring(() => modelsList(new OpenRouterCore({ apiKey: API_KEY, serverURL })));
}

function leaksAuthorization(lines: string[]): boolean {
  return lines.some((line) => line.includes(API_KEY));
}

describe('parseDebugEnv', () => {
  it('returns undefined when the variable is unset', () => {
    expect(parseDebugEnv(undefined)).toBeUndefined();
  });

  it('treats the empty string as false', () => {
    expect(parseDebugEnv('')).toBe(false);
  });

  it.each(TRUE_LIKE)('parses %j as true', (value) => {
    expect(parseDebugEnv(value)).toBe(true);
  });

  it.each(FALSE_LIKE)('parses %j as false', (value) => {
    expect(parseDebugEnv(value)).toBe(false);
  });

  it.each(UNRECOGNISED)('fails closed on unrecognised value %j', (value) => {
    expect(parseDebugEnv(value)).toBe(false);
  });
});

describe('readRawDebugEnv', () => {
  it('reads process.env', () => {
    setDebugEnv('false');
    expect(readRawDebugEnv()).toBe('false');
  });

  it('returns undefined when the variable is unset', () => {
    expect(readRawDebugEnv()).toBeUndefined();
  });

  it('reads Deno.env on Deno, as the generated env() does', () => {
    setDebugEnv('true');
    vi.stubGlobal('Deno', {
      env: { toObject: () => ({ OPENROUTER_DEBUG: 'off' }) },
    });
    expect(readRawDebugEnv()).toBe('off');
  });

  it('returns undefined when Deno.env is unavailable', () => {
    setDebugEnv('true');
    vi.stubGlobal('Deno', {});
    expect(readRawDebugEnv()).toBeUndefined();
  });

  it('returns undefined on a runtime with neither process nor Deno', () => {
    setDebugEnv('true');
    vi.stubGlobal('process', undefined);
    expect(readRawDebugEnv()).toBeUndefined();
  });
});

describe('OPENROUTER_DEBUG through the SDK (#519)', () => {
  it('reproduces the generated parser bug this hook corrects', () => {
    // If this fails after a regen, Speakeasy fixed the coercion upstream and
    // DebugEnvHook can be removed.
    setDebugEnv('false');
    expect(env().OPENROUTER_DEBUG).toBe(true);
  });

  it.each(FALSE_LIKE)('does not log when the variable is %j', async (value) => {
    setDebugEnv(value);
    const lines = await consoleOutputForRequest();
    expect(lines).toEqual([]);
    expect(env().OPENROUTER_DEBUG).toBe(false);
  });

  it.each(UNRECOGNISED)('does not log on unrecognised value %j', async (value) => {
    setDebugEnv(value);
    const lines = await consoleOutputForRequest();
    expect(lines).toEqual([]);
  });

  it('does not log when the variable is unset', async () => {
    const lines = await consoleOutputForRequest();
    expect(lines).toEqual([]);
    expect(env().OPENROUTER_DEBUG).toBeUndefined();
  });

  it('does not log when the variable is empty', async () => {
    setDebugEnv('');
    const lines = await consoleOutputForRequest();
    expect(lines).toEqual([]);
  });

  it.each(TRUE_LIKE)('logs to console when the variable is %j', async (value) => {
    setDebugEnv(value);
    const lines = await consoleOutputForRequest();
    expect(lines.some((line) => line.startsWith('> Request: GET'))).toBe(true);
    expect(lines.some((line) => line.startsWith('< Response: GET'))).toBe(true);
    expect(leaksAuthorization(lines)).toBe(true);
  });

  it('does not add a debugLogger to the SDK options', () => {
    setDebugEnv('false');
    const client = new OpenRouter({ apiKey: API_KEY, serverURL });
    expect(client._options.debugLogger).toBeUndefined();
  });

  it.each([undefined, '', 'false', '0', 'disabled', 'true'])(
    'keeps an explicit debugLogger when the variable is %j',
    async (value) => {
      setDebugEnv(value);
      const { logger, lines } = recorder();
      const consoleGroup = vi.spyOn(console, 'group').mockImplementation(() => {});
      const consoleLog = vi.spyOn(console, 'log').mockImplementation(() => {});

      const client = new OpenRouter({ apiKey: API_KEY, serverURL, debugLogger: logger });
      await sendRequest(client);

      expect(client._options.debugLogger).toBe(logger);
      expect(lines.some((line) => line.startsWith('> Request: GET'))).toBe(true);
      expect(consoleGroup).not.toHaveBeenCalled();
      expect(consoleLog).not.toHaveBeenCalled();
    },
  );

  it.each([...FALSE_LIKE, ...UNRECOGNISED])(
    'does not log through OpenRouterCore and a standalone function when the variable is %j',
    async (value) => {
      setDebugEnv(value);
      expect(await consoleOutputForCoreRequest()).toEqual([]);
    },
  );

  it('logs through OpenRouterCore and a standalone function when the variable is true', async () => {
    setDebugEnv('true');
    const lines = await consoleOutputForCoreRequest();
    expect(lines.some((line) => line.startsWith('> Request: GET'))).toBe(true);
  });

  // The init hooks run again each time a client creates a namespace. The
  // cases below check that a later change to the variable cannot change what
  // an existing client, or a later one in the same process, logs.
  it('does not start logging on an existing client when the variable is set later', async () => {
    const client = new OpenRouter({ apiKey: API_KEY, serverURL });
    expect(await consoleOutputDuring(() => client.models.list())).toEqual([]);

    // No resetEnv(): the generated env() keeps its memoized value.
    process.env['OPENROUTER_DEBUG'] = 'true';
    expect(await consoleOutputDuring(() => client.providers.list())).toEqual([]);
    expect(await consoleOutputForRequest()).toEqual([]);
  });

  it('keeps logging consistently when the variable is changed to false later', async () => {
    setDebugEnv('true');
    const client = new OpenRouter({ apiKey: API_KEY, serverURL });
    expect(await consoleOutputDuring(() => client.models.list())).not.toEqual([]);

    process.env['OPENROUTER_DEBUG'] = 'false';
    expect(await consoleOutputDuring(() => client.models.list())).not.toEqual([]);
    expect(await consoleOutputDuring(() => client.providers.list())).not.toEqual([]);
  });

  it('keeps logging off when the variable is changed from false to true later', async () => {
    setDebugEnv('false');
    const client = new OpenRouter({ apiKey: API_KEY, serverURL });
    expect(await consoleOutputDuring(() => client.models.list())).toEqual([]);

    process.env['OPENROUTER_DEBUG'] = 'true';
    expect(await consoleOutputDuring(() => client.providers.list())).toEqual([]);
  });

  it('does not throw or log when the raw environment cannot be read', async () => {
    setDebugEnv('false');
    // Seed the generated memo through process.env first: env() reads through
    // the same Deno global and would throw by itself, with or without the hook.
    expect(env().OPENROUTER_DEBUG).toBe(true);
    vi.stubGlobal('Deno', {
      env: {
        toObject: () => {
          throw new Error('Requires env access');
        },
      },
    });
    expect(() => new OpenRouter({ apiKey: API_KEY, serverURL })).not.toThrow();
    expect(await consoleOutputForRequest()).toEqual([]);
  });
});

describe('DebugEnvHook', () => {
  it('returns the options untouched when the variable is unset', () => {
    const parsed: Env = {};
    const hook = new DebugEnvHook({ readRaw: () => undefined, readEnv: () => parsed });
    const opts = {};
    expect(hook.sdkInit(opts)).toBe(opts);
    expect(parsed).toEqual({});
  });

  it('corrects the parsed environment for a false-like value', () => {
    const parsed: Env = { OPENROUTER_DEBUG: true };
    const hook = new DebugEnvHook({ readRaw: () => 'false', readEnv: () => parsed });
    const opts = {};
    expect(hook.sdkInit(opts)).toBe(opts);
    expect(parsed.OPENROUTER_DEBUG).toBe(false);
  });

  it('leaves a true-like value enabled', () => {
    const parsed: Env = { OPENROUTER_DEBUG: true };
    const hook = new DebugEnvHook({ readRaw: () => 'on', readEnv: () => parsed });
    const opts = {};
    expect(hook.sdkInit(opts)).toBe(opts);
    expect(parsed.OPENROUTER_DEBUG).toBe(true);
  });

  it('never turns logging on', () => {
    const parsed: Env = { OPENROUTER_DEBUG: false };
    const hook = new DebugEnvHook({ readRaw: () => 'true', readEnv: () => parsed });
    hook.sdkInit({});
    expect(parsed.OPENROUTER_DEBUG).toBe(false);

    const unset: Env = {};
    new DebugEnvHook({ readRaw: () => 'true', readEnv: () => unset }).sdkInit({});
    expect(unset).toEqual({});
  });

  it('turns logging off when the raw value cannot be read', () => {
    const parsed: Env = { OPENROUTER_DEBUG: true };
    const hook = new DebugEnvHook({
      readRaw: () => {
        throw new Error('Requires env access');
      },
      readEnv: () => parsed,
    });
    expect(() => hook.sdkInit({})).not.toThrow();
    expect(parsed.OPENROUTER_DEBUG).toBe(false);
  });

  it('turns logging off when the parser enabled it but the raw value is unset', () => {
    const parsed: Env = { OPENROUTER_DEBUG: true };
    new DebugEnvHook({ readRaw: () => undefined, readEnv: () => parsed }).sdkInit({});
    expect(parsed.OPENROUTER_DEBUG).toBe(false);
  });

  it('reads the raw value once per parsed environment', () => {
    const parsed: Env = { OPENROUTER_DEBUG: true };
    const readRaw = vi.fn(() => 'true');
    const hook = new DebugEnvHook({ readRaw, readEnv: () => parsed });
    hook.sdkInit({});
    readRaw.mockReturnValue('false');
    hook.sdkInit({});
    new DebugEnvHook({ readRaw, readEnv: () => parsed }).sdkInit({});
    expect(readRaw).toHaveBeenCalledTimes(1);
    expect(parsed.OPENROUTER_DEBUG).toBe(true);
  });

  // The cases below cover a future regen where writing to the object that
  // env() returns no longer changes what the constructor reads.
  it('falls back to a silent logger when env() returns a copy', () => {
    const hook = new DebugEnvHook({
      readRaw: () => 'false',
      readEnv: () => ({ OPENROUTER_DEBUG: true }),
    });
    expect(hook.sdkInit({}).debugLogger).toBe(silentLogger);
  });

  it('falls back to a silent logger when the parsed environment is frozen', () => {
    const parsed: Env = Object.freeze({ OPENROUTER_DEBUG: true });
    const hook = new DebugEnvHook({ readRaw: () => 'false', readEnv: () => parsed });
    expect(hook.sdkInit({}).debugLogger).toBe(silentLogger);
  });

  it('keeps an explicit debugLogger in the fallback case', () => {
    const { logger } = recorder();
    const hook = new DebugEnvHook({
      readRaw: () => 'false',
      readEnv: () => ({ OPENROUTER_DEBUG: true }),
    });
    const opts = { debugLogger: logger };
    expect(hook.sdkInit(opts)).toBe(opts);
  });

  it('leaves error reporting to the constructor when env() throws', () => {
    const hook = new DebugEnvHook({
      readRaw: () => 'false',
      readEnv: () => {
        throw new Error('invalid environment');
      },
    });
    const opts = {};
    expect(hook.sdkInit(opts)).toBe(opts);
  });
});
