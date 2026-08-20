import { mkdtemp, rm, writeFile, readFile, chmod } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve, sep } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  ConversationStateStore,
  CorruptedStateError,
  FileConversationStateBackend,
  InMemoryConversationStateBackend,
  createStateAccessor,
  deserializeState,
  serializeState,
} from '../../src/lib/conversation-state-store.js';
import { createInitialState } from '../../src/lib/conversation-state.js';
import type { ConversationState, Tool } from '../../src/lib/tool-types.js';

const userMsg = (text: string) => ({ role: 'user' as const, content: text });

describe('ConversationStateStore (in-memory backend)', () => {
  let backend: InMemoryConversationStateBackend;
  let store: ConversationStateStore;

  beforeEach(() => {
    backend = new InMemoryConversationStateBackend();
    store = new ConversationStateStore(backend);
  });

  describe('create', () => {
    it('creates and persists an initial state', async () => {
      const state = await store.create();
      expect(state.id).toMatch(/^conv_/);
      expect(state.status).toBe('in_progress');
      expect(state.messages).toEqual([]);
      expect(await store.get(state.id)).toEqual(state);
    });

    it('uses a caller-supplied id', async () => {
      const state = await store.create('my-conv');
      expect(state.id).toBe('my-conv');
      expect(await store.get('my-conv')).toEqual(state);
    });
  });

  describe('get', () => {
    it('returns null for a missing conversation', async () => {
      expect(await store.get('nope')).toBeNull();
    });

    it('returns null for expired conversations when ttlMs is set', async () => {
      vi.useFakeTimers();
      try {
        vi.setSystemTime(1_000_000);
        const timedStore = new ConversationStateStore(backend, { ttlMs: 1000 });
        await timedStore.create('exp');
        expect(await timedStore.get('exp')).not.toBeNull();
        vi.setSystemTime(1_000_000 + 1001); // past ttl relative to updatedAt
        expect(await timedStore.get('exp')).toBeNull();
      } finally {
        vi.useRealTimers();
      }
    });
  });

  describe('appendTurn', () => {
    it('creates the conversation if it does not exist', async () => {
      const state = await store.appendTurn('new-conv', [userMsg('hello')]);
      expect(state.id).toBe('new-conv');
      expect(state.messages).toHaveLength(1);
      expect(state.messages[0]).toEqual(userMsg('hello'));
    });

    it('appends to existing message history and bumps updatedAt', async () => {
      const created = await store.create('c1');
      await store.appendTurn('c1', [userMsg('first')]);
      const after = await store.appendTurn('c1', [{ role: 'assistant' as const, content: 'second' }]);
      expect(after.messages).toHaveLength(2);
      expect(after.updatedAt).toBeGreaterThanOrEqual(created.updatedAt);
      expect(after.id).toBe('c1');
      expect(after.createdAt).toBe(created.createdAt);
    });

    it('applies metadata updates (turn data) alongside messages', async () => {
      await store.create('c2');
      const after = await store.appendTurn('c2', [userMsg('x')], {
        previousResponseId: 'resp_123',
        status: 'complete',
      });
      expect(after.previousResponseId).toBe('resp_123');
      expect(after.status).toBe('complete');
    });

    it('serializes tool results as part of the turn data', async () => {
      await store.create('c3');
      const toolOutput = {
        type: 'function_call_output' as const,
        id: 'output_call_1',
        callId: 'call_1',
        output: JSON.stringify({ ok: true }),
      };
      await store.appendTurn('c3', [toolOutput], {
        unsentToolResults: [{ callId: 'call_1', name: 'do_thing', output: { ok: true } }],
      });
      const loaded = await store.get('c3');
      expect(loaded?.messages[0]).toEqual(toolOutput);
      expect(loaded?.unsentToolResults).toEqual([
        { callId: 'call_1', name: 'do_thing', output: { ok: true } },
      ]);
    });
  });

  describe('clear / expire', () => {
    it('clear deletes the conversation', async () => {
      const s = await store.create('gone');
      await store.clear(s.id);
      expect(await store.get(s.id)).toBeNull();
      expect(backend.keys()).toHaveLength(0);
    });

    it('clear is a no-op for missing ids', async () => {
      await expect(store.clear('nothing')).resolves.toBeUndefined();
    });

    it('expire removes conversations past the TTL and returns their ids', async () => {
      vi.useFakeTimers();
      try {
        const timedStore = new ConversationStateStore(backend, { ttlMs: 100 });
        vi.setSystemTime(5_000);
        await timedStore.create('old');
        vi.setSystemTime(5_200);
        await timedStore.create('fresh'); // fresh gets updatedAt = 5200
        const removed = await timedStore.expire(backend.keys());
        expect(removed).toEqual(['old']);
        expect(await timedStore.get('old')).toBeNull();
        expect(await timedStore.get('fresh')).not.toBeNull();
      } finally {
        vi.useRealTimers();
      }
    });

    it('expire returns empty when no TTL configured', async () => {
      await store.create('a');
      expect(await store.expire(backend.keys())).toEqual([]);
    });
  });

  describe('serialization', () => {
    it('round-trips a full state document', () => {
      const state = createInitialState('rt');
      state.previousResponseId = 'resp_x';
      state.pendingToolCalls = [{ id: 'c1', name: 'tool', arguments: { a: 1 } }];
      state.unsentToolResults = [{ callId: 'c1', name: 'tool', output: null, error: 'rejected' }];
      const raw = serializeState(state);
      expect(deserializeState(raw, 'rt')).toEqual(state);
    });

    it('deserialize rejects invalid JSON', () => {
      expect(() => deserializeState('{not json', 'bad')).toThrow(CorruptedStateError);
    });

    it('deserialize rejects structurally invalid documents', () => {
      expect(() => deserializeState('{"id":"x"}', 'x')).toThrow(CorruptedStateError);
      expect(() =>
        deserializeState(JSON.stringify({ id: 'x', messages: [], status: 'bogus', createdAt: 1, updatedAt: 1 }), 'x')
      ).toThrow(/status/);
      expect(() =>
        deserializeState(JSON.stringify({ id: 'x', messages: 'nope', status: 'complete', createdAt: 1, updatedAt: 1 }), 'x')
      ).toThrow(/messages/);
    });
  });

  describe('error handling', () => {
    it('get throws CorruptedStateError on corrupted stored state', async () => {
      await store.create('corrupt');
      // Poison the backend directly with a malformed document
      await backend.save('corrupt', { id: 'corrupt' } as unknown as ConversationState);
      await expect(store.get('corrupt')).rejects.toThrow(CorruptedStateError);
    });

    it('put rejects invalid documents before writing', async () => {
      await expect(
        store.put({ id: 'x', messages: [], status: 'weird' } as unknown as ConversationState)
      ).rejects.toThrow(CorruptedStateError);
      expect(backend.keys()).toHaveLength(0);
    });

    it('backend persistence failures propagate loudly', async () => {
      const failing = {
        load: async () => null,
        save: async () => {
          throw new Error('disk full');
        },
        delete: async () => {},
      };
      const loudStore = new ConversationStateStore(failing);
      await expect(loudStore.create()).rejects.toThrow('disk full');
    });

    it('stored state is isolated from caller mutation (deep copy via serialization)', async () => {
      const s = await store.create('iso');
      (s.messages as unknown[]).push(userMsg('mutated'));
      const loaded = await store.get('iso');
      expect(loaded?.messages).toHaveLength(0);
    });
  });

  describe('concurrent access', () => {
    it('sequential appendTurn calls never lose turns', async () => {
      const n = 25;
      for (let i = 0; i < n; i++) {
        await store.appendTurn('seq', [userMsg(`turn ${i}`)]);
      }
      const final = await store.get('seq');
      const msgs = final?.messages as Array<{ content: string }>;
      expect(msgs).toHaveLength(n);
      expect(msgs.map((m) => m.content)).toEqual(
        Array.from({ length: n }, (_, i) => `turn ${i}`)
      );
    });

    it('concurrent appends to distinct conversations do not interfere', async () => {
      const ids = ['a', 'b', 'c', 'd'];
      await Promise.all(
        ids.map(async (id) => {
          for (let i = 0; i < 5; i++) {
            await store.appendTurn(id, [userMsg(`${id}-${i}`)]);
          }
        })
      );
      for (const id of ids) {
        const s = await store.get(id);
        const msgs = (s?.messages ?? []) as Array<{ content: string }>;
        expect(msgs).toHaveLength(5);
        expect(msgs.every((m) => m.content.startsWith(`${id}-`))).toBe(true);
      }
    });

    it('concurrent appends to the same conversation are last-writer-wins per design (no data corruption)', async () => {
      // The design (RFC §6) documents single-writer-per-conversation; concurrent
      // whole-document writes are last-writer-wins. The store must never produce
      // a corrupted/invalid document, regardless of which write lands last.
      await store.create('contended');
      await Promise.all(
        Array.from({ length: 10 }, (_, i) =>
          store.appendTurn('contended', [userMsg(`writer ${i}`)])
        )
      );
      const final = await store.get('contended');
      // Document is always structurally valid and internally consistent
      expect(final).not.toBeNull();
      expect(final?.messages.length).toBeGreaterThanOrEqual(1);
      expect(deserializeState(serializeState(final!), 'contended')).toEqual(final);
    });
  });

  describe('createStateAccessor', () => {
    it('bridges the store to the StateAccessor contract used by callModel', async () => {
      const accessor = createStateAccessor(store, 'acc-1');
      expect(await accessor.load()).toBeNull();
      const state = createInitialState('acc-1');
      await accessor.save(state);
      expect(await accessor.load()).toEqual(state);
      // And the store sees the same document
      expect(await store.get('acc-1')).toEqual(state);
    });
  });
});

