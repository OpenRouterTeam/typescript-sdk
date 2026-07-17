import { describe, expect, it, vi } from 'vitest';
import { z } from 'zod/v4';
import type { OpenRouterCore } from '../../src/core.js';
import { ModelResult, type GetResponseOptions } from '../../src/lib/model-result.js';
import { tool } from '../../src/lib/tool.js';
import type { ConversationState, StateAccessor } from '../../src/lib/tool-types.js';

/**
 * Regression tests for GitHub issue #518: Approval decisions must be
 * de-duplicated / conflict-free.
 *
 * Malformed decision arrays (duplicate ids, or an id in both approve and
 * reject) throw synchronously at ModelResult construction — before any tool
 * executes or state is mutated.
 *
 * Happy-path cases keep a second untouched pending call (`call_2`) so
 * `processApprovalDecisions()` returns before `continueWithUnsentResults()`
 * would make a real API request. This keeps the suite fully offline.
 */

function makeAwaitingApprovalState(): ConversationState<readonly [ReturnType<typeof tool>]> {
  const now = Date.now();
  return {
    id: 'conv_test_518',
    messages: [{ role: 'user', content: 'please run the tool' }],
    status: 'awaiting_approval',
    pendingToolCalls: [
      { id: 'call_1', name: 'echo', arguments: { msg: 'first' } },
      { id: 'call_2', name: 'echo', arguments: { msg: 'second' } },
    ],
    createdAt: now,
    updatedAt: now,
  } as unknown as ConversationState<readonly [ReturnType<typeof tool>]>;
}

function makeStateAccessorAndTool() {
  const execute = vi.fn(async (params: { msg: string }) => ({ echoed: params.msg }));

  const echoTool = tool({
    name: 'echo',
    inputSchema: z.object({ msg: z.string() }),
    execute,
  });

  let savedState: ConversationState | null = null;
  const saveCalls: ConversationState[] = [];

  const state: StateAccessor = {
    load: vi.fn(async () => makeAwaitingApprovalState()),
    save: vi.fn(async (s: ConversationState) => {
      savedState = s;
      saveCalls.push(JSON.parse(JSON.stringify(s)));
    }),
  };

  return { execute, echoTool, state, saveCalls, getSavedState: () => savedState };
}

function buildModelResult(
  echoTool: ReturnType<typeof tool>,
  state: StateAccessor,
  approveToolCalls: string[],
  rejectToolCalls: string[],
) {
  const options: GetResponseOptions<readonly [ReturnType<typeof tool>]> = {
    request: { model: 'test-model', input: 'irrelevant for this repro' },
    client: {} as unknown as OpenRouterCore,
    tools: [echoTool] as const,
    state,
    approveToolCalls,
    rejectToolCalls,
  };

  return new ModelResult(options);
}

describe('Issue #518 - approval decision validation', () => {
  it('throws when approveToolCalls contains duplicate ids', () => {
    const { execute, echoTool, state } = makeStateAccessorAndTool();

    expect(() => buildModelResult(echoTool, state, ['call_1', 'call_1'], [])).toThrow(
      /duplicate id\(s\) in approveToolCalls: call_1/i,
    );
    expect(execute).not.toHaveBeenCalled();
  });

  it('throws when rejectToolCalls contains duplicate ids', () => {
    const { execute, echoTool, state } = makeStateAccessorAndTool();

    expect(() => buildModelResult(echoTool, state, [], ['call_1', 'call_1'])).toThrow(
      /duplicate id\(s\) in rejectToolCalls: call_1/i,
    );
    expect(execute).not.toHaveBeenCalled();
  });

  it('throws when the same id is present in both approveToolCalls and rejectToolCalls', () => {
    const { execute, echoTool, state } = makeStateAccessorAndTool();

    expect(() => buildModelResult(echoTool, state, ['call_1'], ['call_1'])).toThrow(
      /present in both approveToolCalls and rejectToolCalls: call_1/i,
    );
    expect(execute).not.toHaveBeenCalled();
  });

  it('throws with a combined message for duplicates and intersection', () => {
    const { execute, echoTool, state } = makeStateAccessorAndTool();

    expect(() =>
      buildModelResult(echoTool, state, ['call_1', 'call_1'], ['call_1', 'call_2', 'call_2']),
    ).toThrow(
      /duplicate id\(s\) in approveToolCalls: call_1.*duplicate id\(s\) in rejectToolCalls: call_2.*present in both approveToolCalls and rejectToolCalls: call_1/is,
    );
    expect(execute).not.toHaveBeenCalled();
  });

  it('does not throw for empty decision arrays', () => {
    const { echoTool, state } = makeStateAccessorAndTool();
    expect(() => buildModelResult(echoTool, state, [], [])).not.toThrow();
  });

  it('does not throw for unknown call ids (still silently skipped at process time)', () => {
    const { echoTool, state } = makeStateAccessorAndTool();
    expect(() => buildModelResult(echoTool, state, ['nope'], [])).not.toThrow();
  });

  it('happy path: distinct approve id executes exactly once', async () => {
    const { execute, echoTool, state, saveCalls } = makeStateAccessorAndTool();

    const result = buildModelResult(echoTool, state, ['call_1'], []);

    // getResponse() rejects because call_2 remains pending (no final response).
    await result.getResponse().catch(() => undefined);

    expect(execute).toHaveBeenCalledTimes(1);
    expect(execute).toHaveBeenCalledWith({ msg: 'first' }, expect.anything());

    const lastSave = saveCalls[saveCalls.length - 1];
    const call1Results = (lastSave?.unsentToolResults ?? []).filter(
      (r: { callId: string }) => r.callId === 'call_1',
    );
    expect(call1Results).toHaveLength(1);
    expect(call1Results[0]).toMatchObject({ callId: 'call_1', output: { echoed: 'first' } });
    expect(call1Results[0]).not.toHaveProperty('error');

    expect(lastSave?.pendingToolCalls).toEqual([
      { id: 'call_2', name: 'echo', arguments: { msg: 'second' } },
    ]);
  });
});
