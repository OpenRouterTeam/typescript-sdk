import { expect } from 'vitest';

/**
 * Recursively checks that no keys prefixed with ~ exist in the given object.
 * Used to verify that JSON schemas have been properly sanitized.
 * @throws AssertionError if a ~ prefixed key is found
 */
export function assertNoTildeKeys(obj: unknown): void {
  if (obj === null || typeof obj !== 'object') {
    return;
  }

  if (Array.isArray(obj)) {
    for (const item of obj) {
      assertNoTildeKeys(item);
    }
    return;
  }

  for (const key of Object.keys(obj)) {
    expect(key.startsWith('~')).toBe(false);
    assertNoTildeKeys((obj as Record<string, unknown>)[key]);
  }
}
