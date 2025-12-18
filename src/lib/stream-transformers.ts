import type * as models from '../models/index.js';
import type { ReusableReadableStream } from './reusable-stream.js';
import type { ParsedToolCall } from './tool-types.js';
import {
  isOutputTextDeltaEvent,
  isReasoningDeltaEvent,
  isFunctionCallArgumentsDeltaEvent,
  isOutputItemAddedEvent,
  isOutputItemDoneEvent,
  isResponseCompletedEvent,
  isResponseFailedEvent,
  isResponseIncompleteEvent,
  isFunctionCallArgumentsDoneEvent,
  isOutputMessage,
  isFunctionCallOutputItem,
  isReasoningOutputItem,
  isWebSearchCallOutputItem,
  isFileSearchCallOutputItem,
  isImageGenerationCallOutputItem,
  isOutputTextPart,
  isRefusalPart,
  isFileCitationAnnotation,
  isURLCitationAnnotation,
  isFilePathAnnotation,
} from './stream-type-guards.js';

/**
 * Extract text deltas from responses stream events
 */
export async function* extractTextDeltas(
  stream: ReusableReadableStream<models.OpenResponsesStreamEvent>,
): AsyncIterableIterator<string> {
  const consumer = stream.createConsumer();

  for await (const event of consumer) {
    if (isOutputTextDeltaEvent(event)) {
      if (event.delta) {
        yield event.delta;
      }
    }
  }
}

/**
 * Extract reasoning deltas from responses stream events
 */
export async function* extractReasoningDeltas(
  stream: ReusableReadableStream<models.OpenResponsesStreamEvent>,
): AsyncIterableIterator<string> {
  const consumer = stream.createConsumer();

  for await (const event of consumer) {
    if (isReasoningDeltaEvent(event)) {
      if (event.delta) {
        yield event.delta;
      }
    }
  }
}

/**
 * Extract tool call argument deltas from responses stream events
 */
export async function* extractToolDeltas(
  stream: ReusableReadableStream<models.OpenResponsesStreamEvent>,
): AsyncIterableIterator<string> {
  const consumer = stream.createConsumer();

  for await (const event of consumer) {
    if (isFunctionCallArgumentsDeltaEvent(event)) {
      if (event.delta) {
        yield event.delta;
      }
    }
  }
}

/**
 * Core message stream builder - shared logic for both formats
 * Accumulates text deltas and yields updates
 */
async function* buildMessageStreamCore(
  stream: ReusableReadableStream<models.OpenResponsesStreamEvent>,
): AsyncIterableIterator<{
  type: 'delta' | 'complete';
  text?: string;
  messageId?: string;
  completeMessage?: models.ResponsesOutputMessage;
}> {
  const consumer = stream.createConsumer();

  // Track the accumulated text and message info
  let currentText = '';
  let currentId = '';
  let hasStarted = false;

  for await (const event of consumer) {
    if (!('type' in event)) {
      continue;
    }

    switch (event.type) {
      case 'response.output_item.added': {
        if (isOutputItemAddedEvent(event)) {
          if (event.item && isOutputMessage(event.item)) {
            hasStarted = true;
            currentText = '';
            currentId = event.item.id;
          }
        }
        break;
      }

      case 'response.output_text.delta': {
        if (isOutputTextDeltaEvent(event)) {
          if (hasStarted && event.delta) {
            currentText += event.delta;
            yield {
              type: 'delta' as const,
              text: currentText,
              messageId: currentId,
            };
          }
        }
        break;
      }

      case 'response.output_item.done': {
        if (isOutputItemDoneEvent(event)) {
          if (event.item && isOutputMessage(event.item)) {
            yield {
              type: 'complete' as const,
              completeMessage: event.item,
            };
          }
        }
        break;
      }

      default:
        // Ignore other event types - this is intentionally not exhaustive
        // as we only care about specific events for message building
        break;
    }
  }
}

/**
 * Build incremental message updates from responses stream events
 * Returns ResponsesOutputMessage (assistant/responses format)
 */
