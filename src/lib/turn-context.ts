import * as models from '../models/index.js';
import type { TurnContext } from './tool-types.js';

/**
 * Options for building a turn context
 */
export interface BuildTurnContextOptions {
  /** Number of turns so far (1-indexed) */
  numberOfTurns: number;
  /** Current message history */
  messageHistory: models.OpenResponsesInput;
  /** Current model (if set) */
  model?: string | undefined;
  /** Current models array (if set) */
  models?: string[] | undefined;
}

/**
 * Build a turn context for tool execution
 *
 * @param options - Options for building the context
 * @returns A TurnContext object
 *
 * @example
 * ```typescript
 * const context = buildTurnContext({
 *   numberOfTurns: 1,
 *   messageHistory: input,
 *   model: 'anthropic/claude-3-sonnet',
 * });
 * ```
 */
export function buildTurnContext(options: BuildTurnContextOptions): TurnContext {
  return {
    numberOfTurns: options.numberOfTurns,
    input: options.messageHistory,
    model: options.model,
    models: options.models,
  };
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
