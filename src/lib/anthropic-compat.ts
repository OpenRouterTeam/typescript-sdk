import type * as models from "../models/index.js";
import {
  OpenResponsesEasyInputMessageRoleUser,
  OpenResponsesEasyInputMessageRoleAssistant,
} from "../models/openresponseseasyinputmessage.js";
import { OpenResponsesFunctionCallOutputType } from "../models/openresponsesfunctioncalloutput.js";
import { convertToClaudeMessage } from "./stream-transformers.js";

/**
 * Maps Claude role strings to OpenResponses role types
 */
function mapClaudeRole(
  role: "user" | "assistant"
): models.OpenResponsesEasyInputMessageRoleUnion {
  if (role === "user") {
    return OpenResponsesEasyInputMessageRoleUser.User;
  }
  return OpenResponsesEasyInputMessageRoleAssistant.Assistant;
}

/**
 * Creates a properly typed OpenResponsesEasyInputMessage
 */
function createEasyInputMessage(
  role: "user" | "assistant",
  content: string
): models.OpenResponsesEasyInputMessage {
  return {
    role: mapClaudeRole(role),
    content,
  };
}

/**
 * Creates a properly typed OpenResponsesFunctionCallOutput
 */
function createFunctionCallOutput(
  callId: string,
  output: string
): models.OpenResponsesFunctionCallOutput {
  return {
    type: OpenResponsesFunctionCallOutputType.FunctionCallOutput,
    callId,
    output,
  };
}

/**
 * Convert Anthropic Claude-style messages to OpenResponses input format.
 *
 * This function transforms ClaudeMessageParam[] (Anthropic SDK format) to
 * OpenResponsesInput format that can be passed directly to callModel().
 *
 * @example
 * ```typescript
 * import { fromClaudeMessages } from '@openrouter/sdk';
 *
 * const claudeMessages = [
 *   { role: "user", content: "Hello!" },
 *   { role: "assistant", content: "Hi there!" },
 * ];
 *
 * const response = openrouter.callModel({
 *   model: "anthropic/claude-3-sonnet",
 *   input: fromClaudeMessages(claudeMessages),
 * });
 * ```
 */
export function fromClaudeMessages(
  messages: models.ClaudeMessageParam[]
): models.OpenResponsesInput {
  const result: (
    | models.OpenResponsesEasyInputMessage
    | models.OpenResponsesFunctionCallOutput
  )[] = [];

  for (const msg of messages) {
    const { role, content } = msg;

    if (typeof content === "string") {
      result.push(createEasyInputMessage(role, content));
      continue;
    }

    const textParts: string[] = [];

    for (const block of content) {
      switch (block.type) {
        case 'text': {
          const textBlock = block as models.ClaudeTextBlockParam;
          textParts.push(textBlock.text);
          // Note: cache_control is lost in conversion (OpenRouter doesn't support it)
          break;
        }

        case 'image': {
          // Images in input cannot be mapped to OpenRouter easy format
          // Add text marker to preserve conversation flow
          textParts.push('[Image content - not supported in OpenRouter format]');
          break;
        }

        case 'tool_use': {
          // Tool use blocks in input are conversation history, skip
          break;
        }

        case 'tool_result': {
          const toolResultBlock = block as models.ClaudeToolResultBlockParam;

          let toolOutput = '';
          if (typeof toolResultBlock.content === 'string') {
            toolOutput = toolResultBlock.content;
          } else {
            // Extract text, skip images (OpenRouter function_call_output only supports text)
            toolOutput = toolResultBlock.content
              .filter((part): part is models.ClaudeTextBlockParam => part.type === 'text')
              .map(part => part.text)
              .join('');
          }

          result.push(createFunctionCallOutput(toolResultBlock.tool_use_id, toolOutput));
          break;
        }
      }
    }

    if (textParts.length > 0) {
      result.push(createEasyInputMessage(role, textParts.join('')));
    }
  }

  return result;
}

/**
 * Convert an OpenResponses response to Anthropic Claude message format.
 *
 * This function transforms OpenResponsesNonStreamingResponse to ClaudeMessage
 * (Anthropic SDK format) for compatibility with code expecting Claude responses.
 *
 * @example
 * ```typescript
 * import { toClaudeMessage } from '@openrouter/sdk';
 *
 * const response = await openrouter.callModel({
 *   model: "anthropic/claude-3-sonnet",
 *   input: "Hello!",
 * });
 *
 * const openResponsesResult = await response.getResponse();
 * const claudeMessage = toClaudeMessage(openResponsesResult);
 * // claudeMessage is now compatible with Anthropic SDK types
 * ```
 */
export const toClaudeMessage = convertToClaudeMessage;
