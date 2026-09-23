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
 * The rewrite is layout-preserving: `ns.Name` becomes `ns_Name` (same length)
 * and the replacement imports occupy the original import's line, so every
 * other line and column is where tsc put it and `.js.map` files stay valid.
 * It refuses, rather than guesses, on anything it cannot rewrite exactly.
 */

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path, { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

export const ESM = join(resolve(dirname(fileURLToPath(import.meta.url)), '..'), 'esm');

/** Barrel directories, relative to the compiled root. */
const BARREL_DIRS = ['models', 'models/operations', 'models/errors'];

const barrelsIn = (root) => BARREL_DIRS.map((dir) => resolve(root, dir, 'index.js'));

class UnbarrelError extends Error {}

function fail(file, node, source, message) {
  const at = node ? `:${source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1}` : '';
  throw new UnbarrelError(`${file}${at}: ${message}`);
}

function parse(file) {
  return ts.createSourceFile(file, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
}

/** Every `.js` file under `dir`, recursively. */
function listModules(dir) {
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
 * A relative ESM specifier from `file` to `module`, always with `/` separators.
 * `pathApi` is injectable so the Windows behavior can be tested on any OS.
 */
export function specifierFor(file, module, pathApi = path) {
  const joined = pathApi.relative(pathApi.dirname(file), module).split(pathApi.sep).join('/');
  return joined.startsWith('.') ? joined : `./${joined}`;
}

const isExported = (statement) =>
  ts.getModifiers(statement)?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword) ?? false;

/** Names a leaf module defines, mapped to that module. Refuses forms it cannot follow. */
function moduleExports(module) {
  const source = parse(module);
  const names = new Map();
  for (const statement of source.statements) {
    if (ts.isExportDeclaration(statement)) {
      const empty = !statement.moduleSpecifier && statement.exportClause && ts.isNamedExports(statement.exportClause)
        && statement.exportClause.elements.length === 0;
      if (!empty) fail(module, statement, source, 'unsupported re-export in a model module');
      continue;
    }
    if (ts.isExportAssignment(statement)) fail(module, statement, source, 'default export in a model module');
    if (!isExported(statement)) continue;
    if (ts.isVariableStatement(statement)) {
      for (const decl of statement.declarationList.declarations) {
        if (!ts.isIdentifier(decl.name)) fail(module, decl, source, 'destructured export');
        names.set(decl.name.text, module);
      }
    } else if ((ts.isFunctionDeclaration(statement) || ts.isClassDeclaration(statement)) && statement.name) {
      names.set(statement.name.text, module);
    } else {
      fail(module, statement, source, 'unsupported export form');
    }
  }
  return names;
}

/**
 * Map each name exported by a barrel to the module that defines it, following
 * nested `export * from` barrels. Throws on a duplicate definition.
 */
function barrelExports(barrel, seen = new Set()) {
  if (seen.has(barrel)) return new Map();
  seen.add(barrel);
  const source = parse(barrel);
  const names = new Map();
  for (const statement of source.statements) {
    const isStarExport = ts.isExportDeclaration(statement) && !statement.exportClause && statement.moduleSpecifier
      && ts.isStringLiteral(statement.moduleSpecifier);
    if (!isStarExport) fail(barrel, statement, source, 'barrel may only contain `export * from "..."`');
    const target = resolveSpecifier(barrel, statement.moduleSpecifier.text);
    if (!target) fail(barrel, statement, source, 'barrel re-exports a package, expected a relative module');
    const nested = target.endsWith(`${sep}index.js`) ? barrelExports(target, seen) : moduleExports(target);
    for (const [name, module] of nested) {
      const prior = names.get(name);
      if (prior && prior !== module) fail(barrel, statement, source, `${name} is exported by both ${prior} and ${module}`);
      names.set(name, module);
    }
  }
  return names;
}

/** Namespace imports of one of `barrels` in `source`: `import * as ns from "<barrel>"`. */
function barrelImports(file, source, barrels) {
  const found = [];
  for (const statement of source.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier)) continue;
    const target = resolveSpecifier(file, statement.moduleSpecifier.text);
    if (!target || !barrels.includes(target)) continue;
    const clause = statement.importClause;
    const bindings = clause?.namedBindings;
    if (!clause || clause.name || !bindings || !ts.isNamespaceImport(bindings)) {
      fail(file, statement, source, 'barrel imported in an unsupported form (expected `import * as ns`)');
    }
    found.push({ statement, namespace: bindings.name.text, barrel: target });
  }
  return found;
}

/** Every identifier name declared or referenced in `source`, to rule out alias collisions. */
function identifierNames(source) {
  const names = new Set();
  const visit = (node) => {
    if (ts.isIdentifier(node)) names.add(node.text);
    ts.forEachChild(node, visit);
  };
  visit(source);
  return names;
}

/** Whether `node` names a property rather than referencing a binding. */
function isPropertyName(node) {
  const parent = node.parent;
  return (ts.isPropertyAccessExpression(parent) && parent.name === node)
    || ((ts.isPropertyAssignment(parent) || ts.isMethodDeclaration(parent) || ts.isPropertyDeclaration(parent)
      || ts.isGetAccessorDeclaration(parent) || ts.isSetAccessorDeclaration(parent)) && parent.name === node)
    || (ts.isBindingElement(parent) && parent.propertyName === node)
    || ((ts.isImportSpecifier(parent) || ts.isExportSpecifier(parent)) && parent.propertyName === node);
}

