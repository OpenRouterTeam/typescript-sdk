import * as models from "../models/index.js";
import { ReusableReadableStream } from "./reusable-stream.js";

/**
 * Extract text deltas from responses stream events
 */
export async function* extractTextDeltas(
  stream: ReusableReadableStream<models.OpenResponsesStreamEvent>,
): AsyncIterableIterator<string> {
  const consumer = stream.createConsumer();

  for await (const event of consumer) {
    if ("type" in event && event.type === "response.output_text.delta") {
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
    if ("type" in event && event.type === "response.reasoning_text.delta") {
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
    if ("type" in event && event.type === "response.function_call_arguments.delta") {
      const deltaEvent = event as models.OpenResponsesStreamEventResponseFunctionCallArgumentsDelta;
      if (deltaEvent.delta) {
        yield deltaEvent.delta;
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
  let currentText = "";
  let hasStarted = false;

  for await (const event of consumer) {
    if (!("type" in event)) continue;

    switch (event.type) {
      case "response.output_item.added": {
        const itemEvent = event as models.OpenResponsesStreamEventResponseOutputItemAdded;
        if (itemEvent.item && "type" in itemEvent.item && itemEvent.item.type === "message") {
          hasStarted = true;
          currentText = "";
        }
        break;
      }

      case "response.output_text.delta": {
        const deltaEvent = event as models.OpenResponsesStreamEventResponseOutputTextDelta;
        if (hasStarted && deltaEvent.delta) {
          currentText += deltaEvent.delta;

          // Yield updated message
          yield {
            role: "assistant" as const,
            content: currentText,
          };
        }
        break;
      }

      case "response.output_item.done": {
        const itemDoneEvent = event as models.OpenResponsesStreamEventResponseOutputItemDone;
        if (itemDoneEvent.item && "type" in itemDoneEvent.item && itemDoneEvent.item.type === "message") {
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
    if (!("type" in event)) continue;

    if (event.type === "response.completed") {
      const completedEvent = event as models.OpenResponsesStreamEventResponseCompleted;
      return completedEvent.response;
    }

    if (event.type === "response.failed") {
      const failedEvent = event as models.OpenResponsesStreamEventResponseFailed;
      // The failed event contains the full response with error information
      throw new Error(`Response failed: ${JSON.stringify(failedEvent.response.error)}`);
    }

    if (event.type === "response.incomplete") {
      const incompleteEvent = event as models.OpenResponsesStreamEventResponseIncomplete;
      // Return the incomplete response
      return incompleteEvent.response;
    }
  }

  throw new Error("Stream ended without completion event");
}

/**
 * Convert ResponsesOutputMessage to AssistantMessage (chat format)
 */
function convertToAssistantMessage(
  outputMessage: models.ResponsesOutputMessage,
): models.AssistantMessage {
  // Extract text content
  const textContent = outputMessage.content
    .filter((part): part is models.ResponseOutputText =>
      "type" in part && part.type === "output_text"
    )
    .map((part) => part.text)
    .join("");

  return {
    role: "assistant" as const,
    content: textContent || null,
  };
}

/**
 * Extract the first message from a completed response
 */
export function extractMessageFromResponse(
  response: models.OpenResponsesNonStreamingResponse,
): models.AssistantMessage {
  const messageItem = response.output.find(
    (item): item is models.ResponsesOutputMessage =>
      "type" in item && item.type === "message"
  );

  if (!messageItem) {
    throw new Error("No message found in response output");
  }

  return convertToAssistantMessage(messageItem);
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
  if (typeof message.content === "string") {
    return message.content;
  }

  return "";
}
