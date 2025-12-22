import type { ZodObject, ZodRawShape, ZodType, z } from "zod/v4";
import {
  ToolType,
  type TurnContext,
  type ToolWithExecute,
  type ToolWithGenerator,
  type ManualTool,
  type NextTurnParamsFunctions,
  type ToolApprovalCheck,
} from "./tool-types.js";

/**
 * Configuration for a regular tool with outputSchema
 */
type RegularToolConfigWithOutput<
  TInput extends ZodObject<ZodRawShape>,
  TOutput extends ZodType,
> = {
  name: string;
  description?: string;
  inputSchema: TInput;
  outputSchema: TOutput;
  eventSchema?: undefined;
  nextTurnParams?: NextTurnParamsFunctions<z.infer<TInput>>;
  /**
   * Whether this tool requires human approval before execution
   * Can be a boolean or an async function that receives the tool's input params and context
   */
  requireApproval?: boolean | ToolApprovalCheck<z.infer<TInput>>;
  execute: (
    params: z.infer<TInput>,
    context?: TurnContext
  ) => Promise<z.infer<TOutput>> | z.infer<TOutput>;
};

/**
 * Configuration for a regular tool without outputSchema (infers return type from execute)
 */
type RegularToolConfigWithoutOutput<
  TInput extends ZodObject<ZodRawShape>,
  TReturn,
> = {
  name: string;
  description?: string;
  inputSchema: TInput;
  outputSchema?: undefined;
  eventSchema?: undefined;
  nextTurnParams?: NextTurnParamsFunctions<z.infer<TInput>>;
  /**
   * Whether this tool requires human approval before execution
   * Can be a boolean or an async function that receives the tool's input params and context
   */
  requireApproval?: boolean | ToolApprovalCheck<z.infer<TInput>>;
  execute: (
    params: z.infer<TInput>,
    context?: TurnContext
  ) => Promise<TReturn> | TReturn;
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
  nextTurnParams?: NextTurnParamsFunctions<z.infer<TInput>>;
  /**
   * Whether this tool requires human approval before execution
   * Can be a boolean or an async function that receives the tool's input params and context
   */
  requireApproval?: boolean | ToolApprovalCheck<z.infer<TInput>>;
  execute: (
    params: z.infer<TInput>,
    context?: TurnContext
  ) => AsyncGenerator<z.infer<TEvent> | z.infer<TOutput>>;
};

/**
 * Configuration for a manual tool (execute: false, no eventSchema or outputSchema)
 */
type ManualToolConfig<TInput extends ZodObject<ZodRawShape>> = {
  name: string;
  description?: string;
  inputSchema: TInput;
  nextTurnParams?: NextTurnParamsFunctions<z.infer<TInput>>;
  /**
   * Whether this tool requires human approval before execution
   * Can be a boolean or an async function that receives the tool's input params and context
   */
  requireApproval?: boolean | ToolApprovalCheck<z.infer<TInput>>;
  execute: false;
};

/**
 * Union type for all regular tool configs
 */
type RegularToolConfig<TInput extends ZodObject<ZodRawShape>, TOutput extends ZodType, TReturn> =
  | RegularToolConfigWithOutput<TInput, TOutput>
  | RegularToolConfigWithoutOutput<TInput, TReturn>;

/**
 * Type guard to check if config is a generator tool config (has eventSchema)
 */
function isGeneratorConfig<
  TInput extends ZodObject<ZodRawShape>,
  TEvent extends ZodType,
  TOutput extends ZodType,
  TReturn,
>(
  config:
    | GeneratorToolConfig<TInput, TEvent, TOutput>
    | RegularToolConfig<TInput, TOutput, TReturn>
    | ManualToolConfig<TInput>
): config is GeneratorToolConfig<TInput, TEvent, TOutput> {
  return "eventSchema" in config && config.eventSchema !== undefined;
}

/**
 * Type guard to check if config is a manual tool config (execute === false)
 */
function isManualConfig<TInput extends ZodObject<ZodRawShape>, TOutput extends ZodType, TReturn>(
  config:
    | GeneratorToolConfig<TInput, ZodType, ZodType>
    | RegularToolConfig<TInput, TOutput, TReturn>
    | ManualToolConfig<TInput>
): config is ManualToolConfig<TInput> {
  return config.execute === false;
}

