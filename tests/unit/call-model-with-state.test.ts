/**
 * End-to-end tests for the conversation-state integration in the turn
 * pipeline (DEV-127 / task t_d2c7972c).
 *
 * These tests drive the normal entry point (callModelWithState -> callModel ->
 * ModelResult -> betaResponsesSend) with the API call mocked at the
 * betaResponsesSend boundary, and assert:
 *
 *  - first turn: state is created under the caller's conversationId and the
 *    new input + response output are persisted before the turn completes
 *  - continuation turn: prior state is loaded and the prior turn's context is
 *    visible in the next API request's input
 *  - missing/expired state: falls back to a fresh state under the same id
 *  - single-turn callers (no conversation id) are unaffected: callModel keeps
 *    working with no store interaction
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { OpenRouterCore } from '../../src/core.js';

// Mock the API boundary. The path must match the import specifier used by
// model-result.ts.
vi.mock('../../src/funcs/betaResponsesSend.js', () => ({
  betaResponsesSend: vi.fn(),
}));

import { betaResponsesSend } from '../../src/funcs/betaResponsesSend.js';
import { callModel } from '../../src/funcs/call-model.js';
import { callModelWithState } from '../../src/funcs/call-model-with-state.js';
import {
  ConversationStateStore,
  InMemoryConversationStateBackend,
  createStateAccessor,
} from '../../src/lib/conversation-state-store.js';
import { EventStream } from '../../src/lib/event-streams.js';

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

/** The resolved request captured by the most recent mocked API call. */
function lastApiRequestInput(): unknown {
  const calls = betaResponsesSendMock.mock.calls;
  const last = calls[calls.length - 1];
  const args = last?.[1] as { responsesRequest: { input?: unknown } };
  return args?.responsesRequest?.input;
}

function makeStore(ttlMs?: number) {
  return new ConversationStateStore(
    new InMemoryConversationStateBackend(),
    ttlMs !== undefined ? { ttlMs } : {},
  );
}

beforeEach(() => {
  betaResponsesSendMock.mockReset();
});

