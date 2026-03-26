import type { $ZodObject, $ZodShape, $ZodType, infer as zodInfer } from 'zod/v4/core';
import {
  ToolType,
  SHARED_CONTEXT_KEY,
  type Tool,
  type ToolExecuteContext,
  type ToolWithExecute,
  type ToolWithGenerator,
  type ManualTool,
  type NextTurnParamsFunctions,
  type ToolApprovalCheck,
} from "./tool-types.js";

//#region Config Types

/**
 * Configuration for a regular tool with outputSchema
 */
type RegularToolConfigWithOutput<
  TInput extends $ZodObject<$ZodShape>,
  TOutput extends $ZodType,
  TContext extends Record<string, unknown> = Record<string, unknown>,
  TName extends string = string,
> = {
  name: TName;
  description?: string;
  inputSchema: TInput;
  outputSchema: TOutput;
  eventSchema?: undefined;
  /** Zod schema declaring the context data this tool needs */
  contextSchema?: $ZodObject<$ZodShape>;
  nextTurnParams?: NextTurnParamsFunctions<zodInfer<TInput>>;
  requireApproval?: boolean | ToolApprovalCheck<zodInfer<TInput>>;
  execute: (
    params: zodInfer<TInput>,
    context?: ToolExecuteContext<TName, TContext>
  ) => Promise<zodInfer<TOutput>> | zodInfer<TOutput>;
};

/**
 * Configuration for a regular tool without outputSchema (infers return type from execute)
 */
type RegularToolConfigWithoutOutput<
  TInput extends $ZodObject<$ZodShape>,
  TReturn,
  TContext extends Record<string, unknown> = Record<string, unknown>,
  TName extends string = string,
> = {
  name: TName;
  description?: string;
  inputSchema: TInput;
  outputSchema?: undefined;
  eventSchema?: undefined;
  /** Zod schema declaring the context data this tool needs */
  contextSchema?: $ZodObject<$ZodShape>;
  nextTurnParams?: NextTurnParamsFunctions<zodInfer<TInput>>;
  requireApproval?: boolean | ToolApprovalCheck<zodInfer<TInput>>;
  execute: (
    params: zodInfer<TInput>,
    context?: ToolExecuteContext<TName, TContext>
  ) => Promise<TReturn> | TReturn;
};

/**
 * Configuration for a generator tool (with eventSchema)
 */
type GeneratorToolConfig<
  TInput extends $ZodObject<$ZodShape>,
  TEvent extends $ZodType,
  TOutput extends $ZodType,
  TContext extends Record<string, unknown> = Record<string, unknown>,
  TName extends string = string,
> = {
  name: TName;
  description?: string;
  inputSchema: TInput;
  eventSchema: TEvent;
  outputSchema: TOutput;
  /** Zod schema declaring the context data this tool needs */
  contextSchema?: $ZodObject<$ZodShape>;
  nextTurnParams?: NextTurnParamsFunctions<zodInfer<TInput>>;
  requireApproval?: boolean | ToolApprovalCheck<zodInfer<TInput>>;
  execute: (
    params: zodInfer<TInput>,
    context?: ToolExecuteContext<TName, TContext>
  ) => AsyncGenerator<zodInfer<TEvent> | zodInfer<TOutput>>;
};

/**
 * Configuration for a manual tool (execute: false, no eventSchema or outputSchema)
 */
type ManualToolConfig<
  TInput extends $ZodObject<$ZodShape>,
> = {
  name: string;  // Manual tools don't use TName since they have no execute
  description?: string;
  inputSchema: TInput;
  /** Zod schema declaring the context data this tool needs */
  contextSchema?: $ZodObject<$ZodShape>;
  nextTurnParams?: NextTurnParamsFunctions<zodInfer<TInput>>;
  requireApproval?: boolean | ToolApprovalCheck<zodInfer<TInput>>;
  execute: false;
};

/**
 * Loose config type for the `tool<TShared>()` overload.
 * Accepts any valid tool config while typing `ctx.shared` from TShared.
 */
type ToolConfigWithSharedContext<TShared extends Record<string, unknown>> = {
  name: string;
  description?: string;
  inputSchema: $ZodObject<$ZodShape>;
  outputSchema?: $ZodType;
  eventSchema?: $ZodType;
  contextSchema?: $ZodObject<$ZodShape>;
  nextTurnParams?: NextTurnParamsFunctions<Record<string, unknown>>;
  requireApproval?: boolean | ToolApprovalCheck<Record<string, unknown>>;
  execute:
    | ((
        params: Record<string, unknown>,
        context?: ToolExecuteContext<string, Record<string, unknown>, TShared>,
      ) => unknown)
    | ((
        params: Record<string, unknown>,
        context?: ToolExecuteContext<string, Record<string, unknown>, TShared>,
      ) => AsyncGenerator<unknown>)
    | false;
};

//#endregion

//#region Union Config Type

/**
 * Union type for all regular tool configs
 */
type RegularToolConfig<
  TInput extends $ZodObject<$ZodShape>,
  TOutput extends $ZodType,
  TReturn,
  TContext extends Record<string, unknown> = Record<string, unknown>,
  TName extends string = string,
