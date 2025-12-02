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
 * The API is simple: just call callModel() with tools, and await the result.
 * Tools are executed transparently before getMessage() or getText() returns!
 *
 * maxToolRounds can be:
 * - A number: Maximum number of tool execution rounds (default: 5)
 * - A function: (context: TurnContext) => boolean
 *   - Return true to allow another turn
 *   - Return false to stop execution
 *   - Context includes: numberOfTurns, messageHistory, model/models
 */

import * as dotenv from 'dotenv';
import { z } from 'zod/v4';
import { OpenRouter, ToolType } from '../src/index.js';

dotenv.config();

const client = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY || '',
});

/**
 * Example 1: Basic Tool with Execute Function
 * A simple weather tool that returns mock data
 * Note: The context parameter is optional for backward compatibility
 */
async function basicToolExample() {
  const weatherTool = {
    type: ToolType.Function,
    function: {
      name: 'get_weather',
      description: 'Get current weather for a location',
      inputSchema: z.object({
        location: z.string().describe('City and country (e.g., San Francisco, CA)'),
      }),
      outputSchema: z.object({
        temperature: z.number(),
        description: z.string(),
        humidity: z.number(),
      }),
      execute: async (
        _params: {
          location: string;
        },
        _context,
      ) => {
        // In real usage, you would call a weather API here
        return {
          temperature: 72,
          description: 'Sunny',
          humidity: 45,
        };
      },
    },
  };

  const response = client.callModel({
    model: 'openai/gpt-4o',
    input: "What's the weather like in San Francisco?",
    tools: [
      weatherTool,
    ],
    // Example: limit to 3 turns using a function
    maxToolRounds: (context) => {
      return context.numberOfTurns < 3; // Allow up to 3 turns
    },
  });

  // Tools are automatically executed! Just get the final message
  const _message = await response.getMessage();

  // You can also check what tool calls were made initially
  const _toolCalls = await response.getToolCalls();
}

/**
 * Example 2: Generator Tool with Preliminary Results
 * Shows how to use async generators for streaming intermediate results
 */
async function generatorToolExample() {
  const processingTool = {
    type: ToolType.Function,
    function: {
      name: 'process_data',
      description: 'Process data with progress updates',
      inputSchema: z.object({
        data: z.string().describe('Data to process'),
      }),
      // Events emitted during processing (validated against eventSchema)
      eventSchema: z.object({
        type: z.enum([
          'start',
          'progress',
        ]),
        message: z.string(),
        progress: z.number().min(0).max(100).optional(),
      }),
      // Final output (validated against outputSchema - different structure)
      outputSchema: z.object({
        result: z.string(),
        processingTime: z.number(),
      }),
      execute: async function* (
        params: {
          data: string;
        },
        _context,
      ) {
        const startTime = Date.now();

        // Preliminary event 1
        yield {
          type: 'start' as const,
          message: `Started processing: ${params.data}`,
          progress: 0,
        };

        await new Promise((resolve) => setTimeout(resolve, 500));

        // Preliminary event 2
        yield {
          type: 'progress' as const,
          message: 'Processing halfway done',
          progress: 50,
        };

        await new Promise((resolve) => setTimeout(resolve, 500));

        // Final output (different schema - sent to model)
        yield {
          result: params.data.toUpperCase(),
          processingTime: Date.now() - startTime,
        };
      },
    },
  };

  const response = client.callModel({
    model: 'openai/gpt-4o',
    input: 'Process this data: hello world',
    tools: [
      processingTool,
    ],
  });
  for await (const event of response.getToolStream()) {
    if (event.type === 'preliminary_result') {
    } else if (event.type === 'delta') {
      process.stdout.write(event.content);
    }
  }

  // Tools are automatically executed with preliminary results available
  const _message = await response.getMessage();
}

/**
 * Example 3: Manual Tool Execution
 * Define a tool without execute function for manual handling
 */
async function manualToolExample() {
  const calculatorTool = {
    type: ToolType.Function,
    function: {
      name: 'calculate',
      description: 'Perform mathematical calculations',
      inputSchema: z.object({
        expression: z.string().describe('Math expression to evaluate'),
      }),
      outputSchema: z.object({
        result: z.number(),
      }),
      // No execute function - tool calls are returned but not executed
    },
  };

  const response = client.callModel({
    model: 'openai/gpt-4o',
    input: 'What is 25 * 4 + 10?',
    tools: [
      calculatorTool,
    ],
  });

  // Since there's no execute function, tool calls are returned but not executed
  const toolCalls = await response.getToolCalls();

  // You can manually handle tool execution here
  for (const toolCall of toolCalls) {
    if (toolCall.name === 'calculate') {
      const expression = (
        toolCall.arguments as {
          expression: string;
        }
      ).expression;

      // In a real app, you would safely evaluate this
      // For demo purposes only - don't use eval in production!
      try {
        const _result = eval(expression);
      } catch (_error) {}
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
  const searchTool = {
    type: ToolType.Function,
    function: {
      name: 'search',
      description: 'Search for information',
      inputSchema: z.object({
        query: z.string().describe('Search query'),
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

  const response = client.callModel({
    model: 'openai/gpt-4o',
    input: 'Search for information about TypeScript',
    tools: [
      searchTool,
    ],
  });

  // Stream structured tool call objects
  for await (const _toolCall of response.getToolCallsStream()) {
  }
}

/**
 * Example 5: Multiple Tools
 * Use multiple tools in a single request
 * Note: Shows mixing tools with and without context parameter
 */
async function multipleToolsExample() {
  const tools = [
    {
      type: ToolType.Function,
      function: {
        name: 'get_time',
        description: 'Get current time',
        inputSchema: z.object({
          timezone: z.string().optional(),
        }),
        outputSchema: z.object({
          time: z.string(),
          timezone: z.string(),
        }),
        execute: async (
          params: {
            timezone?: string;
          },
          _context,
        ) => {
          return {
            time: new Date().toISOString(),
            timezone: params.timezone || 'UTC',
          };
        },
      },
    },
    {
      type: ToolType.Function,
      function: {
        name: 'get_weather',
        description: 'Get weather information',
        inputSchema: z.object({
          location: z.string(),
        }),
        outputSchema: z.object({
          temperature: z.number(),
          description: z.string(),
        }),
        execute: async (_params: { location: string }) => {
          // This tool doesn't need context
          return {
            temperature: 68,
            description: 'Partly cloudy',
          };
        },
      },
    },
  ];

  const response = client.callModel({
    model: 'openai/gpt-4o',
    input: "What time is it and what's the weather in New York?",
    tools,
  });

  // Tools are automatically executed!
  const _message = await response.getMessage();

  // You can check which tools were called
  const _toolCalls = await response.getToolCalls();
}

// Run examples
async function main() {
  try {
    await basicToolExample();
    await generatorToolExample();
    await manualToolExample();
    await streamingToolCallsExample();
    await multipleToolsExample();
  } catch (_error) {}
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