/**
 * Creates a tool with full type inference from Zod schemas.
 *
 * The tool type is automatically determined based on the configuration:
 * - **Generator tool**: When `eventSchema` is provided
 * - **Regular tool**: When `execute` is a function (no `eventSchema`)
 * - **Manual tool**: When `execute: false` is set
 *
 * @example Regular tool:
 * ```typescript
 * const weatherTool = tool({
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
 * const progressTool = tool({
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
 *
 * @example Manual tool (execute: false):
 * ```typescript
 * const manualTool = tool({
 *   name: "external_action",
 *   inputSchema: z.object({ action: z.string() }),
 *   execute: false,
 * });
 * ```
 */
// Overload for generator tools (when eventSchema is provided)
export function tool<
  TInput extends ZodObject<ZodRawShape>,
  TEvent extends ZodType,
  TOutput extends ZodType,
>(
  config: GeneratorToolConfig<TInput, TEvent, TOutput>
): ToolWithGenerator<TInput, TEvent, TOutput>;

// Overload for manual tools (execute: false)
export function tool<TInput extends ZodObject<ZodRawShape>>(
  config: ManualToolConfig<TInput>
): ManualTool<TInput>;

// Overload for regular tools with outputSchema
export function tool<
  TInput extends ZodObject<ZodRawShape>,
  TOutput extends ZodType,
>(config: RegularToolConfigWithOutput<TInput, TOutput>): ToolWithExecute<TInput, TOutput>;

// Overload for regular tools without outputSchema (infers return type)
export function tool<
  TInput extends ZodObject<ZodRawShape>,
  TReturn,
>(config: RegularToolConfigWithoutOutput<TInput, TReturn>): ToolWithExecute<TInput, ZodType<TReturn>>;

// Implementation
export function tool<
  TInput extends ZodObject<ZodRawShape>,
  TEvent extends ZodType,
  TOutput extends ZodType,
  TReturn,
>(
  config:
    | GeneratorToolConfig<TInput, TEvent, TOutput>
    | RegularToolConfig<TInput, TOutput, TReturn>
    | ManualToolConfig<TInput>
):
  | ToolWithGenerator<TInput, TEvent, TOutput>
  | ToolWithExecute<TInput, TOutput>
  | ToolWithExecute<TInput, ZodType<TReturn>>
  | ManualTool<TInput> {
  // Check for manual tool first (execute === false)
  if (isManualConfig(config)) {
    const fn: ManualTool<TInput>["function"] = {
      name: config.name,
      inputSchema: config.inputSchema,
    };

    if (config.description !== undefined) {
      fn.description = config.description;
    }

    if (config.nextTurnParams !== undefined) {
      fn.nextTurnParams = config.nextTurnParams;
    }

    if (config.requireApproval !== undefined) {
      fn.requireApproval = config.requireApproval;
    }

    return {
      type: ToolType.Function,
      function: fn,
    };
  }

  // Check for generator tool (has eventSchema)
  if (isGeneratorConfig(config)) {
    const fn: ToolWithGenerator<TInput, TEvent, TOutput>["function"] = {
      name: config.name,
      inputSchema: config.inputSchema,
      eventSchema: config.eventSchema,
      outputSchema: config.outputSchema,
      // Types now align - config.execute matches the interface type
      execute: config.execute,
    };

    if (config.description !== undefined) {
      fn.description = config.description;
    }

    if (config.nextTurnParams !== undefined) {
      fn.nextTurnParams = config.nextTurnParams;
    }

    if (config.requireApproval !== undefined) {
      fn.requireApproval = config.requireApproval;
    }

    return {
      type: ToolType.Function,
      function: fn,
    };
  }

  // Regular tool (has execute function, no eventSchema)
  // TypeScript can't infer the relationship between TReturn and TOutput
  // So we build the object without type annotation, then return with correct type
  const functionObj = {
    name: config.name,
    inputSchema: config.inputSchema,
    execute: config.execute,
    ...(config.description !== undefined && { description: config.description }),
    ...(config.outputSchema !== undefined && { outputSchema: config.outputSchema }),
    ...(config.nextTurnParams !== undefined && { nextTurnParams: config.nextTurnParams }),
    ...(config.requireApproval !== undefined && { requireApproval: config.requireApproval }),
  };

  // The function signature guarantees this is type-safe via overloads
  return {
    type: ToolType.Function,
    function: functionObj,
  };
}
