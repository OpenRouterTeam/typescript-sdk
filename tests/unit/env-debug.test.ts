import { describe, it, expect } from 'vitest';
import { envSchema, resetEnv } from '../../src/lib/env.js';

describe('OPENROUTER_DEBUG env var parsing', () => {
  beforeEach(() => {
    resetEnv();
  });

  describe('explicit falsy values should disable debug logging', () => {
    it('should parse OPENROUTER_DEBUG=false as false', () => {
      const result = envSchema.parse({ OPENROUTER_DEBUG: 'false' });
      expect(result.OPENROUTER_DEBUG).toBe(false);
    });

    it('should parse OPENROUTER_DEBUG=0 as false', () => {
      const result = envSchema.parse({ OPENROUTER_DEBUG: '0' });
      expect(result.OPENROUTER_DEBUG).toBe(false);
    });

    it('should parse OPENROUTER_DEBUG=off as false', () => {
      const result = envSchema.parse({ OPENROUTER_DEBUG: 'off' });
      expect(result.OPENROUTER_DEBUG).toBe(false);
    });

    it('should parse OPENROUTER_DEBUG=no as false', () => {
      const result = envSchema.parse({ OPENROUTER_DEBUG: 'no' });
      expect(result.OPENROUTER_DEBUG).toBe(false);
    });

    it('should parse OPENROUTER_DEBUG="" as false', () => {
      const result = envSchema.parse({ OPENROUTER_DEBUG: '' });
      expect(result.OPENROUTER_DEBUG).toBe(false);
    });
  });

  describe('case-insensitive handling', () => {
    it('should parse OPENROUTER_DEBUG=FALSE as false', () => {
      const result = envSchema.parse({ OPENROUTER_DEBUG: 'FALSE' });
      expect(result.OPENROUTER_DEBUG).toBe(false);
    });

    it('should parse OPENROUTER_DEBUG=False as false', () => {
      const result = envSchema.parse({ OPENROUTER_DEBUG: 'False' });
      expect(result.OPENROUTER_DEBUG).toBe(false);
    });

    it('should parse OPENROUTER_DEBUG=OFF as false', () => {
      const result = envSchema.parse({ OPENROUTER_DEBUG: 'OFF' });
      expect(result.OPENROUTER_DEBUG).toBe(false);
    });
  });

  describe('explicit truthy values should enable debug logging', () => {
    it('should parse OPENROUTER_DEBUG=true as true', () => {
      const result = envSchema.parse({ OPENROUTER_DEBUG: 'true' });
      expect(result.OPENROUTER_DEBUG).toBe(true);
    });

    it('should parse OPENROUTER_DEBUG=1 as true', () => {
      const result = envSchema.parse({ OPENROUTER_DEBUG: '1' });
      expect(result.OPENROUTER_DEBUG).toBe(true);
    });

    it('should parse OPENROUTER_DEBUG=on as true', () => {
      const result = envSchema.parse({ OPENROUTER_DEBUG: 'on' });
      expect(result.OPENROUTER_DEBUG).toBe(true);
    });

    it('should parse OPENROUTER_DEBUG=yes as true', () => {
      const result = envSchema.parse({ OPENROUTER_DEBUG: 'yes' });
      expect(result.OPENROUTER_DEBUG).toBe(true);
    });
  });

  describe('actual boolean values passed programmatically', () => {
    it('should accept boolean true', () => {
      const result = envSchema.parse({ OPENROUTER_DEBUG: true });
      expect(result.OPENROUTER_DEBUG).toBe(true);
    });

    it('should accept boolean false', () => {
      const result = envSchema.parse({ OPENROUTER_DEBUG: false });
      expect(result.OPENROUTER_DEBUG).toBe(false);
    });
  });

  describe('undefined/unset behavior', () => {
    it('should be undefined when not set', () => {
      const result = envSchema.parse({});
      expect(result.OPENROUTER_DEBUG).toBeUndefined();
    });

    it('should be undefined when explicitly undefined', () => {
      const result = envSchema.parse({ OPENROUTER_DEBUG: undefined });
      expect(result.OPENROUTER_DEBUG).toBeUndefined();
    });
  });

  describe('regression: any non-empty string without the fix would be truthy', () => {
    it('should NOT parse OPENROUTER_DEBUG= as true (empty string edge case)', () => {
      const result = envSchema.parse({ OPENROUTER_DEBUG: '' });
      expect(result.OPENROUTER_DEBUG).toBe(false);
    });

    it('should parse OPENROUTER_DEBUG=disabled as true (arbitrary non-empty value)', () => {
      const result = envSchema.parse({ OPENROUTER_DEBUG: 'disabled' });
      expect(result.OPENROUTER_DEBUG).toBe(true);
    });
  });

  describe('resetEnv clears cache between tests', () => {
    it('should return fresh value after reset', () => {
      const result1 = envSchema.parse({ OPENROUTER_DEBUG: 'true' });
      expect(result1.OPENROUTER_DEBUG).toBe(true);
      resetEnv();
      const result2 = envSchema.parse({ OPENROUTER_DEBUG: 'false' });
      expect(result2.OPENROUTER_DEBUG).toBe(false);
    });
  });
});
