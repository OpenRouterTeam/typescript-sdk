import type { OpenRouterCore } from "../core.js";
import type { RequestOptions } from "../lib/sdks.js";
import type { Tool, MaxToolRounds } from "../lib/tool-types.js";
import type * as models from "../models/index.js";

import { ModelResult } from "../lib/model-result.js";
import { convertToolsToAPIFormat } from "../lib/tool-executor.js";



/**
 * Get a response with multiple consumption patterns
 *
 * @remarks
 * Creates a response using the OpenResponses API and returns
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
 *
 * All consumption patterns can be used concurrently on the same response.
 *
 * For message format conversion, use the helper functions:
 * - `fromChatMessages()` / `toChatMessage()` for OpenAI chat format
 * - `fromClaudeMessages()` / `toClaudeMessage()` for Anthropic Claude format
 */
export function callModel(
  client: OpenRouterCore,
  request: Omit<models.OpenResponsesRequest, "stream" | "tools"> & {
    tools?: Tool[];
    maxToolRounds?: MaxToolRounds;
  },
  options?: RequestOptions
): ModelResult {
  const { tools, maxToolRounds, ...apiRequest } = request;


  // Convert tools to API format and extract enhanced tools if present
  const apiTools = tools ? convertToolsToAPIFormat(tools) : undefined;


  // Build the request with converted tools
  const finalRequest: models.OpenResponsesRequest = {
    ...apiRequest,
    ...(apiTools !== undefined && { tools: apiTools }),
  };

  return new ModelResult({
    client,
    request: finalRequest,
    options: options ?? {},
    tools: tools ?? [],
    ...(maxToolRounds !== undefined && { maxToolRounds }),
  });
}
