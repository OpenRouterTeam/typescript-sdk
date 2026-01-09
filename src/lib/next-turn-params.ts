import type * as models from '../models/index.js';
import type { NextTurnParamsContext, ParsedToolCall, Tool } from './tool-types.js';

/**
 * Type guard to check if a value is a Record<string, unknown>
 */
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Build a NextTurnParamsContext from the current request
 * Extracts relevant fields that can be modified by nextTurnParams functions
 *
 * @param request - The current OpenResponsesRequest
 * @returns Context object with current parameter values
 */
export function buildNextTurnParamsContext(
  request: models.OpenResponsesRequest
): NextTurnParamsContext {
  return {
    input: request.input ?? [],
    model: request.model ?? '',
    models: request.models ?? [],
    temperature: request.temperature ?? null,
    maxOutputTokens: request.maxOutputTokens ?? null,
    topP: request.topP ?? null,
    topK: request.topK,
    instructions: request.instructions ?? null,
  };
}

/**
 * Execute nextTurnParams functions for all called tools
 * Composes functions when multiple tools modify the same parameter
 *
 * @param toolCalls - Tool calls that were executed in this turn
 * @param tools - All available tools
 * @param currentRequest - The current request
 * @returns Object with computed parameter values
 */
export async function executeNextTurnParamsFunctions(
  toolCalls: ParsedToolCall<Tool>[],
  tools: readonly Tool[],
  currentRequest: models.OpenResponsesRequest
): Promise<Partial<NextTurnParamsContext>> {
  // Build initial context from current request
  const context = buildNextTurnParamsContext(currentRequest);

  // Collect all nextTurnParams functions from tools (in tools array order)
  const result: Partial<NextTurnParamsContext> = {};
  const workingContext = { ...context };

  for (const tool of tools) {
    if (!tool.function.nextTurnParams) {
      continue;
    }

    // Find tool calls for this tool
    const callsForTool = toolCalls.filter(tc => tc.name === tool.function.name);

    for (const call of callsForTool) {
      // For each parameter function in this tool's nextTurnParams
      // We need to process each key individually to maintain type safety
      const nextParams = tool.function.nextTurnParams;

      // Validate that call.arguments is a record using type guard
      if (!isRecord(call.arguments)) {
        const typeStr = Array.isArray(call.arguments)
          ? 'array'
          : typeof call.arguments;
        throw new Error(
          `Tool call arguments for ${tool.function.name} must be an object, got ${typeStr}`
        );
      }

      // Process each parameter key with proper typing
      await processNextTurnParamsForCall(nextParams, call.arguments, workingContext, result, tool.function.name);
    }
  }

  return result;
}

/**
 * Process nextTurnParams for a single tool call with full type safety
 */
async function processNextTurnParamsForCall(
  nextParams: Record<string, unknown>,
  params: Record<string, unknown>,
  workingContext: NextTurnParamsContext,
  result: Partial<NextTurnParamsContext>,
  toolName: string
): Promise<void> {
  // Type-safe processing for each known parameter key
  // We iterate through keys and use runtime checks instead of casts
  for (const paramKey of Object.keys(nextParams)) {
    const fn = nextParams[paramKey];

    if (typeof fn !== 'function') {
      continue;
    }

    // Validate that paramKey is actually a key of NextTurnParamsContext
    if (!isValidNextTurnParamKey(paramKey)) {
      if (process.env['NODE_ENV'] !== 'production') {
        console.warn(
          `Invalid nextTurnParams key "${paramKey}" in tool "${toolName}". ` +
          `Valid keys: input, model, models, temperature, maxOutputTokens, topP, topK, instructions`
        );
      }
      continue;
    }

    // Execute the function and await the result
    const newValue = await Promise.resolve(fn(params, workingContext));

    // Update both result and workingContext to enable composition
    // Later tools will see modifications made by earlier tools
    setNextTurnParam(result, paramKey, newValue);
    setNextTurnParam(workingContext, paramKey, newValue);
  }
}

/**
 * Type guard to check if a string is a valid NextTurnParamsContext key
 */
function isValidNextTurnParamKey(key: string): key is keyof NextTurnParamsContext {
  const validKeys: ReadonlySet<string> = new Set([
    'input',
    'model',
    'models',
    'temperature',
    'maxOutputTokens',
    'topP',
    'topK',
    'instructions',
  ]);
  return validKeys.has(key);
}

/**
 * Type-safe setter for NextTurnParamsContext
 * This wrapper is needed because TypeScript doesn't properly narrow the type
 * after the type guard, even though we've validated the key
 */
function setNextTurnParam<K extends keyof NextTurnParamsContext>(
  target: Partial<NextTurnParamsContext>,
  key: K,
  value: NextTurnParamsContext[K]
): void {
  target[key] = value;
}

/**
 * Apply computed nextTurnParams to the current request
 * Returns a new request object with updated parameters
 *
 * @param request - The current request
 * @param computedParams - Computed parameter values from nextTurnParams functions
 * @returns New request with updated parameters
 */
export function applyNextTurnParamsToRequest(
  request: models.OpenResponsesRequest,
  computedParams: Partial<NextTurnParamsContext>
): models.OpenResponsesRequest {
  return {
    ...request,
    ...computedParams,
  };
}