export async function* buildResponsesMessageStream(
  stream: ReusableReadableStream<models.OpenResponsesStreamEvent>,
): AsyncIterableIterator<models.ResponsesOutputMessage> {
  for await (const update of buildMessageStreamCore(stream)) {
    if (update.type === 'delta' && update.text !== undefined && update.messageId !== undefined) {
      // Yield incremental update in ResponsesOutputMessage format
      yield {
        id: update.messageId,
        type: 'message' as const,
        role: 'assistant' as const,
        status: 'in_progress' as const,
        content: [
          {
            type: 'output_text' as const,
            text: update.text,
            annotations: [],
          },
        ],
      };
    } else if (update.type === 'complete' && update.completeMessage) {
      // Yield final complete message
      yield update.completeMessage;
    }
  }
}

/**
 * Build incremental message updates from responses stream events
 * Returns AssistantMessage (chat format) instead of ResponsesOutputMessage
 */
export async function* buildMessageStream(
  stream: ReusableReadableStream<models.OpenResponsesStreamEvent>,
): AsyncIterableIterator<models.AssistantMessage> {
  for await (const update of buildMessageStreamCore(stream)) {
    if (update.type === 'delta' && update.text !== undefined) {
      // Yield incremental update in chat format
      yield {
        role: 'assistant' as const,
        content: update.text,
      };
    } else if (update.type === 'complete' && update.completeMessage) {
      // Yield final complete message converted to chat format
      yield convertToAssistantMessage(update.completeMessage);
    }
  }
}

/**
 * Consume stream until completion and return the complete response
 */
export async function consumeStreamForCompletion(
  stream: ReusableReadableStream<models.OpenResponsesStreamEvent>,
): Promise<models.OpenResponsesNonStreamingResponse> {
  const consumer = stream.createConsumer();

  for await (const event of consumer) {
    if (!('type' in event)) {
      continue;
    }

    if (isResponseCompletedEvent(event)) {
      return event.response;
    }

    if (isResponseFailedEvent(event)) {
      // The failed event contains the full response with error information
      throw new Error(`Response failed: ${JSON.stringify(event.response.error)}`);
    }

    if (isResponseIncompleteEvent(event)) {
      // Return the incomplete response
      return event.response;
    }
  }

  throw new Error('Stream ended without completion event');
}

/**
 * Convert ResponsesOutputMessage to AssistantMessage (chat format)
 */
function convertToAssistantMessage(
  outputMessage: models.ResponsesOutputMessage,
): models.AssistantMessage {
  // Extract text content
  const textContent = outputMessage.content
    .filter(
      (part): part is models.ResponseOutputText => 'type' in part && part.type === 'output_text',
    )
    .map((part) => part.text)
    .join('');

  return {
    role: 'assistant' as const,
    content: textContent || null,
  };
}

/**
 * Extract the first message from a completed response (chat format)
 */
export function extractMessageFromResponse(
  response: models.OpenResponsesNonStreamingResponse,
): models.AssistantMessage {
  const messageItem = response.output.find(
    (item): item is models.ResponsesOutputMessage => 'type' in item && item.type === 'message',
  );

  if (!messageItem) {
    throw new Error('No message found in response output');
  }

  return convertToAssistantMessage(messageItem);
}

/**
 * Extract the first message from a completed response (responses format)
 */
export function extractResponsesMessageFromResponse(
  response: models.OpenResponsesNonStreamingResponse,
): models.ResponsesOutputMessage {
  const messageItem = response.output.find(
    (item): item is models.ResponsesOutputMessage => 'type' in item && item.type === 'message',
  );

  if (!messageItem) {
    throw new Error('No message found in response output');
  }

  return messageItem;
}

/**
 * Extract text from a response, either from outputText or by concatenating message content
 */
export function extractTextFromResponse(
  response: models.OpenResponsesNonStreamingResponse,
): string {
  // Use pre-concatenated outputText if available
  if (response.outputText) {
    return response.outputText;
  }

  // Otherwise, extract from the first message (convert to AssistantMessage which has string content)
  const message = extractMessageFromResponse(response);

  // AssistantMessage.content is string | Array | null | undefined
  if (typeof message.content === 'string') {
    return message.content;
  }

  return '';
}

/**
 * Extract all tool calls from a completed response
 * Returns parsed tool calls with arguments as objects (not JSON strings)
 */
