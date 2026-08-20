/**
 * Multi-turn conversation integration tests (DEV-127 / task t_abd9bd76).
 *
 * These exercise the full turn pipeline (callModelWithState -> callModel ->
 * ModelResult -> betaResponsesSend) with the API call mocked at the
 * betaResponsesSend boundary, and cover the scenarios the unit tests in
 * call-model-with-state.test.ts don't:
 *
 *  - a 3+ turn conversation retaining context from EVERY earlier turn
 *  - parallel conversations (interleaved turns) keeping isolated state
 *  - state expiry/cleanup: TTL expiry fallback mid-conversation and
 *    store.expire()/store.clear() semantics
 *  - behavior when state is missing or corrupted
 *
 * Everything runs in the unit project (no live API key needed), so these
 * tests run in CI via `npm test`.
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { OpenRouterCore } from '../../src/core.js';

// Mock the API boundary. The path must match the import specifier used by
// model-result.ts.
vi.mock('../../src/funcs/betaResponsesSend.js', () => ({
  betaResponsesSend: vi.fn(),
}));

import { betaResponsesSend } from '../../src/funcs/betaResponsesSend.js';
import { callModelWithState } from '../../src/funcs/call-model-with-state.js';
import {
  ConversationStateStore,
  CorruptedStateError,
  FileConversationStateBackend,
  InMemoryConversationStateBackend,
  createStateAccessor,
} from '../../src/lib/conversation-state-store.js';
import { EventStream } from '../../src/lib/event-streams.js';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const betaResponsesSendMock = vi.mocked(betaResponsesSend);

// Minimal OpenRouterCore stand-in: ModelResult only passes this through to
// betaResponsesSend, which is mocked.
const client = {} as OpenRouterCore;

function makeResponse(id: string, text: string) {
  return {
    id,
    object: 'response',
    createdAt: 1700000000,
    completedAt: 1700000001,
    status: 'completed',
    error: null,
    incompleteDetails: null,
    instructions: null,
    metadata: null,
    model: 'test-model',
    output: [
      {
        type: 'message',
        id: `msg_${id}`,
        status: 'completed',
        role: 'assistant',
        content: [{ type: 'output_text', text, annotations: [] }],
      },
    ],
    parallelToolCalls: true,
    toolChoice: 'auto',
    tools: [],
    temperature: 1,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
  };
}

/** Build an SSE EventStream carrying a single response.completed event. */
function sseStreamFor(response: ReturnType<typeof makeResponse>): EventStream<unknown> {
  const sseText =
    `event: response.completed\n` +
    `data: ${JSON.stringify({ type: 'response.completed', response })}\n\n`;
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(sseText));
      controller.close();
    },
  });
  return new EventStream(
    body,
    (msg) => ({ done: false, value: JSON.parse(msg.data ?? '{}') }),
  ) as EventStream<unknown>;
}

function queueApiResponse(response: ReturnType<typeof makeResponse>) {
  betaResponsesSendMock.mockResolvedValueOnce({
    ok: true,
    value: sseStreamFor(response),
  } as Awaited<ReturnType<typeof betaResponsesSend>>);
}

/** The resolved request input captured by mocked API call `n` (0-based). */
function apiRequestInput(n: number): unknown {
  const call = betaResponsesSendMock.mock.calls[n];
  const args = call?.[1] as { responsesRequest: { input?: unknown } };
  return args?.responsesRequest?.input;
}

function makeStore(ttlMs?: number) {
  return new ConversationStateStore(
    new InMemoryConversationStateBackend(),
    ttlMs !== undefined ? { ttlMs } : {},
  );
}

/** Run one turn through the full pipeline and return its text. */
async function runTurn(
  store: ConversationStateStore,
  conversationId: string,
  input: string,
): Promise<string> {
  const result = callModelWithState(client, {
    model: 'test-model',
    input,
    conversationId,
    stateStore: store,
  });
  return result.getText();
}

beforeEach(() => {
  betaResponsesSendMock.mockReset();
});

