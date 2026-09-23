import { existsSync } from 'node:fs';
import { relative } from 'node:path';
import { describe, expect, it } from 'vitest';
import { barrelImports, ESM, listModules } from '../../scripts/unbarrel-imports.js';

describe.skipIf(!existsSync(ESM))('compiled esm output', () => {
  it('has no namespace imports of the model barrels', () => {
    const offenders = listModules(ESM).flatMap((file) =>
      barrelImports(file).map(({ namespace }) => `${relative(ESM, file)} (${namespace})`),
    );
    expect(offenders).toEqual([]);
  });
});
