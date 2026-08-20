/**
 * Conversation state store.
 *
 * A session/conversation state manager for the `ConversationState` document
 * defined by the multi-turn state design (docs/multi-turn-state.md, DEV-127 /
 * PR #124). It exposes create / get / append-turn / expire / clear operations
 * over a pluggable persistence backend, serializing full turn data (messages,
 * tool results, and metadata) as JSON.
 *
 * Two backends ship with the SDK, both zero-dependency:
 *
 * - `InMemoryConversationStateStore` — process-local `Map` backend. Per the
 *   design RFC this is the documented recipe for testing and ephemeral
 *   single-process use; expiry is implemented by the store itself.
 * - `FileConversationStateStore` — JSON-file-per-conversation backend
 *   (Node.js only), useful for local durable execution without Redis.
 *
 * Any other backend (Redis, Postgres, …) can be implemented against the
 * `ConversationStateBackend` interface, and — per the design — TTL/expiry is
 * delegated to that backend where available.
 */

import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, normalize, resolve, sep } from 'node:path';
import { appendToMessages, createInitialState, updateState } from './conversation-state.js';
import type * as models from '../models/index.js';
import type { ConversationState, Tool } from './tool-types.js';

/**
 * Minimal, dependency-free persistence backend for the state store.
 * This is deliberately shaped like a subset of the design's `StateAccessor`
 * contract (load/save), keyed by conversation id.
 */
export interface ConversationStateBackend<TTools extends readonly Tool[] = readonly Tool[]> {
  /** Load a state document, or null if none exists for `id`. */
  load(id: string): Promise<ConversationState<TTools> | null>;
  /** Persist a state document (full-document replace). */
  save(id: string, state: ConversationState<TTools>): Promise<void>;
  /** Remove a state document. No-op if absent. */
  delete(id: string): Promise<void>;
  /** Optionally enumerate known conversation ids (enables store-wide `expire`). */
  list?(): Promise<string[]>;
}

export interface ConversationStateStoreOptions {
  /**
   * Time-to-live in milliseconds. When set, `get` returns null for — and
   * `expire` removes — conversations whose `updatedAt` is older than this.
   * Omit/0 to disable expiry.
   */
  ttlMs?: number;
  /** Clock override for testing. Defaults to `Date.now`. */
  now?: () => number;
}

export class ConversationStateNotFoundError extends Error {
  constructor(id: string) {
    super(`Conversation state not found: ${id}`);
    this.name = 'ConversationStateNotFoundError';
  }
}

export class CorruptedStateError extends Error {
  constructor(id: string, detail: string) {
    super(`Corrupted conversation state for "${id}": ${detail}`);
    this.name = 'CorruptedStateError';
  }
}

/**
 * Serialize a state document to a JSON string. All turn data (messages,
 * pending/unsent tool results, partial responses, metadata) lives on the
 * document, so JSON round-tripping is lossless for the defined schema.
 */
export function serializeState<TTools extends readonly Tool[]>(
  state: ConversationState<TTools>
): string {
  return JSON.stringify(state);
}

/**
 * Deserialize a JSON string into a `ConversationState`, validating the
 * structural invariants of the schema. Throws `CorruptedStateError` on
 * missing/invalid required fields.
 */
export function deserializeState<TTools extends readonly Tool[]>(
  raw: string,
  idForError = '<unknown>'
): ConversationState<TTools> {
  let obj: unknown;
  try {
    obj = JSON.parse(raw);
  } catch (err) {
    throw new CorruptedStateError(
      idForError,
      `invalid JSON (${err instanceof Error ? err.message : String(err)})`
    );
  }
  assertValidState<TTools>(obj, idForError);
  return obj;
}

function assertValidState<TTools extends readonly Tool[]>(
  obj: unknown,
  idForError: string
): asserts obj is ConversationState<TTools> {
  if (typeof obj !== 'object' || obj === null) {
    throw new CorruptedStateError(idForError, 'document is not an object');
  }
  const rec = obj as Record<string, unknown>;
  if (typeof rec.id !== 'string' || rec.id.length === 0) {
    throw new CorruptedStateError(idForError, 'missing or invalid "id"');
  }
  if (!Array.isArray(rec.messages)) {
    throw new CorruptedStateError(idForError, 'missing or invalid "messages"');
  }
  const validStatuses = new Set(['in_progress', 'awaiting_approval', 'interrupted', 'complete']);
  if (typeof rec.status !== 'string' || !validStatuses.has(rec.status)) {
    throw new CorruptedStateError(idForError, `missing or invalid "status" (${String(rec.status)})`);
  }
  if (typeof rec.createdAt !== 'number' || !Number.isFinite(rec.createdAt)) {
    throw new CorruptedStateError(idForError, 'missing or invalid "createdAt"');
  }
  if (typeof rec.updatedAt !== 'number' || !Number.isFinite(rec.updatedAt)) {
    throw new CorruptedStateError(idForError, 'missing or invalid "updatedAt"');
  }
}

/**
 * Create a `StateAccessor` bound to this store for one conversation id —
 * the documented consumer-supplied accessor pattern for `callModel`.
 */
export function createStateAccessor<TTools extends readonly Tool[] = readonly Tool[]>(
  store: ConversationStateStore<TTools>,
  id: string
): import('./tool-types.js').StateAccessor<TTools> {
  return {
    load: () => store.get(id),
    save: async (state) => {
      // Guard: never let a state document leak under a different id than the
      // one this accessor is bound to. ModelResult creates a random-id state
      // when load() returns null; saving it would strand the conversation.
      if (state.id !== id) {
        await store.put({ ...state, id });
        return;
      }
      await store.put(state);
    },
  };
}

