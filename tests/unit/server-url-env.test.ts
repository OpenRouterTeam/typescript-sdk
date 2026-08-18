import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { serverURLFromOptions } from '../../src/lib/config.js';
import { resetEnv } from '../../src/lib/env.js';

const PRODUCTION_URL = 'https://openrouter.ai/api/v1';

describe('serverURLFromOptions with OPENROUTER_BASE_URL', () => {
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

    expect(serverURLFromOptions({})?.toString()).toBe(`${PRODUCTION_URL}`);
  });

  it('uses the env var when no serverURL is supplied', () => {
    process.env['OPENROUTER_BASE_URL'] = 'https://gateway.example.com/api/v1';

    expect(serverURLFromOptions({})?.toString()).toBe(
      'https://gateway.example.com/api/v1',
    );
  });

  it('prefers an explicit serverURL over the env var', () => {
    process.env['OPENROUTER_BASE_URL'] = 'https://gateway.example.com/api/v1';

    expect(
      serverURLFromOptions({ serverURL: 'https://explicit.example.com/api/v1' })
        ?.toString(),
    ).toBe('https://explicit.example.com/api/v1');
  });

  it('prefers an explicit server name over the env var', () => {
    process.env['OPENROUTER_BASE_URL'] = 'https://gateway.example.com/api/v1';

    expect(serverURLFromOptions({ server: 'production' })?.toString()).toBe(
      PRODUCTION_URL,
    );
  });

  it('rejects an env var that is not a valid URL', () => {
    process.env['OPENROUTER_BASE_URL'] = 'not-a-url';

    expect(() => serverURLFromOptions({})).toThrow();
  });
});
