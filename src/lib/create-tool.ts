import type { ZodObject, ZodRawShape, ZodType, z } from 'zod/v4';
import {
  ToolType,
  type TurnContext,
  type ToolWithExecute,
  type ToolWithGenerator,
  type ManualTool,
} from './tool-types.js';

/**
 * Creates a tool with full type inference from Zod schemas.
 *
 * The execute function parameters are automatically typed based on the inputSchema,
 * and the return type is enforced based on the outputSchema.
 *
 * @example
 * ```typescript
 * const weatherTool = createTool({
 *   name: "get_weather",
 *   description: "Get weather for a location",
 *   inputSchema: z.object({ location: z.string() }),
 *   outputSchema: z.object({ temperature: z.number() }),
 *   execute: async (params) => {
 *     // params is typed as { location: string }
 *     return { temperature: 72 }; // return type is enforced
 *   },
 * });
 * ```
 */
export function createTool<
  TInput extends ZodObject<ZodRawShape>,
  TOutput extends ZodType = ZodType<unknown>,
>(config: {
  name: string;
  description?: string;
  inputSchema: TInput;
  outputSchema?: TOutput;
  execute: (
    params: z.infer<TInput>,
    context?: TurnContext,
  ) => Promise<z.infer<TOutput>> | z.infer<TOutput>;
}): ToolWithExecute<TInput, TOutput> {
  const fn: ToolWithExecute<TInput, TOutput>['function'] = {
    name: config.name,
    inputSchema: config.inputSchema,
    execute: config.execute,
  };

  if (config.description !== undefined) {
    fn.description = config.description;
  }

  if (config.outputSchema !== undefined) {
    fn.outputSchema = config.outputSchema as TOutput;
  }

  return {
    type: ToolType.Function,
    function: fn,
  };
}

/**
 * Creates a generator tool with streaming capabilities.
 *
 * Generator tools can yield intermediate events (validated by eventSchema) during execution
 * and a final output (validated by outputSchema) as the last emission.
 *
 * @example
 * ```typescript
 * const progressTool = createGeneratorTool({
 *   name: "process_data",
 *   inputSchema: z.object({ data: z.string() }),
 *   eventSchema: z.object({ progress: z.number() }),
 *   outputSchema: z.object({ result: z.string() }),
 *   execute: async function* (params) {
 *     yield { progress: 50 }; // typed as event
 *     yield { result: "done" }; // typed as output
 *   },
 * });
 * ```
 */
export function createGeneratorTool<
  TInput extends ZodObject<ZodRawShape>,
  TEvent extends ZodType,
  TOutput extends ZodType,
>(config: {
  name: string;
  description?: string;
  inputSchema: TInput;
  eventSchema: TEvent;
  outputSchema: TOutput;
  execute: (
    params: z.infer<TInput>,
    context?: TurnContext,
  ) => AsyncGenerator<z.infer<TEvent> | z.infer<TOutput>>;
}): ToolWithGenerator<TInput, TEvent, TOutput> {
  const fn: ToolWithGenerator<TInput, TEvent, TOutput>['function'] = {
    name: config.name,
    inputSchema: config.inputSchema,
    eventSchema: config.eventSchema,
    outputSchema: config.outputSchema,
    execute: config.execute as ToolWithGenerator<TInput, TEvent, TOutput>['function']['execute'],
  };

  if (config.description !== undefined) {
    fn.description = config.description;
  }

  return {
    type: ToolType.Function,
    function: fn,
  };
}

/**
 * Creates a manual tool without an execute function.
 *
 * Manual tools are useful when you want to handle tool execution yourself,
 * for example when the tool requires external processing or user interaction.
 *
 * @example
 * ```typescript
 * const manualTool = createManualTool({
 *   name: "external_api",
 *   inputSchema: z.object({ query: z.string() }),
 *   outputSchema: z.object({ response: z.string() }),
 * });
 * ```
 */
export function createManualTool<
  TInput extends ZodObject<ZodRawShape>,
  TOutput extends ZodType = ZodType<unknown>,
>(config: {
  name: string;
  description?: string;
  inputSchema: TInput;
  outputSchema?: TOutput;
}): ManualTool<TInput, TOutput> {
  const fn: ManualTool<TInput, TOutput>['function'] = {
    name: config.name,
    inputSchema: config.inputSchema,
  };

  if (config.description !== undefined) {
    fn.description = config.description;
  }

  if (config.outputSchema !== undefined) {
    fn.outputSchema = config.outputSchema as TOutput;
  }

  return {
    type: ToolType.Function,
    function: fn,
  };
}
