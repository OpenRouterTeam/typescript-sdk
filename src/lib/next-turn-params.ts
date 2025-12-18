import type * as models from '../models/index.js';
import type { NextTurnParamsContext, ParsedToolCall, Tool } from './tool-types.js';

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
    topK: request.topK ?? 0,
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
  toolCalls: ParsedToolCall[],
  tools: Tool[],
  currentRequest: models.OpenResponsesRequest
): Promise<Partial<NextTurnParamsContext>> {
  // Build initial context from current request
  const context = buildNextTurnParamsContext(currentRequest);

  // Group tool calls by parameter they modify
  const paramFunctions = new Map<
    keyof NextTurnParamsContext,
    Array<{ params: unknown; fn: Function }>
  >();

  // Collect all nextTurnParams functions from tools (in tools array order)
  for (const tool of tools) {
    if (!tool.function.nextTurnParams) continue;

    // Find tool calls for this tool
    const callsForTool = toolCalls.filter(tc => tc.name === tool.function.name);

    for (const call of callsForTool) {
      // For each parameter function in this tool's nextTurnParams
      for (const [paramKey, fn] of Object.entries(tool.function.nextTurnParams)) {
        if (!paramFunctions.has(paramKey as keyof NextTurnParamsContext)) {
          paramFunctions.set(paramKey as keyof NextTurnParamsContext, []);
        }
        paramFunctions.get(paramKey as keyof NextTurnParamsContext)!.push({
          params: call.arguments,
          fn,
        });
      }
    }
  }

  // Compose and execute functions for each parameter
  const result: Partial<NextTurnParamsContext> = {};
  let workingContext = { ...context };

  for (const [paramKey, functions] of paramFunctions.entries()) {
    // Compose all functions for this parameter
    let currentValue = workingContext[paramKey];

    for (const { params, fn } of functions) {
      // Update context with current value
      workingContext = { ...workingContext, [paramKey]: currentValue };

      // Execute function with composition
      currentValue = await Promise.resolve(fn(params, workingContext));
    }

    // TypeScript can't infer that paramKey corresponds to the correct value type
    // so we use a type assertion here
    (result as any)[paramKey] = currentValue;
  }

  return result;
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
