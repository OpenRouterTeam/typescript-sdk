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

// Import ModelResult after vi.mock so the transport mock is wired in.
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
    parallelToolCalls: true,
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

function functionCall(
  callId: string,
  name: string,
  args: Record<string, unknown>,
  index: number,
): OpenResponsesResult['output'][number] {
  return {
    type: 'function_call',
    id: `fc_${index}`,
    callId,
    name,
    arguments: JSON.stringify(args),
    status: 'completed',
  } as OpenResponsesResult['output'][number];
}

function createMemoryAccessor<TTools extends readonly Tool[]>(initial: ConversationState<TTools> | null = null) {
  let state = initial;
  const accessor: StateAccessor<TTools> = {
    load: async () => state,
    save: async (next) => {
      state = next;
    },
  };
  return { accessor, get: () => state };
}

const request = { model: 'test-model', input: 'tidy up the repo' };

let executed: string[];

function makeTools(options: { harmlessNeedsApproval: boolean }) {
  const deleteRepo = tool({
    name: 'delete_repo',
    inputSchema: z.object({ repo: z.string() }),
    requireApproval: true,
    execute: async ({ repo }) => {
      executed.push(`delete_repo:${repo}`);
      return { ok: true };
    },
  });
  const readFile = tool({
    name: 'read_file',
    inputSchema: z.object({ path: z.string() }),
    requireApproval: options.harmlessNeedsApproval,
    execute: async ({ path }) => {
      executed.push(`read_file:${path}`);
      return { ok: true };
    },
  });
  return [deleteRepo, readFile] as const;
}

/** A protected call and a harmless call that share one call_id. */
function sharedIdResponse(id: string, callId: string): OpenResponsesResult {
  return makeResponse(id, [
    functionCall(callId, 'delete_repo', { repo: 'prod' }, 0),
    functionCall(callId, 'read_file', { path: 'README.md' }, 1),
  ]);
}

beforeEach(() => {
  mockResponsesSend.mockReset();
  executed = [];
});

describe('duplicate call ids in one model response', () => {
  it('approving the harmless call cannot run a protected call that shares its call_id', async () => {
    const tools = makeTools({ harmlessNeedsApproval: true });
    mockResponsesSend
      .mockResolvedValueOnce({ ok: true, value: sharedIdResponse('resp_1', 'call_x') })
      .mockResolvedValue({ ok: true, value: doneResponse('resp_done') });
    const memory = createMemoryAccessor<typeof tools>();

    const first = new ModelResult<typeof tools>({
      request,
      client: {} as OpenRouterCore,
      tools,
      state: memory.accessor,
    });
    // Fails closed before anything is saved as pending.
    await expect(first.getResponse()).rejects.toThrow(/call_x/);
    expect(memory.get()?.status).not.toBe('awaiting_approval');
    expect(memory.get()?.pendingToolCalls).toBeUndefined();

    // The caller approves the call it was shown as harmless.
    const resumed = new ModelResult<typeof tools>({
      request,
      client: {} as OpenRouterCore,
      tools,
      state: memory.accessor,
      approveToolCalls: ['call_x'],
    });
    await resumed.getResponse().catch(() => undefined);

    expect(executed).not.toContain('delete_repo:prod');
  });

  it('runs no tool when an auto-executed call and an approval-gated call share a call_id', async () => {
    const tools = makeTools({ harmlessNeedsApproval: false });
    mockResponsesSend.mockResolvedValueOnce({ ok: true, value: sharedIdResponse('resp_1', 'call_x') });
    const memory = createMemoryAccessor<typeof tools>();

    await expect(
      new ModelResult<typeof tools>({
        request,
        client: {} as OpenRouterCore,
        tools,
        state: memory.accessor,
      }).getResponse(),
    ).rejects.toThrow(/call_x/);

    expect(executed).toEqual([]);
    expect(mockResponsesSend).toHaveBeenCalledTimes(1);
  });

  it('rejects a duplicate-id batch that arrives on a later turn', async () => {
    const tools = makeTools({ harmlessNeedsApproval: false });
    mockResponsesSend
      .mockResolvedValueOnce({
        ok: true,
        value: makeResponse('resp_1', [functionCall('call_a', 'read_file', { path: 'a.md' }, 0)]),
      })
      .mockResolvedValueOnce({ ok: true, value: sharedIdResponse('resp_2', 'call_c') });

    await expect(
      new ModelResult<typeof tools>({ request, client: {} as OpenRouterCore, tools }).getResponse(),
    ).rejects.toThrow(/call_c/);

    expect(executed).toEqual(['read_file:a.md']);
    expect(mockResponsesSend).toHaveBeenCalledTimes(2);
  });

  it('leaves a duplicate-id batch of manual tools to the caller', async () => {
    const manual = tool({
      name: 'manual',
      inputSchema: z.object({ n: z.number() }),
      execute: false,
    });
    const tools = [manual] as const;
    mockResponsesSend.mockResolvedValueOnce({
      ok: true,
      value: makeResponse('resp_1', [
        functionCall('call_m', 'manual', { n: 1 }, 0),
        functionCall('call_m', 'manual', { n: 2 }, 1),
      ]),
    });

    const result = new ModelResult<typeof tools>({ request, client: {} as OpenRouterCore, tools });
    const calls = await result.getToolCalls();
    expect(calls.map((c) => c.arguments)).toEqual([{ n: 1 }, { n: 2 }]);
  });
});

