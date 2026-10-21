import { beforeEach, describe, expect, it, vi } from 'vitest';
import { z } from 'zod/v4';
import type { OpenRouterCore } from '../../src/core.js';
import type { OpenResponsesResult } from '../../src/models/openresponsesresult.js';
import { tool } from '../../src/lib/tool.js';
import type { ConversationState, StateAccessor, Tool } from '../../src/lib/tool-types.js';

const mockResponsesSend = vi.hoisted(() => vi.fn());

vi.mock('../../src/funcs/responsesSend.js', () => ({
  responsesSend: mockResponsesSend,
}));

// Import ModelResult AFTER vi.mock so the transport mock is wired in.
const { ModelResult } = await import('../../src/lib/model-result.js');

function makeResponse(id: string, output: OpenResponsesResult['output']): OpenResponsesResult {
  return {
    id,
    object: 'response',
    createdAt: 0,
    completedAt: 0,
    model: 'test-model',
    status: 'completed',
    output,
    error: null,
    incompleteDetails: null,
    temperature: null,
    topP: null,
    presencePenalty: null,
    frequencyPenalty: null,
    metadata: null,
    instructions: null,
    tools: [],
    toolChoice: 'auto',
    parallelToolCalls: false,
  } as OpenResponsesResult;
}

function doneResponse(id: string): OpenResponsesResult {
  return makeResponse(id, [
    {
      type: 'message',
      id: `msg_${id}`,
      role: 'assistant',
      status: 'completed',
      content: [{ type: 'output_text', text: 'Done.', annotations: [] }],
    },
  ] as OpenResponsesResult['output']);
}

function functionCall(callId: string): OpenResponsesResult['output'][number] {
  return {
    type: 'function_call',
    id: `fc_${callId}`,
    callId,
    name: 'gated',
    arguments: '{"v":"x"}',
    status: 'completed',
  } as OpenResponsesResult['output'][number];
}

function createMemoryAccessor<TTools extends readonly Tool[]>() {
  let state: ConversationState<TTools> | null = null;
  const accessor: StateAccessor<TTools> = {
    load: async () => state,
    save: async (next) => {
      state = next;
    },
  };
  return { accessor, get: () => state };
}

/** IDs of the function_call_output items sent in the `callIndex`-th request. */
function sentOutputIds(callIndex: number): string[] {
  const input = (mockResponsesSend.mock.calls[callIndex]?.[1]?.responsesRequest?.input ?? []) as Array<{
    type?: string;
    callId?: string;
  }>;
  return input.filter((item) => item?.type === 'function_call_output').map((item) => String(item.callId));
}

const request = { model: 'test-model', input: 'run the gated action' };

/** Runs one turn that pauses on approval-gated calls with `callIds`. */
async function pauseOnGatedCalls(callIds: string[]) {
  const execute = vi.fn(async (_input: { v: string }) => ({ ok: true }));
  const gated = tool({
    name: 'gated',
    inputSchema: z.object({ v: z.string() }),
    outputSchema: z.object({ ok: z.boolean() }),
    requireApproval: true,
    execute,
  });
  const tools = [gated] as const;
  mockResponsesSend.mockResolvedValueOnce({ ok: true, value: makeResponse('resp_pause', callIds.map(functionCall)) });
  const memory = createMemoryAccessor<typeof tools>();
  await new ModelResult<typeof tools>({
    request,
    client: {} as OpenRouterCore,
    tools,
    state: memory.accessor,
  }).getResponse();
  expect(memory.get()?.status).toBe('awaiting_approval');
  expect(execute).not.toHaveBeenCalled();
  mockResponsesSend.mockClear();
  return { execute, tools, ...memory };
}

beforeEach(() => {
  mockResponsesSend.mockReset();
});

describe('approval decisions are de-duplicated (#518)', () => {
  it('executes an approved call once when its ID is listed twice', async () => {
    const paused = await pauseOnGatedCalls(['call_1']);
    mockResponsesSend.mockResolvedValueOnce({ ok: true, value: doneResponse('resp_done') });

    const text = await new ModelResult<typeof paused.tools>({
      request,
      client: {} as OpenRouterCore,
      tools: paused.tools,
      state: paused.accessor,
      approveToolCalls: ['call_1', 'call_1'],
    }).getText();

    expect(text).toBe('Done.');
    expect(paused.execute).toHaveBeenCalledTimes(1);
    expect(sentOutputIds(0)).toEqual(['call_1']);
  });

  it('records a rejection once when its ID is listed twice', async () => {
    const paused = await pauseOnGatedCalls(['call_1']);
    mockResponsesSend.mockResolvedValueOnce({ ok: true, value: doneResponse('resp_done') });

    await new ModelResult<typeof paused.tools>({
      request,
      client: {} as OpenRouterCore,
      tools: paused.tools,
      state: paused.accessor,
      rejectToolCalls: ['call_1', 'call_1'],
    }).getResponse();

    expect(paused.execute).not.toHaveBeenCalled();
    expect(sentOutputIds(0)).toEqual(['call_1']);
  });

  it('refuses an ID that is both approved and rejected before anything runs', async () => {
    const paused = await pauseOnGatedCalls(['call_1', 'call_2']);
    const before = structuredClone(paused.get());

    expect(
      () =>
        new ModelResult<typeof paused.tools>({
          request,
          client: {} as OpenRouterCore,
          tools: paused.tools,
          state: paused.accessor,
          approveToolCalls: ['call_1', 'call_2'],
          rejectToolCalls: ['call_2'],
        })
    ).toThrow(/both approved and rejected: call_2/);

    expect(paused.execute).not.toHaveBeenCalled();
    expect(mockResponsesSend).not.toHaveBeenCalled();
    expect(paused.get()).toEqual(before);
  });
});

describe('resuming awaiting_approval without decisions (#517)', () => {
  it('stays paused and sends no request', async () => {
    const paused = await pauseOnGatedCalls(['call_1']);
    const before = structuredClone(paused.get());
    mockResponsesSend.mockResolvedValueOnce({ ok: true, value: doneResponse('resp_should_not_be_requested') });

    const result = new ModelResult<typeof paused.tools>({
      request,
      client: {} as OpenRouterCore,
      tools: paused.tools,
      state: paused.accessor,
    });

    await expect(result.getResponse()).rejects.toThrow();
    expect(await result.requiresApproval()).toBe(true);
    expect((await result.getPendingToolCalls()).map((tc) => tc.id)).toEqual(['call_1']);
    expect(mockResponsesSend).not.toHaveBeenCalled();
    expect(paused.execute).not.toHaveBeenCalled();
    expect(paused.get()).toEqual(before);

    // The pause still resolves normally once a decision is supplied.
    await new ModelResult<typeof paused.tools>({
      request,
      client: {} as OpenRouterCore,
      tools: paused.tools,
      state: paused.accessor,
      approveToolCalls: ['call_1'],
    }).getResponse();
    expect(paused.execute).toHaveBeenCalledTimes(1);
    expect(paused.get()?.status).toBe('complete');
  });
});
