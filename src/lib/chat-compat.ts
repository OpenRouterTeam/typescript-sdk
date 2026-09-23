import type { ChatAssistantMessage } from "../models/chatassistantmessage.js";
import type { ChatMessages } from "../models/chatmessages.js";
import type { ChatToolMessage } from "../models/chattoolmessage.js";
import type { EasyInputMessage, EasyInputMessageRoleUnion } from "../models/easyinputmessage.js";
import type { FunctionCallOutputItem } from "../models/functioncalloutputitem.js";
import type { InputsUnion } from "../models/inputsunion.js";
import {
  EasyInputMessageRoleUser,
  EasyInputMessageRoleSystem,
  EasyInputMessageRoleAssistant,
  EasyInputMessageRoleDeveloper,
} from "../models/easyinputmessage.js";
import { extractMessageFromResponse } from "./stream-transformers.js";

/**
 * Type guard for ChatToolMessage
 */
function isToolResponseMessage(
  msg: ChatMessages
): msg is ChatToolMessage {
  return msg.role === "tool";
}

/**
 * Type guard for ChatAssistantMessage
 */
function isAssistantMessage(
  msg: ChatMessages
): msg is ChatAssistantMessage {
  return msg.role === "assistant";
}

/**
 * Maps chat role strings to OpenResponses role types
 */
function mapChatRole(
  role: "user" | "system" | "assistant" | "developer"
): EasyInputMessageRoleUnion {
  switch (role) {
    case "user":
      return EasyInputMessageRoleUser.User;
    case "system":
      return EasyInputMessageRoleSystem.System;
    case "assistant":
      return EasyInputMessageRoleAssistant.Assistant;
    case "developer":
      return EasyInputMessageRoleDeveloper.Developer;
    default: {
      const exhaustiveCheck: never = role;
      throw new Error(`Unhandled role type: ${exhaustiveCheck}`);
    }
  }
}

/**
 * Convert message content to a string representation.
 * Handles string, null, undefined, and object content types.
 */
function contentToString(content: unknown): string {
  if (typeof content === "string") {
    return content;
  }
  if (content === null || content === undefined) {
    return "";
  }
  return JSON.stringify(content);
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
  messages: ChatMessages[]
): InputsUnion {
  return messages.map(
    (
      msg
    ):
      | EasyInputMessage
      | FunctionCallOutputItem => {
      if (isToolResponseMessage(msg)) {
        return {
          type: "function_call_output" as const,
          callId: msg.toolCallId,
          output: contentToString(msg.content),
        };
      }

      if (isAssistantMessage(msg)) {
        return {
          role: mapChatRole("assistant"),
          content: contentToString(msg.content),
        };
      }

      // System, user, developer messages
      return {
        role: mapChatRole(msg.role),
        content: contentToString(msg.content),
      };
    }
  );
}

/**
 * Convert an OpenResponses response to OpenAI chat message format.
 *
 * This function transforms OpenResponsesResult to ChatAssistantMessage
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
