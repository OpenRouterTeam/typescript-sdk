import type { OpenRouterCore } from "../core.js";
import type { RequestOptions } from "../lib/sdks.js";
import type { Tool, MaxToolRounds } from "../lib/tool-types.js";
import type * as models from "../models/index.js";

import { ResponseWrapper } from "../lib/response-wrapper.js";
import { convertToolsToAPIFormat } from "../lib/tool-executor.js";

/**
 * Tool type that accepts chat-style, responses-style, or enhanced tools
 */
export type CallModelTools =
  | Tool[]
  | models.ToolDefinitionJson[]
  | models.OpenResponsesRequest["tools"];

/**
 * Check if tools are chat-style (ToolDefinitionJson[])
 */
function isChatStyleTools(
  tools: CallModelTools
): tools is models.ToolDefinitionJson[] {
  if (!Array.isArray(tools)) {
    return false;
  }
  if (tools.length === 0) {
    return false;
  }

  const first = tools[0] as Record<string, unknown>;
  // Chat-style tools have nested 'function' property with 'name' inside
  // Enhanced tools have 'function' with 'inputSchema'
  // Responses-style tools have 'name' at top level
  const fn = first?.["function"] as Record<string, unknown> | undefined;
  return (
    first &&
    "function" in first &&
    fn !== undefined &&
    fn !== null &&
    "name" in fn &&
    !("inputSchema" in fn)
  );
}

/**
 * Convert chat-style tools to responses-style
 */
function convertChatToResponsesTools(
  tools: models.ToolDefinitionJson[]
): models.OpenResponsesRequest["tools"] {
  return tools.map(
    (tool): models.OpenResponsesRequestToolFunction => ({
      type: "function",
      name: tool.function.name,
      description: tool.function.description ?? null,
      strict: tool.function.strict ?? null,
      parameters: tool.function.parameters ?? null,
    })
  );
}

/**
 * Get a response with multiple consumption patterns
 *
 * @remarks
 * Creates a response using the OpenResponses API in streaming mode and returns
 * a wrapper that allows consuming the response in multiple ways:
 *
 * - `await response.getText()` - Get just the text content (tools auto-executed)
 * - `await response.getResponse()` - Get full response with usage data (inputTokens, cachedTokens, etc.)
 * - `for await (const delta of response.getTextStream())` - Stream text deltas
 * - `for await (const delta of response.getReasoningStream())` - Stream reasoning deltas
 * - `for await (const event of response.getToolStream())` - Stream tool events (incl. preliminary results)
 * - `for await (const toolCall of response.getToolCallsStream())` - Stream structured tool calls
 * - `await response.getToolCalls()` - Get all tool calls from completed response
 * - `for await (const msg of response.getNewMessagesStream())` - Stream incremental message updates
 * - `for await (const event of response.getFullResponsesStream())` - Stream all events (incl. tool preliminary)
 * - `for await (const event of response.getFullChatStream())` - Stream in chat format (incl. tool preliminary)
 *
 * All consumption patterns can be used concurrently on the same response.
 *
 * For message format conversion, use the helper functions:
 * - `fromChatMessages()` / `toChatMessage()` for OpenAI chat format
 * - `fromClaudeMessages()` / `toClaudeMessage()` for Anthropic Claude format
 *
 * @example
 * ```typescript
 * import { z } from 'zod';
 * import { fromChatMessages, toChatMessage } from '@openrouter/sdk';
 *
 * // Simple text extraction
 * const response = openrouter.callModel({
 *   model: "openai/gpt-4",
 *   input: "Hello!"
 * });
 * const text = await response.getText();
 * console.log(text);
 *
 * // With chat-style messages (using helper)
 * const response = openrouter.callModel({
 *   model: "openai/gpt-4",
 *   input: fromChatMessages([
 *     { role: "system", content: "You are helpful." },
 *     { role: "user", content: "Hello!" }
 *   ])
 * });
 * const result = await response.getResponse();
 * const chatMessage = toChatMessage(result);
 *
 * // With tools (automatic execution)
 * const response = openrouter.callModel({
 *   model: "openai/gpt-4",
 *   input: "What's the weather in SF?",
 *   tools: [{
 *     type: "function",
 *     function: {
 *       name: "get_weather",
 *       description: "Get current weather",
 *       inputSchema: z.object({
 *         location: z.string()
 *       }),
 *       outputSchema: z.object({
 *         temperature: z.number(),
 *         description: z.string()
 *       }),
 *       execute: async (params) => {
 *         return { temperature: 72, description: "Sunny" };
 *       }
 *     }
 *   }],
 *   maxToolRounds: 5, // or function: (context: TurnContext) => boolean
 * });
 * const text = await response.getText(); // Tools auto-executed!
 *
 * // Stream with preliminary results
 * for await (const event of response.getFullChatStream()) {
 *   if (event.type === "content.delta") {
 *     process.stdout.write(event.delta);
 *   } else if (event.type === "tool.preliminary_result") {
 *     console.log("Tool progress:", event.result);
 *   }
 * }
 * ```
 */
export function callModel(
  client: OpenRouterCore,
  request: Omit<models.OpenResponsesRequest, "stream" | "tools" | "input"> & {
    input?: models.OpenResponsesInput;
    tools?: CallModelTools;
    maxToolRounds?: MaxToolRounds;
  },
  options?: RequestOptions
): ResponseWrapper {
  const { tools, maxToolRounds, input, ...restRequest } = request;

  const apiRequest = {
    ...restRequest,
    input,
  };

  // Determine tool type and convert as needed
  let isEnhancedTools = false;
  let isChatTools = false;

  if (tools && Array.isArray(tools) && tools.length > 0) {
    const firstTool = tools[0] as Record<string, unknown>;
    const fn = firstTool?.["function"] as Record<string, unknown> | undefined;
    isEnhancedTools =
      "function" in firstTool &&
      fn !== undefined &&
      fn !== null &&
      "inputSchema" in fn;
    isChatTools = !isEnhancedTools && isChatStyleTools(tools);
  }

  const enhancedTools = isEnhancedTools ? (tools as Tool[]) : undefined;

  // Convert tools to API format based on their type
  let apiTools: models.OpenResponsesRequest["tools"];
  if (enhancedTools) {
    apiTools = convertToolsToAPIFormat(enhancedTools);
  } else if (isChatTools) {
    apiTools = convertChatToResponsesTools(
      tools as models.ToolDefinitionJson[]
    );
  } else {
    apiTools = tools as models.OpenResponsesRequest["tools"];
  }

  // Build the request with converted tools
  const finalRequest: models.OpenResponsesRequest = {
    ...apiRequest,
    ...(apiTools && {
      tools: apiTools,
    }),
  } as models.OpenResponsesRequest;

  const wrapperOptions: {
    client: OpenRouterCore;
    request: models.OpenResponsesRequest;
    options: RequestOptions;
    tools?: Tool[];
    maxToolRounds?: MaxToolRounds;
  } = {
    client,
    request: finalRequest,
    options: options ?? {},
  };

  // Only pass enhanced tools to wrapper (needed for auto-execution)
  if (enhancedTools) {
    wrapperOptions.tools = enhancedTools;
  }

  if (maxToolRounds !== undefined) {
    wrapperOptions.maxToolRounds = maxToolRounds;
  }

  return new ResponseWrapper(wrapperOptions);
}