describe('resuming saved approval state', () => {
  function savedState<TTools extends readonly Tool[]>(
    overrides: Partial<ConversationState<TTools>>,
  ): ConversationState<TTools> {
    return {
      id: 'conv_1',
      messages: [],
      status: 'awaiting_approval',
      createdAt: 0,
      updatedAt: 0,
      ...overrides,
    };
  }

  it('refuses saved pending calls that share a call_id', async () => {
    const tools = makeTools({ harmlessNeedsApproval: true });
    const memory = createMemoryAccessor<typeof tools>(
      savedState<typeof tools>({
        pendingToolCalls: [
          { id: 'call_x', name: 'delete_repo', arguments: { repo: 'prod' } },
          { id: 'call_x', name: 'read_file', arguments: { path: 'README.md' } },
        ],
      }),
    );
    mockResponsesSend.mockResolvedValue({ ok: true, value: doneResponse('resp_done') });

    await expect(
      new ModelResult<typeof tools>({
        request,
        client: {} as OpenRouterCore,
        tools,
        state: memory.accessor,
        approveToolCalls: ['call_x'],
      }).getResponse(),
    ).rejects.toThrow(/call_x/);

    expect(executed).toEqual([]);
    expect(mockResponsesSend).not.toHaveBeenCalled();
    expect(memory.get()?.pendingToolCalls).toHaveLength(2);
  });

  it('refuses a saved pending call that shares a call_id with an unsent result', async () => {
    const tools = makeTools({ harmlessNeedsApproval: false });
    const memory = createMemoryAccessor<typeof tools>(
      savedState<typeof tools>({
        pendingToolCalls: [{ id: 'call_x', name: 'delete_repo', arguments: { repo: 'prod' } }],
        unsentToolResults: [{ callId: 'call_x', name: 'read_file', output: { ok: true } }],
      }),
    );

    await expect(
      new ModelResult<typeof tools>({
        request,
        client: {} as OpenRouterCore,
        tools,
        state: memory.accessor,
        approveToolCalls: ['call_x'],
      }).getResponse(),
    ).rejects.toThrow(/call_x/);

    expect(executed).toEqual([]);
    expect(mockResponsesSend).not.toHaveBeenCalled();
  });

  it('runs only the approved call and keeps the other one pending', async () => {
    const tools = makeTools({ harmlessNeedsApproval: true });
    const memory = createMemoryAccessor<typeof tools>(
      savedState<typeof tools>({
        pendingToolCalls: [
          { id: 'call_delete', name: 'delete_repo', arguments: { repo: 'prod' } },
          { id: 'call_read', name: 'read_file', arguments: { path: 'README.md' } },
        ],
      }),
    );

    await new ModelResult<typeof tools>({
      request,
      client: {} as OpenRouterCore,
      tools,
      state: memory.accessor,
      approveToolCalls: ['call_read'],
    }).getResponse().catch(() => undefined);

    expect(executed).toEqual(['read_file:README.md']);
    expect(memory.get()?.status).toBe('awaiting_approval');
    expect(memory.get()?.pendingToolCalls?.map((tc) => tc.id)).toEqual(['call_delete']);
    expect(memory.get()?.unsentToolResults?.map((r) => r.callId)).toEqual(['call_read']);
    expect(mockResponsesSend).not.toHaveBeenCalled();
  });
});
