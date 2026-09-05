import { describe, expect, it } from 'vitest';
import { z } from 'zod/v4';
import { OpenRouter } from '../../src/index.js';
import { HTTPClient } from '../../src/lib/http.js';
import { StreamStalledError } from '../../src/lib/stream-errors.js';
import { tool } from '../../src/lib/tool.js';

// ============================================================================
// SSE fixture helpers (snake_case wire shapes, parsed by the real inbound
// schemas via responsesSend -> EventStream -> ModelResult)
// ============================================================================

/** Minimal OpenResponsesResult JSON in wire (snake_case) shape. */
function resultJson(options: {
  status: 'in_progress' | 'completed';
  output?: unknown[];
  outputText?: string;
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
    error: null,
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

function functionCallItem(name: string): Record<string, unknown> {
  return {
    type: 'function_call',
    id: 'fc_1',
    call_id: 'call_1',
    name,
    arguments: '{}',
    status: 'completed',
  };
}

function sse(event: Record<string, unknown>): string {
  return `data: ${JSON.stringify(event)}\n\n`;
}

const createdFrame = sse({
  type: 'response.created',
  sequence_number: 0,
  response: resultJson({ status: 'in_progress' }),
});

function textDeltaFrame(delta: string): string {
  return sse({
    type: 'response.output_text.delta',
    delta,
    item_id: 'msg_1',
    content_index: 0,
    output_index: 0,
    logprobs: [],
    sequence_number: 1,
  });
}

function completedFrame(output: unknown[], outputText?: string): string {
  return sse({
    type: 'response.completed',
    sequence_number: 9,
    response: resultJson({
      status: 'completed',
      output,
      ...(outputText !== undefined ? { outputText } : {}),
    }),
  });
}

const DONE_FRAME = 'data: [DONE]\n\n';

/** The router's SSE keep-alive comment; dropped by the SSE parser. */
const KEEPALIVE_FRAME = ': OPENROUTER PROCESSING\n\n';

// ============================================================================
// Scripted SSE transport
// ============================================================================

type BodyStep =
  | { kind: 'frame'; text: string; delayMs: number }
  | { kind: 'close'; delayMs: number };

function frame(text: string, delayMs = 0): BodyStep {
  return { kind: 'frame', text, delayMs };
}

function closeBody(delayMs = 0): BodyStep {
  return { kind: 'close', delayMs };
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type TransportObservations = {
  requests: Request[];
  /** Body teardowns: reader cancellations and abort-driven body errors. */
  bodyTeardowns: unknown[];
};

/**
 * Build an OpenRouter client whose fetch plays back one scripted SSE body
 * per request. A script without a `close` step hangs forever — the stalled
 * connection this feature exists to detect.
 */
function scriptedClient(scripts: BodyStep[][]): {
  client: OpenRouter;
  observed: TransportObservations;
} {
  const observed: TransportObservations = { requests: [], bodyTeardowns: [] };
  const encoder = new TextEncoder();
  let call = 0;

  const fetcher = async (input: RequestInfo | URL): Promise<Response> => {
    if (!(input instanceof Request)) {
      throw new Error('Expected a Request instance from the SDK');
    }
    observed.requests.push(input);
    const script = scripts[call++];
    if (!script) {
      throw new Error(`No scripted response for request #${call}`);
    }

    let cancelled = false;
    const body = new ReadableStream<Uint8Array>({
      start(controller) {
        // Real fetch implementations fail in-flight body reads when the
        // request is aborted; mirror that so abort semantics are realistic.
        input.signal.addEventListener('abort', () => {
          if (!cancelled) {
            cancelled = true;
            observed.bodyTeardowns.push(input.signal.reason);
            try {
              controller.error(
                input.signal.reason ?? new DOMException('The operation was aborted.', 'AbortError'),
              );
            } catch {
              // Controller may already be closed.
            }
          }
        });
        void (async () => {
          for (const step of script) {
            await sleep(step.delayMs);
            if (cancelled) {
              return;
            }
            if (step.kind === 'frame') {
              controller.enqueue(encoder.encode(step.text));
            } else {
              controller.close();
              return;
            }
          }
          // No close step: hang, holding the connection open.
        })();
      },
      cancel(reason) {
        cancelled = true;
        observed.bodyTeardowns.push(reason);
      },
    });

    return new Response(body, {
      status: 200,
      headers: { 'content-type': 'text/event-stream' },
    });
  };

  const client = new OpenRouter({
    apiKey: 'test-api-key',
    httpClient: new HTTPClient({ fetcher }),
    retryConfig: { strategy: 'none' },
  });

  return { client, observed };
}

const HEALTHY_SCRIPT: BodyStep[] = [
  frame(createdFrame, 5),
  frame(textDeltaFrame('Hello'), 5),
  frame(textDeltaFrame(' world'), 5),
  frame(completedFrame([messageItem('Hello world')], 'Hello world'), 5),
  frame(DONE_FRAME),
  closeBody(),
];

// ============================================================================
// Tests
// ============================================================================

describe('callModel stream timeout integration', () => {
  it('getText rejects with StreamStalledError when the stream never produces content', async () => {
    const { client, observed } = scriptedClient([
      [frame(createdFrame, 5)], // created, then hangs forever
    ]);

    const result = client.callModel({
      model: 'test-model',
      input: 'hi',
      timeout: { firstContentMs: 80 },
    });

    await expect(result.getText()).rejects.toThrow(StreamStalledError);

    // The watchdog must tear the connection down, not just reject:
    // the in-flight request is aborted and the response body cancelled.
    await sleep(20);
    expect(observed.requests).toHaveLength(1);
    expect(observed.requests[0]?.signal.aborted).toBe(true);
    expect(observed.bodyTeardowns.length).toBeGreaterThan(0);
  });

  it('keep-alive comment frames do not satisfy or reset the first-content deadline', async () => {
    // Keepalives every 30ms forever — a socket-idle timer would never fire.
    const keepalives: BodyStep[] = [
      frame(createdFrame, 5),
      ...Array.from({ length: 40 }, () => frame(KEEPALIVE_FRAME, 30)),
    ];
    const { client } = scriptedClient([keepalives]);

    const result = client.callModel({
      model: 'test-model',
      input: 'hi',
      timeout: { firstContentMs: 100 },
    });

    const startedAt = Date.now();
    const error = await result.getText().then(
      () => null,
      (e: unknown) => e,
    );
    expect(error).toBeInstanceOf(StreamStalledError);
    expect((error as StreamStalledError).phase).toBe('first_content');
    expect((error as StreamStalledError).retryable).toBe(true);
    // Fired near the 100ms deadline, not after the full keepalive script.
    expect(Date.now() - startedAt).toBeLessThan(600);
  });

  it('resolves normally on a healthy stream well within deadlines', async () => {
    const { client, observed } = scriptedClient([HEALTHY_SCRIPT]);

    const result = client.callModel({
      model: 'test-model',
      input: 'hi',
      timeout: { firstContentMs: 1000, contentIntervalMs: 1000 },
    });

    expect(await result.getText()).toBe('Hello world');
    expect(observed.requests[0]?.signal.aborted).toBe(false);
  });

  it('resolves normally when no timeout is configured (default off)', async () => {
    const { client } = scriptedClient([HEALTHY_SCRIPT]);
    const result = client.callModel({ model: 'test-model', input: 'hi' });
    expect(await result.getText()).toBe('Hello world');
  });

  it('fails with between_content when deltas stop mid-generation', async () => {
    const { client } = scriptedClient([
      [
        frame(createdFrame, 5),
        frame(textDeltaFrame('partial'), 5),
        // then hangs with no completed event
      ],
    ]);

    const result = client.callModel({
      model: 'test-model',
      input: 'hi',
      timeout: { firstContentMs: 500, contentIntervalMs: 60 },
    });

    const error = await result.getText().then(
      () => null,
      (e: unknown) => e,
    );
    expect(error).toBeInstanceOf(StreamStalledError);
    expect((error as StreamStalledError).phase).toBe('between_content');
    expect((error as StreamStalledError).receivedAnyContent).toBe(true);
    expect((error as StreamStalledError).retryable).toBe(false);
  });

  it('propagates the stall to all concurrent stream consumers', async () => {
    const { client } = scriptedClient([[frame(createdFrame, 5)]]);

    const result = client.callModel({
      model: 'test-model',
      input: 'hi',
      timeout: { firstContentMs: 60 },
    });

    const consumeTextStream = (async () => {
      for await (const _delta of result.getTextStream()) {
        // drain
      }
    })();
    const consumeFullStream = (async () => {
      for await (const _event of result.getFullResponsesStream()) {
        // drain
      }
    })();

    await expect(consumeTextStream).rejects.toThrow(StreamStalledError);
    await expect(consumeFullStream).rejects.toThrow(StreamStalledError);
  });

  it('re-arms deadlines per turn and catches a stall in a follow-up turn', async () => {
    const toolTurnScript: BodyStep[] = [
      frame(createdFrame, 5),
      frame(
        sse({
          type: 'response.function_call_arguments.delta',
          delta: '{}',
          item_id: 'fc_1',
          output_index: 0,
          sequence_number: 1,
        }),
        5,
      ),
      // Turn 1 total duration exceeds firstContentMs — only a per-turn
      // deadline (re-armed for turn 2) lets this pass while turn 2 fails.
      frame(completedFrame([functionCallItem('get_thing')]), 120),
      frame(DONE_FRAME),
      closeBody(),
    ];
    const stalledFollowupScript: BodyStep[] = [frame(createdFrame, 5)]; // hangs

    const { client, observed } = scriptedClient([toolTurnScript, stalledFollowupScript]);

    const getThing = tool({
      name: 'get_thing',
      description: 'returns a thing',
      inputSchema: z.object({}),
      execute: async () => ({ thing: 42 }),
    });

    const result = client.callModel({
      model: 'test-model',
      input: 'hi',
      tools: [getThing],
      timeout: { firstContentMs: 80 },
    });

    await expect(result.getText()).rejects.toThrow(StreamStalledError);
    // Both turns went out; the second one was aborted by its own watchdog.
    expect(observed.requests).toHaveLength(2);
    expect(observed.requests[0]?.signal.aborted).toBe(false);
    expect(observed.requests[1]?.signal.aborted).toBe(true);
  });

  it('maxStallRetries re-issues a pre-content stall and succeeds on the retry', async () => {
    const { client, observed } = scriptedClient([
      [frame(createdFrame, 5)], // attempt 1: stalls before content
      HEALTHY_SCRIPT, // attempt 2: healthy
    ]);

    const result = client.callModel({
      model: 'test-model',
      input: 'hi',
      timeout: { firstContentMs: 60, maxStallRetries: 1 },
    });

    expect(await result.getText()).toBe('Hello world');
    expect(observed.requests).toHaveLength(2);
    expect(observed.requests[0]?.signal.aborted).toBe(true); // stalled attempt torn down
    expect(observed.requests[1]?.signal.aborted).toBe(false);
  });

  it('maxStallRetries respects the retry budget and rethrows the final stall', async () => {
    const { client, observed } = scriptedClient([
      [frame(createdFrame, 5)], // attempt 1: stalls
      [frame(createdFrame, 5)], // attempt 2 (retry 1): stalls
    ]);

    const result = client.callModel({
      model: 'test-model',
      input: 'hi',
      timeout: { firstContentMs: 50, maxStallRetries: 1 },
    });

    const error = await result.getText().then(
      () => null,
      (e: unknown) => e,
    );
    expect(error).toBeInstanceOf(StreamStalledError);
    expect(observed.requests).toHaveLength(2); // initial + exactly one retry
  });

  it('maxStallRetries never retries a mid-content stall', async () => {
    const { client, observed } = scriptedClient([
      [frame(createdFrame, 5), frame(textDeltaFrame('partial'), 5)], // content, then stall
    ]);

    const result = client.callModel({
      model: 'test-model',
      input: 'hi',
      timeout: { firstContentMs: 300, contentIntervalMs: 60, maxStallRetries: 3 },
    });

    const error = await result.getText().then(
      () => null,
      (e: unknown) => e,
    );
    expect(error).toBeInstanceOf(StreamStalledError);
    expect((error as StreamStalledError).phase).toBe('between_content');
    // No second request: output was already observed, retrying could duplicate it.
    expect(observed.requests).toHaveLength(1);
  });

  it('streaming consumers see each event exactly once when a retry succeeds', async () => {
    const { client } = scriptedClient([
      [frame(createdFrame, 5)], // attempt 1: stalls
      HEALTHY_SCRIPT, // attempt 2: healthy
    ]);

    const result = client.callModel({
      model: 'test-model',
      input: 'hi',
      timeout: { firstContentMs: 60, maxStallRetries: 1 },
    });

    const deltas: string[] = [];
    for await (const delta of result.getTextStream()) {
      deltas.push(delta);
    }
    // Only the winning attempt's deltas, no duplicates from the stalled one.
    expect(deltas).toEqual(['Hello', ' world']);
  });

  it('caller abort signals still work alongside the watchdog', async () => {
    const { client } = scriptedClient([
      [frame(createdFrame, 5)], // hangs, but watchdog is generous
    ]);

    const userAbort = new AbortController();
    const result = client.callModel(
      { model: 'test-model', input: 'hi', timeout: { firstContentMs: 5000 } },
      { signal: userAbort.signal },
    );

    const textPromise = result.getText();
    const pendingRejection = expect(textPromise).rejects.toThrow();
    await sleep(30);
    userAbort.abort(new Error('user cancelled'));

    await pendingRejection;
    const error = await textPromise.then(
      () => null,
      (e: unknown) => e,
    );
    // The user's abort wins — it must not be reported as a stall.
    expect(error).not.toBeInstanceOf(StreamStalledError);
  });
});