export function extractToolCallsFromResponse(
  response: models.OpenResponsesNonStreamingResponse,
): ParsedToolCall[] {
  const toolCalls: ParsedToolCall[] = [];

  for (const item of response.output) {
    if (isFunctionCallOutputItem(item)) {
      try {
        const parsedArguments = JSON.parse(item.arguments);

        toolCalls.push({
          id: item.callId,
          name: item.name,
          arguments: parsedArguments,
        });
      } catch (error) {
        console.warn(
          `Failed to parse tool call arguments for ${item.name}:`,
          error instanceof Error ? error.message : String(error),
          `\nArguments: ${item.arguments.substring(0, 100)}${item.arguments.length > 100 ? '...' : ''}`
        );
        // Include the tool call with unparsed arguments
        toolCalls.push({
          id: item.callId,
          name: item.name,
          arguments: item.arguments, // Keep as string if parsing fails
        });
      }
    }
  }

  return toolCalls;
}

/**
 * Build incremental tool call updates from responses stream events
 * Yields structured tool call objects as they're built from deltas
 */
export async function* buildToolCallStream(
  stream: ReusableReadableStream<models.OpenResponsesStreamEvent>,
): AsyncIterableIterator<ParsedToolCall> {
  const consumer = stream.createConsumer();

  // Track tool calls being built
  const toolCallsInProgress = new Map<
    string,
    {
      id: string;
      name: string;
      argumentsAccumulated: string;
    }
  >();

  for await (const event of consumer) {
    if (!('type' in event)) {
      continue;
    }

    switch (event.type) {
      case 'response.output_item.added': {
        if (isOutputItemAddedEvent(event) && event.item && isFunctionCallOutputItem(event.item)) {
          toolCallsInProgress.set(event.item.callId, {
            id: event.item.callId,
            name: event.item.name,
            argumentsAccumulated: '',
          });
        }
        break;
      }

      case 'response.function_call_arguments.delta': {
        if (isFunctionCallArgumentsDeltaEvent(event)) {
          const toolCall = toolCallsInProgress.get(event.itemId);
          if (toolCall && event.delta) {
            toolCall.argumentsAccumulated += event.delta;
          }
        }
        break;
      }

      case 'response.function_call_arguments.done': {
        if (isFunctionCallArgumentsDoneEvent(event)) {
          const toolCall = toolCallsInProgress.get(event.itemId);

          if (toolCall) {
            // Parse complete arguments
            try {
              const parsedArguments = JSON.parse(event.arguments);
              yield {
                id: toolCall.id,
                name: event.name,
                arguments: parsedArguments,
              };
            } catch (error) {
              console.warn(
                `Failed to parse tool call arguments for ${event.name}:`,
                error instanceof Error ? error.message : String(error),
                `\nArguments: ${event.arguments.substring(0, 100)}${event.arguments.length > 100 ? '...' : ''}`
              );
              // Yield with unparsed arguments if parsing fails
              yield {
                id: toolCall.id,
                name: event.name,
                arguments: event.arguments,
              };
            }

            // Clean up
            toolCallsInProgress.delete(event.itemId);
          }
        }
        break;
      }

      case 'response.output_item.done': {
        if (isOutputItemDoneEvent(event) && event.item && isFunctionCallOutputItem(event.item)) {
          // Yield final tool call if we haven't already
          if (toolCallsInProgress.has(event.item.callId)) {
            try {
              const parsedArguments = JSON.parse(event.item.arguments);
              yield {
                id: event.item.callId,
                name: event.item.name,
                arguments: parsedArguments,
              };
            } catch (_error) {
              yield {
                id: event.item.callId,
                name: event.item.name,
                arguments: event.item.arguments,
              };
            }

            toolCallsInProgress.delete(event.item.callId);
          }
        }
        break;
      }
    }
  }
}

/**
 * Check if a response contains any tool calls
 */
export function responseHasToolCalls(response: models.OpenResponsesNonStreamingResponse): boolean {
  return response.output.some((item) => 'type' in item && item.type === 'function_call');
}

/**
 * Convert OpenRouter annotations to Claude citations
 */
