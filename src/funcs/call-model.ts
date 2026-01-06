import type { OpenRouterCore } from '../core.js';
import type { CallModelInput } from '../lib/async-params.js';
import type { RequestOptions } from '../lib/sdks.js';
import type { Tool } from '../lib/tool-types.js';

import { ModelResult, type GetResponseOptions } from '../lib/model-result.js';
import { convertToolsToAPIFormat } from '../lib/tool-executor.js';

// Re-export CallModelInput for convenience
export type { CallModelInput } from '../lib/async-params.js';

/**
 * Get a response with multiple consumption patterns
 *
 * @remarks
 * Creates a response using the OpenResponses API and returns
 * a wrapper that allows consuming the response in multiple ways:
 *
 * - `await response.getText()` - Get just the text content (tools auto-executed)
 * - `await response.getResponse()` - Get full response with usage data (inputTokens, cachedTokens, etc.)
 * - `for await (const delta of response.getTextStream())` - Stream text deltas
 * - `for await (const delta of response.getReasoningStream())` - Stream reasoning deltas
 * - `for await (const event of response.getToolStream())` - Stream tool events (incl. preliminary results)
 * - `for await (const toolCall of response.getToolCallsStream())` - Stream structured tool calls
 * - `await response.getToolCalls()` - Get all tool calls from completed response
 * - `for await (const msg of response.getNewMessagesStream())` - Stream incremental message updates
 * - `for await (const event of response.getFullResponsesStream())` - Stream all events (incl. tool preliminary)
 *
 * All consumption patterns can be used concurrently on the same response.
 *
 * For message format conversion, use the helper functions:
 * - `fromChatMessages()` / `toChatMessage()` for OpenAI chat format
 * - `fromClaudeMessages()` / `toClaudeMessage()` for Anthropic Claude format
 *
 * **Async Function Support:**
 *
 * Any field in CallModelInput can be a function that computes the value dynamically
 * based on the conversation context. You can mix static values and functions in the
 * same request. Functions are resolved before EVERY turn, allowing parameters to
 * adapt as the conversation progresses.
 *
 * @example
 * ```typescript
 * // Mix static and dynamic values
 * const result = callModel(client, {
 *   model: 'gpt-4',  // static
 *   temperature: (ctx) => Math.min(ctx.numberOfTurns * 0.2, 1.0),  // dynamic
 *   input: [{ type: 'text', text: 'Hello' }],  // static
 * });
 * ```
 *
 * @example
 * ```typescript
 * // Switch models based on conversation length
 * const result = callModel(client, {
 *   model: (ctx) => ctx.numberOfTurns > 3 ? 'gpt-4' : 'gpt-3.5-turbo',
 *   input: [{ type: 'text', text: 'Complex question' }],
 * });
 * ```
 *
 * @example
 * ```typescript
 * // Use async functions to fetch dynamic values
 * const result = callModel(client, {
 *   model: 'gpt-4',
 *   instructions: async (ctx) => {
 *     const userPrefs = await fetchUserPreferences();
 *     return `You are a helpful assistant. User preferences: ${userPrefs}`;
 *   },
 *   input: [{ type: 'text', text: 'Help me' }],
 * });
 * ```
 *
 * Async functions receive `TurnContext` with:
 * - `numberOfTurns`: Current turn number (0-indexed, 0 = initial request)
 * - `messageHistory`: Current conversation messages
 * - `model`: Current model selection (if set)
 * - `models`: Current models array (if set)
 *
 * **Execution Order:**
 * Functions are resolved at the START of each turn in this order:
 * 1. Async functions (parallel resolution)
 * 2. Tool execution (if tools called by model)
 * 3. nextTurnParams functions (if defined on tools)
 * 4. API request with resolved values
 *
 * **Stop Conditions:**
 *
 * Control when tool execution stops using the `stopWhen` parameter:
 *
 * @example
 * ```typescript
 * // Stop after 3 steps
 * stopWhen: stepCountIs(3)
 *
 * // Stop when a specific tool is called
 * stopWhen: hasToolCall('finalizeResults')
 *
 * // Multiple conditions (OR logic - stops if ANY is true)
 * stopWhen: [
 *   stepCountIs(10),        // Safety: max 10 steps
 *   maxCost(0.50),          // Budget: max $0.50
 *   hasToolCall('finalize') // Logic: stop when finalize called
 * ]
 *
 * // Custom condition with full step history
 * stopWhen: ({ steps }) => {
 *   const totalCalls = steps.reduce((sum, s) => sum + s.toolCalls.length, 0);
 *   return totalCalls >= 20; // Stop after 20 total tool calls
 * }
 * ```
 *
 * Available helper functions:
 * - `stepCountIs(n)` - Stop after n steps
 * - `hasToolCall(name)` - Stop when tool is called
 * - `maxTokensUsed(n)` - Stop when token usage exceeds n
 * - `maxCost(n)` - Stop when cost exceeds n dollars
 * - `finishReasonIs(reason)` - Stop on specific finish reason
 *
 * Default: `stepCountIs(5)` if not specified
 */
export function callModel<TTools extends readonly Tool[]>(
  client: OpenRouterCore,
  request: CallModelInput<TTools>,
  options?: RequestOptions,
): ModelResult<TTools> {
  // Destructure state management options along with tools and stopWhen
  const {
    tools,
    stopWhen,
    state,
    requireApproval,
    approveToolCalls,
    rejectToolCalls,
    ...apiRequest
  } = request;

  // Convert tools to API format - no cast needed now that convertToolsToAPIFormat accepts readonly
  const apiTools = tools ? convertToolsToAPIFormat(tools) : undefined;

  // Build the request with converted tools
  // Note: async functions are resolved later in ModelResult.executeToolsIfNeeded()
  // The request can have async fields (functions) or sync fields, and the tools are converted to API format
  const finalRequest: Record<string, unknown> = {
    ...apiRequest,
  };

  if (apiTools !== undefined) {
    finalRequest['tools'] = apiTools;
  }

  return new ModelResult<TTools>({
    client,
    request: finalRequest,
    options: options ?? {},
    tools,
    ...(stopWhen !== undefined && { stopWhen }),
    // Pass state management options
    ...(state !== undefined && { state }),
    ...(requireApproval !== undefined && { requireApproval }),
    ...(approveToolCalls !== undefined && { approveToolCalls }),
    ...(rejectToolCalls !== undefined && { rejectToolCalls }),
  } as GetResponseOptions<TTools>);
}