describe('multi-turn integration — 3+ turn conversation', () => {
  it('retains context from every earlier turn across three turns', async () => {
    const store = makeStore();
    queueApiResponse(makeResponse('resp_1', 'Got it: Ada, blue.'));
    queueApiResponse(makeResponse('resp_2', 'Your color is blue.'));
    queueApiResponse(makeResponse('resp_3', 'You are Ada and you like blue.'));

    await runTurn(store, 'conv-three', 'My name is Ada and my favorite color is blue.');
    await runTurn(store, 'conv-three', 'What is my favorite color?');
    const text = await runTurn(store, 'conv-three', 'Summarize what you know about me.');
    expect(text).toContain('Ada');

    // Turn 3's API request must include both earlier turns' inputs AND
    // outputs, in conversation order, plus the new input.
    const thirdInput = apiRequestInput(2) as Array<Record<string, unknown>>;
    expect(Array.isArray(thirdInput)).toBe(true);
    const serialized = JSON.stringify(thirdInput);
    expect(serialized).toContain('My name is Ada and my favorite color is blue.');
    expect(serialized).toContain('Got it: Ada, blue.');
    expect(serialized).toContain('What is my favorite color?');
    expect(serialized).toContain('Your color is blue.');
    expect(serialized).toContain('Summarize what you know about me.');

    // Ordering: user/assistant alternate in turn order.
    const texts = thirdInput.map((item) => {
      if (typeof item === 'string') return item;
      const content = (item as { content?: Array<{ text?: string }> }).content;
      return content?.[0]?.text ?? JSON.stringify(item);
    });
    const turn1User = texts.findIndex((t) => t.includes('favorite color is blue'));
    const turn1Assistant = texts.findIndex((t) => t.includes('Got it: Ada'));
    const turn2User = texts.findIndex((t) => t.includes('What is my favorite color?'));
    const turn2Assistant = texts.findIndex((t) => t.includes('Your color is blue.'));
    const turn3User = texts.findIndex((t) => t.includes('Summarize'));
    expect(turn1User).toBeGreaterThanOrEqual(0);
    expect(turn1Assistant).toBeGreaterThan(turn1User);
    expect(turn2User).toBeGreaterThan(turn1Assistant);
    expect(turn2Assistant).toBeGreaterThan(turn2User);
    expect(turn3User).toBeGreaterThan(turn2Assistant);

    // Accumulated state covers all three turns and tracks the latest
    // response id.
    const state = await store.get('conv-three');
    expect(state).not.toBeNull();
    expect(state!.messages).toHaveLength(6); // 3 user + 3 assistant
    expect(state!.previousResponseId).toBe('resp_3');
    expect(state!.status).toBe('complete');
  });
});

describe('multi-turn integration — parallel conversations', () => {
  it('keeps state isolated across interleaved conversations', async () => {
    const store = makeStore();
    queueApiResponse(makeResponse('resp_a1', 'Hi Alice!'));
    queueApiResponse(makeResponse('resp_b1', 'Hi Bob!'));
    queueApiResponse(makeResponse('resp_a2', 'Alice, as I said.'));
    queueApiResponse(makeResponse('resp_b2', 'Bob, as I said.'));

    // Interleave turns between two conversations.
    await runTurn(store, 'conv-alice', 'I am Alice.');
    await runTurn(store, 'conv-bob', 'I am Bob.');
    await runTurn(store, 'conv-alice', 'Who am I?');
    await runTurn(store, 'conv-bob', 'Who am I?');

    // Each conversation's second turn sees only its own first turn.
    const aliceSecond = JSON.stringify(apiRequestInput(2));
    expect(aliceSecond).toContain('I am Alice.');
    expect(aliceSecond).toContain('Hi Alice!');
    expect(aliceSecond).toContain('Who am I?');
    expect(aliceSecond).not.toContain('Bob');

    const bobSecond = JSON.stringify(apiRequestInput(3));
    expect(bobSecond).toContain('I am Bob.');
    expect(bobSecond).toContain('Hi Bob!');
    expect(bobSecond).toContain('Who am I?');
    expect(bobSecond).not.toContain('Alice');

    // The store holds exactly two independent documents.
    const alice = await store.get('conv-alice');
    const bob = await store.get('conv-bob');
    expect(alice!.messages).toHaveLength(4);
    expect(bob!.messages).toHaveLength(4);
    expect(alice!.previousResponseId).toBe('resp_a2');
    expect(bob!.previousResponseId).toBe('resp_b2');
    expect(JSON.stringify(alice!.messages)).not.toContain('Bob');
    expect(JSON.stringify(bob!.messages)).not.toContain('Alice');
  });

  it('handles concurrent first turns on the same store without cross-talk', async () => {
    const store = makeStore();
    queueApiResponse(makeResponse('resp_c1', 'one'));
    queueApiResponse(makeResponse('resp_c2', 'two'));

    // Two conversations start truly concurrently (no awaiting between the
    // pipeline entry points).
    const [t1, t2] = await Promise.all([
      runTurn(store, 'conv-par-1', 'alpha'),
      runTurn(store, 'conv-par-2', 'beta'),
    ]);
    expect(t1 + t2).toMatch(/one|two/);

    const s1 = await store.get('conv-par-1');
    const s2 = await store.get('conv-par-2');
    expect(s1!.id).toBe('conv-par-1');
    expect(s2!.id).toBe('conv-par-2');
    expect(JSON.stringify(s1!.messages)).toContain('alpha');
    expect(JSON.stringify(s1!.messages)).not.toContain('beta');
    expect(JSON.stringify(s2!.messages)).toContain('beta');
    expect(JSON.stringify(s2!.messages)).not.toContain('alpha');
  });
});

