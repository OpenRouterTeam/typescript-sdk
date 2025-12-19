import type * as models from '../models/index.js';

/**
 * Type guards for OpenResponses stream events
 * These enable proper TypeScript narrowing without type casts
 */

// Stream event type guards

export function isOutputTextDeltaEvent(
  event: models.OpenResponsesStreamEvent
): event is models.OpenResponsesStreamEventResponseOutputTextDelta {
  return 'type' in event && event.type === 'response.output_text.delta';
}

export function isReasoningDeltaEvent(
  event: models.OpenResponsesStreamEvent
): event is models.OpenResponsesReasoningDeltaEvent {
  return 'type' in event && event.type === 'response.reasoning_text.delta';
}

export function isFunctionCallArgumentsDeltaEvent(
  event: models.OpenResponsesStreamEvent
): event is models.OpenResponsesStreamEventResponseFunctionCallArgumentsDelta {
  return 'type' in event && event.type === 'response.function_call_arguments.delta';
}

export function isOutputItemAddedEvent(
  event: models.OpenResponsesStreamEvent
): event is models.OpenResponsesStreamEventResponseOutputItemAdded {
  return 'type' in event && event.type === 'response.output_item.added';
}

export function isOutputItemDoneEvent(
  event: models.OpenResponsesStreamEvent
): event is models.OpenResponsesStreamEventResponseOutputItemDone {
  return 'type' in event && event.type === 'response.output_item.done';
}

export function isResponseCompletedEvent(
  event: models.OpenResponsesStreamEvent
): event is models.OpenResponsesStreamEventResponseCompleted {
  return 'type' in event && event.type === 'response.completed';
}

export function isResponseFailedEvent(
  event: models.OpenResponsesStreamEvent
): event is models.OpenResponsesStreamEventResponseFailed {
  return 'type' in event && event.type === 'response.failed';
}

export function isResponseIncompleteEvent(
  event: models.OpenResponsesStreamEvent
): event is models.OpenResponsesStreamEventResponseIncomplete {
  return 'type' in event && event.type === 'response.incomplete';
}

export function isFunctionCallArgumentsDoneEvent(
  event: models.OpenResponsesStreamEvent
): event is models.OpenResponsesStreamEventResponseFunctionCallArgumentsDone {
  return 'type' in event && event.type === 'response.function_call_arguments.done';
}

// Output item type guards

export function isOutputMessage(
  item: unknown
): item is models.ResponsesOutputMessage {
  return (
    typeof item === 'object' &&
    item !== null &&
    'type' in item &&
    item.type === 'message'
  );
}

export function isFunctionCallOutputItem(
  item: unknown
): item is models.ResponsesOutputItemFunctionCall {
  return (
    typeof item === 'object' &&
    item !== null &&
    'type' in item &&
    item.type === 'function_call'
  );
}

export function isReasoningOutputItem(
  item: unknown
): item is models.ResponsesOutputItemReasoning {
  return (
    typeof item === 'object' &&
    item !== null &&
    'type' in item &&
    item.type === 'reasoning'
  );
}

export function isWebSearchCallOutputItem(
  item: unknown
): item is models.ResponsesWebSearchCallOutput {
  return (
    typeof item === 'object' &&
    item !== null &&
    'type' in item &&
    item.type === 'web_search_call'
  );
}

export function isFileSearchCallOutputItem(
  item: unknown
): item is models.ResponsesOutputItemFileSearchCall {
  return (
    typeof item === 'object' &&
    item !== null &&
    'type' in item &&
    item.type === 'file_search_call'
  );
}

export function isImageGenerationCallOutputItem(
  item: unknown
): item is models.ResponsesImageGenerationCall {
  return (
    typeof item === 'object' &&
    item !== null &&
    'type' in item &&
    item.type === 'image_generation_call'
  );
}

// Content part type guards

export function isOutputTextPart(
  part: unknown
): part is models.ResponseOutputText {
  return (
    typeof part === 'object' &&
    part !== null &&
    'type' in part &&
    part.type === 'output_text'
  );
}

export function isRefusalPart(
  part: unknown
): part is models.OpenAIResponsesRefusalContent {
  return (
    typeof part === 'object' &&
    part !== null &&
    'type' in part &&
    part.type === 'refusal'
  );
}

// Annotation type guards for Claude conversion

export function isFileCitationAnnotation(
  annotation: unknown
): annotation is models.FileCitation {
  return (
    typeof annotation === 'object' &&
    annotation !== null &&
    'type' in annotation &&
    annotation.type === 'file_citation'
  );
}

export function isURLCitationAnnotation(
  annotation: unknown
): annotation is models.URLCitation {
  return (
    typeof annotation === 'object' &&
    annotation !== null &&
    'type' in annotation &&
    annotation.type === 'url_citation'
  );
}

export function isFilePathAnnotation(
  annotation: unknown
): annotation is models.FilePath {
  return (
    typeof annotation === 'object' &&
    annotation !== null &&
    'type' in annotation &&
    annotation.type === 'file_path'
  );
}

// Helper to check if output has a type property
export function hasTypeProperty(item: unknown): item is {
  type: string;
} {
  return (
    typeof item === 'object' &&
    item !== null &&
    'type' in item &&
    typeof (
      item as {
        type: unknown;
      }
    ).type === 'string'
  );
}
