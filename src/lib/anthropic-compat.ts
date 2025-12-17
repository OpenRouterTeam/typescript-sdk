import type * as models from "../models/index.js";
import {
  OpenResponsesEasyInputMessageRoleUser,
  OpenResponsesEasyInputMessageRoleAssistant,
} from "../models/openresponseseasyinputmessage.js";
import {
  OpenResponsesInputMessageItemRoleUser,
  OpenResponsesInputMessageItemRoleSystem,
} from "../models/openresponsesinputmessageitem.js";
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
    | models.OpenResponsesInputMessageItem
    | models.OpenResponsesFunctionCallOutput
    | models.OpenResponsesFunctionToolCall
    | models.ResponsesImageGenerationCall
  )[] = [];

  for (const msg of messages) {
    const { role, content } = msg;

    if (typeof content === "string") {
      result.push(createEasyInputMessage(role, content));
      continue;
    }

    const contentItems: (
      | models.ResponseInputText
      | models.ResponseInputImage
      | models.ResponseInputFile
      | models.ResponseInputAudio
    )[] = [];
    let hasStructuredContent = false;

    for (const block of content) {
      switch (block.type) {
        case 'text': {
          const textBlock = block as models.ClaudeTextBlockParam;
          contentItems.push({
            type: 'input_text',
            text: textBlock.text,
          });
          // Note: cache_control is lost in conversion (OpenRouter doesn't support it)
          break;
        }

        case 'image': {
          const imageBlock = block as models.ClaudeImageBlockParam;
          hasStructuredContent = true;

          // Convert Claude image source to OpenRouter format
          if (imageBlock.source.type === 'url') {
            contentItems.push({
              type: 'input_image',
              detail: 'auto',
              imageUrl: imageBlock.source.url,
            });
          } else if (imageBlock.source.type === 'base64') {
            // Base64 images: OpenRouter expects a URL, so we use data URI
            const dataUri = `data:${imageBlock.source.media_type};base64,${imageBlock.source.data}`;
            contentItems.push({
              type: 'input_image',
              detail: 'auto',
              imageUrl: dataUri,
            });
          }
          break;
        }

        case 'tool_use': {
          const toolUseBlock = block as models.ClaudeToolUseBlockParam;

          // Map to OpenResponsesFunctionToolCall
          result.push({
            type: 'function_call',
            callId: toolUseBlock.id,
            name: toolUseBlock.name,
            arguments: JSON.stringify(toolUseBlock.input),
            id: toolUseBlock.id,
            status: 'completed', // Tool use in conversation history is already completed
          });
          break;
        }

        case 'tool_result': {
          const toolResultBlock = block as models.ClaudeToolResultBlockParam;

          let toolOutput = '';
          if (typeof toolResultBlock.content === 'string') {
            toolOutput = toolResultBlock.content;
          } else {
            // Extract text and handle images separately
            const textParts: string[] = [];
            const imageParts: models.ClaudeImageBlockParam[] = [];

            for (const part of toolResultBlock.content) {
              if (part.type === 'text') {
                textParts.push(part.text);
              } else if (part.type === 'image') {
                imageParts.push(part);
              }
            }

            toolOutput = textParts.join('');

            // Map images to image_generation_call items
            for (const imagePart of imageParts) {
              const imageUrl = imagePart.source.type === 'url'
                ? imagePart.source.url
                : `data:${imagePart.source.media_type};base64,${imagePart.source.data}`;

              result.push({
                type: 'image_generation_call',
                id: `${toolResultBlock.tool_use_id}-image-${imageParts.indexOf(imagePart)}`,
                result: imageUrl,
                status: 'completed',
              });
            }
          }

          // Add the function call output for the text portion
          if (toolOutput || typeof toolResultBlock.content === 'string') {
            result.push(createFunctionCallOutput(toolResultBlock.tool_use_id, toolOutput));
          }
          break;
        }

        default: {
          const _exhaustiveCheck: never = block;
          throw new Error(`Unhandled content block type: ${(_exhaustiveCheck as { type: string }).type}`);
        }
      }
    }

    // Use structured format if we have images, otherwise use simple format
    if (contentItems.length > 0) {
      if (hasStructuredContent) {
        // Use OpenResponsesInputMessageItem for messages with images
        const messageRole = role === 'user'
          ? OpenResponsesInputMessageItemRoleUser.User
          : role === 'assistant'
            ? OpenResponsesInputMessageItemRoleSystem.System // Assistant messages treated as system in this context
            : OpenResponsesInputMessageItemRoleSystem.System;

        result.push({
          type: 'message',
          role: messageRole,
          content: contentItems,
        });
      } else {
        // Use simple format for text-only messages
        const textContent = contentItems
          .filter((item): item is models.ResponseInputText => item.type === 'input_text')
          .map(item => item.text)
          .join('');

        if (textContent) {
          result.push(createEasyInputMessage(role, textContent));
        }
      }
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
