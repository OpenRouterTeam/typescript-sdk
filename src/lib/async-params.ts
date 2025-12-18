import type { CallModelInput } from '../funcs/call-model.js';
import type { TurnContext } from './tool-types.js';

/**
 * A field can be either a value of type T or a function that computes T
 */
export type FieldOrAsyncFunction<T> = T | ((context: TurnContext) => T | Promise<T>);

/**
 * CallModelInput with async function support for API parameter fields
 * Excludes tools and maxToolRounds which should not be dynamic
 */
export type AsyncCallModelInput = {
  [K in keyof Omit<CallModelInput, 'tools' | 'maxToolRounds'>]: FieldOrAsyncFunction<
    CallModelInput[K]
  >;
} & {
  tools?: CallModelInput['tools'];
  maxToolRounds?: CallModelInput['maxToolRounds'];
};

/**
 * Resolved AsyncCallModelInput (all functions evaluated to values)
 * This strips out the function types, leaving only the resolved value types
 */
export type ResolvedAsyncCallModelInput = Omit<CallModelInput, 'tools' | 'maxToolRounds'> & {
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
  input: AsyncCallModelInput,
  context: TurnContext,
): Promise<ResolvedAsyncCallModelInput> {
  const resolved: Record<string, unknown> = {};

  // Iterate over all keys in the input
  for (const [key, value] of Object.entries(input)) {
    if (typeof value === 'function') {
      try {
        // Execute the function with context
        resolved[key] = await Promise.resolve(value(context));
      } catch (error) {
        // Wrap errors with context about which field failed
        throw new Error(
          `Failed to resolve async function for field "${key}": ${
            error instanceof Error ? error.message : String(error)
          }`,
        );
      }
    } else {
      // Not a function, use as-is
      resolved[key] = value;
    }
  }

  return resolved as ResolvedAsyncCallModelInput;
}

/**
 * Check if input has any async functions that need resolution
 *
 * @param input - Input to check
 * @returns True if any field is a function
 */
export function hasAsyncFunctions(input: any): boolean {
  if (!input || typeof input !== 'object') {
    return false;
  }
  return Object.values(input).some((value) => typeof value === 'function');
}
