import type * as models from '../models/index.js';
import type { StopWhen, Tool, TurnContext } from './tool-types.js';

/**
 * Type-safe Object.fromEntries that preserves key-value type relationships
 */
const typeSafeObjectFromEntries = <
  const T extends ReadonlyArray<readonly [PropertyKey, unknown]>
>(
  entries: T
): { [K in T[number] as K[0]]: K[1] } => {
  return Object.fromEntries(entries) as { [K in T[number] as K[0]]: K[1] };
};

/**
 * A field can be either a value of type T or a function that computes T
 */
export type FieldOrAsyncFunction<T> = T | ((context: TurnContext) => T | Promise<T>);

/**
 * Input type for callModel function
 * Each field can independently be a static value or a function that computes the value
 * Generic over TOOLS to enable proper type inference for stopWhen conditions
 */
export type CallModelInput<TOOLS extends readonly Tool[] = readonly Tool[]> = {
  [K in keyof Omit<models.OpenResponsesRequest, 'stream' | 'tools'>]?: FieldOrAsyncFunction<
    models.OpenResponsesRequest[K]
  >;
} & {
  tools?: TOOLS;
  stopWhen?: StopWhen<TOOLS>;
};

/**
 * Resolved CallModelInput (all functions evaluated to values)
 * This is the type after all async functions have been resolved to their values
 */
export type ResolvedCallModelInput = Omit<models.OpenResponsesRequest, 'stream' | 'tools'> & {
  tools?: never;
};

/**
 * Resolve all async functions in CallModelInput to their values
 *
 * @param input - Input with possible functions
 * @param context - Turn context for function execution
 * @returns Resolved input with all values (no functions)
 *
 * @example
 * ```typescript
 * const resolved = await resolveAsyncFunctions(
 *   {
 *     model: 'gpt-4',
 *     temperature: (ctx) => ctx.numberOfTurns * 0.1,
 *     input: 'Hello',
 *   },
 *   { numberOfTurns: 2, messageHistory: [] }
 * );
 * // resolved.temperature === 0.2
 * ```
 */
export async function resolveAsyncFunctions(
  input: CallModelInput,
  context: TurnContext,
): Promise<ResolvedCallModelInput> {
  // Build array of resolved entries
  const resolvedEntries: Array<readonly [string, unknown]> = [];

  // Iterate over all keys in the input
  for (const [key, value] of Object.entries(input)) {
    // Skip stopWhen and tools - they're handled separately
    if (key === 'stopWhen' || key === 'tools') {
      continue;
    }

    if (typeof value === 'function') {
      try {
        // Execute the function with context and store the result
        // We've already filtered out stopWhen at line 73, so this is a parameter function
        // that accepts TurnContext (not a StopCondition which needs steps)
        const fn = value as (context: TurnContext) => unknown | Promise<unknown>;
        const result = await Promise.resolve(fn(context));
        resolvedEntries.push([key, result] as const);
      } catch (error) {
        // Wrap errors with context about which field failed
        throw new Error(
          `Failed to resolve async function for field "${key}": ${error instanceof Error ? error.message : String(error)
          }`,
        );
      }
    } else {
      // Not a function, use as-is
      resolvedEntries.push([key, value] as const);
    }
  }

  // Use type-safe fromEntries - the result type is inferred from the entries
  // TypeScript can't prove that dynamic keys match the static type at compile time,
  // but we know all keys come from the input object (minus stopWhen/tools)
  // and all values are properly resolved through the function above
  return typeSafeObjectFromEntries(resolvedEntries) as ResolvedCallModelInput;
}

/**
 * Check if input has any async functions that need resolution
 *
 * @param input - Input to check
 * @returns True if any field is a function
 */
export function hasAsyncFunctions(input: unknown): boolean {
  if (!input || typeof input !== 'object') {
    return false;
  }
  return Object.values(input).some((value) => typeof value === 'function');
}