describe('multi-turn integration — state expiry and cleanup', () => {
  it('mid-conversation TTL expiry starts a fresh thread under the same id', async () => {
    const store = makeStore(20); // 20ms TTL
    queueApiResponse(makeResponse('resp_e1', 'remembered'));
    queueApiResponse(makeResponse('resp_e2', 'fresh again'));

    await runTurn(store, 'conv-exp', 'First message.');
    const before = await store.get('conv-exp');
    expect(before!.messages).toHaveLength(2);

    // Let the conversation expire, then continue "the same" conversation.
    await new Promise((r) => setTimeout(r, 30));
    expect(await store.get('conv-exp')).toBeNull(); // expired

    await runTurn(store, 'conv-exp', 'Second message.');
    const after = await store.get('conv-exp');
    expect(after).not.toBeNull();
    expect(after!.id).toBe('conv-exp');
    // Fresh thread: only the post-expiry turn survives; the model's second
    // request must NOT contain the expired first turn.
    expect(after!.messages).toHaveLength(2);
    const secondInput = JSON.stringify(apiRequestInput(1));
    expect(secondInput).not.toContain('First message.');
    expect(secondInput).toContain('Second message.');
  });

  it('store.expire() removes only stale conversations and reports removed ids', async () => {
    const store = makeStore(20);
    queueApiResponse(makeResponse('resp_x1', 'old'));
    queueApiResponse(makeResponse('resp_x2', 'new'));

    await runTurn(store, 'conv-old', 'old turn');
    await new Promise((r) => setTimeout(r, 30));
    await runTurn(store, 'conv-new', 'new turn');

    const removed = await store.expire();
    expect(removed).toEqual(['conv-old']);
    expect(await store.get('conv-old')).toBeNull();
    expect(await store.get('conv-new')).not.toBeNull();
  });

  it('store.clear() deletes a conversation; the next turn starts fresh', async () => {
    const store = makeStore();
    queueApiResponse(makeResponse('resp_cl1', 'first'));
    queueApiResponse(makeResponse('resp_cl2', 'second'));

    await runTurn(store, 'conv-clear', 'Forget me.');
    expect(await store.get('conv-clear')).not.toBeNull();

    await store.clear('conv-clear');
    expect(await store.get('conv-clear')).toBeNull();

    await runTurn(store, 'conv-clear', 'I am back.');
    const state = await store.get('conv-clear');
    expect(state!.messages).toHaveLength(2);
    expect(JSON.stringify(state!.messages)).not.toContain('Forget me.');
  });
});

describe('multi-turn integration — missing or corrupted state', () => {
  it('missing state on first turn creates a fresh document under the caller id', async () => {
    const store = makeStore();
    expect(await store.get('conv-never')).toBeNull();

    queueApiResponse(makeResponse('resp_m1', 'hello'));
    await runTurn(store, 'conv-never', 'First contact.');

    const state = await store.get('conv-never');
    expect(state).not.toBeNull();
    expect(state!.id).toBe('conv-never');
    expect(state!.previousResponseId).toBe('resp_m1');
  });

  it('store.get() throws CorruptedStateError when the backend holds invalid JSON', async () => {
    // Reach into the in-memory backend and poison a document directly.
    const backend = new InMemoryConversationStateBackend();
    const store = new ConversationStateStore(backend);
    (backend as unknown as { map: Map<string, string> }).map.set(
      'conv-bad',
      '{not json',
    );

    await expect(store.get('conv-bad')).rejects.toThrow(CorruptedStateError);
  });

  it('store.get() throws CorruptedStateError when the document fails schema validation', async () => {
    const backend = new InMemoryConversationStateBackend();
    const store = new ConversationStateStore(backend);
    (backend as unknown as { map: Map<string, string> }).map.set(
      'conv-invalid',
      JSON.stringify({ id: 'conv-invalid', messages: 'not-an-array' }),
    );

    await expect(store.get('conv-invalid')).rejects.toThrow(/Corrupted conversation state/);
  });

  it('a corrupted persisted file surfaces as CorruptedStateError on the next turn', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'conv-state-'));
    try {
      const store = new ConversationStateStore(new FileConversationStateBackend(dir));
      // Seed a valid conversation through the pipeline, then corrupt the file.
      queueApiResponse(makeResponse('resp_f1', 'before corruption'));
      await runTurn(store, 'conv-file', 'Hi.');
      const stateFile = join(dir, 'conv-file.json');
      const good = JSON.parse(await readFile(stateFile, 'utf8'));
      expect(good.id).toBe('conv-file');

      await writeFile(stateFile, '{"id": 123, "messages": []}', 'utf8');

      queueApiResponse(makeResponse('resp_f2', 'after corruption'));
      await expect(runTurn(store, 'conv-file', 'Anyone there?')).rejects.toThrow(
        CorruptedStateError,
      );
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it('clearing one conversation does not affect siblings', async () => {
    const store = makeStore();
    queueApiResponse(makeResponse('resp_s1', 'keep'));
    queueApiResponse(makeResponse('resp_s2', 'drop'));

    await runTurn(store, 'conv-keep', 'keep me');
    await runTurn(store, 'conv-drop', 'drop me');

    await store.clear('conv-drop');
    expect(await store.get('conv-drop')).toBeNull();
    expect(await store.get('conv-keep')).not.toBeNull();

    // Accessor for the cleared conversation observes the deletion.
    const accessor = createStateAccessor(store, 'conv-drop');
    expect(await accessor.load()).toBeNull();
  });
});
