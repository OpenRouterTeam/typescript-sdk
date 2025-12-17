import { describe, expect, it } from 'vitest';
import { normalizeInputToArray } from '../../src/lib/tool-types.js';

describe('tool-types', () => {
  describe('normalizeInputToArray', () => {
    it('should return empty array for undefined input', () => {
      const result = normalizeInputToArray(undefined);
      expect(result).toEqual([]);
    });

    it('should wrap string input in a user message object', () => {
      const result = normalizeInputToArray('Hello, world!');
      expect(result).toEqual([
        {
          role: 'user',
          content: 'Hello, world!',
        },
      ]);
    });

    it('should return array input as-is', () => {
      const input = [
        {
          role: 'user' as const,
          content: 'Hi',
        },
        {
          role: 'assistant' as const,
          content: 'Hello!',
        },
      ];
      const result = normalizeInputToArray(input);
      expect(result).toBe(input); // Same reference
    });

    it('should handle empty string input', () => {
      const result = normalizeInputToArray('');
      expect(result).toEqual([
        {
          role: 'user',
          content: '',
        },
      ]);
    });

    it('should handle empty array input', () => {
      const result = normalizeInputToArray([]);
      expect(result).toEqual([]);
    });
  });
});