function mapAnnotationsToCitations(
  annotations?: Array<models.OpenAIResponsesAnnotation>,
): models.ClaudeTextCitation[] | undefined {
  if (!annotations || annotations.length === 0) {
    return undefined;
  }

  const citations: models.ClaudeTextCitation[] = [];

  for (const annotation of annotations) {
    if (!('type' in annotation)) {
      continue;
    }

    switch (annotation.type) {
      case 'file_citation': {
        if (isFileCitationAnnotation(annotation)) {
          citations.push({
            type: 'char_location',
            cited_text: '',
            document_index: annotation.index,
            document_title: annotation.filename,
            file_id: annotation.fileId,
            start_char_index: 0,
            end_char_index: 0,
          });
        }
        break;
      }

      case 'url_citation': {
        if (isURLCitationAnnotation(annotation)) {
          citations.push({
            type: 'web_search_result_location',
            cited_text: '',
            title: annotation.title,
            url: annotation.url,
            encrypted_index: '',
          });
        }
        break;
      }

      case 'file_path': {
        if (isFilePathAnnotation(annotation)) {
          citations.push({
            type: 'char_location',
            cited_text: '',
            document_index: annotation.index,
            document_title: '',
            file_id: annotation.fileId,
            start_char_index: 0,
            end_char_index: 0,
          });
        }
        break;
      }

      default: {
        // Exhaustiveness check - TypeScript will error if we don't handle all annotation types
        const exhaustiveCheck: never = annotation;
        // Cast to unknown for runtime debugging if type system bypassed
        // This should never execute - throw with JSON of the unhandled value
        throw new Error(
          `Unhandled annotation type. This indicates a new annotation type was added. ` +
          `Annotation: ${JSON.stringify(exhaustiveCheck as unknown)}`
        );
      }
    }
  }

  return citations.length > 0 ? citations : undefined;
}

/**
 * Map OpenResponses status to Claude stop reason
 */
function mapStopReason(
  response: models.OpenResponsesNonStreamingResponse,
): models.ClaudeStopReason | null {
  // Check if any tool calls exist in the response
  const hasToolCalls = response.output.some(
    (item) => 'type' in item && item.type === 'function_call',
  );

  if (hasToolCalls) {
    return 'tool_use';
  }

  // Check the response status
  if (response.status === 'completed') {
    return 'end_turn';
  }

  if (response.status === 'incomplete') {
    // Check incomplete reason if available
    const incompleteReason = response.incompleteDetails?.reason;
    if (incompleteReason === 'max_output_tokens') {
      return 'max_tokens';
    }
    return 'end_turn';
  }

  return 'end_turn';
}

/**
 * Convert OpenResponsesNonStreamingResponse to ClaudeMessage format
 * Compatible with the Anthropic SDK BetaMessage type
 */
