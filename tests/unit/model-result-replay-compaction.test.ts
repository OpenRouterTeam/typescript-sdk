import { describe, expect, it } from 'vitest';
import { z } from 'zod/v4';

import { OpenRouterCore } from '../../src/core.js';
import { callModel } from '../../src/funcs/call-model.js';
import { HTTPClient } from '../../src/lib/http.js';
import { tool } from '../../src/lib/tool.js';

const RESPONSE_BASE = {
  object: 'response',
  status: 'completed',
  completed_at: 1_783_462_520,
  created_at: 1_783_462_506,
  error: null,
  frequency_penalty: 0,
  incomplete_details: null,
  instructions: null,
  max_output_tokens: null,
  max_tool_calls: null,
  metadata: null,
  model: 'test/model',
  parallel_tool_calls: true,
  presence_penalty: 0,
  previous_response_id: null,
  prompt_cache_key: null,
  reasoning: null,
  safety_identifier: null,
  service_tier: null,
  temperature: 1,
  text: {
    format: {
      type: 'text',
    },
    verbosity: null,
  },
  tool_choice: 'auto',
  tools: [],
  top_logprobs: 0,
  top_p: 1,
  truncation: null,
  usage: null,
  user: null,
  background: null,
  store: false,
} as const;

const FINAL_MESSAGE = {
  type: 'message',
  id: 'msg_final',
  role: 'assistant',
  status: 'completed',
  content: [
    {
      type: 'output_text',
      text: 'hello',
      annotations: [],
      logprobs: [],
    },
  ],
} as const;

const TOOL_CALL = {
  type: 'function_call',
  id: 'fc_weather',
  call_id: 'call_weather',
  name: 'weather',
  arguments: '{"city":"Denver"}',
  status: 'completed',
} as const;

describe('ModelResult replay-buffer compaction', () => {
  it('returns the final response after getTextStream drains trimmed events', async () => {
    const { client } = clientWithResponses([
      completedSseResponse('resp_text', [FINAL_MESSAGE], [textDeltaEvent('hello')]),
    ]);
    const result = callModel(client, {
      model: 'test/model',
      input: 'Say hello',
    });

    expect(await Array.fromAsync(result.getTextStream())).toEqual(['hello']);

    const response = await result.getResponse();
    expect(response.id).toBe('resp_text');
    expect(await result.getText()).toBe('hello');
  });

  it('returns tool calls after getFullResponsesStream drains trimmed events', async () => {
    const { client } = clientWithResponses([
      completedSseResponse('resp_tool_call', [TOOL_CALL]),
    ]);
    const result = callModel(client, {
      model: 'test/model',
      input: 'Check the weather',
    });

    await Array.fromAsync(result.getFullResponsesStream());

    expect(await result.getToolCalls()).toEqual([
      {
        id: 'call_weather',
        name: 'weather',
        arguments: {
          city: 'Denver',
        },
      },
    ]);
  });

  it('preserves a terminal provider error after the event buffer is trimmed', async () => {
    const { client } = clientWithResponses([
      failedSseResponse('resp_failed', 'upstream provider failed'),
    ]);
    const result = callModel(client, {
      model: 'test/model',
      input: 'Fail this request',
    });

    await Array.fromAsync(result.getFullResponsesStream());

    await expect(result.getResponse()).rejects.toThrow('upstream provider failed');
  });

  it('coordinates the initial pipe with an immediate streaming tool response', async () => {
    const panelTool = tool({
      name: 'weather',
      inputSchema: z.object({
        city: z.string(),
      }),
      outputSchema: z.object({
        temperature: z.number(),
      }),
      async execute(): Promise<{ temperature: number }> {
        return {
          temperature: 72,
        };
      },
    });
    const { client, requestCount } = clientWithResponses([
      completedSseResponse(
        'resp_tool_call',
        [TOOL_CALL],
        Array.from({ length: 256 }, (_, index) => textDeltaEvent('x', index + 1)),
      ),
      completedSseResponse('resp_final', [FINAL_MESSAGE]),
    ]);
    const result = callModel(client, {
      model: 'test/model',
      input: 'Check the weather',
      tools: [panelTool],
    });

    const events = await Array.fromAsync(result.getFullResponsesStream());
    const eventTypes = events.map((event) => event.type);

    expect(requestCount()).toBe(2);
    expect(events.filter((event) => event.type === 'response.completed')).toHaveLength(2);
    expect(events.filter((event) => event.type === 'tool.result')).toHaveLength(1);
    expect(eventTypes.indexOf('turn.end')).toBeLessThan(eventTypes.indexOf('tool.result'));
  });
});

interface TestClient {
  readonly client: OpenRouterCore;
  readonly requestCount: () => number;
}

function clientWithResponses(responses: readonly Response[]): TestClient {
  let requestCount = 0;
  const httpClient = new HTTPClient({
    async fetcher(): Promise<Response> {
      const response = responses[requestCount];
      requestCount++;
      if (!response) {
        throw new Error(`Unexpected SDK request ${requestCount}`);
      }
      return response;
    },
  });

  return {
    client: new OpenRouterCore({
      apiKey: 'test-key',
      httpClient,
    }),
    requestCount: () => requestCount,
  };
}

function completedSseResponse(
  id: string,
  output: readonly unknown[],
  intermediateEvents: readonly Record<string, unknown>[] = [],
): Response {
  const response = {
    ...RESPONSE_BASE,
    id,
    output,
  };
  return sseResponse([
    createdEvent(response),
    ...intermediateEvents,
    {
      type: 'response.completed',
      sequence_number: intermediateEvents.length + 1,
      response,
    },
  ]);
}

function failedSseResponse(id: string, message: string): Response {
  const response = {
    ...RESPONSE_BASE,
    id,
    status: 'failed',
    error: {
      code: 'server_error',
      message,
    },
    output: [],
  };
  return sseResponse([
    createdEvent(response),
    {
      type: 'response.failed',
      sequence_number: 1,
      response,
    },
  ]);
}

function createdEvent(response: Record<string, unknown>): Record<string, unknown> {
  return {
    type: 'response.created',
    sequence_number: 0,
    response: {
      ...response,
      status: 'in_progress',
      error: null,
      output: [],
    },
  };
}

function textDeltaEvent(delta: string, sequenceNumber = 1): Record<string, unknown> {
  return {
    type: 'response.output_text.delta',
    sequence_number: sequenceNumber,
    item_id: 'msg_final',
    output_index: 0,
    content_index: 0,
    delta,
    logprobs: [],
  };
}

function sseResponse(events: readonly Record<string, unknown>[]): Response {
  const body = events
    .map((event) => `event: ${String(event['type'])}\ndata: ${JSON.stringify(event)}\n\n`)
    .join('');
  return new Response(body, {
    headers: {
      'Content-Type': 'text/event-stream',
    },
  });
}
