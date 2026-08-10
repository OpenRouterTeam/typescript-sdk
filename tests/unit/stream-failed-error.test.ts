import { describe, expect, it } from 'vitest';
import { OpenRouter } from '../../src/index.js';
import { HTTPClient } from '../../src/lib/http.js';
import { StreamFailedError } from '../../src/lib/stream-errors.js';

// ============================================================================
// SSE fixture helpers (wire shapes)
// ============================================================================

function resultJson(options: {
  status: 'in_progress' | 'completed' | 'failed';
  output?: unknown[];
  outputText?: string;
  error?: { code: string; message: string } | null;
  errorType?: string;
}): Record<string, unknown> {
  return {
    id: 'resp_1',
    object: 'response',
    created_at: 0,
    completed_at: options.status === 'completed' ? 1 : null,
    model: 'test-model',
    status: options.status,
    output: options.output ?? [],
    ...(options.outputText !== undefined ? { output_text: options.outputText } : {}),
    error: options.error ?? null,
    ...(options.errorType !== undefined ? { error_type: options.errorType } : {}),
    incomplete_details: null,
    instructions: null,
    metadata: null,
    temperature: null,
    top_p: null,
    presence_penalty: null,
    frequency_penalty: null,
    tools: [],
    tool_choice: 'auto',
    parallel_tool_calls: false,
  };
}

function messageItem(text: string): Record<string, unknown> {
  return {
    type: 'message',
    id: 'msg_1',
    role: 'assistant',
    status: 'completed',
    content: [{ type: 'output_text', text, annotations: [] }],
  };
}

function sse(event: Record<string, unknown>): string {
  return `data: ${JSON.stringify(event)}\n\n`;
}

/** Build a client whose single request answers with the given SSE frames then closes. */
function sseClient(frames: string[]): OpenRouter {
  const encoder = new TextEncoder();
  const fetcher = async (): Promise<Response> => {
    const body = new ReadableStream<Uint8Array>({
      start(controller) {
        for (const frame of frames) {
          controller.enqueue(encoder.encode(frame));
        }
        controller.close();
      },
    });
    return new Response(body, {
      status: 200,
      headers: { 'content-type': 'text/event-stream' },
    });
  };
  return new OpenRouter({
    apiKey: 'test-api-key',
    httpClient: new HTTPClient({ fetcher }),
    retryConfig: { strategy: 'none' },
  });
}

// ============================================================================
// StreamFailedError unit behavior
// ============================================================================

describe('StreamFailedError', () => {
  it('classifies transient codes as retryable', () => {
    for (const code of [
      'server_error',
      'timeout',
      'rate_limit_exceeded',
      'provider_overloaded',
      'provider_unavailable',
    ]) {
      const error = new StreamFailedError({ message: 'x', code });
      expect(error.retryable, code).toBe(true);
    }
  });

  it('classifies validation-style codes as not retryable', () => {
    for (const code of ['invalid_prompt', 'image_too_large', 'bio_policy', null]) {
      const error = new StreamFailedError({ message: 'x', code });
      expect(error.retryable, String(code)).toBe(false);
    }
  });

  it('falls back to errorType for retryability when code is unhelpful', () => {
    const error = new StreamFailedError({
      message: 'x',
      code: 'something_unknown',
      errorType: 'provider_overloaded',
    });
    expect(error.retryable).toBe(true);
  });

  it('is an instanceof Error and StreamFailedError with a stable name', () => {
    const error = new StreamFailedError({ message: 'x' });
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(StreamFailedError);
    expect(error.name).toBe('StreamFailedError');
  });
});

// ============================================================================
// End-to-end surfacing through callModel
// ============================================================================

describe('callModel server-failure surfacing', () => {
  it('surfaces response.failed as StreamFailedError with code, type, and response', async () => {
    const client = sseClient([
      sse({
        type: 'response.created',
        sequence_number: 0,
        response: resultJson({ status: 'in_progress' }),
      }),
      sse({
        type: 'response.failed',
        sequence_number: 1,
        response: resultJson({
          status: 'failed',
          error: { code: 'server_error', message: 'upstream provider exploded' },
          errorType: 'provider_unavailable',
        }),
      }),
      'data: [DONE]\n\n',
    ]);

    const result = client.callModel({ model: 'test-model', input: 'hi' });
    const error = await result.getText().then(
      () => null,
      (e: unknown) => e,
    );

    expect(error).toBeInstanceOf(StreamFailedError);
    const failure = error as StreamFailedError;
    expect(failure.code).toBe('server_error');
    expect(failure.errorType).toBe('provider_unavailable');
    expect(failure.message).toContain('server_error');
    expect(failure.message).toContain('upstream provider exploded');
    expect(failure.response?.status).toBe('failed');
    expect(failure.retryable).toBe(true);
  });

  it('surfaces a non-retryable response.failed correctly', async () => {
    const client = sseClient([
      sse({
        type: 'response.failed',
        sequence_number: 0,
        response: resultJson({
          status: 'failed',
          error: { code: 'invalid_prompt', message: 'prompt rejected' },
        }),
      }),
      'data: [DONE]\n\n',
    ]);

    const result = client.callModel({ model: 'test-model', input: 'hi' });
    const error = await result.getText().then(
      () => null,
      (e: unknown) => e,
    );

    expect(error).toBeInstanceOf(StreamFailedError);
    expect((error as StreamFailedError).code).toBe('invalid_prompt');
    expect((error as StreamFailedError).retryable).toBe(false);
  });

  it('surfaces a stream-level error event as StreamFailedError when the stream never completes', async () => {
    const client = sseClient([
      sse({
        type: 'response.created',
        sequence_number: 0,
        response: resultJson({ status: 'in_progress' }),
      }),
      sse({
        type: 'error',
        code: 'server_error',
        message: 'mid-stream failure',
        param: null,
        sequence_number: 1,
      }),
      'data: [DONE]\n\n',
    ]);

    const result = client.callModel({ model: 'test-model', input: 'hi' });
    const error = await result.getText().then(
      () => null,
      (e: unknown) => e,
    );

    expect(error).toBeInstanceOf(StreamFailedError);
    const failure = error as StreamFailedError;
    expect(failure.code).toBe('server_error');
    expect(failure.message).toContain('mid-stream failure');
    expect(failure.response).toBeNull();
  });

  it('an error event followed by a successful completion does not throw', async () => {
    const client = sseClient([
      sse({
        type: 'error',
        code: 'server_error',
        message: 'transient blip, recovered',
        param: null,
        sequence_number: 0,
      }),
      sse({
        type: 'response.output_text.delta',
        delta: 'Hello world',
        item_id: 'msg_1',
        content_index: 0,
        output_index: 0,
        logprobs: [],
        sequence_number: 1,
      }),
      sse({
        type: 'response.completed',
        sequence_number: 2,
        response: resultJson({
          status: 'completed',
          output: [messageItem('Hello world')],
          outputText: 'Hello world',
        }),
      }),
      'data: [DONE]\n\n',
    ]);

    const result = client.callModel({ model: 'test-model', input: 'hi' });
    expect(await result.getText()).toBe('Hello world');
  });
});