/** Rewrite one file's barrel imports. Returns the new source, or undefined when unchanged. */
function rewriteFile(file, exportsByBarrel) {
  const source = parse(file);
  const imports = barrelImports(file, source, [...exportsByBarrel.keys()]);
  if (imports.length === 0) return undefined;
  const byNamespace = new Map(imports.map((entry) => [entry.namespace, entry]));
  if (byNamespace.size !== imports.length) fail(file, imports[0].statement, source, 'namespace bound twice');
  const existing = identifierNames(source);
  const used = new Map([...byNamespace.keys()].map((ns) => [ns, new Set()]));
  const accesses = [];

  const visit = (node) => {
    if (ts.isImportDeclaration(node) && imports.some((entry) => entry.statement === node)) return;
    if (ts.isIdentifier(node) && byNamespace.has(node.text) && !isPropertyName(node)) {
      const parent = node.parent;
      if (!ts.isPropertyAccessExpression(parent) || parent.expression !== node || !ts.isIdentifier(parent.name)) {
        fail(file, node, source, `namespace ${node.text} is used as a value, cannot rewrite`);
      }
      if (ts.isShorthandPropertyAssignment(parent)) fail(file, node, source, `namespace ${node.text} used in shorthand`);
      const assignTarget = ts.isBinaryExpression(parent.parent) && parent.parent.left === parent
        && parent.parent.operatorToken.kind >= ts.SyntaxKind.FirstAssignment
        && parent.parent.operatorToken.kind <= ts.SyntaxKind.LastAssignment;
      if (assignTarget) fail(file, node, source, `assignment to ${node.text}.${parent.name.text}`);
      used.get(node.text).add(parent.name.text);
      accesses.push(parent);
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
      if (!module) fail(file, statement, source, `${namespace}.${name} is not exported by ${relative(dirname(file), barrel)}`);
      const alias = `${namespace}_${name}`;
      if (existing.has(alias)) fail(file, statement, source, `alias ${alias} already exists in this module`);
      if (!byModule.has(module)) byModule.set(module, []);
      byModule.get(module).push(name);
    }
    const replacement = [...byModule]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([module, names]) => {
        const specifiers = names.map((name) => `${name} as ${namespace}_${name}`).join(', ');
        return `import { ${specifiers} } from ${JSON.stringify(specifierFor(file, module))};`;
      })
      .join(' ');
    edits.push({ start: statement.getStart(source), end: statement.getEnd(), text: replacement });
  }
  for (const access of accesses) {
    edits.push({ start: access.getStart(source), end: access.getEnd(), text: `${access.expression.text}_${access.name.text}` });
  }

  const original = source.getFullText();
  let text = original;
  for (const edit of edits.sort((a, b) => b.start - a.start)) {
    text = text.slice(0, edit.start) + edit.text + text.slice(edit.end);
  }
  assertLayoutPreserved(file, original, text, imports.map(({ statement }) => source.getLineAndCharacterOfPosition(statement.getStart(source)).line));
  return text;
}

/**
 * Source maps stay valid only if every line other than a rewritten import
 * line keeps its content length and position. `ns.Name` → `ns_Name` is
 * length-neutral; import lines only exist at the top, above any mapping.
 */
function assertLayoutPreserved(file, before, after, importLines) {
  const a = before.split('\n');
  const b = after.split('\n');
  if (a.length !== b.length) throw new UnbarrelError(`${file}: rewrite changed the line count (${a.length} → ${b.length})`);
  const rewritten = new Set(importLines);
  for (let line = 0; line < a.length; line += 1) {
    if (!rewritten.has(line) && a[line].length !== b[line].length) {
      throw new UnbarrelError(`${file}:${line + 1}: rewrite changed a column position`);
    }
  }
}

/** Modules under `root` that import a model barrel as a namespace, as `path (namespace)`. */
export function remainingBarrelImports(root = ESM) {
  root = resolve(root);
  const barrels = barrelsIn(root);
  return listModules(root).flatMap((file) =>
    barrelImports(file, parse(file), barrels).map(({ namespace }) => `${relative(root, file).split(sep).join('/')} (${namespace})`),
  );
}

/** Rewrite every module under `root` in place. Returns the number of files changed. */
export function unbarrelImports(root = ESM) {
  root = resolve(root);
  const exportsByBarrel = new Map(barrelsIn(root).map((barrel) => [barrel, barrelExports(barrel)]));
  const rewrites = [];
  for (const file of listModules(root)) {
    const text = rewriteFile(file, exportsByBarrel);
    if (text !== undefined) rewrites.push([file, text]);
  }
  for (const [file, text] of rewrites) writeFileSync(file, text);
  const remaining = remainingBarrelImports(root);
  if (remaining.length > 0) throw new UnbarrelError(`barrel imports left after rewrite:\n${remaining.join('\n')}`);
  return rewrites.length;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    console.log(`unbarrel-imports: rewrote ${unbarrelImports()} files`);
  } catch (error) {
    if (!(error instanceof UnbarrelError)) throw error;
    console.error(`unbarrel-imports: ${error.message}`);
    process.exit(1);
  }
}
