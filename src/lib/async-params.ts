import type * as models from '../models/index.js';
import type { MaxToolRounds, Tool, TurnContext } from './tool-types.js';

/**
 * A field can be either a value of type T or a function that computes T
 */
export type FieldOrAsyncFunction<T> = T | ((context: TurnContext) => T | Promise<T>);

/**
 * Input type for callModel function
 * Each field can independently be a static value or a function that computes the value
 */
export type CallModelInput = {
  [K in keyof Omit<models.OpenResponsesRequest, 'stream' | 'tools'>]?:
    FieldOrAsyncFunction<models.OpenResponsesRequest[K]>;
} & {
  tools?: Tool[];
  maxToolRounds?: MaxToolRounds;
};

/**
 * Resolved CallModelInput (all functions evaluated to values)
 * This is the type after all async functions have been resolved to their values
 */
export type ResolvedCallModelInput = Omit<models.OpenResponsesRequest, 'stream' | 'tools'> & {
  tools?: never;
  maxToolRounds?: never;
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
  // Build the resolved object by processing each field
  const resolvedEntries: Array<[string, unknown]> = [];

  // Iterate over all keys in the input
  for (const [key, value] of Object.entries(input)) {
    if (typeof value === 'function') {
      try {
        // Execute the function with context and store the result
        const result = await Promise.resolve(value(context));
        resolvedEntries.push([key, result]);
      } catch (error) {
        // Wrap errors with context about which field failed
        throw new Error(
          `Failed to resolve async function for field "${key}": ${error instanceof Error ? error.message : String(error)
          }`,
        );
      }
    } else {
      // Not a function, use as-is
      resolvedEntries.push([key, value]);
    }
  }

  // Build the final object from entries
  // Type safety is ensured by the input type - each key in CallModelInput
  // corresponds to the same key in ResolvedCallModelInput with resolved type
  return Object.fromEntries(resolvedEntries) as ResolvedCallModelInput;
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
