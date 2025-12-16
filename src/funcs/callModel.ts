import type { OpenRouterCore } from "../core.js";
import type { RequestOptions } from "../lib/sdks.js";
import type { Tool, MaxToolRounds } from "../lib/tool-types.js";
import type * as models from "../models/index.js";

import { ResponseWrapper } from "../lib/response-wrapper.js";
import { convertToolsToAPIFormat } from "../lib/tool-executor.js";

/**
 * Input type that accepts:
 * - OpenResponses format (string or OpenResponsesInput items array)
 * - OpenAI chat-style messages (Message[])
 * - Anthropic Claude-style messages (ClaudeMessageParam[])
 */
export type CallModelInput =
  | models.OpenResponsesInput
  | models.Message[]
  | models.ClaudeMessageParam[];

/**
 * Tool type that accepts chat-style, responses-style, or enhanced tools
 */
export type CallModelTools =
  | Tool[]
  | models.ToolDefinitionJson[]
  | models.OpenResponsesRequest["tools"];

/**
 * Check if input is Anthropic Claude-style messages (ClaudeMessageParam[])
 * Claude messages have role of 'user' or 'assistant' only and content can be string or array of blocks
 * with Claude-specific block types ('text', 'image', 'tool_use', 'tool_result')
 */
function isClaudeStyleMessages(
  input: CallModelInput
): input is models.ClaudeMessageParam[] {
  if (!Array.isArray(input)) {
    return false;
  }
  if (input.length === 0) {
    return false;
  }

  const first = input[0] as Record<string, unknown>;
  // Must have role and no 'type' field at top level
  if (!first || !("role" in first) || "type" in first) {
    return false;
  }

  const content = first["content"];
  // If content is an array with Claude-specific block types, it's Claude-style
  if (Array.isArray(content) && content.length > 0) {
    const firstBlock = content[0] as Record<string, unknown>;
    const blockType = firstBlock?.["type"];
    // Claude blocks have specific types like 'text', 'image', 'tool_use', 'tool_result'
    if (
      blockType === "text" ||
      blockType === "image" ||
      blockType === "tool_use" ||
      blockType === "tool_result"
    ) {
      return true;
    }
  }

  // String content with only 'user' or 'assistant' roles could be either format
  // Default to Chat-style for ambiguous cases (more permissive)
  return false;
}

/**
 * Check if input is chat-style messages (Message[])
 */
function isChatStyleMessages(input: CallModelInput): input is models.Message[] {
  if (!Array.isArray(input)) {
    return false;
  }
  if (input.length === 0) {
    return false;
  }

  const first = input[0] as Record<string, unknown>;
  // Chat-style messages have role but no 'type' field at top level
  // Responses-style items have 'type' field (like 'message', 'function_call', etc.)
  return first && "role" in first && !("type" in first);
}

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
 * Convert chat-style messages to responses-style input
 */
function convertChatToResponsesInput(
  messages: models.Message[]
): models.OpenResponsesInput {
  return messages.map(
    (
      msg
    ):
      | models.OpenResponsesEasyInputMessage
      | models.OpenResponsesFunctionCallOutput => {
      // Extract extra fields like cache_control
      const { role, content, ...extraFields } = msg as models.Message &
        Record<string, unknown>;

      if (role === "tool") {
        const toolMsg = msg as models.ToolResponseMessage;
        return {
          type: "function_call_output",
          callId: toolMsg.toolCallId,
          output:
            typeof toolMsg.content === "string"
              ? toolMsg.content
              : JSON.stringify(toolMsg.content),
          ...extraFields,
        } as models.OpenResponsesFunctionCallOutput;
      }

      // Handle assistant messages with tool calls
      if (role === "assistant") {
        const assistantMsg = msg as models.AssistantMessage;
        // If it has tool calls, we need to convert them
        // For now, just convert the content part
        return {
          role: "assistant",
          content:
            typeof assistantMsg.content === "string"
              ? assistantMsg.content
              : assistantMsg.content === null
                ? ""
                : JSON.stringify(assistantMsg.content),
          ...extraFields,
        } as models.OpenResponsesEasyInputMessage;
      }

      // System, user, developer messages
      const convertedContent =
        typeof content === "string"
          ? content
          : content === null || content === undefined
            ? ""
            : JSON.stringify(content);

      return {
        role: role as "user" | "system" | "developer",
        content: convertedContent,
        ...extraFields,
      } as models.OpenResponsesEasyInputMessage;
    }
  ) as models.OpenResponsesInput;
}

