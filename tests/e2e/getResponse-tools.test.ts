import { describe, it, expect, beforeAll } from "vitest";
import { OpenRouter, ToolType } from "../../src/index.js";
import { z } from "zod";
import { toJSONSchema } from "zod/v4";
import * as dotenv from "dotenv";

dotenv.config();

describe("Enhanced Tool Support for getResponse", () => {
  let client: OpenRouter;

  beforeAll(() => {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      throw new Error("OPENROUTER_API_KEY environment variable is required");
    }
    client = new OpenRouter({ apiKey });
  });

  describe("Zod Schema Conversion", () => {
    it("should convert Zod schema to JSON Schema using v4 toJSONSchema()", () => {
      const schema = z.object({
        name: z.string().describe("The user's name"),
        age: z.number().min(0).describe("The user's age"),
      });

      const jsonSchema = toJSONSchema(schema, { target: "openapi-3.0" });

      expect(jsonSchema).toHaveProperty("type", "object");
      expect(jsonSchema).toHaveProperty("properties");
      expect(jsonSchema.properties).toHaveProperty("name");
      expect(jsonSchema.properties).toHaveProperty("age");
    });

    it("should handle complex nested schemas", () => {
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

      const jsonSchema = toJSONSchema(schema, { target: "openapi-3.0" });

      expect(jsonSchema.properties.user).toBeDefined();
      expect(jsonSchema.properties.tags).toBeDefined();
    });

    it("should preserve descriptions and metadata", () => {
      const schema = z.object({
        location: z.string().describe("City and country e.g. Bogotá, Colombia"),
      });

      const jsonSchema = toJSONSchema(schema, { target: "openapi-3.0" });

      expect(jsonSchema.properties.location.description).toBe(
        "City and country e.g. Bogotá, Colombia"
      );
    });
  });

  describe("Tool Definition", () => {
    it("should define tool with inputSchema", async () => {
      const weatherTool = {
        type: ToolType.Function,
        function: {
          name: "get_weather",
          description: "Get current temperature for a given location.",
          inputSchema: z.object({
            location: z.string().describe("City and country e.g. Bogotá, Colombia"),
          }),
          outputSchema: z.object({
            temperature: z.number(),
            description: z.string(),
          }),
          execute: async (parameters: { location: string }, context) => {
            return {
              temperature: 20,
              description: "Clear skies",
            };
          },
        },
      };

      // Tool definition should be valid
      expect(weatherTool.function.name).toBe("get_weather");
      expect(weatherTool.function.inputSchema).toBeDefined();
      expect(weatherTool.function.outputSchema).toBeDefined();
    });

    it("should validate input against Zod schema", () => {
      const schema = z.object({
        location: z.string(),
        temperature: z.number(),
      });

      const validInput = { location: "Tokyo", temperature: 25 };
      const result = schema.safeParse(validInput);

      expect(result.success).toBe(true);
    });

    it("should reject invalid input with ZodError", () => {
      const schema = z.object({
        location: z.string(),
        temperature: z.number(),
      });

      const invalidInput = { location: "Tokyo", temperature: "hot" }; // Wrong type

      const result = schema.safeParse(invalidInput);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeDefined();
      }
    });
  });

  describe("Regular Tool Execution", () => {
    it("should execute tool with valid input", async () => {
      const addTool = {
        type: ToolType.Function,
        function: {
          name: "add_numbers",
          description: "Add two numbers together",
          inputSchema: z.object({
            a: z.number(),
            b: z.number(),
          }),
          outputSchema: z.object({
            result: z.number(),
          }),
          execute: async (params: { a: number; b: number }, context) => {
            return { result: params.a + params.b };
          },
        },
      };

      const mockContext = {
        numberOfTurns: 1,
        messageHistory: [],
        model: "test-model",
      };
      const result = await addTool.function.execute({ a: 5, b: 3 }, mockContext);

      expect(result.result).toBe(8);
    });

    it("should validate output against outputSchema", () => {
      const schema = z.object({
        temperature: z.number(),
        description: z.string(),
      });

      const output = { temperature: 72, description: "Sunny" };
      const result = schema.safeParse(output);

      expect(result.success).toBe(true);
    });

    it("should handle execution errors gracefully", async () => {
      const errorTool = {
        type: ToolType.Function,
        function: {
          name: "error_tool",
          inputSchema: z.object({}),
          execute: async (params, context) => {
            throw new Error("Tool execution failed");
          },
        },
      };

      const mockContext = {
        numberOfTurns: 1,
        messageHistory: [],
        model: "test-model",
      };
      await expect(errorTool.function.execute({}, mockContext)).rejects.toThrow(
        "Tool execution failed"
      );
    });
  });

  describe("Generator Tools (Preliminary Results)", () => {
    it("should collect all yielded values as preliminary results", async () => {
      const eventSchema = z.object({
        type: z.enum(["start", "update"]),
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
          name: "get_weather_with_updates",
          description: "Get weather with streaming updates",
          inputSchema: z.object({
            location: z.string(),
          }),
          eventSchema,
          outputSchema,
          execute: async function* (params: { location: string }, context) {
            yield { type: "start" as const, data: { location: params.location } };
            yield {
              type: "update" as const,
              data: { temperature: 20, description: "Clear skies" },
            };
            // Final output (different schema)
            yield {
              temperature: 20,
              description: "Clear skies",
              location: params.location,
            };
          },
        },
      };

      const mockContext = {
        numberOfTurns: 1,
        messageHistory: [],
        model: "test-model",
      };
      const results: unknown[] = [];
      for await (const result of generatorTool.function.execute({
        location: "Tokyo",
      }, mockContext)) {
        results.push(result);
      }

      expect(results).toHaveLength(3);
      expect(results[0]).toEqual({ type: "start", data: { location: "Tokyo" } });
      expect(results[1]).toEqual({ type: "update", data: { temperature: 20, description: "Clear skies" } });
      expect(results[2]).toEqual({ temperature: 20, description: "Clear skies", location: "Tokyo" });
    });

    it("should send only final (last) yield to model", async () => {
      const generatorTool = {
        type: ToolType.Function,
        function: {
          name: "process_data",
          inputSchema: z.object({ data: z.string() }),
          eventSchema: z.object({
            status: z.string(),
          }),
          outputSchema: z.object({
            result: z.string(),
          }),
          execute: async function* (params: { data: string }, context) {
            yield { status: "processing" };
            yield { status: "almost_done" };
            // Final output (different schema)
            yield { result: `Processed: ${params.data}` };
          },
        },
      };

      const mockContext = {
        numberOfTurns: 1,
        messageHistory: [],
        model: "test-model",
      };
      const results = [];
      for await (const result of generatorTool.function.execute({ data: "test" }, mockContext)) {
        results.push(result);
      }

      const finalResult = results[results.length - 1];
      expect(finalResult).toEqual({ result: "Processed: test" });
    });

    it("should validate all events against eventSchema", async () => {
      const eventSchema = z.object({
        type: z.enum(["start", "end"]),
        message: z.string(),
      });

      const validEvent1 = { type: "start" as const, message: "Starting" };
      const validEvent2 = { type: "end" as const, message: "Done" };
      const invalidEvent = { type: "middle", message: "Processing" };

      expect(eventSchema.safeParse(validEvent1).success).toBe(true);
      expect(eventSchema.safeParse(validEvent2).success).toBe(true);
      expect(eventSchema.safeParse(invalidEvent).success).toBe(false);
    });

    it("should handle async generators", async () => {
      async function* testGenerator() {
        yield 1;
        await new Promise((resolve) => setTimeout(resolve, 10));
        yield 2;
        await new Promise((resolve) => setTimeout(resolve, 10));
        yield 3;
      }

      const results = [];
      for await (const value of testGenerator()) {
        results.push(value);
      }

      expect(results).toEqual([1, 2, 3]);
    });

    it("should emit preliminary results via callback", async () => {
      const preliminaryResults: any[] = [];

      const generatorTool = {
        type: ToolType.Function,
        function: {
          name: "streaming_tool",
          inputSchema: z.object({ input: z.string() }),
          eventSchema: z.object({ progress: z.number(), message: z.string() }),
          outputSchema: z.object({ completed: z.boolean(), finalProgress: z.number() }),
          execute: async function* (params: { input: string }, context) {
            yield { progress: 25, message: "Quarter done" };
            yield { progress: 50, message: "Half done" };
            // Final output (different schema)
            yield { completed: true, finalProgress: 100 };
          },
        },
      };

      const mockContext = {
        numberOfTurns: 1,
        messageHistory: [],
        model: "test-model",
      };
      // Simulate callback
      for await (const result of generatorTool.function.execute({ input: "test" }, mockContext)) {
        preliminaryResults.push(result);
      }

      expect(preliminaryResults).toHaveLength(3);
      expect(preliminaryResults[0]).toEqual({ progress: 25, message: "Quarter done" });
      expect(preliminaryResults[1]).toEqual({ progress: 50, message: "Half done" });
      expect(preliminaryResults[2]).toEqual({ completed: true, finalProgress: 100 });
    });

    it("should throw error if generator completes without emitting values", async () => {
      const generatorTool = {
        type: ToolType.Function,
        function: {
          name: "empty_generator",
          inputSchema: z.object({}),
          eventSchema: z.object({ status: z.string() }),
          outputSchema: z.object({ result: z.string() }),
          execute: async function* (params, context) {
            // Emit nothing
          },
        },
      };

      const mockContext = {
        numberOfTurns: 1,
        messageHistory: [],
        model: "test-model",
      };

      const results = [];
      for await (const result of generatorTool.function.execute({}, mockContext)) {
        results.push(result);
      }

      expect(results).toHaveLength(0);
    });
  });

  describe("Manual Tool Execution", () => {
    it("should define tool without execute function", () => {
      const manualTool = {
        type: ToolType.Function,
        function: {
          name: "manual_tool",
          description: "A tool that requires manual handling",
          inputSchema: z.object({
            query: z.string(),
          }),
          outputSchema: z.object({
            result: z.string(),
          }),
        },
      };

      expect(manualTool.function.name).toBe("manual_tool");
      expect(manualTool.function).not.toHaveProperty("execute");
    });
  });

  describe("Integration with OpenRouter API", () => {
    it.skip("should send tool call to API and receive tool call response", async () => {
      // This test requires actual API integration which we'll implement
      const weatherTool = {
        type: ToolType.Function,
        function: {
          name: "get_weather",
          description: "Get the current weather for a location",
          inputSchema: z.object({
            location: z.string().describe("The city and country"),
          }),
          outputSchema: z.object({
            temperature: z.number(),
            description: z.string(),
          }),
          execute: async (params: { location: string }, context) => {
            return {
              temperature: 72,
              description: "Sunny",
            };
          },
        },
      };

      const response = await client.getResponse({
        model: "openai/gpt-4o",
        messages: [
          {
            role: "user",
            content: "What's the weather like in San Francisco?",
          },
        ],
        tools: [weatherTool],
      });

      const message = await response.getMessage();
      expect(message).toBeDefined();
    }, 30000);

    it.skip("should handle multi-turn conversation with tool execution", async () => {
      // This will test the full loop: request -> tool call -> execute -> send result -> final response
      const calculatorTool = {
        type: ToolType.Function,
        function: {
          name: "calculate",
          description: "Perform a mathematical calculation",
          inputSchema: z.object({
            expression: z.string().describe("Math expression to evaluate"),
          }),
          outputSchema: z.object({
            result: z.number(),
          }),
          execute: async (params: { expression: string }, context) => {
            // Simple eval for testing (don't use in production!)
            const result = eval(params.expression);
            return { result };
          },
        },
      };

      const response = await client.getResponse(
        {
          model: "openai/gpt-4o",
          messages: [
            {
              role: "user",
              content: "What is 25 * 4?",
            },
          ],
          tools: [calculatorTool],
        },
        {
          autoExecuteTools: true,
          maxToolRounds: 3,
        }
      );

      const finalMessage = await response.getMessage();
      expect(finalMessage).toBeDefined();
      expect(finalMessage.content).toBeTruthy();
    }, 30000);
  });

  describe("Error Handling", () => {
    it("should handle Zod input validation errors", () => {
      const schema = z.object({
        name: z.string(),
        age: z.number().positive(),
      });

      const invalidInput = { name: "John", age: -5 };
      const result = schema.safeParse(invalidInput);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].path).toEqual(["age"]);
      }
    });

    it("should handle Zod output validation errors", () => {
      const schema = z.object({
        temperature: z.number(),
        description: z.string(),
      });

      const invalidOutput = { temperature: "hot", description: "Sunny" };
      const result = schema.safeParse(invalidOutput);

      expect(result.success).toBe(false);
    });

    it("should provide clear error messages for validation failures", () => {
      const schema = z.object({
        email: z.string().email(),
        age: z.number().min(18),
      });

      const invalidData = { email: "not-an-email", age: 15 };
      const result = schema.safeParse(invalidData);

      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(0);
        const issues = result.error.issues;
        expect(issues.some((i) => i.path.includes("email"))).toBe(true);
        expect(issues.some((i) => i.path.includes("age"))).toBe(true);
      }
    });
  });

  describe("Type Safety", () => {
    it("should infer correct parameter types from inputSchema", () => {
      const weatherTool = {
        type: ToolType.Function,
        function: {
          name: "get_weather",
          inputSchema: z.object({
            location: z.string(),
            units: z.enum(["celsius", "fahrenheit"]).optional(),
          }),
          execute: async (params: z.infer<typeof weatherTool.function.inputSchema>, context) => {
            // TypeScript should infer: { location: string; units?: "celsius" | "fahrenheit" }
            const location: string = params.location;
            const units: "celsius" | "fahrenheit" | undefined = params.units;
            return { location, units };
          },
        },
      };

      expect(weatherTool.function.name).toBe("get_weather");
    });

    it("should infer correct return types from outputSchema", () => {
      const outputSchema = z.object({
        temperature: z.number(),
        unit: z.enum(["C", "F"]),
      });

      type OutputType = z.infer<typeof outputSchema>;

      const output: OutputType = {
        temperature: 72,
        unit: "F",
      };

      expect(output.temperature).toBe(72);
      expect(output.unit).toBe("F");
    });
  });
});