/**
 * Session/conversation state manager.
 */
export class ConversationStateStore<TTools extends readonly Tool[] = readonly Tool[]> {
  protected readonly backend: ConversationStateBackend<TTools>;
  protected readonly ttlMs: number;
  protected readonly now: () => number;

  constructor(backend: ConversationStateBackend<TTools>, options: ConversationStateStoreOptions = {}) {
    this.backend = backend;
    this.ttlMs = options.ttlMs ?? 0;
    this.now = options.now ?? (() => Date.now());
  }

  /** Create a new conversation and persist its initial state. Returns the id. */
  async create(id?: string): Promise<ConversationState<TTools>> {
    const state = createInitialState<TTools>(id);
    await this.backend.save(state.id, state);
    return state;
  }

  /**
   * Get a conversation's current state, or null if missing or expired.
   * Throws `CorruptedStateError` if the stored document fails validation.
   */
  async get(id: string): Promise<ConversationState<TTools> | null> {
    const state = await this.backend.load(id);
    if (state === null) return null;
    assertValidState<TTools>(state, id);
    if (this.isExpired(state)) return null;
    return state;
  }

  /**
   * Append one turn's items (input messages and/or tool results already
   * converted to API items) to the conversation's message history and
   * persist. Creates the conversation first if it does not exist yet.
   */
  async appendTurn(
    id: string,
    newItems: models.BaseInputsUnion[],
    metadata?: Partial<Omit<ConversationState<TTools>, 'id' | 'createdAt' | 'updatedAt' | 'messages'>>
  ): Promise<ConversationState<TTools>> {
    const existing = await this.get(id);
    const base = existing ?? createInitialState<TTools>(id);
    const next = updateState<TTools>(base, {
      ...metadata,
      messages: appendToMessages(base.messages, newItems),
    });
    await this.backend.save(id, next);
    return next;
  }

  /** Persist a full state document (validated before write). */
  async put(state: ConversationState<TTools>): Promise<void> {
    assertValidState<TTools>(state, state.id ?? '<unknown>');
    await this.backend.save(state.id, state);
  }

  /** Remove any conversations older than the TTL. Returns ids removed. */
  async expire(ids?: string[]): Promise<string[]> {
    if (!this.ttlMs) return [];
    const candidates = ids ?? (await this.backend.list?.()) ?? [];
    if (candidates.length === 0) return [];
    const removed: string[] = [];
    for (const id of candidates) {
      const state = await this.backend.load(id);
      if (state && this.isExpired(state)) {
        await this.backend.delete(id);
        removed.push(id);
      }
    }
    return removed;
  }

  /** Delete a conversation's state outright. */
  async clear(id: string): Promise<void> {
    await this.backend.delete(id);
  }

  protected isExpired(state: ConversationState<TTools>): boolean {
    return this.ttlMs > 0 && this.now() - state.updatedAt > this.ttlMs;
  }
}

/**
 * In-memory backend (`Map` keyed by conversation id). Suitable for tests and
 * ephemeral single-process use. Documents are deep-copied on write and read
 * so callers can't mutate stored state by aliasing.
 */
export class InMemoryConversationStateBackend<TTools extends readonly Tool[] = readonly Tool[]>
  implements ConversationStateBackend<TTools>
{
  private readonly map = new Map<string, string>();

  async load(id: string): Promise<ConversationState<TTools> | null> {
    const raw = this.map.get(id);
    if (raw === undefined) return null;
    return deserializeState<TTools>(raw, id);
  }

  async save(id: string, state: ConversationState<TTools>): Promise<void> {
    this.map.set(id, serializeState(state));
  }

  async delete(id: string): Promise<void> {
    this.map.delete(id);
  }

  async list(): Promise<string[]> {
    return [...this.map.keys()];
  }

  keys(): string[] {
    return [...this.map.keys()];
  }
}

/**
 * JSON-file-per-conversation backend under a directory (Node.js only).
 * Writes are atomic-ish (write-to-temp then rename is intentionally avoided
 * in favor of a single awaited writeFile, matching the design's
 * fail-loudly-on-persistence-error stance).
 */
export class FileConversationStateBackend<TTools extends readonly Tool[] = readonly Tool[]>
  implements ConversationStateBackend<TTools>
{
  private readonly dir: string;

  constructor(dir: string) {
    this.dir = resolve(dir);
  }

  private pathFor(id: string): string {
    // Sanitize the id to prevent path traversal; ids are `conv_<uuid>` by
    // default but callers may supply arbitrary strings.
    const safe = normalize(id).replace(/[^a-zA-Z0-9_.-]/g, '_');
    const p = join(this.dir, `${safe}.json`);
    if (!p.startsWith(this.dir + sep)) {
      throw new CorruptedStateError(id, 'id resolves outside state directory');
    }
    return p;
  }

  async load(id: string): Promise<ConversationState<TTools> | null> {
    let raw: string;
    try {
      raw = await readFile(this.pathFor(id), 'utf8');
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') return null;
      throw err;
    }
    return deserializeState<TTools>(raw, id);
  }

  async save(id: string, state: ConversationState<TTools>): Promise<void> {
    const p = this.pathFor(id);
    await mkdir(dirname(p), { recursive: true });
    await writeFile(p, serializeState(state), 'utf8');
  }

  async delete(id: string): Promise<void> {
    await rm(this.pathFor(id), { force: true });
  }
}
