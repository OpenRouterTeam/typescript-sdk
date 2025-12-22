import type * as models from '../models/index.js';
import type { ParsedToolCall, StateAccessor, StopWhen, Tool, TurnContext } from './tool-types.js';

// Re-export Tool type for convenience
export type { Tool } from './tool-types.js';

/**
 * Type guard to check if a value is a parameter function
 * Parameter functions take TurnContext and return a value or promise
 */
function isParameterFunction(
  value: unknown
): value is (context: TurnContext) => unknown | Promise<unknown> {
  return typeof value === 'function';
}

/**
 * Build a resolved request object from entries
 * This validates the structure matches the expected ResolvedCallModelInput shape
 */
function buildResolvedRequest(
  entries: ReadonlyArray<readonly [string, unknown]>
): ResolvedCallModelInput {
  const obj = Object.fromEntries(entries);

  return obj satisfies ResolvedCallModelInput;
}

/**
 * A field can be either a value of type T or a function that computes T
 */
export type FieldOrAsyncFunction<T> = T | ((context: TurnContext) => T | Promise<T>);

/**
 * Base input type for callModel without approval-related fields
 */
type BaseCallModelInput<TTools extends readonly Tool[] = readonly Tool[]> = {
  [K in keyof Omit<models.OpenResponsesRequest, 'stream' | 'tools'>]?: FieldOrAsyncFunction<
    models.OpenResponsesRequest[K]
  >;
} & {
  tools?: TTools;
  stopWhen?: StopWhen<TTools>;
  /**
   * Call-level approval check - overrides tool-level requireApproval setting
   * Receives the tool call and turn context, can be sync or async
   */
  requireApproval?: (
    toolCall: ParsedToolCall<TTools[number]>,
    context: TurnContext
  ) => boolean | Promise<boolean>;
};

/**
 * Approval params when state is provided (allows approve/reject)
 */
type ApprovalParamsWithState<TTools extends readonly Tool[] = readonly Tool[]> = {
  /** State accessor for multi-turn persistence and approval gates */
  state: StateAccessor<TTools>;
  /** Tool call IDs to approve (for resuming from awaiting_approval status) */
  approveToolCalls?: string[];
  /** Tool call IDs to reject (for resuming from awaiting_approval status) */
  rejectToolCalls?: string[];
};

/**
 * Approval params when state is NOT provided (forbids approve/reject)
 */
type ApprovalParamsWithoutState = {
  /** State accessor for multi-turn persistence and approval gates */
  state?: undefined;
  /** Not allowed without state - will cause type error */
  approveToolCalls?: never;
  /** Not allowed without state - will cause type error */
  rejectToolCalls?: never;
};

/**
 * Input type for callModel function
 * Each field can independently be a static value or a function that computes the value
 * Generic over TTools to enable proper type inference for stopWhen conditions
 *
 * Type enforcement:
 * - `approveToolCalls` and `rejectToolCalls` are only valid when `state` is provided
 * - Using these without `state` will cause a TypeScript error
 */
export type CallModelInput<TTools extends readonly Tool[] = readonly Tool[]> =
  BaseCallModelInput<TTools> & (ApprovalParamsWithState<TTools> | ApprovalParamsWithoutState);

/**
 * CallModelInput variant that requires state - use when approval workflows are needed
 */
export type CallModelInputWithState<TTools extends readonly Tool[] = readonly Tool[]> =
  BaseCallModelInput<TTools> & ApprovalParamsWithState<TTools>;

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
export async function resolveAsyncFunctions<TTools extends readonly Tool[] = readonly Tool[]>(
  input: CallModelInput<TTools>,
  context: TurnContext,
): Promise<ResolvedCallModelInput> {
  // Build array of resolved entries
  const resolvedEntries: Array<readonly [string, unknown]> = [];

  // Iterate over all keys in the input
  for (const [key, value] of Object.entries(input)) {
    // Skip stopWhen - it's handled separately in ModelResult
    // Note: tools are already in API format at this point (converted in callModel()), so we include them
    if (key === 'stopWhen') {
      continue;
    }

    if (isParameterFunction(value)) {
      try {
        // Execute the function with context and store the result
        const result = await Promise.resolve(value(context));
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

  return buildResolvedRequest(resolvedEntries);
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
