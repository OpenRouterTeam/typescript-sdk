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
 * Type guard for Claude text block params
 */
function isTextBlock(
  block: models.ClaudeContentBlockParam
): block is models.ClaudeTextBlockParam {
  return block.type === "text";
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

    // Handle string content directly
    if (typeof content === "string") {
      result.push(createEasyInputMessage(role, content));
      continue;
    }

    // Handle array content - extract text and handle tool results
    const textParts: string[] = [];
    for (const block of content) {
      if (isTextBlock(block)) {
        textParts.push(block.text);
      } else if (block.type === "tool_result") {
        // Tool results need special handling - convert to function_call_output
        const toolContent =
          typeof block.content === "string"
            ? block.content
            : block.content.filter(isTextBlock).map((b: models.ClaudeTextBlockParam) => b.text).join("");
        result.push(createFunctionCallOutput(block.tool_use_id, toolContent));
      }
      // Note: tool_use and image blocks in input are typically part of conversation history
      // They would come from previous assistant responses, we skip them for now
    }

    // If we collected text parts, add them as a message
    if (textParts.length > 0) {
      result.push(createEasyInputMessage(role, textParts.join("")));
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
