import type { OpenRouterCore } from "../core.js";
import type { RequestOptions } from "../lib/sdks.js";
import type { Tool, MaxToolRounds } from "../lib/tool-types.js";
import type * as models from "../models/index.js";

import { fromClaudeMessages } from "../lib/anthropic-compat.js";
import { ModelResult } from "../lib/model-result.js";
import { convertToolsToAPIFormat } from "../lib/tool-executor.js";

/**
 * Tool type that accepts chat-style, responses-style, or enhanced tools
 */
export type CallModelTools =
  | Tool[]
  | models.ToolDefinitionJson[]
  | models.OpenResponsesRequest["tools"];

/**
 * Input type that accepts OpenResponses input or Claude-style messages
 */
export type CallModelInput =
  | models.OpenResponsesInput
  | models.ClaudeMessageParam[];

/**
 * Type guard for Claude-style messages (ClaudeMessageParam[])
 * Claude messages have role: "user" | "assistant" and content as string or content blocks
 */
function isClaudeStyleInput(
  input: CallModelInput | undefined
): input is models.ClaudeMessageParam[] {
  if (!input || !Array.isArray(input) || input.length === 0) {
    return false;
  }

  const firstItem = input[0];

  // Claude messages have role: "user" | "assistant"
  // and content as string or array of content blocks with type: "text" | "tool_use" | etc.
  if (
    typeof firstItem !== "object" ||
    firstItem === null ||
    !("role" in firstItem) ||
    !("content" in firstItem)
  ) {
    return false;
  }

  const role = firstItem.role;
  const content = firstItem.content;

  // Check if it's a Claude-style role (only "user" or "assistant")
  if (role !== "user" && role !== "assistant") {
    return false;
  }

  // If content is an array, check if it has Claude-style content blocks
  if (Array.isArray(content)) {
    const firstBlock = content[0];
    if (
      firstBlock &&
      typeof firstBlock === "object" &&
      "type" in firstBlock &&
      (firstBlock.type === "text" ||
        firstBlock.type === "tool_use" ||
        firstBlock.type === "tool_result" ||
        firstBlock.type === "image")
    ) {
      return true;
    }
  }

  // If content is a string, we need to distinguish from OpenResponsesEasyInputMessage
  // OpenResponsesEasyInputMessage also has role and content as string
  // But Claude uses "user" | "assistant" while OpenResponses uses role enums
  // The key difference is that OpenResponsesEasyInputMessage role is an enum value like "user"
  // but that's the same...
  //
  // We need another heuristic: if the input doesn't have other OpenResponses fields
  // like "type", "id", etc., it's likely Claude-style
  if (typeof content === "string") {
    // If item has no "type" field and role is strictly "user" or "assistant"
    // it's likely a Claude-style message
    // OpenResponses items typically have a "type" field (except for OpenResponsesEasyInputMessage)
    // This is ambiguous, so we'll be conservative and check if it matches OpenResponses format first
    return !("type" in firstItem);
  }

  return false;
}

/**
 * Convert input to OpenResponsesInput format if needed
 */
function normalizeInput(
  input: CallModelInput | undefined
): models.OpenResponsesInput | undefined {
  if (input === undefined) {
    return undefined;
  }

  if (isClaudeStyleInput(input)) {
    return fromClaudeMessages(input);
  }

  return input;
}

/**
 * Discriminated tool type detection result
 */
type ToolTypeResult =
  | { kind: "enhanced"; tools: Tool[] }
  | { kind: "chat"; tools: models.ToolDefinitionJson[] }
  | { kind: "responses"; tools: models.OpenResponsesRequest["tools"] }
  | { kind: "empty" };

/**
 * Type guard for tool objects with a function property containing an object
 */
function hasFunctionProperty(
  tool: unknown
): tool is { function: Record<string, unknown> } {
  if (typeof tool !== "object" || tool === null) {
    return false;
  }
  if (!("function" in tool)) {
    return false;
  }
  const fn = (tool as { function: unknown }).function;
  return typeof fn === "object" && fn !== null;
}

