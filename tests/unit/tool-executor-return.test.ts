import { describe, expect, it } from 'vitest';
import { z } from 'zod/v4';
import { executeGeneratorTool } from '../../src/lib/tool-executor.js';
import { tool } from '../../src/lib/tool.js';
import type { ParsedToolCall, Tool, TurnContext } from '../../src/lib/tool-types.js';

describe('executeGeneratorTool - return value capture', () => {
  const mockContext: TurnContext = {
    numberOfTurns: 1,
  };

  it('should capture generator return value as final result', async () => {
    const generatorTool = tool({
      name: 'return_value_tool',
      inputSchema: z.object({
        input: z.string(),
      }),
      eventSchema: z.object({
        status: z.string(),
      }),
      outputSchema: z.object({
        result: z.string(),
      }),
      execute: async function* (params) {
        yield { status: 'working' };
        yield { status: 'almost done' };
        return { result: `Done: ${params.input}` }; // RETURN, not yield
      },
    });

    const toolCall: ParsedToolCall<Tool> = {
      id: 'test-call-1',
      name: 'return_value_tool',
      arguments: { input: 'test' },
    };

    const result = await executeGeneratorTool(generatorTool, toolCall, mockContext);

    expect(result.error).toBeUndefined();
    expect(result.preliminaryResults).toHaveLength(2);
    expect(result.preliminaryResults).toEqual([
      { status: 'working' },
      { status: 'almost done' },
    ]);
    // The return value should be captured as the final result
    expect(result.result).toEqual({ result: 'Done: test' });
  });

  it('should capture return value even with no yields', async () => {
    const generatorTool = tool({
      name: 'return_only_tool',
      inputSchema: z.object({
        input: z.string(),
      }),
      eventSchema: z.object({
        status: z.string(),
      }),
      outputSchema: z.object({
        result: z.string(),
      }),
      execute: async function* (params) {
        // No yields, only return
        return { result: `Direct: ${params.input}` };
      },
    });

    const toolCall: ParsedToolCall<Tool> = {
      id: 'test-call-2',
      name: 'return_only_tool',
      arguments: { input: 'test' },
    };

    const result = await executeGeneratorTool(generatorTool, toolCall, mockContext);

    expect(result.error).toBeUndefined();
    expect(result.preliminaryResults).toHaveLength(0);
    expect(result.result).toEqual({ result: 'Direct: test' });
  });

  it('should prefer return value over last yield when both present', async () => {
    const generatorTool = tool({
      name: 'both_yield_return_tool',
      inputSchema: z.object({
        input: z.string(),
      }),
      eventSchema: z.object({
        status: z.string(),
      }),
      outputSchema: z.object({
        finalValue: z.string(),
      }),
      execute: async function* (params) {
        yield { status: 'progress 1' };
        yield { status: 'progress 2' };
        // Return is the intended final result, not last yield
        return { finalValue: `Final: ${params.input}` };
      },
    });

    const toolCall: ParsedToolCall<Tool> = {
      id: 'test-call-3',
      name: 'both_yield_return_tool',
      arguments: { input: 'test' },
    };

    const result = await executeGeneratorTool(generatorTool, toolCall, mockContext);

    expect(result.error).toBeUndefined();
    expect(result.preliminaryResults).toHaveLength(2);
    // Return value should take precedence
    expect(result.result).toEqual({ finalValue: 'Final: test' });
  });

  it('should still work with yield-only generators (backwards compatibility)', async () => {
    const generatorTool = tool({
      name: 'yield_only_tool',
      inputSchema: z.object({}),
      eventSchema: z.object({
        status: z.string(),
      }),
      outputSchema: z.object({
        completed: z.boolean(),
      }),
      execute: async function* () {
        yield { status: 'working' };
        // Final value yielded (not returned) - existing behavior
        yield { completed: true };
      },
    });

    const toolCall: ParsedToolCall<Tool> = {
      id: 'test-call-4',
      name: 'yield_only_tool',
      arguments: {},
    };

    const result = await executeGeneratorTool(generatorTool, toolCall, mockContext);

    expect(result.error).toBeUndefined();
    // Last yield that matches outputSchema but not eventSchema becomes result
    expect(result.result).toEqual({ completed: true });
  });
});
