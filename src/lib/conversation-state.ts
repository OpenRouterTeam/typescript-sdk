import type * as models from '../models/index.js';
import type {
  ConversationState,
  ParsedToolCall,
  Tool,
  TurnContext,
  UnsentToolResult,
} from './tool-types.js';
import { normalizeInputToArray } from './turn-context.js';

/**
 * Type guard to verify an object is a valid UnsentToolResult
 */
function isValidUnsentToolResult<TTools extends readonly Tool[]>(
  obj: unknown
): obj is UnsentToolResult<TTools> {
  if (typeof obj !== 'object' || obj === null) return false;
  const candidate = obj as Record<string, unknown>;
  return (
    typeof candidate['callId'] === 'string' &&
    typeof candidate['name'] === 'string' &&
    'output' in candidate
  );
}

/**
 * Type guard to verify an object is a valid ParsedToolCall
 */
function isValidParsedToolCall<TTools extends readonly Tool[]>(
  obj: unknown
): obj is ParsedToolCall<TTools[number]> {
  if (typeof obj !== 'object' || obj === null) return false;
  const candidate = obj as Record<string, unknown>;
  return (
    typeof candidate['id'] === 'string' &&
    typeof candidate['name'] === 'string' &&
    'arguments' in candidate
  );
}

/**
 * Generate a unique ID for a conversation
 * Uses crypto.randomUUID if available, falls back to timestamp + random
 */