> =
  | RegularToolConfigWithOutput<TInput, TOutput, TContext, TName>
  | RegularToolConfigWithoutOutput<TInput, TReturn, TContext, TName>;

//#endregion

//#region tool() Factory

/**
 * Creates a tool with full type inference from Zod schemas.
 *
 * The tool type is automatically determined based on the configuration:
 * - **Generator tool**: When `eventSchema` is provided
 * - **Regular tool**: When `execute` is a function (no `eventSchema`)
 * - **Manual tool**: When `execute: false` is set
 *
 * Shared context typing: Pass a type parameter to type `ctx.shared`
 * in the execute callback. Runtime validation happens at callModel
 * via `sharedContextSchema`.
 *
 * @example Regular tool with typed shared context:
 * ```typescript
 * type SharedCtx = z.infer<typeof SharedContextSchema>;
 *
 * const execTool = tool<SharedCtx>({
 *   name: "sandbox_exec",
 *   inputSchema: z.object({ command: z.string() }),
 *   execute: async (params, ctx) => {
 *     ctx?.shared._sessionId;       // string | undefined
 *     return { output: '...' };
 *   },
 * });
 * ```
 */
// Overload for generator tools (when eventSchema is provided)
export function tool<
  TInput extends $ZodObject<$ZodShape>,
  TEvent extends $ZodType,
  TOutput extends $ZodType,
  TContext extends Record<string, unknown> = Record<string, unknown>,
  TName extends string = string,
>(
  config: GeneratorToolConfig<TInput, TEvent, TOutput, TContext, TName>
): ToolWithGenerator<TInput, TEvent, TOutput, TContext>;

// Overload for manual tools (execute: false)
export function tool<TInput extends $ZodObject<$ZodShape>>(
  config: ManualToolConfig<TInput>
): ManualTool<TInput>;

// Overload for regular tools with outputSchema
export function tool<
  TInput extends $ZodObject<$ZodShape>,
  TOutput extends $ZodType,
  TContext extends Record<string, unknown> = Record<string, unknown>,
  TName extends string = string,
>(config: RegularToolConfigWithOutput<TInput, TOutput, TContext, TName>): ToolWithExecute<TInput, TOutput, TContext>;

// Overload for regular tools without outputSchema (infers return type)
export function tool<
  TInput extends $ZodObject<$ZodShape>,
  TReturn,
  TContext extends Record<string, unknown> = Record<string, unknown>,
  TName extends string = string,
>(config: RegularToolConfigWithoutOutput<TInput, TReturn, TContext, TName>): ToolWithExecute<TInput, $ZodType<TReturn>, TContext>;

// Overload for explicit TShared: tool<SharedContext>({...})
// When a non-ZodObject type is provided as the first generic,
// the specific overloads above won't match (constraint mismatch),
// so TypeScript falls through to this catch-all.
export function tool<TShared extends Record<string, unknown>>(
  config: ToolConfigWithSharedContext<TShared>
): Tool;

// Implementation
export function tool(
  config:
    | GeneratorToolConfig<$ZodObject<$ZodShape>, $ZodType, $ZodType>
    | RegularToolConfig<$ZodObject<$ZodShape>, $ZodType, unknown>
    | ManualToolConfig<$ZodObject<$ZodShape>>
    | ToolConfigWithSharedContext<Record<string, unknown>>
): Tool {
  // 'shared' is reserved for shared context — forbid it as a tool name
  if (config.name === SHARED_CONTEXT_KEY) {
    throw new Error(
      `Tool name "${SHARED_CONTEXT_KEY}" is reserved for shared context. Choose a different name.`,
    );
  }

  // Check for manual tool first (execute === false)
  if (config.execute === false) {
    const fn: ManualTool<$ZodObject<$ZodShape>>["function"] = {
      name: config.name,
      inputSchema: config.inputSchema,
    };

    if (config.description !== undefined) {
      fn.description = config.description;
    }

    if (config.contextSchema !== undefined) {
      fn.contextSchema = config.contextSchema;
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
  if ('eventSchema' in config && config.eventSchema !== undefined) {
    const fn = {
      name: config.name,
      inputSchema: config.inputSchema,
      eventSchema: config.eventSchema,
      outputSchema: config.outputSchema,
      execute: config.execute,
    } as ToolWithGenerator<$ZodObject<$ZodShape>, $ZodType, $ZodType>["function"];

    if (config.description !== undefined) {
      fn.description = config.description;
    }

    if (config.contextSchema !== undefined) {
      fn.contextSchema = config.contextSchema;
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
  const functionObj = {
    name: config.name,
    inputSchema: config.inputSchema,
    execute: config.execute,
    ...(config.description !== undefined && { description: config.description }),
    ...(config.outputSchema !== undefined && { outputSchema: config.outputSchema }),
    ...(config.contextSchema !== undefined && { contextSchema: config.contextSchema }),
    ...(config.nextTurnParams !== undefined && { nextTurnParams: config.nextTurnParams }),
    ...(config.requireApproval !== undefined && { requireApproval: config.requireApproval }),
  };

  return {
    type: ToolType.Function,
    function: functionObj,
  };
}

//#endregion
