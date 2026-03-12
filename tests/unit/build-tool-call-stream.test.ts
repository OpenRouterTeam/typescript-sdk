import type {
  OpenResponsesStreamEvent,
  OpenResponsesStreamEventResponseCompleted,
  OpenResponsesStreamEventResponseFunctionCallArgumentsDelta,
  OpenResponsesStreamEventResponseFunctionCallArgumentsDone,
  OpenResponsesStreamEventResponseOutputItemAdded,
} from '../../src/models/openresponsesstreamevent.js';

import { describe, expect, it } from 'vitest';
import { ReusableReadableStream } from '../../src/lib/reusable-stream.js';
import { buildToolCallStream } from '../../src/lib/stream-transformers.js';

// ============================================================================
// Synthetic event factories
// ============================================================================

function createImmediateStream(
  events: OpenResponsesStreamEvent[],
): ReusableReadableStream<OpenResponsesStreamEvent> {
  const readable = new ReadableStream<OpenResponsesStreamEvent>({
    start(controller) {
      for (const event of events) {
        controller.enqueue(event);
      }
      controller.close();
    },
  });
  return new ReusableReadableStream(readable);
}

function outputItemAddedFunctionCallEvent(
  callId: string,
  name: string,
  itemId?: string,
): OpenResponsesStreamEventResponseOutputItemAdded {
  return {
    type: 'response.output_item.added',
    outputIndex: 0,
    item: {
      type: 'function_call',
      id: itemId ?? callId,
      callId,
      name,
      arguments: '',
      status: 'in_progress',
    },
    sequenceNumber: 0,
  };
}

/**
 * Creates a function_call output_item.added event with the id property omitted.
 * In real API responses, JSON.parse() never produces `id: undefined` — the
 * property is simply absent when the API doesn't include it. This exercises
 * the `item.id ?? item.callId` fallback in production code realistically.
 */
function outputItemAddedFunctionCallEventNoId(
  callId: string,
  name: string,
): OpenResponsesStreamEventResponseOutputItemAdded {
  return {
    type: 'response.output_item.added',
    outputIndex: 0,
    item: {
      type: 'function_call',
      callId,
      name,
      arguments: '',
      status: 'in_progress',
    },
    sequenceNumber: 0,
  };
}

function functionCallArgsDeltaEvent(
  delta: string,
  itemId: string,
): OpenResponsesStreamEventResponseFunctionCallArgumentsDelta {
  return {
    type: 'response.function_call_arguments.delta',
    itemId,
    outputIndex: 0,
    delta,
    sequenceNumber: 0,
  };
}

function functionCallArgsDoneEvent(
  args: string,
  name: string,
  itemId: string,
): OpenResponsesStreamEventResponseFunctionCallArgumentsDone {
  return {
    type: 'response.function_call_arguments.done',
    itemId,
    outputIndex: 0,
    name,
    arguments: args,
    sequenceNumber: 0,
  };
}

function responseCompletedEvent(): OpenResponsesStreamEventResponseCompleted {
  return {
    type: 'response.completed',
    response: {
      id: 'resp_1',
      object: 'response',
      createdAt: 0,
      model: 'test-model',
      status: 'completed',
      completedAt: 0,
      output: [],
      error: null,
      incompleteDetails: null,
      temperature: null,
      topP: null,
      presencePenalty: null,
      frequencyPenalty: null,
      metadata: null,
      tools: [],
      toolChoice: 'auto',
      parallelToolCalls: false,
    },
    sequenceNumber: 0,
  };
}

// ============================================================================
// Tests
// ============================================================================

