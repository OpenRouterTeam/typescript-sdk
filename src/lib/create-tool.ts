import type { ZodObject, ZodRawShape, ZodType, z } from "zod/v4";
import {
  ToolType,
  type TurnContext,
  type NextTurnParams,
  type ToolWithExecute,
  type ToolWithGenerator,
  type ManualTool,
} from "./tool-types.js";

/**
 * Configuration for a regular tool (without eventSchema)
 */
type RegularToolConfig<
  TInput extends ZodObject<ZodRawShape>,
  TOutput extends ZodType = ZodType<unknown>,
> = {
  name: string;
  description?: string;
  inputSchema: TInput;
  outputSchema?: TOutput;
  eventSchema?: undefined;
  nextTurnParams?: NextTurnParams<z.infer<TInput>>;
  execute: (
    params: z.infer<TInput>,
    context: TurnContext
  ) => Promise<z.infer<TOutput>> | z.infer<TOutput>;
};

/**
 * Configuration for a generator tool (with eventSchema)
 */
type GeneratorToolConfig<
  TInput extends ZodObject<ZodRawShape>,
  TEvent extends ZodType,
  TOutput extends ZodType,
> = {
  name: string;
  description?: string;
  inputSchema: TInput;
  eventSchema: TEvent;
  outputSchema: TOutput;
  nextTurnParams?: NextTurnParams<z.infer<TInput>>;
  execute: (
    params: z.infer<TInput>,
    context?: TurnContext
  ) => AsyncGenerator<z.infer<TEvent> | z.infer<TOutput>>;
};

/**
 * Type guard to check if config is a generator tool config (has eventSchema)
 */
function isGeneratorConfig<
  TInput extends ZodObject<ZodRawShape>,
  TEvent extends ZodType,
  TOutput extends ZodType,
>(
  config:
    | GeneratorToolConfig<TInput, TEvent, TOutput>
    | RegularToolConfig<TInput, TOutput>
): config is GeneratorToolConfig<TInput, TEvent, TOutput> {
  return "eventSchema" in config && config.eventSchema !== undefined;
}

/**
 * Creates a tool with full type inference from Zod schemas.
 *
 * The execute function parameters are automatically typed based on the inputSchema,
 * and the return type is enforced based on the outputSchema.
 *
 * When `eventSchema` is provided, the tool becomes a generator tool that can yield
 * intermediate events during execution.
 *
 * @example Regular tool:
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
 *
 * @example Generator tool (with eventSchema):
 * ```typescript
 * const progressTool = createTool({
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
// Overload for generator tools (when eventSchema is provided)
export function createTool<
  TInput extends ZodObject<ZodRawShape>,
  TEvent extends ZodType,
  TOutput extends ZodType,
>(
  config: GeneratorToolConfig<TInput, TEvent, TOutput>
): ToolWithGenerator<TInput, TEvent, TOutput>;

// Overload for regular tools (no eventSchema)
export function createTool<
  TInput extends ZodObject<ZodRawShape>,
  TOutput extends ZodType = ZodType<unknown>,
>(config: RegularToolConfig<TInput, TOutput>): ToolWithExecute<TInput, TOutput>;

// Implementation
export function createTool<
  TInput extends ZodObject<ZodRawShape>,
  TEvent extends ZodType,
  TOutput extends ZodType,
>(
  config:
    | GeneratorToolConfig<TInput, TEvent, TOutput>
    | RegularToolConfig<TInput, TOutput>
): ToolWithGenerator<TInput, TEvent, TOutput> | ToolWithExecute<TInput, TOutput> {
  // Use type guard for proper narrowing
  if (isGeneratorConfig(config)) {
    // config is now narrowed to GeneratorToolConfig
    const fn: ToolWithGenerator<TInput, TEvent, TOutput>["function"] = {
      name: config.name,
      inputSchema: config.inputSchema,
      eventSchema: config.eventSchema,
      outputSchema: config.outputSchema,
      execute: config.execute,
    };

    if (config.description !== undefined) {
      fn.description = config.description;
    }

    if (config.nextTurnParams !== undefined) {
      fn.nextTurnParams = config.nextTurnParams;
    }

    return {
      type: ToolType.Function,
      function: fn,
    };
  }

  // config is narrowed to RegularToolConfig
  const fn: ToolWithExecute<TInput, TOutput>["function"] = {
    name: config.name,
    inputSchema: config.inputSchema,
    execute: config.execute,
  };

  if (config.description !== undefined) {
    fn.description = config.description;
  }

  if (config.outputSchema !== undefined) {
    fn.outputSchema = config.outputSchema;
  }

  if (config.nextTurnParams !== undefined) {
    fn.nextTurnParams = config.nextTurnParams;
  }

  return {
    type: ToolType.Function,
    function: fn,
  };
}

/**
 * Creates a generator tool with streaming capabilities.
 *
 * @deprecated Use `createTool` with `eventSchema` instead. This function is kept for backwards compatibility.
 *
 * @example
 * ```typescript
 * // Instead of createGeneratorTool, use createTool with eventSchema:
 * const progressTool = createTool({
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
  nextTurnParams?: NextTurnParams<z.infer<TInput>>;
  execute: (
    params: z.infer<TInput>,
    context?: TurnContext
  ) => AsyncGenerator<z.infer<TEvent> | z.infer<TOutput>>;
}): ToolWithGenerator<TInput, TEvent, TOutput> {
  return createTool(config);
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
  const fn: ManualTool<TInput, TOutput>["function"] = {
    name: config.name,
    inputSchema: config.inputSchema,
  };

  if (config.description !== undefined) {
    fn.description = config.description;
  }

  if (config.outputSchema !== undefined) {
    fn.outputSchema = config.outputSchema;
  }

  return {
    type: ToolType.Function,
    function: fn,
  };
}