export function generateConversationId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `conv_${crypto.randomUUID()}`;
  }
  // Fallback for environments without crypto.randomUUID
  return `conv_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

/**
 * Create an initial conversation state
 * @param id - Optional custom ID, generates one if not provided
 */
export function createInitialState<TTools extends readonly Tool[] = readonly Tool[]>(
  id?: string
): ConversationState<TTools> {
  const now = Date.now();
  return {
    id: id ?? generateConversationId(),
    messages: [],
    status: 'in_progress',
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Update a conversation state with new values
 * Automatically updates the updatedAt timestamp
 */
export function updateState<TTools extends readonly Tool[] = readonly Tool[]>(
  state: ConversationState<TTools>,
  updates: Partial<Omit<ConversationState<TTools>, 'id' | 'createdAt' | 'updatedAt'>>
): ConversationState<TTools> {
  return {
    ...state,
    ...updates,
    updatedAt: Date.now(),
  };
}

/**
 * Append new items to the message history
 */
export function appendToMessages(
  current: models.OpenResponsesInput,
  newItems: models.OpenResponsesInput1[]
): models.OpenResponsesInput {
  const currentArray = normalizeInputToArray(current);
  return [...currentArray, ...newItems];
}

/**
 * Check if a tool call requires approval
 * @param toolCall - The tool call to check
 * @param tools - Available tools
 * @param context - Turn context for the approval check
 * @param callLevelCheck - Optional call-level approval function (overrides tool-level), can be async
 */
export async function toolRequiresApproval<TTools extends readonly Tool[]>(
  toolCall: ParsedToolCall<TTools[number]>,
  tools: TTools,
  context: TurnContext,
  callLevelCheck?: (toolCall: ParsedToolCall<TTools[number]>, context: TurnContext) => boolean | Promise<boolean>
): Promise<boolean> {
  // Call-level check takes precedence
  if (callLevelCheck) {
    return callLevelCheck(toolCall, context);
  }

  // Fall back to tool-level setting
  const tool = tools.find(t => t.function.name === toolCall.name);
  if (!tool) return false;

  const requireApproval = tool.function.requireApproval;

  // If it's a function, call it with the tool's arguments and context
  if (typeof requireApproval === 'function') {
    return requireApproval(toolCall.arguments, context);
  }

  // Otherwise treat as boolean
  return requireApproval ?? false;
}

/**
 * Partition tool calls into those requiring approval and those that can auto-execute
 * @param toolCalls - Tool calls to partition
 * @param tools - Available tools
 * @param context - Turn context for the approval check
 * @param callLevelCheck - Optional call-level approval function (overrides tool-level), can be async
 */
export async function partitionToolCalls<TTools extends readonly Tool[]>(
  toolCalls: ParsedToolCall<TTools[number]>[],
  tools: TTools,
  context: TurnContext,
  callLevelCheck?: (toolCall: ParsedToolCall<TTools[number]>, context: TurnContext) => boolean | Promise<boolean>
): Promise<{
  requiresApproval: ParsedToolCall<TTools[number]>[];
  autoExecute: ParsedToolCall<TTools[number]>[];
}> {
  const requiresApproval: ParsedToolCall<TTools[number]>[] = [];
  const autoExecute: ParsedToolCall<TTools[number]>[] = [];

  for (const tc of toolCalls) {
    if (await toolRequiresApproval(tc, tools, context, callLevelCheck)) {
      requiresApproval.push(tc);
    } else {
      autoExecute.push(tc);
    }
  }

  return { requiresApproval, autoExecute };
}

/**
 * Create an unsent tool result from a successful execution
 */
export function createUnsentResult<TTools extends readonly Tool[] = readonly Tool[]>(
  callId: string,
  name: string,
  output: unknown
): UnsentToolResult<TTools> {
  const result = { callId, name, output };
  if (!isValidUnsentToolResult<TTools>(result)) {
    throw new Error('Invalid UnsentToolResult structure');
  }
  return result;
}

/**
 * Create an unsent tool result from a rejection
 */
export function createRejectedResult<TTools extends readonly Tool[] = readonly Tool[]>(
  callId: string,
  name: string,
  reason?: string
): UnsentToolResult<TTools> {
  const result = {
    callId,
    name,
    output: null,
    error: reason ?? 'Tool call rejected by user',
  };
  if (!isValidUnsentToolResult<TTools>(result)) {
    throw new Error('Invalid UnsentToolResult structure');
  }
  return result;
}

/**
 * Convert unsent tool results to API format for sending to the model
 */
export function unsentResultsToAPIFormat(
  results: UnsentToolResult[]
): models.OpenResponsesFunctionCallOutput[] {
  return results.map(r => ({
    type: 'function_call_output' as const,
    id: `output_${r.callId}`,
    callId: r.callId,
    output: r.error
      ? JSON.stringify({ error: r.error })
      : JSON.stringify(r.output),
  }));
}

/**
 * Extract text content from a response
 */
export function extractTextFromResponse(
  response: models.OpenResponsesNonStreamingResponse
): string {
  if (!response.output) {
    return '';
  }

  const outputs = Array.isArray(response.output) ? response.output : [response.output];
  const textParts: string[] = [];

  for (const item of outputs) {
    if (item.type === 'message' && item.content) {
      for (const content of item.content) {
        if (content.type === 'output_text' && content.text) {
          textParts.push(content.text);
        }
      }
    }
  }

  return textParts.join('');
}

/**
 * Extract tool calls from a response
 */
export function extractToolCallsFromResponse<TTools extends readonly Tool[]>(
  response: models.OpenResponsesNonStreamingResponse
): ParsedToolCall<TTools[number]>[] {
  if (!response.output) {
    return [];
  }

  const outputs = Array.isArray(response.output) ? response.output : [response.output];
  const toolCalls: ParsedToolCall<TTools[number]>[] = [];

  for (const item of outputs) {
    if (item.type === 'function_call') {
      let parsedArguments: unknown;
      if (typeof item.arguments === 'string') {
        try {
          parsedArguments = JSON.parse(item.arguments);
        } catch (error) {
          // Log warning and skip malformed tool call, similar to stream-transformers.ts
          console.warn(
            `Failed to parse arguments for tool call "${item.name}": ${error instanceof Error ? error.message : String(error)}`
          );
          continue;
        }
      } else {
        parsedArguments = item.arguments;
      }

      const toolCall = {
        id: item.callId ?? item.id ?? '',
        name: item.name ?? '',
        arguments: parsedArguments,
      };
      if (!isValidParsedToolCall<TTools>(toolCall)) {
        throw new Error(`Invalid tool call structure for tool: ${item.name}`);
      }
      toolCalls.push(toolCall);
    }
  }

  return toolCalls;
}
