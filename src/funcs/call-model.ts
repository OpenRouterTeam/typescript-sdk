import type { OpenRouterCore } from "../core.js";
import type { RequestOptions } from "../lib/sdks.js";
import type { Tool, MaxToolRounds } from "../lib/tool-types.js";
import type * as models from "../models/index.js";

import { ModelResult } from "../lib/model-result.js";
import { convertToolsToAPIFormat } from "../lib/tool-executor.js";

/**
 * Checks if a message looks like a Claude-style message
 */
function isClaudeStyleMessage(msg: any): msg is models.ClaudeMessageParam {
  if (!msg || typeof msg !== 'object') return false;

  // Check if it has a role field that's user or assistant
  const role = msg.role;
  if (role !== 'user' && role !== 'assistant') return false;

  // Check if content is an array with Claude-style content blocks
  if (Array.isArray(msg.content)) {
    return msg.content.some((block: any) =>
      block &&
      typeof block === 'object' &&
      block.type &&
      // Claude content block types (not OpenRouter types)
      (block.type === 'text' || block.type === 'image' || block.type === 'tool_use' || block.type === 'tool_result')
    );
  }

  return false;
}

/**
 * Converts Claude-style content blocks to OpenRouter format
 */
function convertClaudeContentBlock(
  block: models.ClaudeContentBlockParam
): models.ResponseInputText | models.ResponseInputImage | null {
  if (!block || typeof block !== 'object' || !('type' in block)) {
    return null;
  }

  switch (block.type) {
    case 'text': {
      const textBlock = block as models.ClaudeTextBlockParam;
      return {
        type: 'input_text',
        text: textBlock.text,
      };
    }
    case 'image': {
      const imageBlock = block as models.ClaudeImageBlockParam;
      if (imageBlock.source.type === 'url') {
        return {
          type: 'input_image',
          detail: 'auto',
          imageUrl: imageBlock.source.url,
        };
      } else if (imageBlock.source.type === 'base64') {
        const dataUri = `data:${imageBlock.source.media_type};base64,${imageBlock.source.data}`;
        return {
          type: 'input_image',
          detail: 'auto',
          imageUrl: dataUri,
        };
      }
      return null;
    }
    case 'tool_use':
    case 'tool_result':
      // tool_use and tool_result are not handled here as they map to different input types
      return null;
    default:
      return null;
  }
}

/**
 * Converts a Claude-style message to OpenRouter EasyInputMessage format
 */
function convertClaudeMessage(msg: models.ClaudeMessageParam): models.OpenResponsesEasyInputMessage {
  const { role, content } = msg;

  if (typeof content === 'string') {
    return {
      role: role === 'user' ? 'user' : 'assistant',
      content,
    };
  }

  // Convert array of content blocks
  const convertedBlocks: (models.ResponseInputText | models.ResponseInputImage)[] = [];
  for (const block of content) {
    const converted = convertClaudeContentBlock(block);
    if (converted) {
      convertedBlocks.push(converted);
    }
  }

  // If all blocks were text, concatenate them into a string
  const allText = convertedBlocks.every(b => b.type === 'input_text');
  if (allText) {
    const text = convertedBlocks
      .map(b => (b as models.ResponseInputText).text)
      .join('');
    return {
      role: role === 'user' ? 'user' : 'assistant',
      content: text,
    };
  }

  // Otherwise, return as array
  return {
    role: role === 'user' ? 'user' : 'assistant',
    content: convertedBlocks,
  };
}

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

  // Auto-convert Claude-style messages if detected
  let processedInput = apiRequest.input;
  if (Array.isArray(apiRequest.input)) {
    const hasClaudeMessages = apiRequest.input.some(isClaudeStyleMessage);
    if (hasClaudeMessages) {
      processedInput = apiRequest.input.map((msg: any) => {
        if (isClaudeStyleMessage(msg)) {
          return convertClaudeMessage(msg);
        }
        return msg;
      });
    }
  }

  // Convert tools to API format and extract enhanced tools if present
  const apiTools = tools ? convertToolsToAPIFormat(tools) : undefined;

  // Build the request with converted tools and input
  const finalRequest: models.OpenResponsesRequest = {
    ...apiRequest,
    ...(processedInput !== undefined && { input: processedInput }),
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
