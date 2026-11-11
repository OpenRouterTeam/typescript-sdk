import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { ZodError } from 'zod/v4';
import { serverURLFromOptions } from '../../src/lib/config.js';
import { resetEnv } from '../../src/lib/env.js';
import { OpenRouter } from '../../src/sdk/sdk.js';

const PRODUCTION_URL = 'https://openrouter.ai/api/v1';
const ENV_URL = 'https://gateway.example.com/api/v1';
const EXPLICIT_URL = 'https://explicit.example.com/api/v1';

function baseURL(options: ConstructorParameters<typeof OpenRouter>[0] = {}) {
  return new OpenRouter(options)._baseURL?.toString().replace(/\/$/, '');
}

describe('OPENROUTER_BASE_URL default serverURL', () => {
  const original = process.env['OPENROUTER_BASE_URL'];

  beforeEach(() => {
    resetEnv();
  });

  afterEach(() => {
    if (typeof original === 'undefined') {
      delete process.env['OPENROUTER_BASE_URL'];
    } else {
      process.env['OPENROUTER_BASE_URL'] = original;
    }
    resetEnv();
  });

  it('falls back to the production URL when the env var is unset', () => {
    delete process.env['OPENROUTER_BASE_URL'];

    expect(baseURL()).toBe(PRODUCTION_URL);
  });

  it('uses the env var when no serverURL is supplied', () => {
    process.env['OPENROUTER_BASE_URL'] = ENV_URL;

    expect(baseURL()).toBe(ENV_URL);
  });

  it('applies the env var to namespaced sub-SDKs', () => {
    process.env['OPENROUTER_BASE_URL'] = ENV_URL;

    expect(new OpenRouter().chat._baseURL?.toString()).toBe(`${ENV_URL}/`);
  });

  it('prefers an explicit serverURL over the env var', () => {
    process.env['OPENROUTER_BASE_URL'] = ENV_URL;

    expect(baseURL({ serverURL: EXPLICIT_URL })).toBe(EXPLICIT_URL);
    expect(
      new OpenRouter({ serverURL: EXPLICIT_URL }).chat._baseURL?.toString(),
    ).toBe(`${EXPLICIT_URL}/`);
  });

  it('prefers an explicit server name over the env var', () => {
    process.env['OPENROUTER_BASE_URL'] = ENV_URL;

    expect(baseURL({ server: 'production' })).toBe(PRODUCTION_URL);
  });

  it('prefers serverURL over server over the env var', () => {
    process.env['OPENROUTER_BASE_URL'] = ENV_URL;

    expect(baseURL({ serverURL: EXPLICIT_URL, server: 'production' })).toBe(
      EXPLICIT_URL,
    );
  });

  it('rejects an env var that is not a valid URL with a ZodError', () => {
    process.env['OPENROUTER_BASE_URL'] = 'not-a-url';

    let caught: unknown;
    try {
      new OpenRouter();
    } catch (err) {
      caught = err;
    }

    expect(caught).toBeInstanceOf(ZodError);
    if (caught instanceof ZodError) {
      expect(caught.issues[0]?.path).toEqual(['OPENROUTER_BASE_URL']);
    }
  });

  it('rejects an invalid env var even when serverURL is explicit', () => {
    process.env['OPENROUTER_BASE_URL'] = 'not-a-url';

    expect(() => new OpenRouter({ serverURL: EXPLICIT_URL })).toThrow(ZodError);
  });

  it('rejects an empty env var', () => {
    process.env['OPENROUTER_BASE_URL'] = '';

    expect(() => new OpenRouter()).toThrow(ZodError);
  });

  // The generated helper only looks at the options it is given; the env var is
  // applied by BaseURLEnvHook during client construction.
  it('does not apply the env var to direct serverURLFromOptions calls', () => {
    process.env['OPENROUTER_BASE_URL'] = ENV_URL;

    expect(serverURLFromOptions({})?.toString().replace(/\/$/, '')).toBe(
      PRODUCTION_URL,
    );
  });
});
