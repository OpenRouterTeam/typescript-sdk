import type * as models from '../models/index.js';
import type { ReusableReadableStream } from './reusable-stream.js';
import type { ParsedToolCall } from './tool-types.js';

/**
 * Extract text deltas from responses stream events
 */
export async function* extractTextDeltas(
  stream: ReusableReadableStream<models.OpenResponsesStreamEvent>,
): AsyncIterableIterator<string> {
  const consumer = stream.createConsumer();

  for await (const event of consumer) {
    if ('type' in event && event.type === 'response.output_text.delta') {
      const deltaEvent = event as models.OpenResponsesStreamEventResponseOutputTextDelta;
      if (deltaEvent.delta) {
        yield deltaEvent.delta;
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
    if ('type' in event && event.type === 'response.reasoning_text.delta') {
      const deltaEvent = event as models.OpenResponsesReasoningDeltaEvent;
      if (deltaEvent.delta) {
        yield deltaEvent.delta;
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
    if ('type' in event && event.type === 'response.function_call_arguments.delta') {
      const deltaEvent = event as models.OpenResponsesStreamEventResponseFunctionCallArgumentsDelta;
      if (deltaEvent.delta) {
        yield deltaEvent.delta;
      }
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
        const itemEvent = event as models.OpenResponsesStreamEventResponseOutputItemAdded;
        if (itemEvent.item && 'type' in itemEvent.item && itemEvent.item.type === 'message') {
          hasStarted = true;
          currentText = '';
          const msgItem = itemEvent.item as models.ResponsesOutputMessage;
          currentId = msgItem.id;
        }
        break;
      }

      case 'response.output_text.delta': {
        const deltaEvent = event as models.OpenResponsesStreamEventResponseOutputTextDelta;
        if (hasStarted && deltaEvent.delta) {
          currentText += deltaEvent.delta;

          // Yield updated message in ResponsesOutputMessage format
          yield {
            id: currentId,
            type: 'message' as const,
            role: 'assistant' as const,
            status: 'in_progress' as const,
            content: [
              {
                type: 'output_text' as const,
                text: currentText,
                annotations: [],
              },
            ],
          };
        }
        break;
      }

      case 'response.output_item.done': {
        const itemDoneEvent = event as models.OpenResponsesStreamEventResponseOutputItemDone;
        if (
          itemDoneEvent.item &&
          'type' in itemDoneEvent.item &&
          itemDoneEvent.item.type === 'message'
        ) {
          // Yield final complete message in ResponsesOutputMessage format
          const outputMessage = itemDoneEvent.item as models.ResponsesOutputMessage;
          yield outputMessage;
        }
        break;
      }
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
  const consumer = stream.createConsumer();

  // Track the accumulated text
  let currentText = '';
  let hasStarted = false;

  for await (const event of consumer) {
    if (!('type' in event)) {
      continue;
    }

    switch (event.type) {
      case 'response.output_item.added': {
        const itemEvent = event as models.OpenResponsesStreamEventResponseOutputItemAdded;
        if (itemEvent.item && 'type' in itemEvent.item && itemEvent.item.type === 'message') {
          hasStarted = true;
          currentText = '';
        }
        break;
      }

      case 'response.output_text.delta': {
        const deltaEvent = event as models.OpenResponsesStreamEventResponseOutputTextDelta;
        if (hasStarted && deltaEvent.delta) {
          currentText += deltaEvent.delta;

          // Yield updated message
          yield {
            role: 'assistant' as const,
            content: currentText,
          };
        }
        break;
      }

      case 'response.output_item.done': {
        const itemDoneEvent = event as models.OpenResponsesStreamEventResponseOutputItemDone;
        if (
          itemDoneEvent.item &&
          'type' in itemDoneEvent.item &&
          itemDoneEvent.item.type === 'message'
        ) {
          // Yield final complete message
          const outputMessage = itemDoneEvent.item as models.ResponsesOutputMessage;
          yield convertToAssistantMessage(outputMessage);
        }
        break;
      }
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

    if (event.type === 'response.completed') {
      const completedEvent = event as models.OpenResponsesStreamEventResponseCompleted;
      return completedEvent.response;
    }

    if (event.type === 'response.failed') {
      const failedEvent = event as models.OpenResponsesStreamEventResponseFailed;
      // The failed event contains the full response with error information
      throw new Error(`Response failed: ${JSON.stringify(failedEvent.response.error)}`);
    }

    if (event.type === 'response.incomplete') {
      const incompleteEvent = event as models.OpenResponsesStreamEventResponseIncomplete;
      // Return the incomplete response
      return incompleteEvent.response;
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
    if ('type' in item && item.type === 'function_call') {
      const functionCallItem = item as models.ResponsesOutputItemFunctionCall;

      try {
        const parsedArguments = JSON.parse(functionCallItem.arguments);

        toolCalls.push({
          id: functionCallItem.callId,
          name: functionCallItem.name,
          arguments: parsedArguments,
        });
      } catch (_error) {
        // Include the tool call with unparsed arguments
        toolCalls.push({
          id: functionCallItem.callId,
          name: functionCallItem.name,
          arguments: functionCallItem.arguments, // Keep as string if parsing fails
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
        const itemEvent = event as models.OpenResponsesStreamEventResponseOutputItemAdded;
        if (itemEvent.item && 'type' in itemEvent.item && itemEvent.item.type === 'function_call') {
          const functionCallItem = itemEvent.item as models.ResponsesOutputItemFunctionCall;
          toolCallsInProgress.set(functionCallItem.callId, {
            id: functionCallItem.callId,
            name: functionCallItem.name,
            argumentsAccumulated: '',
          });
        }
        break;
      }

      case 'response.function_call_arguments.delta': {
        const deltaEvent =
          event as models.OpenResponsesStreamEventResponseFunctionCallArgumentsDelta;
        const toolCall = toolCallsInProgress.get(deltaEvent.itemId);
        if (toolCall && deltaEvent.delta) {
          toolCall.argumentsAccumulated += deltaEvent.delta;
        }
        break;
      }

      case 'response.function_call_arguments.done': {
        const doneEvent = event as models.OpenResponsesStreamEventResponseFunctionCallArgumentsDone;
        const toolCall = toolCallsInProgress.get(doneEvent.itemId);

        if (toolCall) {
          // Parse complete arguments
          try {
            const parsedArguments = JSON.parse(doneEvent.arguments);
            yield {
              id: toolCall.id,
              name: doneEvent.name,
              arguments: parsedArguments,
            };
          } catch (_error) {
            // Yield with unparsed arguments if parsing fails
            yield {
              id: toolCall.id,
              name: doneEvent.name,
              arguments: doneEvent.arguments,
            };
          }

          // Clean up
          toolCallsInProgress.delete(doneEvent.itemId);
        }
        break;
      }

      case 'response.output_item.done': {
        const itemDoneEvent = event as models.OpenResponsesStreamEventResponseOutputItemDone;
        if (
          itemDoneEvent.item &&
          'type' in itemDoneEvent.item &&
          itemDoneEvent.item.type === 'function_call'
        ) {
          const functionCallItem = itemDoneEvent.item as models.ResponsesOutputItemFunctionCall;

          // Yield final tool call if we haven't already
          if (toolCallsInProgress.has(functionCallItem.callId)) {
            try {
              const parsedArguments = JSON.parse(functionCallItem.arguments);
              yield {
                id: functionCallItem.callId,
                name: functionCallItem.name,
                arguments: parsedArguments,
              };
            } catch (_error) {
              yield {
                id: functionCallItem.callId,
                name: functionCallItem.name,
                arguments: functionCallItem.arguments,
              };
            }

            toolCallsInProgress.delete(functionCallItem.callId);
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

  for (const item of response.output) {
    if (!('type' in item)) {
      continue;
    }

    // Handle message output items
    if (item.type === 'message') {
      const msgItem = item as models.ResponsesOutputMessage;
      for (const part of msgItem.content) {
        if ('type' in part && part.type === 'output_text') {
          const textPart = part as models.ResponseOutputText;
          content.push({
            type: 'text',
            text: textPart.text,
          });
        }
      }
    }

    // Handle function call output items (tool use)
    if (item.type === 'function_call') {
      const fnCall = item as models.ResponsesOutputItemFunctionCall;
      let parsedInput: Record<string, unknown> = {};

      try {
        parsedInput = JSON.parse(fnCall.arguments);
      } catch {
        // If parsing fails, keep as empty object
        parsedInput = {};
      }

      content.push({
        type: 'tool_use',
        id: fnCall.callId,
        name: fnCall.name,
        input: parsedInput,
      });
    }

    // Handle reasoning output items (thinking)
    if (item.type === 'reasoning') {
      const reasoningItem = item as models.ResponsesOutputItemReasoning;
      if (reasoningItem.summary && reasoningItem.summary.length > 0) {
        for (const summaryItem of reasoningItem.summary) {
          if (summaryItem.type === 'summary_text' && summaryItem.text) {
            content.push({
              type: 'thinking',
              thinking: summaryItem.text,
              signature: '',
            });
          }
        }
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
  };
}