/**
 * Convert Claude-style messages to responses-style input
 */
function convertClaudeToResponsesInput(
  messages: models.ClaudeMessageParam[]
): models.OpenResponsesInput {
  const result: (
    | models.OpenResponsesEasyInputMessage
    | models.OpenResponsesFunctionCallOutput
  )[] = [];

  for (const msg of messages) {
    const { role, content } = msg;

    // Handle string content directly
    if (typeof content === "string") {
      result.push({
        role: role as "user" | "assistant",
        content: content,
      } as models.OpenResponsesEasyInputMessage);
      continue;
    }

    // Handle array content - extract text and handle tool results
    const textParts: string[] = [];
    for (const block of content) {
      if (block.type === "text") {
        textParts.push(block.text);
      } else if (block.type === "tool_result") {
        // Tool results need special handling - convert to function_call_output
        let toolContent: string;
        if (typeof block.content === "string") {
          toolContent = block.content;
        } else {
          toolContent = block.content
            .filter((b): b is models.ClaudeTextBlockParam => b.type === "text")
            .map((b) => b.text)
            .join("");
        }
        result.push({
          type: "function_call_output",
          callId: block.tool_use_id,
          output: toolContent,
        } as models.OpenResponsesFunctionCallOutput);
      }
      // Note: tool_use and image blocks in input are typically part of conversation history
      // They would come from previous assistant responses, we skip them for now
    }

    // If we collected text parts, add them as a message
    if (textParts.length > 0) {
      result.push({
        role: role as "user" | "assistant",
        content: textParts.join(""),
      } as models.OpenResponsesEasyInputMessage);
    }
  }

  return result as models.OpenResponsesInput;
}

/**
 * Get a response with multiple consumption patterns
 *
 * @remarks
 * Creates a response using the OpenResponses API in streaming mode and returns
 * a wrapper that allows consuming the response in multiple ways:
 *
 * - `await response.getChatMessage()` - Get the completed message in chat format (tools auto-executed)
 * - `await response.getClaudeMessage()` - Get the completed message in Anthropic Claude format
 * - `await response.getText()` - Get just the text content (tools auto-executed)
 * - `await response.getResponse()` - Get full response with usage data (inputTokens, cachedTokens, etc.)
 * - `for await (const delta of response.getTextStream())` - Stream text deltas
 * - `for await (const delta of response.getReasoningStream())` - Stream reasoning deltas
 * - `for await (const event of response.getToolStream())` - Stream tool events (incl. preliminary results)
 * - `for await (const toolCall of response.getToolCallsStream())` - Stream structured tool calls
 * - `await response.getToolCalls()` - Get all tool calls from completed response
 * - `for await (const msg of response.getNewChatMessagesStream())` - Stream incremental message updates
 * - `for await (const event of response.getFullResponsesStream())` - Stream all events (incl. tool preliminary)
 * - `for await (const event of response.getFullChatStream())` - Stream in chat format (incl. tool preliminary)
 *
 * All consumption patterns can be used concurrently on the same response.
 *
 * @example
 * ```typescript
 * import { z } from 'zod';
 *
 * // Simple text extraction
 * const response = openrouter.callModel({
 *   model: "openai/gpt-4",
 *   input: "Hello!"
 * });
 * const text = await response.getText();
 * console.log(text);
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
 * const message = await response.getChatMessage(); // Tools auto-executed!
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
): ResponseWrapper {
  const { tools, maxToolRounds, input, ...restRequest } = request;

  // Convert input to responses-style if needed
  // Check Claude-style first since it's more specific, then Chat-style
  let convertedInput: models.OpenResponsesInput | undefined;
  if (input) {
    if (isClaudeStyleMessages(input)) {
      convertedInput = convertClaudeToResponsesInput(input);
    } else if (isChatStyleMessages(input)) {
      convertedInput = convertChatToResponsesInput(input);
    } else {
      convertedInput = input as models.OpenResponsesInput;
    }
  }

  const apiRequest = {
    ...restRequest,
    input: convertedInput,
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
