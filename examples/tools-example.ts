/**
 * OpenRouter SDK - Enhanced Tool Support Examples
 *
 * This file demonstrates the automatic tool execution feature.
 * When you provide tools with `execute` functions, they are automatically:
 * 1. Validated using Zod schemas
 * 2. Executed when the model calls them
 * 3. Results sent back to the model
 * 4. Process repeats until no more tool calls (up to maxToolRounds)
 *
 * The API is simple: just call getResponse() with tools, and await the result.
 * Tools are executed transparently before getMessage() or getText() returns!
 *
 * maxToolRounds can be:
 * - A number: Maximum number of tool execution rounds (default: 5)
 * - A function: (context: TurnContext) => boolean
 *   - Return true to allow another turn
 *   - Return false to stop execution
 *   - Context includes: numberOfTurns, messageHistory, model/models
 */

import { OpenRouter, ToolType } from "../src/index.js";
import { z } from "zod/v4";
import * as dotenv from "dotenv";

dotenv.config();

const client = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY || "",
});

/**
 * Example 1: Basic Tool with Execute Function
 * A simple weather tool that returns mock data
 * Note: The context parameter is optional for backward compatibility
 */
async function basicToolExample() {
  console.log("\n=== Example 1: Basic Tool with Execute Function ===\n");

  const weatherTool = {
    type: ToolType.Function,
    function: {
      name: "get_weather",
      description: "Get current weather for a location",
      inputSchema: z.object({
        location: z.string().describe("City and country (e.g., San Francisco, CA)"),
      }),
      outputSchema: z.object({
        temperature: z.number(),
        description: z.string(),
        humidity: z.number(),
      }),
      execute: async (params: { location: string }, context) => {
        console.log(`Executing get_weather for: ${params.location}`);
        console.log(`Turn ${context.numberOfTurns} - Model: ${context.model || context.models?.join(", ")}`);
        // In real usage, you would call a weather API here
        return {
          temperature: 72,
          description: "Sunny",
          humidity: 45,
        };
      },
    },
  };

  const response = client.getResponse({
    model: "openai/gpt-4o",
    input: "What's the weather like in San Francisco?",
    tools: [weatherTool],
    // Example: limit to 3 turns using a function
    maxToolRounds: (context) => {
      console.log(`Checking if we should continue (currently on turn ${context.numberOfTurns})`);
      return context.numberOfTurns < 3; // Allow up to 3 turns
    },
  });

  // Tools are automatically executed! Just get the final message
  const message = await response.getMessage();
  console.log("\nFinal message after automatic tool execution:", message.content);

  // You can also check what tool calls were made initially
  const toolCalls = await response.getToolCalls();
  console.log("\nInitial tool calls:", JSON.stringify(toolCalls, null, 2));
}

/**
 * Example 2: Generator Tool with Preliminary Results
 * Shows how to use async generators for streaming intermediate results
 */
async function generatorToolExample() {
  console.log("\n=== Example 2: Generator Tool with Preliminary Results ===\n");

  const processingTool = {
    type: ToolType.Function,
    function: {
      name: "process_data",
      description: "Process data with progress updates",
      inputSchema: z.object({
        data: z.string().describe("Data to process"),
      }),
      eventSchema: z.object({
        type: z.enum(["start", "progress", "complete"]),
        message: z.string(),
        progress: z.number().min(0).max(100).optional(),
      }),
      execute: async function* (params: { data: string }, context) {
        console.log(`Generator tool - Turn ${context.numberOfTurns}`);
        // Preliminary result 1
        yield {
          type: "start" as const,
          message: `Started processing: ${params.data}`,
          progress: 0,
        };

        await new Promise((resolve) => setTimeout(resolve, 500));

        // Preliminary result 2
        yield {
          type: "progress" as const,
          message: "Processing halfway done",
          progress: 50,
        };

        await new Promise((resolve) => setTimeout(resolve, 500));

        // Final result (last yield)
        yield {
          type: "complete" as const,
          message: `Completed processing: ${params.data.toUpperCase()}`,
          progress: 100,
        };
      },
    },
  };

  const response = client.getResponse({
    model: "openai/gpt-4o",
    input: "Process this data: hello world",
    tools: [processingTool],
  });

  // Stream preliminary results as they arrive
  console.log("Streaming tool events including preliminary results:\n");
  for await (const event of response.getToolStream()) {
    if (event.type === "preliminary_result") {
      console.log(`Preliminary result from ${event.toolCallId}:`, event.result);
    } else if (event.type === "delta") {
      process.stdout.write(event.content);
    }
  }

  // Tools are automatically executed with preliminary results available
  const message = await response.getMessage();
  console.log("\n\nFinal message:", message.content);
}

