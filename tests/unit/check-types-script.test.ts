import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  checkTypes,
  computeHash,
  extractHash,
  STALE_TYPES_WARNING,
} from '../../scripts/check-types.js';

const MODEL_IDS = ['openai/gpt-5-mini', 'anthropic/claude-haiku-5.5'];

let dir: string;

beforeEach(async () => {
  dir = await mkdtemp(join(tmpdir(), 'check-types-'));
});

afterEach(async () => {
  await rm(dir, { recursive: true, force: true });
});

async function writeTypesFile(hash: string): Promise<string> {
  const path = join(dir, 'models.ts');
  await writeFile(path, `export const MODEL_HASH = '${hash}';\n`);
  return path;
}

/** Records warnings and fetch calls made by checkTypes. */
function recorder(fetchResult: () => Promise<string[]>) {
  const warnings: string[] = [];
  let fetchCount = 0;
  return {
    warnings,
    fetchCount: () => fetchCount,
    deps: {
      fetchModelIds: () => {
        fetchCount += 1;
        return fetchResult();
      },
      warn: (message: string) => {
        warnings.push(message);
      },
    },
  };
}

describe('scripts/check-types.js (#799)', () => {
  it('does not warn when the hash matches the live catalog', async () => {
    const typesFilePath = await writeTypesFile(computeHash(MODEL_IDS));
    const r = recorder(async () => MODEL_IDS);

    expect(await checkTypes({ typesFilePath, ...r.deps })).toBe('up-to-date');
    expect(r.warnings).toEqual([]);
  });

  it('warns when the hash is stale', async () => {
    const typesFilePath = await writeTypesFile('0000000000000000');
    const r = recorder(async () => MODEL_IDS);

    expect(await checkTypes({ typesFilePath, ...r.deps })).toBe('stale');
    expect(r.warnings).toEqual([STALE_TYPES_WARNING]);
  });

  it('skips without fetching when the source file is absent (installed package)', async () => {
    const r = recorder(async () => MODEL_IDS);

    expect(await checkTypes({ typesFilePath: join(dir, 'missing.ts'), ...r.deps })).toBe('skipped');
    expect(r.fetchCount()).toBe(0);
    expect(r.warnings).toEqual([]);
  });

  it('swallows fetch errors', async () => {
    const typesFilePath = await writeTypesFile('0000000000000000');
    const r = recorder(async () => {
      throw new Error('network down');
    });

    expect(await checkTypes({ typesFilePath, ...r.deps })).toBe('error');
    expect(r.warnings).toEqual([]);
  });

  it('hashes IDs order-independently', () => {
    expect(computeHash(['b', 'a'])).toBe(computeHash(['a', 'b']));
  });

  it('extracts MODEL_HASH from the generated file', () => {
    expect(extractHash("export const MODEL_HASH = 'abc123';")).toBe('abc123');
    expect(extractHash('no hash here')).toBeNull();
  });
});
