import { describe, expect, it } from 'vitest';
import { z } from 'zod/v4';
import { createTool, createGeneratorTool, createManualTool } from '../../src/lib/create-tool.js';
import { ToolType } from '../../src/lib/tool-types.js';

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
        execute: async (params) => {
          // params should be typed as { location: string; units?: 'celsius' | 'fahrenheit' }
          const location: string = params.location;
          const units: 'celsius' | 'fahrenheit' | undefined = params.units;
          return { location, units };
        },
      });

      const result = await tool.function.execute({ location: 'NYC', units: 'fahrenheit' });
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

      const result = await tool.function.execute({ location: 'NYC' });
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

      const result = tool.function.execute({ a: 5, b: 3 });
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
        numberOfTurns: 3,
        messageHistory: [],
        model: 'test-model',
      };

      await tool.function.execute({}, mockContext);
      expect(receivedContext).toEqual(mockContext);
    });
  });

  describe('createGeneratorTool - streaming tools', () => {
    it('should create a generator tool with the correct structure', () => {
      const tool = createGeneratorTool({
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

    it('should yield properly typed events and output', async () => {
      const tool = createGeneratorTool({
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
});
