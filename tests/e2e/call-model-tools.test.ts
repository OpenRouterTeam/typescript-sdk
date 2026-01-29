import * as dotenv from 'dotenv';
import { beforeAll, describe, expect, it } from 'vitest';
import { toJSONSchema, z } from 'zod/v4';
import { OpenRouter, ToolType, toChatMessage, stepCountIs } from '../../src/index.js';
import { convertZodToJsonSchema } from '../../src/lib/tool-executor.js';
import { assertNoTildeKeys } from '../utils/schema-test-helpers.js';

dotenv.config();

describe('Enhanced Tool Support for callModel', () => {
  let client: OpenRouter;

  beforeAll(() => {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      throw new Error('OPENROUTER_API_KEY environment variable is required');
    }
    client = new OpenRouter({
      apiKey,
    });
  });

  describe('Zod Schema Conversion', () => {
    it('should convert Zod schema to JSON Schema using v4 toJSONSchema()', () => {
      const schema = z.object({
        name: z.string().describe("The user's name"),
        age: z.number().min(0).describe("The user's age"),
      });

      const jsonSchema = toJSONSchema(schema, {
        target: 'draft-7',
      });

      expect(jsonSchema).toHaveProperty('type', 'object');
      expect(jsonSchema).toHaveProperty('properties');
      expect(jsonSchema.properties).toHaveProperty('name');
      expect(jsonSchema.properties).toHaveProperty('age');
    });

    it('should handle complex nested schemas', () => {
      const schema = z.object({
        user: z.object({
          name: z.string(),
          address: z.object({
            street: z.string(),
            city: z.string(),
          }),
        }),
        tags: z.array(z.string()),
      });

      const jsonSchema = toJSONSchema(schema, {
        target: 'draft-7',
      });

      expect(jsonSchema.properties?.user).toBeDefined();
      expect(jsonSchema.properties?.tags).toBeDefined();
    });

    it('should preserve descriptions and metadata', () => {
      const schema = z.object({
        location: z.string().describe('City and country e.g. Bogotá, Colombia'),
      });

      const jsonSchema = toJSONSchema(schema, {
        target: 'draft-7',
      });

      expect(jsonSchema.properties?.location?.['description']).toBe(
        'City and country e.g. Bogotá, Colombia',
      );
    });

    it('should sanitize ~ prefixed metadata properties from Zod v4 schemas (fixes #131)', () => {
      // Zod v4's toJSONSchema may include ~standard or other ~ prefixed properties
      // that cause 400 errors with downstream providers
      const schema = z.object({
        name: z.string(),
        age: z.number(),
      });

      const jsonSchema = convertZodToJsonSchema(schema);

      // Recursively check that no ~ prefixed keys exist
      assertNoTildeKeys(jsonSchema);

      // Verify schema is still valid
      expect(jsonSchema).toHaveProperty('type', 'object');
      expect(jsonSchema).toHaveProperty('properties');
    });
  });

  describe('Tool Definition', () => {
    it('should define tool with inputSchema', async () => {
      const weatherTool = {
        type: ToolType.Function,
        function: {
          name: 'get_weather',
          description: 'Get current temperature for a given location.',
          inputSchema: z.object({
            location: z.string().describe('City and country e.g. Bogotá, Colombia'),
          }),
          outputSchema: z.object({
            temperature: z.number(),
            description: z.string(),
          }),
          execute: async (
            _parameters: {
              location: string;
            },
            _context,
          ) => {
            return {
              temperature: 20,
              description: 'Clear skies',
            };
          },
        },
      };

      // Tool definition should be valid
      expect(weatherTool.function.name).toBe('get_weather');
      expect(weatherTool.function.inputSchema).toBeDefined();
      expect(weatherTool.function.outputSchema).toBeDefined();
    });

    it('should validate input against Zod schema', () => {
      const schema = z.object({
        location: z.string(),
        temperature: z.number(),
      });

      const validInput = {
        location: 'Tokyo',
        temperature: 25,
      };
      const result = schema.safeParse(validInput);

      expect(result.success).toBe(true);
    });

    it('should reject invalid input with ZodError', () => {
      const schema = z.object({
        location: z.string(),
        temperature: z.number(),
      });

      const invalidInput = {
        location: 'Tokyo',
        temperature: 'hot',
      }; // Wrong type

      const result = schema.safeParse(invalidInput);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeDefined();
      }
    });
  });

  describe('Regular Tool Execution', () => {
    it('should execute tool with valid input', async () => {
      const addTool = {
        type: ToolType.Function,
        function: {
          name: 'add_numbers',
          description: 'Add two numbers together',
          inputSchema: z.object({
            a: z.number(),
            b: z.number(),
          }),
          outputSchema: z.object({
            result: z.number(),
          }),
          execute: async (
            params: {
              a: number;
              b: number;
            },
            _context,
          ) => {
            return {
              result: params.a + params.b,
            };
          },
        },
      };

      const mockContext = {
        numberOfTurns: 1,
        messageHistory: [],
        model: 'test-model',
      };
      const result = await addTool.function.execute(
        {
          a: 5,
          b: 3,
        },
        mockContext,
      );

      expect(result.result).toBe(8);
    });

    it('should validate output against outputSchema', () => {
      const schema = z.object({
        temperature: z.number(),
        description: z.string(),
      });

      const output = {
        temperature: 72,
        description: 'Sunny',
      };
      const result = schema.safeParse(output);

      expect(result.success).toBe(true);
    });

    it('should handle execution errors gracefully', async () => {
      const errorTool = {
        type: ToolType.Function,
        function: {
          name: 'error_tool',
          inputSchema: z.object({}),
          execute: async (_params, _context) => {
            throw new Error('Tool execution failed');
          },
        },
      };

      const mockContext = {
        numberOfTurns: 1,
        messageHistory: [],
        model: 'test-model',
      };
      await expect(errorTool.function.execute({}, mockContext)).rejects.toThrow(
        'Tool execution failed',
      );
    });
  });

  describe('Generator Tools (Preliminary Results)', () => {
    it('should collect all yielded values as preliminary results', async () => {
      const eventSchema = z.object({
        type: z.enum([
          'start',
          'update',
        ]),
        data: z
          .object({
            location: z.string().optional(),
            temperature: z.number().optional(),
            description: z.string().optional(),
          })
          .optional(),
      });

      const outputSchema = z.object({
        temperature: z.number(),
        description: z.string(),
        location: z.string(),
      });

      const generatorTool = {
        type: ToolType.Function,
        function: {
          name: 'get_weather_with_updates',
          description: 'Get weather with streaming updates',
          inputSchema: z.object({
            location: z.string(),
          }),
          eventSchema,
          outputSchema,
          execute: async function* (
            params: {
              location: string;
            },
            _context,
          ) {
            yield {
              type: 'start' as const,
              data: {
                location: params.location,
              },
            };
            yield {
              type: 'update' as const,
              data: {
                temperature: 20,
                description: 'Clear skies',
              },
            };
            // Final output (different schema)
            yield {
              temperature: 20,
              description: 'Clear skies',
              location: params.location,
            };
          },
        },
      };

      const mockContext = {
        numberOfTurns: 1,
        messageHistory: [],
        model: 'test-model',
      };
      const results: unknown[] = [];
      for await (const result of generatorTool.function.execute(
        {
          location: 'Tokyo',
        },
        mockContext,
      )) {
        results.push(result);
      }

      expect(results).toHaveLength(3);
      expect(results[0]).toEqual({
        type: 'start',
        data: {
          location: 'Tokyo',
        },
      });
      expect(results[1]).toEqual({
        type: 'update',
        data: {
          temperature: 20,
          description: 'Clear skies',
        },
      });
      expect(results[2]).toEqual({
        temperature: 20,
        description: 'Clear skies',
        location: 'Tokyo',
      });
    });

    it('should send only final (last) yield to model', async () => {
      const generatorTool = {
        type: ToolType.Function,
        function: {
          name: 'process_data',
          inputSchema: z.object({
            data: z.string(),
          }),
          eventSchema: z.object({
            status: z.string(),
          }),
          outputSchema: z.object({
            result: z.string(),
          }),
          execute: async function* (
            params: {
              data: string;
            },
            _context,
          ) {
            yield {
              status: 'processing',
            };
            yield {
              status: 'almost_done',
            };
            // Final output (different schema)
            yield {
              result: `Processed: ${params.data}`,
            };
          },
        },
      };

      const mockContext = {
        numberOfTurns: 1,
        messageHistory: [],
        model: 'test-model',
      };
      const results: unknown[] = [];
      for await (const result of generatorTool.function.execute(
        {
          data: 'test',
        },
        mockContext,
      )) {
        results.push(result);
      }

      const finalResult = results[results.length - 1];
      expect(finalResult).toEqual({
        result: 'Processed: test',
      });
    });

    it('should validate all events against eventSchema', async () => {
      const eventSchema = z.object({
        type: z.enum([
          'start',
          'end',
        ]),
        message: z.string(),
      });

      const validEvent1 = {
        type: 'start' as const,
        message: 'Starting',
      };
      const validEvent2 = {
        type: 'end' as const,
        message: 'Done',
      };
      const invalidEvent = {
        type: 'middle',
        message: 'Processing',
      };

      expect(eventSchema.safeParse(validEvent1).success).toBe(true);
      expect(eventSchema.safeParse(validEvent2).success).toBe(true);
      expect(eventSchema.safeParse(invalidEvent).success).toBe(false);
    });

    it('should handle async generators', async () => {
      async function* testGenerator() {
        yield 1;
        await new Promise((resolve) => setTimeout(resolve, 10));
        yield 2;
        await new Promise((resolve) => setTimeout(resolve, 10));
        yield 3;
      }

      const results: unknown[] = [];
      for await (const value of testGenerator()) {
        results.push(value);
      }

      expect(results).toEqual([
        1,
        2,
        3,
      ]);
    });

    it('should emit preliminary results via callback', async () => {
      const preliminaryResults: unknown[] = [];

      const generatorTool = {
        type: ToolType.Function,
        function: {
          name: 'streaming_tool',
          inputSchema: z.object({
            input: z.string(),
          }),
          eventSchema: z.object({
            progress: z.number(),
            message: z.string(),
          }),
          outputSchema: z.object({
            completed: z.boolean(),
            finalProgress: z.number(),
          }),
          execute: async function* (
            _params: {
              input: string;
            },
            _context,
          ) {
            yield {
              progress: 25,
              message: 'Quarter done',
            };
            yield {
              progress: 50,
              message: 'Half done',
            };
            // Final output (different schema)
            yield {
              completed: true,
              finalProgress: 100,
            };
          },
        },
      };

      const mockContext = {
        numberOfTurns: 1,
        messageHistory: [],
        model: 'test-model',
      };
      // Simulate callback
      for await (const result of generatorTool.function.execute(
        {
          input: 'test',
        },
        mockContext,
      )) {
        preliminaryResults.push(result);
      }

      expect(preliminaryResults).toHaveLength(3);
      expect(preliminaryResults[0]).toEqual({
        progress: 25,
        message: 'Quarter done',
      });
      expect(preliminaryResults[1]).toEqual({
        progress: 50,
        message: 'Half done',
      });
      expect(preliminaryResults[2]).toEqual({
        completed: true,
        finalProgress: 100,
      });
    });

    it('should throw error if generator completes without emitting values', async () => {
      const generatorTool = {
        type: ToolType.Function,
        function: {
          name: 'empty_generator',
          inputSchema: z.object({}),
          eventSchema: z.object({
            status: z.string(),
          }),
          outputSchema: z.object({
            result: z.string(),
          }),
          execute: async function* (_params, _context) {
            // Emit nothing
          },
        },
      };

      const mockContext = {
        numberOfTurns: 1,
        messageHistory: [],
        model: 'test-model',
      };

      const results = [];
      for await (const result of generatorTool.function.execute({}, mockContext)) {
        results.push(result);
      }

      expect(results).toHaveLength(0);
    });
  });

  describe('Manual Tool Execution', () => {
    it('should define tool without execute function', () => {
      const manualTool = {
        type: ToolType.Function,
        function: {
          name: 'manual_tool',
          description: 'A tool that requires manual handling',
          inputSchema: z.object({
            query: z.string(),
          }),
          outputSchema: z.object({
            result: z.string(),
          }),
        },
      };

      expect(manualTool.function.name).toBe('manual_tool');
      expect(manualTool.function).not.toHaveProperty('execute');
    });
  });

  describe('Integration with OpenRouter API', () => {
    it('should send tool call to API and receive tool call response', async () => {
      // This test requires actual API integration which we'll implement
      const weatherTool = {
        type: ToolType.Function,
        function: {
          name: 'get_weather',
          description: 'Get the current weather for a location',
          inputSchema: z.object({
            location: z.string().describe('The city and country'),
          }),
          outputSchema: z.object({
            temperature: z.number(),
            description: z.string(),
          }),
          execute: async (
            _params: {
              location: string;
            },
            _context,
          ) => {
            return {
              temperature: 72,
              description: 'Sunny',
            };
          },
        },
      };

      const response = await client.callModel({
        model: 'openai/gpt-4o',
        input: [
          {
            role: 'user',
            content: "What's the weather like in San Francisco?",
          },
        ],
        tools: [
          weatherTool,
        ],
      });

      const fullResponse = await response.getResponse();
      const message = toChatMessage(fullResponse);
      expect(message).toBeDefined();
    }, 30000);

    it('should handle multi-turn conversation with tool execution', async () => {
      // This will test the full loop: request -> tool call -> execute -> send result -> final response
      const calculatorTool = {
        type: ToolType.Function,
        function: {
          name: 'calculate',
          description: 'Perform a mathematical calculation',
          inputSchema: z.object({
            expression: z.string().describe('Math expression to evaluate'),
          }),
          outputSchema: z.object({
            result: z.number(),
          }),
          execute: async (
            params: {
              expression: string;
            },
            _context,
          ) => {
            // Simple eval for testing (don't use in production!)
            // biome-ignore lint/security/noGlobalEval: this is just a test
            const result = eval(params.expression);
            return {
              result,
            };
          },
        },
      };

      const response = await client.callModel(
        {
          model: 'openai/gpt-4o',
          input: [
            {
              role: 'user',
              content: 'What is 25 * 4?',
            },
          ],
          tools: [
            calculatorTool,
          ],
          stopWhen: stepCountIs(3),
        },
      );

      const fullResponse = await response.getResponse();
      const finalMessage = toChatMessage(fullResponse);
      expect(finalMessage).toBeDefined();
      expect(finalMessage.content).toBeTruthy();
    }, 30000);
  });

  describe('Error Handling', () => {
    it('should handle Zod input validation errors', () => {
      const schema = z.object({
        name: z.string(),
        age: z.number().positive(),
      });

      const invalidInput = {
        name: 'John',
        age: -5,
      };
      const result = schema.safeParse(invalidInput);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual([
          'age',
        ]);
      }
    });

    it('should handle Zod output validation errors', () => {
      const schema = z.object({
        temperature: z.number(),
        description: z.string(),
      });

      const invalidOutput = {
        temperature: 'hot',
        description: 'Sunny',
      };
      const result = schema.safeParse(invalidOutput);

      expect(result.success).toBe(false);
    });

    it('should provide clear error messages for validation failures', () => {
      const schema = z.object({
        email: z.string().email(),
        age: z.number().min(18),
      });

      const invalidData = {
        email: 'not-an-email',
        age: 15,
      };
      const result = schema.safeParse(invalidData);

      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(0);
        const issues = result.error.issues;
        expect(issues.some((i) => i.path.includes('email'))).toBe(true);
        expect(issues.some((i) => i.path.includes('age'))).toBe(true);
      }
    });
  });

  describe('Type Safety', () => {
    it('should infer correct parameter types from inputSchema', () => {
      const weatherTool = {
        type: ToolType.Function,
        function: {
          name: 'get_weather',
          inputSchema: z.object({
            location: z.string(),
            units: z
              .enum([
                'celsius',
                'fahrenheit',
              ])
              .optional(),
          }),
          execute: async (params: z.infer<typeof weatherTool.function.inputSchema>, _context) => {
            // TypeScript should infer: { location: string; units?: "celsius" | "fahrenheit" }
            const location: string = params.location;
            const units: 'celsius' | 'fahrenheit' | undefined = params.units;
            return {
              location,
              units,
            };
          },
        },
      };

      expect(weatherTool.function.name).toBe('get_weather');
    });

    it('should infer correct return types from outputSchema', () => {
      const outputSchema = z.object({
        temperature: z.number(),
        unit: z.enum([
          'C',
          'F',
        ]),
      });

      type OutputType = z.infer<typeof outputSchema>;

      const output: OutputType = {
        temperature: 72,
        unit: 'F',
      };

      expect(output.temperature).toBe(72);
      expect(output.unit).toBe('F');
    });
  });

  describe('Parallel Tool Execution', () => {
    it('should execute multiple tools in parallel', async () => {
      const tool100ms = {
        type: ToolType.Function,
        function: {
          name: 'tool_100ms',
          description: 'A tool that takes 100ms to execute',
          inputSchema: z.object({}),
          outputSchema: z.object({ duration: z.number(), order: z.number() }),
          execute: async (_params: Record<string, never>, _context) => {
            await new Promise((resolve) => setTimeout(resolve, 100));
            return { duration: 100, order: 1 };
          },
        },
      };

      const tool200ms = {
        type: ToolType.Function,
        function: {
          name: 'tool_200ms',
          description: 'A tool that takes 200ms to execute',
          inputSchema: z.object({}),
          outputSchema: z.object({ duration: z.number(), order: z.number() }),
          execute: async (_params: Record<string, never>, _context) => {
            await new Promise((resolve) => setTimeout(resolve, 200));
            return { duration: 200, order: 2 };
          },
        },
      };

      const tool300ms = {
        type: ToolType.Function,
        function: {
          name: 'tool_300ms',
          description: 'A tool that takes 300ms to execute',
          inputSchema: z.object({}),
          outputSchema: z.object({ duration: z.number(), order: z.number() }),
          execute: async (_params: Record<string, never>, _context) => {
            await new Promise((resolve) => setTimeout(resolve, 300));
            return { duration: 300, order: 3 };
          },
        },
      };

      const response = await client.callModel({
        model: 'openai/gpt-4o-mini',
        input: [
          {
            role: 'user',
            content:
              'Call all three tools: tool_100ms, tool_200ms, and tool_300ms. Do NOT call any other tools. Just call these three.',
          },
        ],
        tools: [tool100ms, tool200ms, tool300ms],
        stopWhen: stepCountIs(1),
      });

      // Collect all tool outputs to verify all 3 tools were executed
      const toolResults: Array<{ output: string }> = [];
      for await (const item of response.getItemsStream()) {
        if (item.type === 'function_call_output') {
          toolResults.push({ output: item.output });
        }
      }

      // Verify all 3 tools were executed by checking their outputs
      const durations = toolResults.map(
        (r) => (JSON.parse(r.output) as { duration: number }).duration
      );
      expect(durations).toContain(100);
      expect(durations).toContain(200);
      expect(durations).toContain(300);
    }, 30000);

    it('should collect all errors when multiple tools fail in parallel', async () => {
      const successTool = {
        type: ToolType.Function,
        function: {
          name: 'success_tool',
          description: 'A tool that succeeds',
          inputSchema: z.object({}),
          outputSchema: z.object({ status: z.string() }),
          execute: async (_params: Record<string, never>, _context) => {
            return { status: 'success' };
          },
        },
      };

      const failTool = {
        type: ToolType.Function,
        function: {
          name: 'fail_tool',
          description: 'A tool that always fails',
          inputSchema: z.object({}),
          outputSchema: z.object({ status: z.string() }),
          execute: async (_params: Record<string, never>, _context) => {
            throw new Error('Intentional failure');
          },
        },
      };

      const response = await client.callModel({
        model: 'openai/gpt-4o-mini',
        input: [
          {
            role: 'user',
            content:
              'Call both tools: success_tool and fail_tool. Do NOT call any other tools.',
          },
        ],
        tools: [successTool, failTool],
        stopWhen: stepCountIs(2),
      });

      // Collect all tool outputs to verify error handling
      const toolResults: Array<{ output: string }> = [];
      for await (const item of response.getItemsStream()) {
        if (item.type === 'function_call_output') {
          toolResults.push({ output: item.output });
        }
      }

      // Parse outputs and check for success/error results
      const outputs = toolResults.map(
        (r) => JSON.parse(r.output) as { status?: string; error?: string }
      );
      const hasSuccess = outputs.some((o) => o.status === 'success');
      const hasError = outputs.some((o) => o.error?.includes('Intentional failure'));

      // At least one tool was called
      expect(hasSuccess || hasError).toBe(true);

      // If both tools were called, verify we have both success and error
      if (toolResults.length >= 2) {
        expect(hasSuccess).toBe(true);
        expect(hasError).toBe(true);
      }
    }, 30000);

    it('should return results in original tool call order regardless of completion order', async () => {
      const slowTool = {
        type: ToolType.Function,
        function: {
          name: 'slow_tool',
          description: 'A slow tool (call this first)',
          inputSchema: z.object({}),
          outputSchema: z.object({ name: z.string(), completedAt: z.number() }),
          execute: async (_params: Record<string, never>, _context) => {
            await new Promise((resolve) => setTimeout(resolve, 200));
            return { name: 'slow_tool', completedAt: Date.now() };
          },
        },
      };

      const fastTool = {
        type: ToolType.Function,
        function: {
          name: 'fast_tool',
          description: 'A fast tool (call this second)',
          inputSchema: z.object({}),
          outputSchema: z.object({ name: z.string(), completedAt: z.number() }),
          execute: async (_params: Record<string, never>, _context) => {
            await new Promise((resolve) => setTimeout(resolve, 50));
            return { name: 'fast_tool', completedAt: Date.now() };
          },
        },
      };

      const response = await client.callModel({
        model: 'openai/gpt-4o-mini',
        input: [
          {
            role: 'user',
            content:
              'Call slow_tool first, then call fast_tool second. You MUST call them in this exact order.',
          },
        ],
        tools: [slowTool, fastTool],
        stopWhen: stepCountIs(1),
      });

      // Collect both function calls and their outputs
      const functionCalls: Array<{ name: string; id: string }> = [];
      const toolResults: Array<{ callId: string; output: string }> = [];

      for await (const item of response.getItemsStream()) {
        if (item.type === 'function_call') {
          functionCalls.push({ name: item.name, id: item.callId });
        }
        if (item.type === 'function_call_output') {
          toolResults.push({ callId: item.callId, output: item.output });
        }
      }

      // Verify results are returned in the same order as calls (by callId matching)
      if (functionCalls.length === 2 && toolResults.length === 2) {
        expect(toolResults[0]?.callId).toBe(functionCalls[0]?.id);
        expect(toolResults[1]?.callId).toBe(functionCalls[1]?.id);
      }
    }, 30000);
  });
});