describe('buildToolCallStream — callId/itemId key mismatch fix', () => {
  it('should use item.id (not callId) as map key so deltas are found when item.id differs from callId', async () => {
    // This is the core regression test for the fix.
    // item.id='item_1' differs from callId='call_abc'.
    // Delta events use itemId='item_1' for lookup.
    // Before the fix, the map key was callId, so deltas were silently dropped.
    const stream = createImmediateStream([
      outputItemAddedFunctionCallEvent('call_abc', 'get_weather', 'item_1'),
      functionCallArgsDeltaEvent('{"location":', 'item_1'),
      functionCallArgsDeltaEvent('"NYC"}', 'item_1'),
      functionCallArgsDoneEvent('{"location":"NYC"}', 'get_weather', 'item_1'),
      responseCompletedEvent(),
    ]);

    const toolCalls: Array<{
      id: string;
      name: string;
      arguments: unknown;
    }> = [];
    for await (const tc of buildToolCallStream(stream)) {
      toolCalls.push({
        id: tc.id,
        name: tc.name,
        arguments: tc.arguments,
      });
    }

    // Tool call should be yielded (not silently dropped)
    expect(toolCalls).toHaveLength(1);
    expect(toolCalls[0]!.name).toBe('get_weather');
    expect(toolCalls[0]!.arguments).toEqual({ location: 'NYC' });
  });

  it('should yield callId (not item.id) as the ParsedToolCall.id for API compatibility', async () => {
    // The yielded id must be callId for downstream consumers
    // (tool-orchestrator.ts, model-result.ts) that submit tool results back to the API.
    // Before the second fix, the stored id was itemKey (item.id), not callId.
    const stream = createImmediateStream([
      outputItemAddedFunctionCallEvent('call_abc', 'get_weather', 'item_1'),
      functionCallArgsDeltaEvent('{"location":"NYC"}', 'item_1'),
      functionCallArgsDoneEvent('{"location":"NYC"}', 'get_weather', 'item_1'),
      responseCompletedEvent(),
    ]);

    const toolCalls: Array<{
      id: string;
      name: string;
    }> = [];
    for await (const tc of buildToolCallStream(stream)) {
      toolCalls.push({
        id: tc.id,
        name: tc.name,
      });
    }

    expect(toolCalls).toHaveLength(1);
    // id must be the callId, NOT item.id
    expect(toolCalls[0]!.id).toBe('call_abc');
    expect(toolCalls[0]!.id).not.toBe('item_1');
  });

  it('should handle multiple tool calls with different callId/itemId mappings', async () => {
    const stream = createImmediateStream([
      outputItemAddedFunctionCallEvent('call_weather', 'get_weather', 'item_100'),
      outputItemAddedFunctionCallEvent('call_time', 'get_time', 'item_200'),
      functionCallArgsDeltaEvent('{"location":"NYC"}', 'item_100'),
      functionCallArgsDoneEvent('{"location":"NYC"}', 'get_weather', 'item_100'),
      functionCallArgsDeltaEvent('{"tz":"EST"}', 'item_200'),
      functionCallArgsDoneEvent('{"tz":"EST"}', 'get_time', 'item_200'),
      responseCompletedEvent(),
    ]);

    const toolCalls: Array<{
      id: string;
      name: string;
      arguments: unknown;
    }> = [];
    for await (const tc of buildToolCallStream(stream)) {
      toolCalls.push({
        id: tc.id,
        name: tc.name,
        arguments: tc.arguments,
      });
    }

    expect(toolCalls).toHaveLength(2);

    // First tool call: id should be callId, not itemId
    expect(toolCalls[0]!.id).toBe('call_weather');
    expect(toolCalls[0]!.name).toBe('get_weather');
    expect(toolCalls[0]!.arguments).toEqual({ location: 'NYC' });

    // Second tool call: id should be callId, not itemId
    expect(toolCalls[1]!.id).toBe('call_time');
    expect(toolCalls[1]!.name).toBe('get_time');
    expect(toolCalls[1]!.arguments).toEqual({ tz: 'EST' });
  });

  it('should still work when item.id equals callId (backwards compatibility)', async () => {
    // When item.id === callId, both old and new code work.
    // This verifies no regression for the common case.
    const stream = createImmediateStream([
      outputItemAddedFunctionCallEvent('call_same', 'search', 'call_same'),
      functionCallArgsDeltaEvent('{"q":"test"}', 'call_same'),
      functionCallArgsDoneEvent('{"q":"test"}', 'search', 'call_same'),
      responseCompletedEvent(),
    ]);

    const toolCalls: Array<{
      id: string;
      name: string;
      arguments: unknown;
    }> = [];
    for await (const tc of buildToolCallStream(stream)) {
      toolCalls.push({
        id: tc.id,
        name: tc.name,
        arguments: tc.arguments,
      });
    }

    expect(toolCalls).toHaveLength(1);
    expect(toolCalls[0]!.id).toBe('call_same');
    expect(toolCalls[0]!.name).toBe('search');
    expect(toolCalls[0]!.arguments).toEqual({ q: 'test' });
  });

  it('should fall back to callId as map key when item.id is undefined', async () => {
    // When item.id is literally undefined, the fallback `item.id ?? item.callId` uses callId.
    // Uses outputItemAddedFunctionCallEventNoId which sets id: undefined explicitly.
    // Delta events use callId as itemId since that's what the fallback resolves to.
    const stream = createImmediateStream([
      outputItemAddedFunctionCallEventNoId('call_fallback', 'lookup'),
      functionCallArgsDeltaEvent('{"key":"val"}', 'call_fallback'),
      functionCallArgsDoneEvent('{"key":"val"}', 'lookup', 'call_fallback'),
      responseCompletedEvent(),
    ]);

    const toolCalls: Array<{
      id: string;
      name: string;
      arguments: unknown;
    }> = [];
    for await (const tc of buildToolCallStream(stream)) {
      toolCalls.push({
        id: tc.id,
        name: tc.name,
        arguments: tc.arguments,
      });
    }

    expect(toolCalls).toHaveLength(1);
    expect(toolCalls[0]!.id).toBe('call_fallback');
    expect(toolCalls[0]!.name).toBe('lookup');
    expect(toolCalls[0]!.arguments).toEqual({ key: 'val' });
  });
});
