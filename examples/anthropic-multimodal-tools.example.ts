import dotenv from "dotenv";

dotenv.config();

/**
 * Example demonstrating a multi-turn conversation with images and tool use
 * using Claude-style message format with the anthropic-compat helper functions.
 *
 * This example shows how to:
 * 1. Send messages with image inputs (both URL and base64)
 * 2. Handle tool calls and tool results in conversation history
 * 3. Convert between Claude format and OpenResponses format across multiple turns
 * 4. Build a 3-turn conversation with complex multimodal interactions
 *
 * The conversation flow:
 * - Turn 1: User sends an image and asks about it
 * - Turn 2: Model uses tools to analyze the image, user provides tool results
 * - Turn 3: User asks follow-up question based on tool results
 *
 * To run this example from the examples directory with Bun:
 * bun run anthropic-multimodal-tools.example.ts
 */

import type { ClaudeMessageParam } from "../src/models/claude-message.js";
import {
  OpenRouter,
  fromClaudeMessages,
  toClaudeMessage,
  ToolType,
} from "../src/index.js";
import { z } from "zod/v4";

if (!process.env["OPENROUTER_API_KEY"]) {
  throw new Error("Missing OPENROUTER_API_KEY environment variable");
}

const openRouter = new OpenRouter({
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

// Mock tool definition for image analysis
const tools = [
  {
    type: ToolType.Function,
    function: {
      name: "analyze_image_details",
      description: "Analyzes detailed visual features of an image including colors, objects, and composition",
      inputSchema: z.object({
        image_id: z.string().describe("The ID of the image to analyze"),
        analysis_type: z.enum(["color_palette", "object_detection", "scene_classification"]).describe("Type of analysis to perform"),
      }),
      outputSchema: z.object({
        colors: z.array(z.string()).optional(),
        dominant_objects: z.array(z.string()).optional(),
        composition: z.string().optional(),
        lighting: z.string().optional(),
      }),
    },
  },
  {
    type: ToolType.Function,
    function: {
      name: "get_image_metadata",
      description: "Retrieves metadata about an image such as dimensions, format, and creation date",
      inputSchema: z.object({
        image_id: z.string().describe("The ID of the image"),
      }),
      outputSchema: z.object({
        width: z.number(),
        height: z.number(),
        format: z.string(),
        created: z.string(),
        file_size: z.string(),
      }),
    },
  },
];

async function multiTurnMultimodalConversation() {
  // Using GPT-5 as requested
  const model = "openai/gpt-5";

  // Initialize message history with Claude-style message format
  // Turn 1: User sends an image with a question
  const messages: ClaudeMessageParam[] = [
    {
      role: "user",
      content: [
        {
          type: "text",
          text: "I have this image of a sunset landscape. Can you analyze its visual features?",
        },
        {
          type: "image",
          source: {
            type: "url",
            url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
          },
        },
      ],
    },
  ];

  console.log("=== Turn 1 ===");
  console.log("User: I have this image of a sunset landscape. Can you analyze its visual features?");
  console.log("User: [Image URL: https://images.unsplash.com/photo-1506905925346-21bda4d32df4]");
  console.log();

  // First turn - convert Claude messages to OpenResponses format and call with tools
  const result1 = await openRouter.callModel({
    model,
    input: fromClaudeMessages(messages),
    tools,
    toolChoice: "auto",
  });

  // Get the response and convert back to Claude format
  const response1 = await result1.getResponse();
  const claudeMessage1 = toClaudeMessage(response1);

  console.log("Assistant response:");
  console.log("Stop reason:", claudeMessage1.stop_reason);

  // Extract content and tool calls
  const textContent1: string[] = [];
  const toolCalls1: Array<{ id: string; name: string; input: Record<string, unknown> }> = [];

  for (const block of claudeMessage1.content) {
    if (block.type === "text") {
      textContent1.push(block.text);
    } else if (block.type === "tool_use") {
      toolCalls1.push({
        id: block.id,
        name: block.name,
        input: block.input,
      });
    }
  }

  if (textContent1.length > 0) {
    console.log("Text:", textContent1.join("\n"));
  }

  if (toolCalls1.length > 0) {
    console.log("\nTool calls made:");
    for (const call of toolCalls1) {
      console.log(`- ${call.name} (${call.id})`);
      console.log(`  Arguments:`, JSON.stringify(call.input, null, 2));
    }
  }

  console.log();

  // Add assistant response to history (as Claude-style message)
  messages.push({
    role: "assistant",
    content: claudeMessage1.content.map(block => {
      if (block.type === "text") {
        return { type: "text" as const, text: block.text };
      } else if (block.type === "tool_use") {
        return {
          type: "tool_use" as const,
          id: block.id,
          name: block.name,
          input: block.input,
        };
      }
      // Handle other block types if needed
      return { type: "text" as const, text: "" };
    }).filter(block => block.type !== "text" || block.text !== ""),
  });

  // Turn 2: User provides tool results with an image result
  console.log("=== Turn 2 ===");
  console.log("User provides tool results:");

  const toolResults: ClaudeMessageParam = {
    role: "user",
    content: toolCalls1.map((call, idx) => {
      if (call.name === "analyze_image_details") {
        // Simulate a tool result with text
        console.log(`Tool result for ${call.id}:`);
        console.log("  Analysis: The image shows warm orange and pink hues typical of sunset.");

        return {
          type: "tool_result" as const,
          tool_use_id: call.id,
          content: JSON.stringify({
            colors: ["#FF6B35", "#F7931E", "#FDC830", "#F37335"],
            dominant_objects: ["sky", "clouds", "mountains", "horizon"],
            composition: "rule_of_thirds",
            lighting: "golden_hour",
          }),
        };
      } else if (call.name === "get_image_metadata") {
        console.log(`Tool result for ${call.id}:`);
        console.log("  Metadata: 3840x2160, JPEG format");

        return {
          type: "tool_result" as const,
          tool_use_id: call.id,
          content: JSON.stringify({
            width: 3840,
            height: 2160,
            format: "JPEG",
            created: "2023-06-15T18:45:00Z",
            file_size: "2.4MB",
          }),
        };
      }
      return {
        type: "tool_result" as const,
        tool_use_id: call.id,
        content: "Tool execution successful",
      };
    }),
  };

  messages.push(toolResults);
  console.log();

  // Second API call with tool results
  const result2 = await openRouter.callModel({
    model,
    input: fromClaudeMessages(messages),
    tools,
  });

  const response2 = await result2.getResponse();
  const claudeMessage2 = toClaudeMessage(response2);

  console.log("Assistant response:");
  const textContent2: string[] = [];

  for (const block of claudeMessage2.content) {
    if (block.type === "text") {
      textContent2.push(block.text);
    }
  }

  console.log(textContent2.join("\n"));
  console.log();

  // Add assistant response to history
  messages.push({
    role: "assistant",
    content: textContent2.join("\n"),
  });

  // Turn 3: User asks a follow-up question with another image using base64
  console.log("=== Turn 3 ===");

  // Create a simple base64 encoded 1x1 pixel PNG (for demonstration)
  const base64Image = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

  messages.push({
    role: "user",
    content: [
      {
        type: "text",
        text: "Great! Now I have another image here. How would you compare these two images in terms of color composition?",
      },
      {
        type: "image",
        source: {
          type: "base64",
          media_type: "image/png",
          data: base64Image,
        },
      },
    ],
  });

  // Third API call
  const result3 = await openRouter.callModel({
    model,
    input: fromClaudeMessages(messages),
    tools,
  });

  const response3 = await result3.getResponse();
  const claudeMessage3 = toClaudeMessage(response3);

  console.log("Assistant response:");
  const textContent3: string[] = [];
  const toolCalls3: Array<{ id: string; name: string; input: Record<string, unknown> }> = [];

  for (const block of claudeMessage3.content) {
    if (block.type === "text") {
      textContent3.push(block.text);
    } else if (block.type === "tool_use") {
      toolCalls3.push({
        id: block.id,
        name: block.name,
        input: block.input,
      });
    }
  }

  console.log(textContent3.join("\n"));

  if (toolCalls3.length > 0) {
    console.log("\nTool calls made:");
    for (const call of toolCalls3) {
      console.log(`- ${call.name} (${call.id})`);
      console.log(`  Arguments:`, JSON.stringify(call.input, null, 2));
    }
  }

  console.log();

  // Add final assistant response to history
  messages.push({
    role: "assistant",
    content: claudeMessage3.content.map(block => {
      if (block.type === "text") {
        return { type: "text" as const, text: block.text };
      } else if (block.type === "tool_use") {
        return {
          type: "tool_use" as const,
          id: block.id,
          name: block.name,
          input: block.input,
        };
      }
      return { type: "text" as const, text: "" };
    }).filter(block => block.type !== "text" || block.text !== ""),
  });

  console.log("=== Conversation Complete ===");
  console.log(`Total messages in history: ${messages.length}`);

  // Show the final Claude message structure
  console.log("\n=== Final Claude Message Structure ===");
  console.log("Stop reason:", claudeMessage3.stop_reason);
  console.log("Model:", claudeMessage3.model);
  console.log("Usage:", claudeMessage3.usage);

  return messages;
}

async function main() {
  try {
    await multiTurnMultimodalConversation();
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
