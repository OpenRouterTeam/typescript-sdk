import { describe, expect, it } from 'vitest';
import { z } from 'zod/v4';
import { tool } from '../../src/lib/tool.js';
import { ToolType } from '../../src/lib/tool-types.js';

describe('tool', () => {
  describe('tool - regular tools', () => {
    it('should create a tool with the correct structure', () => {
      const testTool = tool({
        name: 'test_tool',
        description: 'A test tool',
        inputSchema: z.object({
          input: z.string(),
        }),
        execute: async (params) => {
          return {
            result: params.input,
          };
        },
      });

      expect(testTool.type).toBe(ToolType.Function);
      expect(testTool.function.name).toBe('test_tool');
      expect(testTool.function.description).toBe('A test tool');
      expect(testTool.function.inputSchema).toBeDefined();
    });

    it('should infer execute params from inputSchema', async () => {
      const weatherTool = tool({
        name: 'weather',
        inputSchema: z.object({
          location: z.string(),
          units: z
            .enum([
              'celsius',
              'fahrenheit',
            ])
            .optional(),
        }),
        execute: async (params) => {
          // params should be typed as { location: string; units?: 'celsius' | 'fahrenheit' }
          const location: string = params.location;
          const units: 'celsius' | 'fahrenheit' | undefined = params.units;
          return {
            location,
            units,
          };
        },
      });

      const result = await weatherTool.function.execute({
        location: 'NYC',
        units: 'fahrenheit',
      });
      expect(result.location).toBe('NYC');
      expect(result.units).toBe('fahrenheit');
    });

    it('should enforce output schema return type', async () => {
      const tempTool = tool({
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

      const result = await tempTool.function.execute({
        location: 'NYC',
      });
      expect(result.temperature).toBe(72);
      expect(result.description).toBe('Sunny');
    });

    it('should support synchronous execute functions', () => {
      const syncTool = tool({
        name: 'sync_tool',
        inputSchema: z.object({
          a: z.number(),
          b: z.number(),
        }),
        execute: (params) => {
          return {
            sum: params.a + params.b,
          };
        },
      });

      const result = syncTool.function.execute({
        a: 5,
        b: 3,
      });
      expect(result).toEqual({
        sum: 8,
      });
    });

    it('should pass context to execute function', async () => {
      let receivedContext: unknown;

      const contextTool = tool({
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

      await contextTool.function.execute({}, mockContext);
      expect(receivedContext).toEqual(mockContext);
    });
  });

  describe('tool - generator tools (with eventSchema)', () => {
    it('should create a generator tool with the correct structure', () => {
      const streamingTool = tool({
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
          yield {
            progress: 50,
          };
          yield {
            result: 'done',
          };
        },
      });

      expect(streamingTool.type).toBe(ToolType.Function);
      expect(streamingTool.function.name).toBe('streaming_tool');
      expect(streamingTool.function.eventSchema).toBeDefined();
      expect(streamingTool.function.outputSchema).toBeDefined();
    });

    it('should yield properly typed events and output', async () => {
      const progressTool = tool({
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
          yield {
            status: 'started',
            progress: 0,
          };
          yield {
            status: 'processing',
            progress: 50,
          };
          yield {
            completed: true,
            result: `Processed: ${params.data}`,
          };
        },
      });

      const results: unknown[] = [];
      const mockContext = {
        numberOfTurns: 1,
        messageHistory: [],
      };
      for await (const event of progressTool.function.execute(
        {
          data: 'test',
        },
        mockContext,
      )) {
        results.push(event);
      }

      expect(results).toHaveLength(3);
      expect(results[0]).toEqual({
        status: 'started',
        progress: 0,
      });
      expect(results[1]).toEqual({
        status: 'processing',
        progress: 50,
      });
      expect(results[2]).toEqual({
        completed: true,
        result: 'Processed: test',
      });
    });
  });

  describe('tool - manual tools (execute: false)', () => {
    it('should create a manual tool without execute function', () => {
      const manualTool = tool({
        name: 'manual_tool',
        description: 'A manual tool',
        inputSchema: z.object({
          query: z.string(),
        }),
        execute: false,
      });

      expect(manualTool.type).toBe(ToolType.Function);
      expect(manualTool.function.name).toBe('manual_tool');
      expect(manualTool.function).not.toHaveProperty('execute');
    });
  });
});
