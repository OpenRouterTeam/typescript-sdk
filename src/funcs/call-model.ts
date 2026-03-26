import type { $ZodObject, $ZodShape, infer as zodInfer } from 'zod/v4/core';
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
 * **Context:**
 *
 * Tools can declare a `contextSchema` to receive typed context data.
 * The `context` parameter on callModel is typed as the intersection of all tool schemas:
 *
 * @example
 * ```typescript
 * const result = callModel(client, {
 *   model: 'gpt-4',
 *   input: 'Hello',
 *   tools: [weatherTool, dbTool] as const,
 *   context: {
 *     get_weather: { apiKey: 'sk-...' },
 *     db_query: { dbUrl: 'postgres://...' },
 *   },
 * });
 * ```
 *
 * Context can also be a function or async function:
 * ```typescript
 * context: (turn) => ({
 *   get_weather: { apiKey: turn.numberOfTurns > 1 ? refreshedKey : initialKey },
 * })
 * ```
 *
 * **Stop Conditions:**
 *
 * Control when tool execution stops using the `stopWhen` parameter:
 *
 * @example
 * ```typescript
 * stopWhen: stepCountIs(3)
 * stopWhen: [stepCountIs(10), maxCost(0.50), hasToolCall('finalize')]
 * ```
 *
 * Default: `stepCountIs(5)` if not specified
 */
export function callModel<
  TTools extends readonly Tool[],
  TSharedSchema extends $ZodObject<$ZodShape> | undefined = undefined,
  TShared extends Record<string, unknown> = TSharedSchema extends $ZodObject<$ZodShape> ? zodInfer<TSharedSchema> : Record<string, never>,
>(
  client: OpenRouterCore,
  request: CallModelInput<TTools, TShared> & { sharedContextSchema?: TSharedSchema },
  options?: RequestOptions,
): ModelResult<TTools, TShared> {
  // Destructure state management options along with tools and stopWhen
  const {
    tools,
    stopWhen,
    state,
    requireApproval,
    approveToolCalls,
    rejectToolCalls,
    context,
    sharedContextSchema,
    onTurnStart,
    onTurnEnd,
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

  // Inject x-openrouter-callmodel header into every callModel request
  const callModelOptions: RequestOptions = {
    ...options,
    headers: {
      ...Object.fromEntries(new Headers(options?.headers ?? options?.fetchOptions?.headers ?? undefined)),
      'x-openrouter-callmodel': 'true',
    },
  };

  return new ModelResult<TTools, TShared>({
    client,
    request: finalRequest,
    options: callModelOptions,
    tools,
    ...(stopWhen !== undefined && { stopWhen }),
    // Pass state management options
    ...(state !== undefined && { state }),
    ...(requireApproval !== undefined && { requireApproval }),
    ...(approveToolCalls !== undefined && { approveToolCalls }),
    ...(rejectToolCalls !== undefined && { rejectToolCalls }),
    ...(context !== undefined && { context }),
    ...(sharedContextSchema !== undefined && { sharedContextSchema }),
    ...(onTurnStart !== undefined && { onTurnStart }),
    ...(onTurnEnd !== undefined && { onTurnEnd }),
  } as GetResponseOptions<TTools, TShared>);
}