/**
 * Type guard for responses-style tools (has name at top level, no function property)
 */
function isResponsesStyleTools(
  tools: CallModelTools
): tools is NonNullable<models.OpenResponsesRequest["tools"]> {
  if (!Array.isArray(tools) || tools.length === 0) {
    return false;
  }
  const firstTool = tools[0];
  // Responses-style tools have 'name' at top level and no 'function' property
  return (
    typeof firstTool === "object" &&
    firstTool !== null &&
    "name" in firstTool &&
    !("function" in firstTool)
  );
}

/**
 * Type guard for enhanced tools (has function.inputSchema)
 */
function isEnhancedTools(tools: CallModelTools): tools is Tool[] {
  if (!Array.isArray(tools) || tools.length === 0) {
    return false;
  }
  const firstTool = tools[0];
  return hasFunctionProperty(firstTool) && "inputSchema" in firstTool.function;
}

/**
 * Type guard for chat-style tools (has function.name but no inputSchema)
 */
function isChatStyleTools(
  tools: CallModelTools
): tools is models.ToolDefinitionJson[] {
  if (!Array.isArray(tools) || tools.length === 0) {
    return false;
  }
  const firstTool = tools[0];
  return (
    hasFunctionProperty(firstTool) &&
    "name" in firstTool.function &&
    !("inputSchema" in firstTool.function)
  );
}

/**
 * Detect the type of tools provided and return a discriminated result.
 * This centralizes all tool type detection logic in one place.
 *
 * Tool types:
 * - Enhanced: has function.inputSchema (our SDK tools with Zod schemas)
 * - Chat: has function.name but no inputSchema (OpenAI chat-style)
 * - Responses: has name at top level (OpenResponses API native format)
 */
function detectToolType(tools: CallModelTools | undefined): ToolTypeResult {
  if (!tools || !Array.isArray(tools) || tools.length === 0) {
    return { kind: "empty" };
  }

  if (isEnhancedTools(tools)) {
    return { kind: "enhanced", tools };
  }

  if (isChatStyleTools(tools)) {
    return { kind: "chat", tools };
  }

  if (isResponsesStyleTools(tools)) {
    return { kind: "responses", tools };
  }

  // Fallback - treat as responses-style
  return { kind: "responses", tools: tools as models.OpenResponsesRequest["tools"] };
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
    input?: CallModelInput;
    tools?: CallModelTools;
    maxToolRounds?: MaxToolRounds;
  },
  options?: RequestOptions
): ModelResult {
  const { tools, maxToolRounds, input, ...restRequest } = request;

  // Normalize input - convert Claude-style messages if needed
  const normalizedInput = normalizeInput(input);

  const apiRequest = {
    ...restRequest,
    input: normalizedInput,
  };

  // Detect tool type using discriminated union
  const toolType = detectToolType(tools);

  // Convert tools to API format and extract enhanced tools if present
  let apiTools: models.OpenResponsesRequest["tools"];
  let enhancedTools: Tool[] | undefined;

  switch (toolType.kind) {
    case "enhanced":
      enhancedTools = toolType.tools;
      apiTools = convertToolsToAPIFormat(toolType.tools);
      break;
    case "chat":
      apiTools = convertChatToResponsesTools(toolType.tools);
      break;
    case "responses":
      apiTools = toolType.tools;
      break;
    case "empty":
      apiTools = undefined;
      break;
  }

  // Build the request with converted tools
  const finalRequest: models.OpenResponsesRequest = {
    ...apiRequest,
    ...(apiTools !== undefined && { tools: apiTools }),
  };

  return new ModelResult({
    client,
    request: finalRequest,
    options: options ?? {},
    ...(enhancedTools !== undefined && { tools: enhancedTools }),
    ...(maxToolRounds !== undefined && { maxToolRounds }),
  });
}
