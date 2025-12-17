import type * as models from '../models/index.js';

import {
  OpenResponsesEasyInputMessageRoleAssistant,
  OpenResponsesEasyInputMessageRoleUser,
} from '../models/openresponseseasyinputmessage.js';
import { OpenResponsesFunctionCallOutputType } from '../models/openresponsesfunctioncalloutput.js';
import {
  OpenResponsesInputMessageItemRoleDeveloper,
  OpenResponsesInputMessageItemRoleUser,
} from '../models/openresponsesinputmessageitem.js';
import { convertToClaudeMessage } from './stream-transformers.js';

/**
 * Maps Claude role strings to OpenResponses role types
 */
function mapClaudeRole(role: 'user' | 'assistant'): models.OpenResponsesEasyInputMessageRoleUnion {
  if (role === 'user') {
    return OpenResponsesEasyInputMessageRoleUser.User;
  }
  return OpenResponsesEasyInputMessageRoleAssistant.Assistant;
}

/**
 * Creates a properly typed OpenResponsesEasyInputMessage
 */
function createEasyInputMessage(
  role: 'user' | 'assistant',
  content: string,
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
  output: string,
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
 * Note: Some Claude features are lost in conversion as OpenRouter doesn't support them:
 * - cache_control on content blocks
 * - is_error flag on tool_result blocks
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
  messages: models.ClaudeMessageParam[],
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

    if (typeof content === 'string') {
      result.push(createEasyInputMessage(role, content));
      continue;
    }

    // Separate content blocks into categories for clearer processing
    const textBlocks: models.ClaudeTextBlockParam[] = [];
    const imageBlocks: models.ClaudeImageBlockParam[] = [];
    const toolUseBlocks: models.ClaudeToolUseBlockParam[] = [];
    const toolResultBlocks: models.ClaudeToolResultBlockParam[] = [];

    for (const block of content) {
      switch (block.type) {
        case 'text':
          textBlocks.push(block as models.ClaudeTextBlockParam);
          break;
        case 'image':
          imageBlocks.push(block as models.ClaudeImageBlockParam);
          break;
        case 'tool_use':
          toolUseBlocks.push(block as models.ClaudeToolUseBlockParam);
          break;
        case 'tool_result':
          toolResultBlocks.push(block as models.ClaudeToolResultBlockParam);
          break;
        default: {
          const exhaustiveCheck: never = block;
          throw new Error(`Unhandled content block type: ${exhaustiveCheck}`);
        }
      }
    }

    // Process tool use blocks first (they go directly to result)
    for (const toolUseBlock of toolUseBlocks) {
      result.push({
        type: 'function_call',
        callId: toolUseBlock.id,
        name: toolUseBlock.name,
        arguments: JSON.stringify(toolUseBlock.input),
        id: toolUseBlock.id,
        status: 'completed',
      });
    }

    // Process tool result blocks
    for (const toolResultBlock of toolResultBlocks) {
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
        imageParts.forEach((imagePart, i) => {
          let imageUrl: string;

          if (imagePart.source.type === 'url') {
            imageUrl = imagePart.source.url;
          } else if (imagePart.source.type === 'base64') {
            imageUrl = `data:${imagePart.source.media_type};base64,${imagePart.source.data}`;
          } else {
            const exhaustiveCheck: never = imagePart.source;
            throw new Error(`Unhandled image source type: ${exhaustiveCheck}`);
          }

          result.push({
            type: 'image_generation_call',
            id: `${toolResultBlock.tool_use_id}-image-${i}`,
            result: imageUrl,
            status: 'completed',
          });
        });
      }

      // Add the function call output for the text portion (if any)
      if (toolOutput.length > 0) {
        result.push(createFunctionCallOutput(toolResultBlock.tool_use_id, toolOutput));
      }
    }

    // Process text and image blocks (these become message content)
    if (textBlocks.length > 0 || imageBlocks.length > 0) {
      const contentItems: (models.ResponseInputText | models.ResponseInputImage)[] = [];

      // Add text blocks
      for (const textBlock of textBlocks) {
        contentItems.push({
          type: 'input_text',
          text: textBlock.text,
        });
      }

      // Add image blocks
      for (const imageBlock of imageBlocks) {
        let imageUrl: string;

        if (imageBlock.source.type === 'url') {
          imageUrl = imageBlock.source.url;
        } else if (imageBlock.source.type === 'base64') {
          imageUrl = `data:${imageBlock.source.media_type};base64,${imageBlock.source.data}`;
        } else {
          const exhaustiveCheck: never = imageBlock.source;
          throw new Error(`Unhandled image source type: ${exhaustiveCheck}`);
        }

        contentItems.push({
          type: 'input_image',
          detail: 'auto',
          imageUrl,
        });
      }

      // Determine output format based on content
      if (imageBlocks.length > 0) {
        // Use structured format for messages with images
        result.push({
          type: 'message',
          role:
            role === 'user'
              ? OpenResponsesInputMessageItemRoleUser.User
              : OpenResponsesInputMessageItemRoleDeveloper.Developer,
          content: contentItems,
        });
      } else {
        // Use simple string format for text-only messages
        const textContent = contentItems
          .filter((item): item is models.ResponseInputText => item.type === 'input_text')
          .map((item) => item.text)
          .join('');

        if (textContent.length > 0) {
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
