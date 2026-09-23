import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
// @ts-expect-error -- plain ESM build script, no type declarations
import { BARREL_DIRS, renderBarrel, SRC } from '../../scripts/barrels.mjs';

const barrelFiles = new Set<string>(
  (BARREL_DIRS as string[]).map((dir) => join(SRC as string, dir, 'index.ts')),
);

/* Runtime imports only: `import type` and `export type` are erased by tsc. */
const RUNTIME_IMPORT =
  /^\s*(?:import|export)\s+(?!type\b)[^'"]*?\bfrom\s+['"]([^'"]+)['"]|\bimport\(\s*['"]([^'"]+)['"]\s*\)/gm;

function listSourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return listSourceFiles(full);
    return entry.name.endsWith('.ts') ? [full] : [];
  });
}

describe('model barrels', () => {
  it.each(BARREL_DIRS as string[])('src/%s/index.ts matches scripts/barrels.mjs', (dir) => {
    const committed = readFileSync(join(SRC as string, dir, 'index.ts'), 'utf8');
    expect(committed).toBe(renderBarrel(dir));
  });

  it('are never imported at runtime from inside src/', () => {
    const offenders = listSourceFiles(SRC as string)
      .filter((file) => !barrelFiles.has(file))
      .flatMap((file) =>
        [...readFileSync(file, 'utf8').matchAll(RUNTIME_IMPORT)]
          .map((match) => match[1] ?? match[2] ?? '')
          .filter((specifier) => specifier.startsWith('.'))
          .filter((specifier) =>
            barrelFiles.has(resolve(dirname(file), specifier.replace(/\.js$/, '.ts'))),
          )
          .map((specifier) => `${relative(SRC as string, file)} -> ${specifier}`),
      );
    expect(offenders).toEqual([]);
  });
});
