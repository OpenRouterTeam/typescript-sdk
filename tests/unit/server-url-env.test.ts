import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { serverURLFromOptions } from '../../src/lib/config.js';
import { resetEnv } from '../../src/lib/env.js';
import { OpenRouter } from '../../src/sdk/sdk.js';

const PRODUCTION_URL = 'https://openrouter.ai/api/v1';
const ENV_URL = 'https://gateway.example.com/api/v1';

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

    expect(baseURL({ serverURL: 'https://explicit.example.com/api/v1' })).toBe(
      'https://explicit.example.com/api/v1',
    );
  });

  it('prefers an explicit server name over the env var', () => {
    process.env['OPENROUTER_BASE_URL'] = ENV_URL;

    expect(baseURL({ server: 'production' })).toBe(PRODUCTION_URL);
  });

  it('does not apply the env var to direct serverURLFromOptions calls', () => {
    process.env['OPENROUTER_BASE_URL'] = ENV_URL;

    expect(serverURLFromOptions({})?.toString().replace(/\/$/, '')).toBe(
      PRODUCTION_URL,
    );
  });

  it('rejects an env var that is not a valid URL', () => {
    process.env['OPENROUTER_BASE_URL'] = 'not-a-url';

    expect(() => new OpenRouter()).toThrow(/OPENROUTER_BASE_URL/);
  });
});
