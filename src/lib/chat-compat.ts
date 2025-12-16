import type * as models from "../models/index.js";
import {
  OpenResponsesEasyInputMessageRoleUser,
  OpenResponsesEasyInputMessageRoleSystem,
  OpenResponsesEasyInputMessageRoleAssistant,
  OpenResponsesEasyInputMessageRoleDeveloper,
} from "../models/openresponseseasyinputmessage.js";
import { OpenResponsesFunctionCallOutputType } from "../models/openresponsesfunctioncalloutput.js";
import { extractMessageFromResponse } from "./stream-transformers.js";

/**
 * Type guard for ToolResponseMessage
 */
function isToolResponseMessage(
  msg: models.Message
): msg is models.ToolResponseMessage {
  return msg.role === "tool";
}

/**
 * Type guard for AssistantMessage
 */
function isAssistantMessage(
  msg: models.Message
): msg is models.AssistantMessage {
  return msg.role === "assistant";
}

/**
 * Maps chat role strings to OpenResponses role types
 */
function mapChatRole(
  role: "user" | "system" | "assistant" | "developer"
): models.OpenResponsesEasyInputMessageRoleUnion {
  switch (role) {
    case "user":
      return OpenResponsesEasyInputMessageRoleUser.User;
    case "system":
      return OpenResponsesEasyInputMessageRoleSystem.System;
    case "assistant":
      return OpenResponsesEasyInputMessageRoleAssistant.Assistant;
    case "developer":
      return OpenResponsesEasyInputMessageRoleDeveloper.Developer;
  }
}

/**
 * Convert OpenAI chat-style messages to OpenResponses input format.
 *
 * This function transforms Message[] (OpenAI chat format) to OpenResponsesInput
 * format that can be passed directly to callModel().
 *
 * @example
 * ```typescript
 * import { fromChatMessages } from '@openrouter/sdk';
 *
 * const chatMessages = [
 *   { role: "system", content: "You are a helpful assistant." },
 *   { role: "user", content: "Hello!" },
 * ];
 *
 * const response = openrouter.callModel({
 *   model: "openai/gpt-4",
 *   input: fromChatMessages(chatMessages),
 * });
 * ```
 */
export function fromChatMessages(
  messages: models.Message[]
): models.OpenResponsesInput {
  return messages.map(
    (
      msg
    ):
      | models.OpenResponsesEasyInputMessage
      | models.OpenResponsesFunctionCallOutput => {
      if (isToolResponseMessage(msg)) {
        return {
          type: OpenResponsesFunctionCallOutputType.FunctionCallOutput,
          callId: msg.toolCallId,
          output:
            typeof msg.content === "string"
              ? msg.content
              : JSON.stringify(msg.content),
        };
      }

      if (isAssistantMessage(msg)) {
        return {
          role: mapChatRole("assistant"),
          content:
            typeof msg.content === "string"
              ? msg.content
              : msg.content === null || msg.content === undefined
                ? ""
                : JSON.stringify(msg.content),
        };
      }

      // System, user, developer messages
      const { role, content } = msg;
      const convertedContent =
        typeof content === "string"
          ? content
          : content === null || content === undefined
            ? ""
            : JSON.stringify(content);

      return {
        role: mapChatRole(role),
        content: convertedContent,
      };
    }
  );
}

/**
 * Convert an OpenResponses response to OpenAI chat message format.
 *
 * This function transforms OpenResponsesNonStreamingResponse to AssistantMessage
 * (OpenAI chat format) for compatibility with code expecting chat responses.
 *
 * @example
 * ```typescript
 * import { toChatMessage } from '@openrouter/sdk';
 *
 * const response = await openrouter.callModel({
 *   model: "openai/gpt-4",
 *   input: "Hello!",
 * });
 *
 * const openResponsesResult = await response.getResponse();
 * const chatMessage = toChatMessage(openResponsesResult);
 * // chatMessage is now { role: "assistant", content: "..." }
 * ```
 */
export const toChatMessage = extractMessageFromResponse;
