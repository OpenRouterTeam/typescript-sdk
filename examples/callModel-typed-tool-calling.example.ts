/*
 * Example: Typed Tool Calling with callModel
 *
 * This example demonstrates how to use the tool() function for
 * fully-typed tool definitions where execute params, return types, and event
 * types are automatically inferred from Zod schemas.
 *
 * Tool types are auto-detected based on configuration:
 * - Generator tool: When `eventSchema` is provided
 * - Regular tool: When `execute` is a function (no `eventSchema`)
 * - Manual tool: When `execute: false` is set
 *
 * To run this example from the examples directory:
 * npm run build && npx tsx callModel-typed-tool-calling.example.ts
 */

import dotenv from "dotenv";
dotenv.config();

import { OpenRouter, tool } from "../src/index.js";
import z from "zod";

const openRouter = new OpenRouter({
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

// Create a typed regular tool using tool()
// The execute function params are automatically typed as z.infer<typeof inputSchema>
// The return type is enforced based on outputSchema
const weatherTool = tool({
  name: "get_weather",
  description: "Get the current weather for a location",
  inputSchema: z.object({
    location: z.string().describe("The city and country, e.g. San Francisco, CA"),
  }),
  outputSchema: z.object({
    temperature: z.number(),
    description: z.string(),
  }),
  // params is automatically typed as { location: string }
  execute: async (params) => {
    console.log(`Getting weather for: ${params.location}`);
    // Return type is enforced as { temperature: number; description: string }
    return {
      temperature: 20,
      description: "Sunny",
    };
  },
});

// Create a generator tool with typed progress events by providing eventSchema
// The eventSchema triggers generator mode - execute becomes an async generator
const searchTool = tool({
  name: "search_database",
  description: "Search database with progress updates",
  inputSchema: z.object({
    query: z.string().describe("The search query"),
  }),
  eventSchema: z.object({
    progress: z.number(),
    message: z.string(),
  }),
  outputSchema: z.object({
    results: z.array(z.string()),
    totalFound: z.number(),
  }),
  // execute is a generator that yields typed progress events
  execute: async function* (params) {
    console.log(`Searching for: ${params.query}`);
    // Each yield is typed as { progress: number; message: string }
    yield { progress: 25, message: "Searching..." };
    yield { progress: 50, message: "Processing results..." };
    yield { progress: 75, message: "Almost done..." };
    // Final result is typed as { results: string[]; totalFound: number }
    yield { progress: 100, message: "Complete!" };
  },
});

async function main() {
  console.log("=== Typed Tool Calling Example ===\n");

  // Use 'as const' to enable full type inference for tool calls
  const result = openRouter.callModel({
    instructions: "You are a helpful assistant. Your name is Mark",
    model: "openai/gpt-4o-mini",
    input: "Hello! What is the weather in San Francisco?",
    tools: [weatherTool] as const,
  });

  // Get text response (tools are auto-executed)
  const text = await result.getText();
  console.log("Response:", text);

  console.log("\n=== Getting Tool Calls ===\n");

  // Create a fresh request for demonstrating getToolCalls
  const result2 = openRouter.callModel({
    model: "openai/gpt-4o-mini",
    input: "What's the weather like in Paris?",
    tools: [weatherTool] as const,
    maxToolRounds: 0, // Don't auto-execute, just get the tool calls
  });

  // Tool calls are now typed based on the tool definitions!
  const toolCalls = await result2.getToolCalls();

  for (const toolCall of toolCalls) {
    console.log(`Tool: ${toolCall.name}`);
    // toolCall.arguments is typed as { location: string }
    console.log(`Arguments:`, toolCall.arguments);
  }

  console.log("\n=== Streaming Tool Calls ===\n");

  // Create another request for demonstrating streaming
  const result3 = openRouter.callModel({
    model: "openai/gpt-4o-mini",
    input: "What's the weather in Tokyo?",
    tools: [weatherTool] as const,
    maxToolRounds: 0,
  });

  // Stream tool calls with typed arguments
  for await (const toolCall of result3.getToolCallsStream()) {
    console.log(`Streamed tool: ${toolCall.name}`);
    // toolCall.arguments is typed based on tool definitions
    console.log(`Streamed arguments:`, toolCall.arguments);
  }

  console.log("\n=== Generator Tool with Typed Events ===\n");

  // Use generator tool with typed progress events
  const result4 = openRouter.callModel({
    model: "openai/gpt-4o-mini",
    input: "Search for documents about TypeScript",
    tools: [searchTool] as const,
  });

  // Stream events from getToolStream - events are fully typed!
  for await (const event of result4.getToolStream()) {
    if (event.type === "preliminary_result") {
      // event.result is typed as { progress: number; message: string }
      console.log(`Progress: ${event.result.progress}% - ${event.result.message}`);
    } else if (event.type === "delta") {
      // Tool argument deltas
      process.stdout.write(event.content);
    }
  }

  console.log("\n=== Mixed Tools with Typed Events ===\n");

  // Use both regular and generator tools together
  const result5 = openRouter.callModel({
    model: "openai/gpt-4o-mini",
    input: "First search for weather data, then get the weather in Seattle",
    tools: [weatherTool, searchTool] as const,
  });

  // Events are a union of all generator tool event types
  for await (const event of result5.getToolStream()) {
    if (event.type === "preliminary_result") {
      // event.result is typed as { progress: number; message: string }
      // (only searchTool has eventSchema, so that's the event type)
      console.log(`Event:`, event.result);
    }
  }
}

main().catch(console.error);