describe('FileConversationStateBackend', () => {
  let dir: string;
  let backend: FileConversationStateBackend;
  let store: ConversationStateStore;

  beforeEach(async () => {
    dir = await mkdtemp(join(tmpdir(), 'conv-state-'));
    backend = new FileConversationStateBackend(dir);
    store = new ConversationStateStore(backend);
  });

  afterEach(async () => {
    await rm(dir, { recursive: true, force: true });
  });

  it('persists and loads state across store instances (durability)', async () => {
    await store.appendTurn('durable', [userMsg('persisted')], { previousResponseId: 'r1' });
    const freshStore = new ConversationStateStore(new FileConversationStateBackend(dir));
    const loaded = await freshStore.get('durable');
    expect(loaded?.messages).toHaveLength(1);
    expect(loaded?.previousResponseId).toBe('r1');
  });

  it('returns null for missing files and clear removes them', async () => {
    expect(await store.get('absent')).toBeNull();
    await store.create('to-delete');
    await store.clear('to-delete');
    expect(await store.get('to-delete')).toBeNull();
  });

  it('surfaces corrupted files as CorruptedStateError', async () => {
    await store.create('broken');
    await writeFile(join(dir, 'broken.json'), '### not json ###', 'utf8');
    await expect(store.get('broken')).rejects.toThrow(CorruptedStateError);
  });

  it('sanitizes ids to prevent path traversal', async () => {
    const evil = '../../etc/passwd';
    await store.appendTurn(evil, [userMsg('x')]);
    const loaded = await store.get(evil);
    expect(loaded).not.toBeNull();
    // The file lands inside the state dir with a sanitized name, never outside it
    const { readdir } = await import('node:fs/promises');
    const files = await readdir(dir);
    expect(files).toHaveLength(1);
    expect(files[0]).toBe('.._.._etc_passwd.json');
    expect(resolve(dir, files[0]!).startsWith(resolve(dir) + sep)).toBe(true);
    // The stored document keeps the original id for round-trip fidelity
    const doc = JSON.parse(await readFile(join(dir, files[0]!), 'utf8'));
    expect(doc.id).toBe(evil);
  });

  it('non-ENOENT read errors propagate', async () => {
    await store.create('protected');
    const filePath = join(dir, 'protected.json');
    await chmod(filePath, 0o000);
    try {
      await expect(store.get('protected')).rejects.toThrow();
    } finally {
      await chmod(filePath, 0o644);
    }
  });
});
