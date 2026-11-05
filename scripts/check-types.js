#!/usr/bin/env node
/**
 * Postinstall script to check if model types are stale.
 * Similar to update-browserslist-db, this warns developers when their
 * generated types are outdated.
 *
 * This script:
 * 1. Reads the MODEL_HASH from the generated types source file
 * 2. Fetches current models from the OpenRouter API
 * 3. Computes a hash of the current models
 * 4. Warns to stderr if the hashes don't match
 *
 * The check runs only in a repository checkout. The published package excludes
 * `src/` (see .npmignore), so installed copies skip it on purpose: the shipped
 * MODEL_HASH goes stale as soon as the model catalog changes, and the fix it
 * would suggest (`npx @openrouter/cli types`) regenerates the source file,
 * which an installed package doesn't have. A warning there could never be
 * cleared.
 *
 * Exit codes:
 * - 0: Types are up to date OR check was skipped
 * - Does NOT fail on stale types (to avoid breaking installs)
 */

import { createHash } from 'node:crypto';
import { realpathSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** Generated types source; present only in a repository checkout. */
export const TYPES_FILE_PATH = resolve(__dirname, '../src/types/models.ts');
const API_URL = 'https://openrouter.ai/api/v1/models';
const TIMEOUT_MS = 5000;

export const STALE_TYPES_WARNING =
  '\n' +
  '\x1b[33m' +
  'OpenRouter model types are outdated.\n' +
  'Run: npx @openrouter/cli types\n' +
  '\x1b[0m';

/**
 * Type guard for Node.js errors with error codes
 * @param {unknown} error
 * @returns {error is NodeJS.ErrnoException}
 */
function isNodeError(error) {
  return error instanceof Error && 'code' in error;
}

/**
 * Compute SHA-256 hash of sorted model IDs (first 16 chars)
 * @param {string[]} modelIds
 * @returns {string}
 */
export function computeHash(modelIds) {
  const sorted = [...modelIds].sort();
  const content = sorted.join('\n');
  const hash = createHash('sha256').update(content).digest('hex');
  return hash.substring(0, 16);
}

/**
 * Extract MODEL_HASH from types file content
 * @param {string} content
 * @returns {string | null}
 */
export function extractHash(content) {
  const match = content.match(/export const MODEL_HASH = '([a-f0-9]+)'/);
  return match?.[1] ?? null;
}

/**
 * Type guard for the /models response shape this script reads
 * @param {unknown} value
 * @returns {value is { data: Array<{ id: string }> }}
 */
function isModelsResponse(value) {
  return (
    typeof value === 'object' &&
    value !== null &&
    'data' in value &&
    Array.isArray(value.data) &&
    value.data.every(
      (/** @type {unknown} */ m) =>
        typeof m === 'object' && m !== null && 'id' in m && typeof m.id === 'string',
    )
  );
}

/**
 * Fetch model IDs from the API with timeout
 * @param {typeof fetch} fetchImpl
 * @returns {Promise<string[]>}
 */
export async function fetchModelIds(fetchImpl) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetchImpl(API_URL, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    if (!isModelsResponse(data)) {
      throw new Error('Invalid API response structure');
    }
    return data.data.map((m) => m.id);
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Read the types source file
 * @param {string} path
 * @returns {Promise<string | null>} file content, or null if it doesn't exist
 */
async function readTypesFile(path) {
  try {
    return await readFile(path, 'utf-8');
  } catch (error) {
    if (isNodeError(error) && error.code === 'ENOENT') {
      return null;
    }
    throw error;
  }
}

/**
 * Compare the generated MODEL_HASH with the live model catalog.
 * Never throws: any failure resolves to 'error' so installs never break.
 * @param {{
 *   typesFilePath: string,
 *   fetchModelIds: () => Promise<string[]>,
 *   warn: (message: string) => void,
 * }} deps
 * @returns {Promise<'skipped' | 'up-to-date' | 'stale' | 'error'>}
 */
export async function checkTypes(deps) {
  try {
    const content = await readTypesFile(deps.typesFilePath);
    // No source file means an installed package; skip on purpose (see header).
    if (content === null) {
      return 'skipped';
    }

    const existingHash = extractHash(content);
    if (!existingHash) {
      return 'skipped';
    }

    const currentHash = computeHash(await deps.fetchModelIds());
    if (existingHash === currentHash) {
      return 'up-to-date';
    }

    deps.warn(STALE_TYPES_WARNING);
    return 'stale';
  } catch {
    // Silently ignore errors - we don't want to break installs
    return 'error';
  }
}

async function main() {
  if (process.env.CI || process.env.OPENROUTER_SKIP_TYPE_CHECK) {
    return;
  }

  await checkTypes({
    typesFilePath: TYPES_FILE_PATH,
    fetchModelIds: () => fetchModelIds(fetch),
    warn: (message) => process.stderr.write(message),
  });
}

/**
 * True when this file is run directly (`node scripts/check-types.js`), not
 * imported, so tests can import the exports without triggering a check.
 * @returns {boolean}
 */
function isRunDirectly() {
  const entry = process.argv[1];
  if (!entry) return false;
  try {
    return realpathSync(entry) === realpathSync(__filename);
  } catch {
    return false;
  }
}

if (isRunDirectly()) {
  void main();
}
