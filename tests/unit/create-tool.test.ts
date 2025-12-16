import { describe, expect, it } from 'vitest';
import { z } from 'zod/v4';
import { createTool, createGeneratorTool, createManualTool } from '../../src/lib/create-tool.js';
import { ToolType, hasNextTurnParams } from '../../src/lib/tool-types.js';

describe('createTool', () => {
  describe('createTool - regular tools', () => {
    it('should create a tool with the correct structure', () => {
      const tool = createTool({
        name: 'test_tool',
        description: 'A test tool',
        inputSchema: z.object({
          input: z.string(),
        }),
        execute: async (params) => {
          return { result: params.input };
        },
      });

      expect(tool.type).toBe(ToolType.Function);
      expect(tool.function.name).toBe('test_tool');
      expect(tool.function.description).toBe('A test tool');
      expect(tool.function.inputSchema).toBeDefined();
    });

    it('should infer execute params from inputSchema', async () => {
      const tool = createTool({
        name: 'weather',
        inputSchema: z.object({
          location: z.string(),
          units: z.enum(['celsius', 'fahrenheit']).optional(),
        }),
        outputSchema: z.object({
          location: z.string(),
          units: z.enum(['celsius', 'fahrenheit']).optional(),
        }),
        execute: async (params) => {
          // params should be typed as { location: string; units?: 'celsius' | 'fahrenheit' }
          const location: string = params.location;
          const units: 'celsius' | 'fahrenheit' | undefined = params.units;
          return { location, units };
        },
      });

      const mockContext = { input: [], changes: [] };
      const result = await tool.function.execute({ location: 'NYC', units: 'fahrenheit' }, mockContext);
      expect(result.location).toBe('NYC');
      expect(result.units).toBe('fahrenheit');
    });

    it('should enforce output schema return type', async () => {
      const tool = createTool({
        name: 'get_temperature',
        inputSchema: z.object({
          location: z.string(),
        }),
        outputSchema: z.object({
          temperature: z.number(),
          description: z.string(),
        }),
        execute: async (_params) => {
          // Return type should be enforced as { temperature: number; description: string }
          return {
            temperature: 72,
            description: 'Sunny',
          };
        },
      });

      const mockContext = { input: [], changes: [] };
      const result = await tool.function.execute({ location: 'NYC' }, mockContext);
      expect(result.temperature).toBe(72);
      expect(result.description).toBe('Sunny');
    });

    it('should support synchronous execute functions', () => {
      const tool = createTool({
        name: 'sync_tool',
        inputSchema: z.object({
          a: z.number(),
          b: z.number(),
        }),
        execute: (params) => {
          return { sum: params.a + params.b };
        },
      });

      const mockContext = { input: [], changes: [] };
      const result = tool.function.execute({ a: 5, b: 3 }, mockContext);
      expect(result).toEqual({ sum: 8 });
    });

    it('should pass context to execute function', async () => {
      let receivedContext: unknown;

      const tool = createTool({
        name: 'context_tool',
        inputSchema: z.object({}),
        execute: async (_params, context) => {
          receivedContext = context;
          return {};
        },
      });

      const mockContext = {
        input: [{ role: 'user' as const, content: 'test' }],
        model: 'test-model',
        changes: [],
      };

      await tool.function.execute({}, mockContext);
      expect(receivedContext).toEqual(mockContext);
    });

    it('should accept nextTurnParams configuration', () => {
      const tool = createTool({
        name: 'tool_with_mutations',
        inputSchema: z.object({
          query: z.string(),
        }),
        nextTurnParams: {
          instructions: (_params, context) => `Updated: ${context.instructions ?? ''}`,
        },
        execute: async (_params) => {
          return { result: 'done' };
        },
      });

      expect(tool.function.nextTurnParams).toBeDefined();
      expect(tool.function.nextTurnParams?.instructions).toBeInstanceOf(Function);
    });

    it('should call nextTurnParams mutator with context', () => {
      const tool = createTool({
        name: 'mutator_tool',
        inputSchema: z.object({}),
        nextTurnParams: {
          instructions: (_params, context) => `Turn instructions: ${context.model ?? 'unknown'}`,
        },
        execute: async () => ({}),
      });

      const mockParams = {};
      const mockContext = {
        model: 'gpt-4',
        input: [],
        changes: [],
      };

      const result = tool.function.nextTurnParams?.instructions?.(mockParams, mockContext as never);
      expect(result).toBe('Turn instructions: gpt-4');
    });
  });

  describe('createTool with eventSchema - generator/streaming tools', () => {
    it('should create a generator tool when eventSchema is provided', () => {
      const tool = createTool({
        name: 'streaming_tool',
        description: 'A streaming tool',
        inputSchema: z.object({
          query: z.string(),
        }),
        eventSchema: z.object({
          progress: z.number(),
        }),
        outputSchema: z.object({
          result: z.string(),
        }),
        execute: async function* (_params) {
          yield { progress: 50 };
          yield { result: 'done' };
        },
      });

      expect(tool.type).toBe(ToolType.Function);
      expect(tool.function.name).toBe('streaming_tool');
      expect(tool.function.eventSchema).toBeDefined();
      expect(tool.function.outputSchema).toBeDefined();
    });

    it('should yield properly typed events and output when eventSchema is provided', async () => {
      const tool = createTool({
        name: 'progress_tool',
        inputSchema: z.object({
          data: z.string(),
        }),
        eventSchema: z.object({
          status: z.string(),
          progress: z.number(),
        }),
        outputSchema: z.object({
          completed: z.boolean(),
          result: z.string(),
        }),
        execute: async function* (params) {
          yield { status: 'started', progress: 0 };
          yield { status: 'processing', progress: 50 };
          yield { completed: true, result: `Processed: ${params.data}` };
        },
      });

      const results: unknown[] = [];
      for await (const event of tool.function.execute({ data: 'test' })) {
        results.push(event);
      }

      expect(results).toHaveLength(3);
      expect(results[0]).toEqual({ status: 'started', progress: 0 });
      expect(results[1]).toEqual({ status: 'processing', progress: 50 });
      expect(results[2]).toEqual({ completed: true, result: 'Processed: test' });
    });

    it('should accept nextTurnParams for tools with eventSchema', () => {
      const tool = createTool({
        name: 'streaming_mutator_tool',
        inputSchema: z.object({
          query: z.string(),
        }),
        eventSchema: z.object({
          progress: z.number(),
        }),
        outputSchema: z.object({
          result: z.string(),
        }),
        nextTurnParams: {
          temperature: () => 0.5,
        },
        execute: async function* (_params) {
          yield { progress: 100 };
          yield { result: 'done' };
        },
      });

      expect(tool.function.nextTurnParams).toBeDefined();
      expect(tool.function.nextTurnParams?.temperature).toBeInstanceOf(Function);
      expect(tool.function.nextTurnParams?.temperature?.({} as never, {} as never)).toBe(0.5);
    });
  });

  describe('createGeneratorTool - deprecated but still works', () => {
    it('should still work for backwards compatibility', () => {
      const tool = createGeneratorTool({
        name: 'legacy_streaming_tool',
        inputSchema: z.object({
          query: z.string(),
        }),
        eventSchema: z.object({
          progress: z.number(),
        }),
        outputSchema: z.object({
          result: z.string(),
        }),
        execute: async function* (_params) {
          yield { progress: 50 };
          yield { result: 'done' };
        },
      });

      expect(tool.type).toBe(ToolType.Function);
      expect(tool.function.name).toBe('legacy_streaming_tool');
      expect(tool.function.eventSchema).toBeDefined();
    });
  });

  describe('createManualTool - tools without execute', () => {
    it('should create a manual tool without execute function', () => {
      const tool = createManualTool({
        name: 'manual_tool',
        description: 'A manual tool',
        inputSchema: z.object({
          query: z.string(),
        }),
        outputSchema: z.object({
          answer: z.string(),
        }),
      });

      expect(tool.type).toBe(ToolType.Function);
      expect(tool.function.name).toBe('manual_tool');
      expect(tool.function).not.toHaveProperty('execute');
    });
  });

  describe('hasNextTurnParams - type guard', () => {
    it('should return true for tools with nextTurnParams', () => {
      const tool = createTool({
        name: 'tool_with_next_turn',
        inputSchema: z.object({}),
        nextTurnParams: {
          instructions: () => 'new instructions',
        },
        execute: async () => ({}),
      });

      expect(hasNextTurnParams(tool)).toBe(true);
    });

    it('should return false for tools without nextTurnParams', () => {
      const tool = createTool({
        name: 'tool_without_next_turn',
        inputSchema: z.object({}),
        execute: async () => ({}),
      });

      expect(hasNextTurnParams(tool)).toBe(false);
    });

    it('should return false for manual tools', () => {
      const tool = createManualTool({
        name: 'manual_tool',
        inputSchema: z.object({}),
      });

      expect(hasNextTurnParams(tool)).toBe(false);
    });
  });
});
