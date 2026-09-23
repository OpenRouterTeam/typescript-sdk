import type { FileCitation } from '../models/filecitation.js';
import type { FilePath } from '../models/filepath.js';
import type { FunctionCallArgsDeltaEvent } from '../models/functioncallargsdeltaevent.js';
import type { FunctionCallArgsDoneEvent } from '../models/functioncallargsdoneevent.js';
import type { OpenAIResponsesRefusalContent } from '../models/openairesponsesrefusalcontent.js';
import type { OutputFileSearchCallItem } from '../models/outputfilesearchcallitem.js';
import type { OutputFunctionCallItem } from '../models/outputfunctioncallitem.js';
import type { OutputImageGenerationCallItem } from '../models/outputimagegenerationcallitem.js';
import type { OutputMessage } from '../models/outputmessage.js';
import type { OutputReasoningItem } from '../models/outputreasoningitem.js';
import type { OutputWebSearchCallItem } from '../models/outputwebsearchcallitem.js';
import type { ReasoningDeltaEvent } from '../models/reasoningdeltaevent.js';
import type { ResponseOutputText } from '../models/responseoutputtext.js';
import type { StreamEvents } from '../models/streamevents.js';
import type { StreamEventsResponseCompleted } from '../models/streameventsresponsecompleted.js';
import type { StreamEventsResponseFailed } from '../models/streameventsresponsefailed.js';
import type { StreamEventsResponseIncomplete } from '../models/streameventsresponseincomplete.js';
import type { StreamEventsResponseOutputItemAdded } from '../models/streameventsresponseoutputitemadded.js';
import type { StreamEventsResponseOutputItemDone } from '../models/streameventsresponseoutputitemdone.js';
import type { TextDeltaEvent } from '../models/textdeltaevent.js';
import type { URLCitation } from '../models/urlcitation.js';

/**
 * Type guards for OpenResponses stream events
 * These enable proper TypeScript narrowing without type casts
 */

// Stream event type guards

export function isOutputTextDeltaEvent(
  event: StreamEvents,
): event is TextDeltaEvent {
  return 'type' in event && event.type === 'response.output_text.delta';
}

export function isReasoningDeltaEvent(
  event: StreamEvents,
): event is ReasoningDeltaEvent {
  return 'type' in event && event.type === 'response.reasoning_text.delta';
}

export function isFunctionCallArgumentsDeltaEvent(
  event: StreamEvents,
): event is FunctionCallArgsDeltaEvent {
  return 'type' in event && event.type === 'response.function_call_arguments.delta';
}

export function isOutputItemAddedEvent(
  event: StreamEvents,
): event is StreamEventsResponseOutputItemAdded {
  return 'type' in event && event.type === 'response.output_item.added';
}

export function isOutputItemDoneEvent(
  event: StreamEvents,
): event is StreamEventsResponseOutputItemDone {
  return 'type' in event && event.type === 'response.output_item.done';
}

export function isResponseCompletedEvent(
  event: StreamEvents,
): event is StreamEventsResponseCompleted {
  return 'type' in event && event.type === 'response.completed';
}

export function isResponseFailedEvent(
  event: StreamEvents,
): event is StreamEventsResponseFailed {
  return 'type' in event && event.type === 'response.failed';
}

export function isResponseIncompleteEvent(
  event: StreamEvents,
): event is StreamEventsResponseIncomplete {
  return 'type' in event && event.type === 'response.incomplete';
}

export function isFunctionCallArgumentsDoneEvent(
  event: StreamEvents,
): event is FunctionCallArgsDoneEvent {
  return 'type' in event && event.type === 'response.function_call_arguments.done';
}

// Output item type guards

export function isOutputMessage(item: unknown): item is OutputMessage {
  return typeof item === 'object' && item !== null && 'type' in item && item.type === 'message';
}

export function isFunctionCallItem(item: unknown): item is OutputFunctionCallItem {
  return (
    typeof item === 'object' && item !== null && 'type' in item && item.type === 'function_call'
  );
}

export function isReasoningOutputItem(item: unknown): item is OutputReasoningItem {
  return typeof item === 'object' && item !== null && 'type' in item && item.type === 'reasoning';
}

export function isWebSearchCallOutputItem(
  item: unknown,
): item is OutputWebSearchCallItem {
  return (
    typeof item === 'object' && item !== null && 'type' in item && item.type === 'web_search_call'
  );
}

export function isFileSearchCallOutputItem(
  item: unknown,
): item is OutputFileSearchCallItem {
  return (
    typeof item === 'object' && item !== null && 'type' in item && item.type === 'file_search_call'
  );
}

export function isImageGenerationCallOutputItem(
  item: unknown,
): item is OutputImageGenerationCallItem {
  return (
    typeof item === 'object' &&
    item !== null &&
    'type' in item &&
    item.type === 'image_generation_call'
  );
}

// Content part type guards

export function isOutputTextPart(part: unknown): part is ResponseOutputText {
  return typeof part === 'object' && part !== null && 'type' in part && part.type === 'output_text';
}

export function isRefusalPart(part: unknown): part is OpenAIResponsesRefusalContent {
  return typeof part === 'object' && part !== null && 'type' in part && part.type === 'refusal';
}

// Annotation type guards for Claude conversion

export function isFileCitationAnnotation(annotation: unknown): annotation is FileCitation {
  return (
    typeof annotation === 'object' &&
    annotation !== null &&
    'type' in annotation &&
    annotation.type === 'file_citation'
  );
}

export function isURLCitationAnnotation(annotation: unknown): annotation is URLCitation {
  return (
    typeof annotation === 'object' &&
    annotation !== null &&
    'type' in annotation &&
    annotation.type === 'url_citation'
  );
}

export function isFilePathAnnotation(annotation: unknown): annotation is FilePath {
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
