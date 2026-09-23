import { cpSync, existsSync, mkdtempSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path, { join, relative } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import {
  ESM,
  remainingBarrelImports,
  specifierFor,
  unbarrelImports,
} from '../../scripts/unbarrel-imports.js';

const FIXTURES = join(import.meta.dirname, 'fixtures/unbarrel-imports');

const listFiles = (dir: string): string[] =>
  readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => relative(dir, join(entry.parentPath, entry.name)))
    .sort();

const read = (dir: string, file: string): string => readFileSync(join(dir, file), 'utf8');

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
      expect(read(dir, file), file).toBe(read(expected, file));
    }
  });

  it('keeps every non-import line at the same length, so source maps stay valid', () => {
    const input = join(FIXTURES, 'input');
    const expected = join(FIXTURES, 'expected');
    for (const file of listFiles(input)) {
      const before = read(input, file).split('\n');
      const after = read(expected, file).split('\n');
      expect(after.length, file).toBe(before.length);
      before.forEach((line, i) => {
        if (!line.startsWith('import ')) expect(after[i]?.length, `${file}:${i + 1}`).toBe(line.length);
      });
    }
  });

  it('leaves expected/ unchanged on a second run', () => {
    expect(unbarrelImports(copyFixture('expected'))).toBe(0);
  });

  it.each([
    ['namespace-as-value', /unsupported use of namespace operations/],
    ['namespace-assignment', /mutation of operations\.SendChatRequest\$outboundSchema/],
    ['namespace-mutation', /mutation of operations\.SendChatRequest\$outboundSchema/],
    ['namespace-delete', /mutation of operations\.SendChatRequest\$outboundSchema/],
    ['namespace-destructure', /mutation of operations\.SendChatRequest\$outboundSchema/],
    ['unrecognized-barrel', /namespace import of unrecognized barrel/],
    ['alias-collision', /alias operations_SendChatRequest\$outboundSchema already exists/],
    ['unknown-name', /operations\.SendChatRequst\$outboundSchema is not exported/],
    ['named-barrel-import', /barrel imported in an unsupported form/],
  ])('refuses %s without writing anything', (name, message) => {
    const dir = copyFixture(name);
    const before = listFiles(dir).map((file) => read(dir, file));
    expect(() => unbarrelImports(dir)).toThrow(message);
    expect(listFiles(dir).map((file) => read(dir, file))).toEqual(before);
  });
});

describe('specifierFor', () => {
  it('uses forward slashes even with Windows paths', () => {
    expect(
      specifierFor('C:\\sdk\\esm\\funcs\\chatSend.js', 'C:\\sdk\\esm\\models\\errors\\badrequest.js', path.win32),
    ).toBe('../models/errors/badrequest.js');
  });

  it('prefixes same-directory modules with ./', () => {
    expect(specifierFor('/sdk/esm/models/a.js', '/sdk/esm/models/b.js', path.posix)).toBe('./b.js');
  });

  it('prefixes dot-directory modules with ./', () => {
    expect(specifierFor('/sdk/esm/a.js', '/sdk/esm/.cache/b.js', path.posix)).toBe('./.cache/b.js');
  });
});

describe.skipIf(!existsSync(ESM))('compiled esm output', () => {
  it('has no namespace imports of the model barrels', () => {
    expect(remainingBarrelImports()).toEqual([]);
  });
});
