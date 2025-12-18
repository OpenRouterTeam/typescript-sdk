import type { StepResult, StopCondition, Tool } from './tool-types.js';

/**
 * Stop condition that checks if step count equals or exceeds a specific number
 * @param stepCount - The number of steps to allow before stopping
 * @returns StopCondition that returns true when steps.length >= stepCount
 *
 * @example
 * ```typescript
 * stopWhen: stepCountIs(5) // Stop after 5 steps
 * ```
 */
export function stepCountIs(stepCount: number): StopCondition {
  return ({ steps }: { readonly steps: ReadonlyArray<StepResult> }) => steps.length >= stepCount;
}

/**
 * Stop condition that checks if any step contains a tool call with the given name
 * @param toolName - The name of the tool to check for
 * @returns StopCondition that returns true if the tool was called in any step
 *
 * @example
 * ```typescript
 * stopWhen: hasToolCall('search') // Stop when search tool is called
 * ```
 */
export function hasToolCall(toolName: string): StopCondition {
  return ({ steps }: { readonly steps: ReadonlyArray<StepResult> }) => {
    return steps.some((step: StepResult) =>
      step.toolCalls.some((call: { name: string }) => call.name === toolName),
    );
  };
}

/**
 * Evaluates an array of stop conditions
 * Returns true if ANY condition returns true (OR logic)
 * @param options - Object containing stopConditions and steps
 * @returns Promise<boolean> indicating if execution should stop
 *
 * @example
 * ```typescript
 * const shouldStop = await isStopConditionMet({
 *   stopConditions: [stepCountIs(5), hasToolCall('search')],
 *   steps: allSteps
 * });
 * ```
 */
export async function isStopConditionMet<TOOLS extends readonly Tool[]>(options: {
  readonly stopConditions: ReadonlyArray<StopCondition<TOOLS>>;
  readonly steps: ReadonlyArray<StepResult<TOOLS>>;
}): Promise<boolean> {
  const { stopConditions, steps } = options;

  // Evaluate all conditions in parallel
  const results = await Promise.all(
    stopConditions.map((condition: StopCondition<TOOLS>) =>
      Promise.resolve(
        condition({
          steps,
        }),
      ),
    ),
  );

  // Return true if ANY condition is true (OR logic)
  return results.some((result: boolean | undefined) => result === true);
}

/**
 * Stop when total token usage exceeds a threshold
 * OpenRouter-specific helper using usage data
 *
 * @param maxTokens - Maximum total tokens to allow
 * @returns StopCondition that returns true when token usage exceeds threshold
 *
 * @example
 * ```typescript
 * stopWhen: maxTokensUsed(10000) // Stop when total tokens exceed 10,000
 * ```
 */
export function maxTokensUsed(maxTokens: number): StopCondition<any> {
  return ({ steps }: { readonly steps: ReadonlyArray<StepResult> }) => {
    const totalTokens = steps.reduce(
      (sum: number, step: StepResult) => sum + (step.usage?.totalTokens ?? 0),
      0,
    );
    return totalTokens >= maxTokens;
  };
}

/**
 * Stop when total cost exceeds a threshold
 * OpenRouter-specific helper using cost data
 *
 * @param maxCostInDollars - Maximum cost in dollars to allow
 * @returns StopCondition that returns true when cost exceeds threshold
 *
 * @example
 * ```typescript
 * stopWhen: maxCost(0.50) // Stop when total cost exceeds $0.50
 * ```
 */
export function maxCost(maxCostInDollars: number): StopCondition {
  return ({ steps }: { readonly steps: ReadonlyArray<StepResult> }) => {
    const totalCost = steps.reduce(
      (sum: number, step: StepResult) => sum + (step.usage?.cost ?? 0),
      0,
    );
    return totalCost >= maxCostInDollars;
  };
}

/**
 * Stop when a specific finish reason is encountered
 *
 * @param reason - The finish reason to check for
 * @returns StopCondition that returns true when finish reason matches
 *
 * @example
 * ```typescript
 * stopWhen: finishReasonIs('length') // Stop when context length limit is hit
 * ```
 */
export function finishReasonIs(reason: string): StopCondition {
  return ({ steps }: { readonly steps: ReadonlyArray<StepResult> }) => {
    return steps.some((step: StepResult) => step.finishReason === reason);
  };
}
