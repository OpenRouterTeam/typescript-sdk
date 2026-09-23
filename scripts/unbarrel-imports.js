#!/usr/bin/env node
/**
 * Rewrite namespace barrel imports in the compiled `esm/` output.
 *
 * Speakeasy's generated code imports models through namespace barrels
 * (`import * as operations from "../models/operations/index.js"`). Under a
 * dynamic `import()` in a single-file bundle, bundlers cannot prune those
 * `export *` chains, so one function pulls in every model. This rewrites
 * each such import into named imports from the module that defines each
 * name, aliased as `<namespace>_<name>` so they never collide with local
 * declarations. The barrels themselves stay, for public consumers.
 *
 * Runs after `tsc` on `esm/`, so Speakeasy's generated `src/` is untouched.
 * Fails on anything it cannot resolve exactly.
 */

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

export const ESM = join(resolve(dirname(fileURLToPath(import.meta.url)), '..'), 'esm');

/** Barrel directories, relative to `esm/`. */
export const BARREL_DIRS = ['models', 'models/operations', 'models/errors'];

const barrelFile = (dir) => join(ESM, dir, 'index.js');

function parse(file) {
  return ts.createSourceFile(file, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
}

/** Every `.js` file under `dir`, recursively. */
export function listModules(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return listModules(full);
    return entry.name.endsWith('.js') ? [full] : [];
  });
}

/** Resolve a relative specifier from `file` to an absolute module path. */
function resolveSpecifier(file, specifier) {
  return specifier.startsWith('.') ? resolve(dirname(file), specifier) : undefined;
}

/**
 * Map each name exported by a barrel to the module that defines it, following
 * nested `export * from` barrels. Throws on a duplicate definition.
 */
function barrelExports(barrel, seen = new Set()) {
  if (seen.has(barrel)) return new Map();
  seen.add(barrel);
  const names = new Map();
  const add = (name, module) => {
    const prior = names.get(name);
    if (prior && prior !== module) throw new Error(`${name} is exported by both ${prior} and ${module}`);
    names.set(name, module);
  };
  for (const statement of parse(barrel).statements) {
    if (!ts.isExportDeclaration(statement) || statement.exportClause || !statement.moduleSpecifier) continue;
    const target = resolveSpecifier(barrel, statement.moduleSpecifier.text);
    const nested = target.endsWith('/index.js') ? barrelExports(target, seen) : moduleExports(target);
    for (const [name, module] of nested) add(name, module);
  }
  return names;
}

/** Names a leaf module defines, mapped to that module. */
function moduleExports(module) {
  const names = new Map();
  for (const statement of parse(module).statements) {
    const exported = ts.getModifiers?.(statement)?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
    if (!exported) continue;
    if (ts.isVariableStatement(statement)) {
      for (const decl of statement.declarationList.declarations) names.set(decl.name.getText(), module);
    } else if ((ts.isFunctionDeclaration(statement) || ts.isClassDeclaration(statement)) && statement.name) {
      names.set(statement.name.text, module);
    }
  }
  return names;
}

/** Namespace imports of a known barrel in `source`: `import * as ns from "<barrel>"`. */
export function barrelImports(file, source = parse(file)) {
  const barrels = new Set(BARREL_DIRS.map(barrelFile));
  return source.statements.flatMap((statement) => {
    if (!ts.isImportDeclaration(statement)) return [];
    const bindings = statement.importClause?.namedBindings;
    if (!bindings || !ts.isNamespaceImport(bindings)) return [];
    const target = resolveSpecifier(file, statement.moduleSpecifier.text);
    return target && barrels.has(target) ? [{ statement, namespace: bindings.name.text, barrel: target }] : [];
  });
}

/** Rewrite one file's barrel imports. Returns the new source, or undefined when unchanged. */
export function rewriteFile(file, exportsByBarrel) {
  const source = parse(file);
  const imports = barrelImports(file, source);
  if (imports.length === 0) return undefined;
  const namespaces = new Map(imports.map((entry) => [entry.namespace, entry]));
  const used = new Map([...namespaces.keys()].map((ns) => [ns, new Set()]));
  const accesses = [];
  const visit = (node) => {
    if (ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.expression) && namespaces.has(node.expression.text)) {
      used.get(node.expression.text).add(node.name.text);
      accesses.push(node);
      return;
    }
    if (ts.isIdentifier(node) && namespaces.has(node.text) && !ts.isNamespaceImport(node.parent)) {
      throw new Error(`${relative(ESM, file)}: namespace ${node.text} is used as a value, cannot rewrite`);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);

  const edits = [];
  for (const { statement, namespace, barrel } of imports) {
    const exported = exportsByBarrel.get(barrel);
    const byModule = new Map();
    for (const name of [...used.get(namespace)].sort()) {
      const module = exported.get(name);
      if (!module) throw new Error(`${relative(ESM, file)}: ${namespace}.${name} not exported by ${relative(ESM, barrel)}`);
      if (!byModule.has(module)) byModule.set(module, []);
      byModule.get(module).push(name);
    }
    const lines = [...byModule].sort(([a], [b]) => a.localeCompare(b)).map(([module, names]) => {
      let specifier = relative(dirname(file), module);
      if (!specifier.startsWith('.')) specifier = `./${specifier}`;
      return `import { ${names.map((name) => `${name} as ${namespace}_${name}`).join(', ')} } from "${specifier}";`;
    });
    edits.push({ start: statement.getStart(source), end: statement.getEnd(), text: lines.join('\n') });
  }
  for (const node of accesses) {
    edits.push({ start: node.getStart(source), end: node.getEnd(), text: `${node.expression.text}_${node.name.text}` });
  }
  let text = source.getFullText();
  for (const edit of edits.sort((a, b) => b.start - a.start)) {
    text = text.slice(0, edit.start) + edit.text + text.slice(edit.end);
  }
  return text;
}

function main() {
  const exportsByBarrel = new Map(BARREL_DIRS.map((dir) => [barrelFile(dir), barrelExports(barrelFile(dir))]));
  let rewritten = 0;
  for (const file of listModules(ESM)) {
    if (exportsByBarrel.has(file)) continue;
    const text = rewriteFile(file, exportsByBarrel);
    if (text === undefined) continue;
    writeFileSync(file, text);
    rewritten += 1;
  }
  console.log(`unbarrel-imports: rewrote ${rewritten} files`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