export function convertToClaudeMessage(
  response: models.OpenResponsesNonStreamingResponse,
): models.ClaudeMessage {
  const content: models.ClaudeContentBlock[] = [];
  const unsupportedContent: models.UnsupportedContent[] = [];

  for (const item of response.output) {
    if (!('type' in item)) {
      // Handle items without type field
      // Convert unknown item to a record format for storage
      const itemData = typeof item === 'object' && item !== null
        ? item
        : { value: item };
      unsupportedContent.push({
        original_type: 'unknown',
        data: itemData,
        reason: 'Output item missing type field',
      });
      continue;
    }

    switch (item.type) {
      case 'message': {
        if (isOutputMessage(item)) {
          for (const part of item.content) {
            if (!('type' in part)) {
              // Convert unknown part to a record format for storage
              const partData = typeof part === 'object' && part !== null
                ? part
                : { value: part };
              unsupportedContent.push({
                original_type: 'unknown_message_part',
                data: partData,
                reason: 'Message content part missing type field',
              });
              continue;
            }

            if (isOutputTextPart(part)) {
              const citations = mapAnnotationsToCitations(part.annotations);

              content.push({
                type: 'text',
                text: part.text,
                ...(citations && {
                  citations,
                }),
              });
            } else if (isRefusalPart(part)) {
              unsupportedContent.push({
                original_type: 'refusal',
                data: {
                  refusal: part.refusal,
                },
                reason: 'Claude does not have a native refusal content type',
              });
            } else {
              // Exhaustiveness check - TypeScript will error if we don't handle all part types
              const exhaustiveCheck: never = part;
              // This should never execute - new content type was added
              throw new Error(
                `Unhandled message content type. This indicates a new content type was added. ` +
                `Part: ${JSON.stringify(exhaustiveCheck)}`
              );
            }
          }
        }
        break;
      }

      case 'function_call': {
        if (isFunctionCallOutputItem(item)) {
          let parsedInput: Record<string, unknown>;

          try {
            parsedInput = JSON.parse(item.arguments);
          } catch (error) {
            console.warn(
              `Failed to parse tool call arguments for ${item.name}:`,
              error instanceof Error ? error.message : String(error),
              `\nArguments: ${item.arguments.substring(0, 100)}${item.arguments.length > 100 ? '...' : ''}`
            );
            // Preserve raw arguments if JSON parsing fails
            parsedInput = {
              _raw_arguments: item.arguments,
            };
          }

          content.push({
            type: 'tool_use',
            id: item.callId,
            name: item.name,
            input: parsedInput,
          });
        }
        break;
      }

      case 'reasoning': {
        if (isReasoningOutputItem(item)) {
          if (item.summary && item.summary.length > 0) {
            for (const summaryItem of item.summary) {
              if (summaryItem.type === 'summary_text' && summaryItem.text) {
                content.push({
                  type: 'thinking',
                  thinking: summaryItem.text,
                  signature: '',
                });
              }
            }
          }

          if (item.encryptedContent) {
            unsupportedContent.push({
              original_type: 'reasoning_encrypted',
              data: {
                id: item.id,
                encrypted_content: item.encryptedContent,
              },
              reason: 'Encrypted reasoning content preserved for round-trip',
            });
          }
        }
        break;
      }

      case 'web_search_call': {
        if (isWebSearchCallOutputItem(item)) {
          content.push({
            type: 'server_tool_use',
            id: item.id,
            name: 'web_search',
            input: {
              status: item.status,
            },
          });
        }
        break;
      }

      case 'file_search_call': {
        if (isFileSearchCallOutputItem(item)) {
          content.push({
            type: 'tool_use',
            id: item.id,
            name: 'file_search',
            input: {
              queries: item.queries,
              status: item.status,
            },
          });
        }
        break;
      }

      case 'image_generation_call': {
        if (isImageGenerationCallOutputItem(item)) {
          unsupportedContent.push({
            original_type: 'image_generation_call',
            data: {
              id: item.id,
              result: item.result,
              status: item.status,
            },
            reason: 'Claude does not support image outputs in assistant messages',
          });
        }
        break;
      }

      default: {
        // Exhaustiveness check - if a new output type is added, TypeScript will error here
        const exhaustiveCheck: never = item;
        // This line should never execute - it means a new type was added to the union
        // Throw an error instead of silently continuing to ensure we catch new types
        throw new Error(
          `Unhandled output item type. This indicates a new output type was added to the API. ` +
          `Item: ${JSON.stringify(exhaustiveCheck)}`
        );
      }
    }
  }

  return {
    id: response.id,
    type: 'message',
    role: 'assistant',
    model: response.model ?? 'unknown',
    content,
    stop_reason: mapStopReason(response),
    stop_sequence: null,
    usage: {
      input_tokens: response.usage?.inputTokens ?? 0,
      output_tokens: response.usage?.outputTokens ?? 0,
      cache_creation_input_tokens: response.usage?.inputTokensDetails?.cachedTokens ?? 0,
      cache_read_input_tokens: 0,
    },
    ...(unsupportedContent.length > 0 && {
      unsupported_content: unsupportedContent,
    }),
  };
}

/**
 * Extract unsupported content by original type
 */
export function extractUnsupportedContent(
  message: models.ClaudeMessage,
  originalType: string,
): models.UnsupportedContent[] {
  if (!message.unsupported_content) {
    return [];
  }

  return message.unsupported_content.filter((item) => item.original_type === originalType);
}

/**
 * Check if message has any unsupported content
 */
export function hasUnsupportedContent(message: models.ClaudeMessage): boolean {
  return !!(message.unsupported_content && message.unsupported_content.length > 0);
}

/**
 * Get summary of unsupported content types
 */
export function getUnsupportedContentSummary(
  message: models.ClaudeMessage,
): Record<string, number> {
  if (!message.unsupported_content) {
    return {};
  }

  const summary: Record<string, number> = {};
  for (const item of message.unsupported_content) {
    summary[item.original_type] = (summary[item.original_type] || 0) + 1;
  }

  return summary;
}