/**
 * Example 3: Manual Tool Execution
 * Define a tool without execute function for manual handling
 */
async function manualToolExample() {
  console.log("\n=== Example 3: Manual Tool Execution ===\n");

  const calculatorTool = {
    type: ToolType.Function,
    function: {
      name: "calculate",
      description: "Perform mathematical calculations",
      inputSchema: z.object({
        expression: z.string().describe("Math expression to evaluate"),
      }),
      outputSchema: z.object({
        result: z.number(),
      }),
      // No execute function - tool calls are returned but not executed
    },
  };

  const response = client.getResponse({
    model: "openai/gpt-4o",
    input: "What is 25 * 4 + 10?",
    tools: [calculatorTool],
  });

  // Since there's no execute function, tool calls are returned but not executed
  const toolCalls = await response.getToolCalls();
  console.log("Tool calls (not auto-executed):", toolCalls);

  // You can manually handle tool execution here
  for (const toolCall of toolCalls) {
    if (toolCall.name === "calculate") {
      const expression = (toolCall.arguments as { expression: string }).expression;
      console.log(`Manually executing calculation: ${expression}`);

      // In a real app, you would safely evaluate this
      // For demo purposes only - don't use eval in production!
      try {
        const result = eval(expression);
        console.log(`Result: ${result}`);
      } catch (error) {
        console.error("Calculation error:", error);
      }
    }
  }

  // Then you would need to make a new request with the tool results
  // (This example just shows the manual detection, not the full loop)
}

/**
 * Example 4: Streaming Tool Calls
 * Show how to stream structured tool call objects as they arrive
 * Note: This tool doesn't use context - demonstrating backward compatibility
 */
async function streamingToolCallsExample() {
  console.log("\n=== Example 4: Streaming Tool Calls ===\n");

  const searchTool = {
    type: ToolType.Function,
    function: {
      name: "search",
      description: "Search for information",
      inputSchema: z.object({
        query: z.string().describe("Search query"),
      }),
      outputSchema: z.object({
        results: z.array(z.string()),
      }),
      execute: async (params: { query: string }) => {
        // Context parameter is optional - this tool doesn't need it
        return {
          results: [
            `Result 1 for "${params.query}"`,
            `Result 2 for "${params.query}"`,
          ],
        };
      },
    },
  };

  const response = client.getResponse({
    model: "openai/gpt-4o",
    input: "Search for information about TypeScript",
    tools: [searchTool],
  });

  console.log("Streaming tool calls as they arrive:\n");

  // Stream structured tool call objects
  for await (const toolCall of response.getToolCallsStream()) {
    console.log("Tool call:", JSON.stringify(toolCall, null, 2));
  }
}

/**
 * Example 5: Multiple Tools
 * Use multiple tools in a single request
 * Note: Shows mixing tools with and without context parameter
 */
async function multipleToolsExample() {
  console.log("\n=== Example 5: Multiple Tools ===\n");

  const tools = [
    {
      type: ToolType.Function,
      function: {
        name: "get_time",
        description: "Get current time",
        inputSchema: z.object({
          timezone: z.string().optional(),
        }),
        outputSchema: z.object({
          time: z.string(),
          timezone: z.string(),
        }),
        execute: async (params: { timezone?: string }, context) => {
          return {
            time: new Date().toISOString(),
            timezone: params.timezone || "UTC",
          };
        },
      },
    },
    {
      type: ToolType.Function,
      function: {
        name: "get_weather",
        description: "Get weather information",
        inputSchema: z.object({
          location: z.string(),
        }),
        outputSchema: z.object({
          temperature: z.number(),
          description: z.string(),
        }),
        execute: async (params: { location: string }) => {
          // This tool doesn't need context
          return {
            temperature: 68,
            description: "Partly cloudy",
          };
        },
      },
    },
  ];

  const response = client.getResponse({
    model: "openai/gpt-4o",
    input: "What time is it and what's the weather in New York?",
    tools,
  });

  // Tools are automatically executed!
  const message = await response.getMessage();
  console.log("Final message:", message.content);

  // You can check which tools were called
  const toolCalls = await response.getToolCalls();
  console.log("\nTools that were called:", toolCalls.map(tc => tc.name));
}

// Run examples
async function main() {
  try {
    await basicToolExample();
    await generatorToolExample();
    await manualToolExample();
    await streamingToolCallsExample();
    await multipleToolsExample();
  } catch (error) {
    console.error("Error running examples:", error);
  }
}

// Only run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export {
  basicToolExample,
  generatorToolExample,
  manualToolExample,
  streamingToolCallsExample,
  multipleToolsExample,
};
