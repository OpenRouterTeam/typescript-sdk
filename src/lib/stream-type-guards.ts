import type * as models from '../models/index.js';

/**
 * Type guards for OpenResponses stream events
 * These enable proper TypeScript narrowing without type casts
 */

// Stream event type guards

export function isOutputTextDeltaEvent(
  event: models.OpenResponsesStreamEvent,
): event is models.OpenResponsesStreamEventResponseOutputTextDelta {
  return 'type' in event && event.type === 'response.output_text.delta';
}

export function isReasoningDeltaEvent(
  event: models.OpenResponsesStreamEvent,
): event is models.OpenResponsesReasoningDeltaEvent {
  return 'type' in event && event.type === 'response.reasoning_text.delta';
}

export function isFunctionCallArgumentsDeltaEvent(
  event: models.OpenResponsesStreamEvent,
): event is models.OpenResponsesStreamEventResponseFunctionCallArgumentsDelta {
  return 'type' in event && event.type === 'response.function_call_arguments.delta';
}

export function isOutputItemAddedEvent(
  event: models.OpenResponsesStreamEvent,
): event is models.OpenResponsesStreamEventResponseOutputItemAdded {
  return 'type' in event && event.type === 'response.output_item.added';
}

export function isOutputItemDoneEvent(
  event: models.OpenResponsesStreamEvent,
): event is models.OpenResponsesStreamEventResponseOutputItemDone {
  return 'type' in event && event.type === 'response.output_item.done';
}

export function isResponseCompletedEvent(
  event: models.OpenResponsesStreamEvent,
): event is models.OpenResponsesStreamEventResponseCompleted {
  return 'type' in event && event.type === 'response.completed';
}

export function isResponseFailedEvent(
  event: models.OpenResponsesStreamEvent,
): event is models.OpenResponsesStreamEventResponseFailed {
  return 'type' in event && event.type === 'response.failed';
}

export function isResponseIncompleteEvent(
  event: models.OpenResponsesStreamEvent,
): event is models.OpenResponsesStreamEventResponseIncomplete {
  return 'type' in event && event.type === 'response.incomplete';
}

export function isFunctionCallArgumentsDoneEvent(
  event: models.OpenResponsesStreamEvent,
): event is models.OpenResponsesStreamEventResponseFunctionCallArgumentsDone {
  return 'type' in event && event.type === 'response.function_call_arguments.done';
}

// Output item type guards

export function isOutputMessage(item: unknown): item is models.ResponsesOutputMessage {
  return typeof item === 'object' && item !== null && 'type' in item && item.type === 'message';
}

export function isFunctionCallItem(item: unknown): item is models.ResponsesOutputItemFunctionCall {
  return (
    typeof item === 'object' && item !== null && 'type' in item && item.type === 'function_call'
  );
}

export function isReasoningOutputItem(item: unknown): item is models.ResponsesOutputItemReasoning {
  return typeof item === 'object' && item !== null && 'type' in item && item.type === 'reasoning';
}

export function isWebSearchCallOutputItem(
  item: unknown,
): item is models.ResponsesWebSearchCallOutput {
  return (
    typeof item === 'object' && item !== null && 'type' in item && item.type === 'web_search_call'
  );
}

export function isFileSearchCallOutputItem(
  item: unknown,
): item is models.ResponsesOutputItemFileSearchCall {
  return (
    typeof item === 'object' && item !== null && 'type' in item && item.type === 'file_search_call'
  );
}

export function isImageGenerationCallOutputItem(
  item: unknown,
): item is models.ResponsesImageGenerationCall {
  return (
    typeof item === 'object' &&
    item !== null &&
    'type' in item &&
    item.type === 'image_generation_call'
  );
}

/*
 * Server tool output discrimination.
 *
 * The API schema constrains server tool output types to `openrouter:${string}`
 * (see ServerToolTypeSchema in response-output-items.ts, regex /^openrouter:/).
 * Speakeasy flattens this to `type: string` in the generated SDK, breaking
 * TypeScript's discriminated union narrowing. We use the prefix check here
 * to mirror the schema constraint — no manually maintained type list needed.
 */

/**
 * Type guard that identifies server tool outputs by the `openrouter:` prefix
 * on their `type` field. This mirrors the ServerToolTypeSchema constraint
 * (regex /^openrouter:/) from the API schema.
 */
export function isServerToolOutput(
  item: models.ResponsesOutputItem,
): item is models.ResponsesServerToolOutput {
  return item.type.startsWith('openrouter:');
}

// Content part type guards

export function isOutputTextPart(part: unknown): part is models.ResponseOutputText {
  return typeof part === 'object' && part !== null && 'type' in part && part.type === 'output_text';
}

export function isRefusalPart(part: unknown): part is models.OpenAIResponsesRefusalContent {
  return typeof part === 'object' && part !== null && 'type' in part && part.type === 'refusal';
}

// Annotation type guards for Claude conversion

export function isFileCitationAnnotation(annotation: unknown): annotation is models.FileCitation {
  return (
    typeof annotation === 'object' &&
    annotation !== null &&
    'type' in annotation &&
    annotation.type === 'file_citation'
  );
}

export function isURLCitationAnnotation(annotation: unknown): annotation is models.URLCitation {
  return (
    typeof annotation === 'object' &&
    annotation !== null &&
    'type' in annotation &&
    annotation.type === 'url_citation'
  );
}

export function isFilePathAnnotation(annotation: unknown): annotation is models.FilePath {
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
    typeof item === 'object' && item !== null && 'type' in item && typeof item.type === 'string'
  );
}