describe('callModelWithState — turn pipeline integration', () => {
  it('first turn creates state under the conversationId and persists input + output', async () => {
    const store = makeStore();
    queueApiResponse(makeResponse('resp_1', 'Hello, Ada!'));

    const result = callModelWithState(client, {
      model: 'test-model',
      input: 'My name is Ada.',
      conversationId: 'conv-user-123',
      stateStore: store,
    });

    const text = await result.getText();
    expect(text).toContain('Hello, Ada!');

    const state = await store.get('conv-user-123');
    expect(state).not.toBeNull();
    expect(state!.id).toBe('conv-user-123');
    expect(state!.status).toBe('complete');
    expect(state!.previousResponseId).toBe('resp_1');

    // State holds the caller's input and the response output.
    const messages = state!.messages as Array<Record<string, unknown> | string>;
    const serialized = JSON.stringify(messages);
    expect(serialized).toContain('My name is Ada.');
    expect(
      messages.some(
        (m) => typeof m === 'object' && m.type === 'message' && m.role === 'assistant',
      ),
    ).toBe(true);

    // The API request carried just the first-turn input (no history yet).
    expect(lastApiRequestInput()).toBe('My name is Ada.');
  });

  it('continuation turn loads prior state and exposes earlier context to the model', async () => {
    const store = makeStore();
    queueApiResponse(makeResponse('resp_1', 'Nice to meet you, Ada.'));
    queueApiResponse(makeResponse('resp_2', 'Your name is Ada.'));

    const first = callModelWithState(client, {
      model: 'test-model',
      input: 'My name is Ada.',
      conversationId: 'conv-multi',
      stateStore: store,
    });
    await first.getText();

    const second = callModelWithState(client, {
      model: 'test-model',
      input: 'What is my name?',
      conversationId: 'conv-multi',
      stateStore: store,
    });
    const text = await second.getText();
    expect(text).toContain('Your name is Ada.');

    // The second API request must include the first turn's input AND output
    // (context from earlier turns visible to later turns).
    const secondInput = lastApiRequestInput() as Array<Record<string, unknown>>;
    expect(Array.isArray(secondInput)).toBe(true);

    const serialized = JSON.stringify(secondInput);
    expect(serialized).toContain('My name is Ada.'); // first user turn
    expect(serialized).toContain('Nice to meet you, Ada.'); // first assistant reply
    expect(serialized).toContain('What is my name?'); // new input

    // The accumulated state covers both turns, in order: user input (stored
    // as the raw string the API received) and assistant output per turn.
    const state = await store.get('conv-multi');
    const messages = state!.messages as Array<Record<string, unknown> | string>;
    expect(messages).toHaveLength(4);
    expect(messages[0]).toBe('My name is Ada.');
    expect((messages[1] as Record<string, unknown>).role).toBe('assistant');
    expect(messages[2]).toBe('What is my name?');
    expect((messages[3] as Record<string, unknown>).role).toBe('assistant');
    expect(state!.previousResponseId).toBe('resp_2');
  });

  it('expired state falls back to a fresh conversation under the same id', async () => {
    const store = makeStore(1); // 1ms TTL

    // Pre-seed a stale conversation.
    await store.create('conv-stale');
    const seeded = await store.get('conv-stale');
    expect(seeded).not.toBeNull();
    await new Promise((r) => setTimeout(r, 5));
    expect(await store.get('conv-stale')).toBeNull(); // expired

    queueApiResponse(makeResponse('resp_fresh', 'fresh start'));
    const result = callModelWithState(client, {
      model: 'test-model',
      input: 'Hello again.',
      conversationId: 'conv-stale',
      stateStore: store,
    });
    await result.getText();

    const state = await store.get('conv-stale');
    expect(state).not.toBeNull();
    // Fresh state: only the new turn's input + output, no stale history.
    const messages = state!.messages as Array<unknown>;
    expect(messages).toHaveLength(2);
    // Same conversation id retained (not a random conv_<uuid>).
    expect(state!.id).toBe('conv-stale');
  });

  it('persists state under the conversationId even though ModelResult creates a random-id state on first load', async () => {
    // Regression: ModelResult calls createInitialState() (random conv_<uuid>)
    // when load() returns null; without the accessor's id guard the document
    // would be saved under that random id and the conversation stranded.
    const store = makeStore();
    queueApiResponse(makeResponse('resp_guard', 'ok'));

    const result = callModelWithState(client, {
      model: 'test-model',
      input: 'hi',
      conversationId: 'conv-guard',
      stateStore: store,
    });
    await result.getText();

    const state = await store.get('conv-guard');
    expect(state).not.toBeNull();
    expect(state!.id).toBe('conv-guard');
    // Nothing saved under a random id: the backend only knows our key.
    expect((store as unknown as { backend: InMemoryConversationStateBackend }).backend.keys())
      .toEqual(['conv-guard']);
  });

  it('rejects a missing conversationId', () => {
    const store = makeStore();
    expect(() =>
      callModelWithState(client, {
        model: 'test-model',
        input: 'hi',
        conversationId: '',
        stateStore: store,
      }),
    ).toThrow(TypeError);
  });

  it('single-turn callModel (no conversation id) does not touch any store', async () => {
    queueApiResponse(makeResponse('resp_single', 'single turn'));

    const result = callModel(client, {
      model: 'test-model',
      input: 'no state here',
    });
    const text = await result.getText();
    expect(text).toContain('single turn');
    // Nothing to assert against a store — the point is the path works with no
    // state accessor at all (existing behavior preserved).
  });

  it('createStateAccessor persists under the bound id and loads through the store', async () => {
    const store = makeStore();
    const accessor = createStateAccessor(store, 'conv-direct');

    expect(await accessor.load()).toBeNull();

    // Simulate ModelResult's first-turn save of a random-id state.
    await accessor.save({
      id: 'conv_random_zzz',
      messages: [],
      status: 'in_progress',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    const state = await store.get('conv-direct');
    expect(state).not.toBeNull();
    expect(state!.id).toBe('conv-direct');
    expect(await accessor.load()).not.toBeNull();
  });
});
