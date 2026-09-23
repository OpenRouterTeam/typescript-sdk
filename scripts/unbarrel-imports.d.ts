/** Absolute path to the compiled `esm/` directory. */
export declare const ESM: string;
/** Barrel directories, relative to `esm/`. */
export declare const BARREL_DIRS: readonly string[];
/** Every `.js` file under `dir`, recursively. */
export declare function listModules(dir: string): string[];
/** Namespace imports of a known barrel in `file`. */
export declare function barrelImports(file: string): { namespace: string; barrel: string }[];
