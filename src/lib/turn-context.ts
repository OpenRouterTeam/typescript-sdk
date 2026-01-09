import * as models from '../models/index.js';
import type { TurnContext } from './tool-types.js';

/**
 * Options for building a turn context
 */
export interface BuildTurnContextOptions {
  /** Number of turns so far (1-indexed for tool execution, 0 for initial request) */
  numberOfTurns: number;
  /** The specific tool call being executed (optional for initial/async resolution contexts) */
  toolCall?: models.OpenResponsesFunctionToolCall;
  /** The full request being sent to the API (optional for initial/async resolution contexts) */
  turnRequest?: models.OpenResponsesRequest;
}

/**
 * Build a turn context for tool execution or async parameter resolution
 *
 * @param options - Options for building the context
 * @returns A TurnContext object
 *
 * @example
 * ```typescript
 * // For tool execution with full context
 * const context = buildTurnContext({
 *   numberOfTurns: 1,
 *   toolCall: rawToolCall,
 *   turnRequest: currentRequest,
 * });
 *
 * // For async parameter resolution (partial context)
 * const context = buildTurnContext({
 *   numberOfTurns: 0,
 * });
 * ```
 */
export function buildTurnContext(options: BuildTurnContextOptions): TurnContext {
  const context: TurnContext = {
    numberOfTurns: options.numberOfTurns,
  };

  if (options.toolCall !== undefined) {
    context.toolCall = options.toolCall;
  }

  if (options.turnRequest !== undefined) {
    context.turnRequest = options.turnRequest;
  }

  return context;
}

/**
 * Normalize OpenResponsesInput to an array format
 * Converts string input to array with single user message
 *
 * @param input - The input to normalize
 * @returns Array format of the input
 *
 * @example
 * ```typescript
 * const arrayInput = normalizeInputToArray("Hello!");
 * // Returns: [{ role: "user", content: "Hello!" }]
 * ```
 */
export function normalizeInputToArray(
  input: models.OpenResponsesInput
): Array<models.OpenResponsesInput1> {
  if (typeof input === 'string') {
    // Construct object with all required fields - type is optional
    const message: models.OpenResponsesEasyInputMessage = {
      role: models.OpenResponsesEasyInputMessageRoleUser.User,
      content: input,
    };
    return [message];
  }
  return input;
}
