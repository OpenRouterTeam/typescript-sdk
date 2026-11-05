import type { Fetcher } from '../../src/lib/http.js';
import type { ConversationState, ParsedToolCall, StateAccessor } from '../../src/lib/tool-types.js';

import { describe, expect, it } from 'vitest';
import * as z from 'zod/v4';
import { OpenRouterCore } from '../../src/core.js';
import {
  assertValidApprovalDecisions,
  toolRequiresApproval,
} from '../../src/lib/conversation-state.js';
import { HTTPClient } from '../../src/lib/http.js';
import { ModelResult } from '../../src/lib/model-result.js';
import { tool } from '../../src/lib/tool.js';

const context = { numberOfTurns: 1 };

// A tool whose schema defaults `destructive` to true, and whose approval
// predicate gates on that flag.
const deleteFiles = tool({
  name: 'delete_files',
  inputSchema: z.object({
    path: z.string().default('/tmp'),
    destructive: z.boolean().default(true),
  }),
  requireApproval: (params) => params.destructive === true,
  execute: async () => ({ deleted: true }),
});

const tools: readonly [typeof deleteFiles] = [deleteFiles];

function deleteCall(args: Record<string, unknown>): ParsedToolCall<typeof deleteFiles> {
  return { id: 'call_1', name: 'delete_files', arguments: args };
}

describe('approval predicates see normalized arguments (#520)', () => {
  it('applies schema defaults before the tool-level predicate', async () => {
    // The model omitted `destructive`; the executor would run with the default `true`.
    expect(await toolRequiresApproval(deleteCall({}), tools, context)).toBe(true);
  });

  it('applies schema defaults before the call-level predicate', async () => {
    const seen: unknown[] = [];
    await toolRequiresApproval(deleteCall({}), tools, context, (call) => {
      seen.push(call.arguments);
      return false;
    });

    expect(seen).toEqual([{ path: '/tmp', destructive: true }]);
  });

  it('respects an explicit value over the default', async () => {
    expect(await toolRequiresApproval(deleteCall({ destructive: false }), tools, context)).toBe(false);
  });

  it('passes type-changing transform output to the predicate', async () => {
    const forceTool = tool({
      name: 'force_push',
      inputSchema: z.object({ force: z.string().transform((value) => value === 'yes') }),
      requireApproval: (params) => params.force === true,
      execute: async () => ({ pushed: true }),
    });
    const call: ParsedToolCall<typeof forceTool> = {
      id: 'call_2',
      name: 'force_push',
      arguments: { force: 'yes' },
    };

    // The executor runs with force === true, so approval must be required.
    expect(await toolRequiresApproval(call, [forceTool], context)).toBe(true);
  });

  it('does not modify the original tool call', async () => {
    const call = deleteCall({});
    await toolRequiresApproval(call, tools, context);

    expect(call.arguments).toEqual({});
  });
});

describe('approval decisions are validated (#518)', () => {
  it('accepts distinct decisions', () => {
    expect(() => assertValidApprovalDecisions(['call_1', 'call_2'], ['call_3'])).not.toThrow();
  });

  it('rejects an ID approved twice', () => {
    expect(() => assertValidApprovalDecisions(['call_1', 'call_1'], [])).toThrow(
      /"call_1" is listed more than once in approveToolCalls/,
    );
  });

  it('rejects an ID rejected twice', () => {
    expect(() => assertValidApprovalDecisions([], ['call_1', 'call_1'])).toThrow(
      /"call_1" is listed more than once in rejectToolCalls/,
    );
  });

  it('rejects an ID that is both approved and rejected', () => {
    expect(() => assertValidApprovalDecisions(['call_1'], ['call_1'])).toThrow(
      /"call_1" is in both approveToolCalls and rejectToolCalls/,
    );
  });

  it('throws from ModelResult before any tool runs', () => {
    const { client } = recordingClient();
    const { accessor } = memoryState(pausedState());

    expect(
      () =>
        new ModelResult({
          request: { model: 'openai/gpt-5-mini', input: 'hi' },
          client,
          tools,
          state: accessor,
          approveToolCalls: ['call_1', 'call_1'],
        }),
    ).toThrow(/listed more than once/);
  });
});

describe('resuming a paused conversation without a decision (#517)', () => {
  it('stays awaiting_approval and sends no model request', async () => {
    const { client, requests } = recordingClient();
    const { accessor, saved } = memoryState(pausedState());

    const result = new ModelResult({
      request: { model: 'openai/gpt-5-mini', input: 'continue' },
      client,
      tools,
      state: accessor,
    });

    expect(await result.requiresApproval()).toBe(true);
    expect(await result.getPendingToolCalls()).toHaveLength(1);
    expect(requests).toHaveLength(0);
    expect(saved.every((state) => state.status === 'awaiting_approval')).toBe(true);
  });

  it('explains that approval is pending when the response is requested', async () => {
    const { client } = recordingClient();
    const { accessor } = memoryState(pausedState());

    const result = new ModelResult({
      request: { model: 'openai/gpt-5-mini', input: 'continue' },
      client,
      tools,
      state: accessor,
    });

    await expect(result.getResponse()).rejects.toThrow(
      /awaiting approval for tool calls: delete_files \(call_1\)/,
    );
  });
});

/** A client whose fetcher records requests and answers with a 500. */
function recordingClient(): { client: OpenRouterCore; requests: Request[] } {
  const requests: Request[] = [];
  const fetcher: Fetcher = async (input) => {
    if (input instanceof Request) requests.push(input);
    return new Response('{}', { status: 500 });
  };
  const client = new OpenRouterCore({
    apiKey: 'test',
    httpClient: new HTTPClient({ fetcher }),
    retryConfig: { strategy: 'none' },
  });
  return { client, requests };
}

/** A conversation paused on one approval-gated call. */
function pausedState(): ConversationState<typeof tools> {
  return {
    id: 'conv_test',
    messages: [{ role: 'user', content: 'delete the temp files' }],
    pendingToolCalls: [deleteCall({})],
    status: 'awaiting_approval',
    createdAt: 0,
    updatedAt: 0,
  };
}

function memoryState(initial: ConversationState<typeof tools>): {
  accessor: StateAccessor<typeof tools>;
  saved: ConversationState<typeof tools>[];
} {
  let current = initial;
  const saved: ConversationState<typeof tools>[] = [];
  return {
    accessor: {
      load: async () => current,
      save: async (state) => {
        current = state;
        saved.push(state);
      },
    },
    saved,
  };
}
