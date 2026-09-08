import type { ChatStreamChunk } from '../../src/models/chatstreamchunk.js';

import { describe, expect, it } from 'vitest';
import { StreamStalledError } from '../../src/lib/stream-errors.js';
import {
  applyChatStreamWatchdog,
  isContentBearingChatChunk,
  isTerminalChatChunk,
} from '../../src/lib/stream-watchdog.js';

// ============================================================================
// Chunk fixtures
// ============================================================================

function chunk(overrides: {
  delta?: Partial<ChatStreamChunk['choices'][number]['delta']>;
  finishReason?: 'stop' | 'length' | null;
  error?: { code: number; message: string };
  noChoices?: boolean;
}): ChatStreamChunk {
  return {
    id: 'gen-1',
    object: 'chat.completion.chunk',
    created: 0,
    model: 'test-model',
    ...(overrides.error !== undefined ? { error: overrides.error } : {}),
    choices: overrides.noChoices
      ? []
      : [
          {
            index: 0,
            delta: { ...overrides.delta },
            finishReason: overrides.finishReason ?? null,
          },
        ],
  } as ChatStreamChunk;
}

/** The role-only prelude chunk every chat stream starts with. */
const ROLE_PRELUDE = chunk({ delta: { role: 'assistant', content: '' } });

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function scriptedChunkStream(
  steps: Array<{ chunk?: ChatStreamChunk; delayMs: number; close?: boolean }>,
): ReadableStream<ChatStreamChunk> {
  let cancelled = false;
  return new ReadableStream<ChatStreamChunk>({
    start(controller) {
      void (async () => {
        for (const step of steps) {
          await sleep(step.delayMs);
          if (cancelled) {
            return;
          }
          if (step.chunk) {
            controller.enqueue(step.chunk);
          }
          if (step.close) {
            controller.close();
            return;
          }
        }
        // No close: hang.
      })();
    },
    cancel() {
      cancelled = true;
    },
  });
}

// ============================================================================
// Classification
// ============================================================================

describe('isContentBearingChatChunk', () => {
  it('classifies content, reasoning, refusal, tool-call, and audio deltas as content', () => {
    expect(isContentBearingChatChunk(chunk({ delta: { content: 'hi' } }))).toBe(true);
    expect(isContentBearingChatChunk(chunk({ delta: { reasoning: 'hmm' } }))).toBe(true);
    expect(isContentBearingChatChunk(chunk({ delta: { refusal: 'no' } }))).toBe(true);
    expect(
      isContentBearingChatChunk(
        chunk({
          delta: {
            toolCalls: [
              { index: 0, id: 'c1', type: 'function', function: { name: 'f', arguments: '' } },
            ],
          },
        }),
      ),
    ).toBe(true);
  });

  it('does not classify role preludes, empty content, or empty chunks as content', () => {
    expect(isContentBearingChatChunk(ROLE_PRELUDE)).toBe(false);
    expect(isContentBearingChatChunk(chunk({ delta: { content: '' } }))).toBe(false);
    expect(isContentBearingChatChunk(chunk({ delta: {} }))).toBe(false);
    expect(isContentBearingChatChunk(chunk({ noChoices: true }))).toBe(false);
  });
});

describe('isTerminalChatChunk', () => {
  it('classifies finish reasons and error payloads as terminal', () => {
    expect(isTerminalChatChunk(chunk({ delta: {}, finishReason: 'stop' }))).toBe(true);
    expect(
      isTerminalChatChunk(chunk({ noChoices: true, error: { code: 500, message: 'boom' } })),
    ).toBe(true);
  });

  it('does not classify ordinary delta chunks as terminal', () => {
    expect(isTerminalChatChunk(chunk({ delta: { content: 'hi' } }))).toBe(false);
    expect(isTerminalChatChunk(ROLE_PRELUDE)).toBe(false);
  });
});

// ============================================================================
// applyChatStreamWatchdog
// ============================================================================

describe('applyChatStreamWatchdog', () => {
  it('stalls on a role prelude followed by silence', async () => {
    const wrapped = applyChatStreamWatchdog(
      scriptedChunkStream([{ chunk: ROLE_PRELUDE, delayMs: 5 }]), // then hangs
      { firstContentMs: 60 },
    );

    const reader = wrapped.getReader();
    const seen: ChatStreamChunk[] = [];
    const error = await (async () => {
      try {
        while (true) {
          const result = await reader.read();
          if (result.done) return null;
          seen.push(result.value);
        }
      } catch (e) {
        return e;
      }
    })();

    expect(seen).toHaveLength(1); // prelude flowed through
    expect(error).toBeInstanceOf(StreamStalledError);
    expect((error as StreamStalledError).phase).toBe('first_content');
    expect((error as StreamStalledError).retryable).toBe(true);
  });

  it('passes a healthy chat stream through, with the finish chunk disarming deadlines', async () => {
    const wrapped = applyChatStreamWatchdog(
      scriptedChunkStream([
        { chunk: ROLE_PRELUDE, delayMs: 5 },
        { chunk: chunk({ delta: { content: 'Hello' } }), delayMs: 5 },
        { chunk: chunk({ delta: {}, finishReason: 'stop' }), delayMs: 5 },
        // usage chunk arriving late, after the terminal chunk disarmed timers
        { chunk: chunk({ noChoices: true }), delayMs: 100, close: true },
      ]),
      { firstContentMs: 60, contentIntervalMs: 40 },
    );

    const collected: ChatStreamChunk[] = [];
    const reader = wrapped.getReader();
    while (true) {
      const result = await reader.read();
      if (result.done) break;
      collected.push(result.value);
    }
    expect(collected).toHaveLength(4);
  });

  it('stalls when content deltas stop mid-generation', async () => {
    const wrapped = applyChatStreamWatchdog(
      scriptedChunkStream([
        { chunk: chunk({ delta: { content: 'partial' } }), delayMs: 5 },
        // then hangs — no finish chunk
      ]),
      { contentIntervalMs: 50 },
    );

    const reader = wrapped.getReader();
    const error = await (async () => {
      try {
        while (true) {
          const result = await reader.read();
          if (result.done) return null;
        }
      } catch (e) {
        return e;
      }
    })();

    expect(error).toBeInstanceOf(StreamStalledError);
    expect((error as StreamStalledError).phase).toBe('between_content');
    expect((error as StreamStalledError).retryable).toBe(false);
  });
});
