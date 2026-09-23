import { cpSync, existsSync, mkdtempSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, relative } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { ESM, remainingBarrelImports, unbarrelImports } from '../../scripts/unbarrel-imports.js';

const FIXTURES = join(import.meta.dirname, 'fixtures/unbarrel-imports');

const listFiles = (dir: string): string[] =>
  readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => relative(dir, join(entry.parentPath, entry.name)))
    .sort();

describe('unbarrelImports', () => {
  const copies: string[] = [];
  const copyFixture = (name: string): string => {
    const dir = mkdtempSync(join(tmpdir(), 'unbarrel-'));
    cpSync(join(FIXTURES, name), dir, { recursive: true });
    copies.push(dir);
    return dir;
  };
  afterEach(() => {
    for (const dir of copies.splice(0)) rmSync(dir, { recursive: true, force: true });
  });

  it('rewrites input/ to match expected/', () => {
    const dir = copyFixture('input');
    expect(unbarrelImports(dir)).toBe(2);
    const expected = join(FIXTURES, 'expected');
    expect(listFiles(dir)).toEqual(listFiles(expected));
    for (const file of listFiles(expected)) {
      expect(readFileSync(join(dir, file), 'utf8'), file).toBe(readFileSync(join(expected, file), 'utf8'));
    }
  });

  it('leaves expected/ unchanged on a second run', () => {
    expect(unbarrelImports(copyFixture('expected'))).toBe(0);
  });

  it('refuses a namespace used as a value', () => {
    expect(() => unbarrelImports(copyFixture('namespace-as-value'))).toThrow(
      /namespace operations is used as a value/,
    );
  });
});

describe.skipIf(!existsSync(ESM))('compiled esm output', () => {
  it('has no namespace imports of the model barrels', () => {
    expect(remainingBarrelImports()).toEqual([]);
  });
});
