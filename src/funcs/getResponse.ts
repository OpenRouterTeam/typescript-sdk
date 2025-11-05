import { OpenRouterCore } from "../core.js";
import { RequestOptions } from "../lib/sdks.js";
import { ResponseWrapper } from "../lib/response-wrapper.js";
import * as models from "../models/index.js";
import { EnhancedTool, MaxToolRounds } from "../lib/tool-types.js";
import { convertEnhancedToolsToAPIFormat } from "../lib/tool-executor.js";

/**
 * Get a response with multiple consumption patterns
 *
 * @remarks
 * Creates a response using the OpenResponses API in streaming mode and returns
 * a wrapper that allows consuming the response in multiple ways:
 *
 * - `await response.getMessage()` - Get the completed message (tools auto-executed)
 * - `await response.getText()` - Get just the text content (tools auto-executed)
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
 * @example
 * ```typescript
 * import { z } from 'zod';
 *
 * // Simple text extraction
 * const response = openrouter.getResponse({
 *   model: "openai/gpt-4",
 *   input: "Hello!"
 * });
 * const text = await response.getText();
 * console.log(text);
 *
 * // With tools (automatic execution)
 * const response = openrouter.getResponse({
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
 * const message = await response.getMessage(); // Tools auto-executed!
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
export function getResponse(
  client: OpenRouterCore,
  request: Omit<models.OpenResponsesRequest, "stream" | "tools"> & {
    tools?: EnhancedTool[] | models.OpenResponsesRequest["tools"];
    maxToolRounds?: MaxToolRounds;
  },
  options?: RequestOptions,
): ResponseWrapper {
  const { tools, maxToolRounds, ...apiRequest } = request;

  // Separate enhanced tools from API tools
  let isEnhancedTools = false;
  if (tools && tools.length > 0) {
    const firstTool = tools[0] as any;
    isEnhancedTools = "function" in firstTool && firstTool.function && "inputSchema" in firstTool.function;
  }
  const enhancedTools = isEnhancedTools ? (tools as EnhancedTool[]) : undefined;

  // Convert enhanced tools to API format if provided, otherwise use tools as-is
  const apiTools = enhancedTools ? convertEnhancedToolsToAPIFormat(enhancedTools) : (tools as models.OpenResponsesRequest["tools"]);

  // Build the request with converted tools
  const finalRequest: models.OpenResponsesRequest = {
    ...apiRequest,
    ...(apiTools && { tools: apiTools }),
  } as models.OpenResponsesRequest;

  const wrapperOptions: {
    client: OpenRouterCore;
    request: models.OpenResponsesRequest;
    options: RequestOptions;
    tools?: EnhancedTool[];
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
