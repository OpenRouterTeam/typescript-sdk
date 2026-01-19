#!/usr/bin/env node
/**
 * Postinstall script to check if model types are stale.
 * Similar to update-browserslist-db, this warns users when their
 * generated types are outdated.
 *
 * This script:
 * 1. Reads the MODEL_HASH from the generated types file
 * 2. Fetches current models from the OpenRouter API
 * 3. Computes a hash of the current models
 * 4. Warns to stderr if the hashes don't match
 *
 * Exit codes:
 * - 0: Types are up to date OR check was skipped
 * - Does NOT fail on stale types (to avoid breaking installs)
 */

import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const TYPES_FILE_PATH = resolve(__dirname, '../src/types/models.ts');
const API_URL = 'https://openrouter.ai/api/v1/models';
const TIMEOUT_MS = 5000;

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
function computeHash(modelIds) {
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
function extractHash(content) {
  const match = content.match(/export const MODEL_HASH = '([a-f0-9]+)'/);
  return match ? match[1] : null;
}

/**
 * Fetch models from API with timeout
 * @returns {Promise<string[]>}
 */
async function fetchModels() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(API_URL, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    if (!data?.data || !Array.isArray(data.data)) {
      throw new Error('Invalid API response structure');
    }
    return data.data.map((m) => m.id);
  } finally {
    clearTimeout(timeout);
  }
}

async function main() {
  if (process.env.CI) {
    return;
  }

  if (process.env.OPENROUTER_SKIP_TYPE_CHECK) {
    return;
  }

  try {
    /** @type {string | null} */
    let existingHash;
    try {
      const content = await readFile(TYPES_FILE_PATH, 'utf-8');
      existingHash = extractHash(content);
    } catch (error) {
      if (isNodeError(error) && error.code === 'ENOENT') {
        return;
      }
      throw error;
    }

    if (!existingHash) {
      return;
    }

    const modelIds = await fetchModels();
    const currentHash = computeHash(modelIds);

    if (existingHash !== currentHash) {
      process.stderr.write(
        '\n' +
          '\x1b[33m' +
          'OpenRouter model types are outdated.\n' +
          'Run: npx @openrouter/cli types\n' +
          '\x1b[0m',
      );
    }
  } catch {
    // Silently ignore errors - we don't want to break installs
  }
}

main();
