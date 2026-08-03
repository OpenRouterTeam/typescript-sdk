import { describe, expect, it } from 'vitest';

import {
  bytesFromBase64,
  bytesToBase64,
  stringFromBase64,
  stringFromBytes,
  stringToBase64,
  stringToBytes,
} from '../../src/lib/base64-codec.js';
import { zodInbound, zodOutbound } from '../../src/lib/base64.js';

describe('base64 codec', () => {
  it('preserves exact byte and string output', () => {
    const bytes = Uint8Array.of(0, 16, 127, 128, 255);

    expect(bytesToBase64(bytes)).toBe('ABB/gP8=');
    expect(bytesFromBase64('ABB/gP8=')).toEqual(bytes);
    expect(stringToBase64('hello 👋')).toBe('aGVsbG8g8J+Riw==');
    expect(stringFromBase64('aGVsbG8g8J+Riw==')).toBe('hello 👋');
    expect(stringFromBytes(stringToBytes('café 漢字'))).toBe('café 漢字');
  });

  it('preserves the malformed base64 error', () => {
    expect(() => bytesFromBase64('%%%')).toThrow(
      expect.objectContaining({
        name: 'InvalidCharacterError',
      }),
    );
  });

  it('keeps the Zod adapters behavior unchanged', () => {
    expect(zodOutbound.parse('hello 👋')).toEqual(stringToBytes('hello 👋'));
    expect(zodInbound.parse('aGVsbG8g8J+Riw==')).toEqual(stringToBytes('hello 👋'));
  });
});
