import type { ZodObject, ZodRawShape, ZodType, z } from "zod/v4";
import type * as models from "../models/index.js";
import type { OpenResponsesStreamEvent } from "../models/index.js";
import type { ResponseWrapper } from "./model-result.js";
import type { CallModelInput } from "../funcs/call-model.js";
import type { OpenResponsesRequest } from "../models/openresponsesrequest.js";

/**
 * Tool type enum for enhanced tools
 */
export enum ToolType {
  Function = "function",
}

export type CallModelRequest<TTools extends readonly Tool[] = readonly Tool[]> =
  Omit<OpenResponsesRequest, "stream" | "tools" | "input"> & {
    input?: CallModelInput;
    tools?: TTools;
    maxToolRounds?: MaxToolRounds;
  };

/**
 * Represents a change made during tool execution turn
 */
export type TurnChange<TTools extends readonly Tool[] = readonly Tool[]> =
  | {
      type: "tool_result";
      toolName: string;
      toolCallId: string;
      result: unknown;
      error?: Error;
    }
  | {
      type: "request_mutation";
      source: string; // tool name that made the mutation
      delta: Partial<CallModelRequest<TTools>>; // just the changed fields
    };

/**
 * Type for nextTurnParams - callbacks to mutate request params before next turn
 * Each key corresponds to a CallModelRequest param, value is a function that receives
 * TurnContext and returns the new value for that param (sync or async).
 */
export type NextTurnParams<
  Params extends Record<string, unknown>,
  TTools extends readonly Tool[] = readonly Tool[],
> = {
  [K in keyof CallModelRequest<TTools>]?: (
    params: Params,
    context: TurnContext<TTools>
  ) => CallModelRequest<TTools>[K] | Promise<CallModelRequest<TTools>[K]>;
};

/**
 * Turn context passed to tool execute functions
 * Contains information about the current conversation state
 */
export interface TurnContext<TTools extends readonly Tool[] = readonly Tool[]>
  extends Omit<CallModelRequest<TTools>, "input"> {
  /**
   * The current conversation input in OpenResponses format, normalized to an array.
   *
   * Why array-only?
   * `models.OpenResponsesInput` is `string | OpenResponsesItem[]`. Tool hooks like
   * `nextTurnParams.input` frequently do `return [...context.input, newMessage]`.
   * If `context.input` were allowed to be a `string`, spreading would produce
   * a `string[]` (characters) and break type safety.
   */
  input: models.OpenResponsesInput1[];
  /**
   * Array of changes made this turn - tool results and request mutations
   * Applied in order, allowing tools to see what previous tools did
   */
  changes: TurnChange<TTools>[];
  /**
   * The current tool call's arguments (only present during tool execution)
   */
  arguments?: TypedToolCallUnion<TTools>;
}

/**
 * Normalizes OpenResponsesInput to always be an array.
 * If input is undefined, returns empty array.
 * If input is a string, wraps it in a user message object.
 */
export function normalizeInputToArray(
  input: models.OpenResponsesInput | undefined
): models.OpenResponsesInput1[] {
  if (input === undefined) {
    return [];
  }
  if (typeof input === "string") {
    return [{ role: "user", content: input }];
  }
  return input;
}

/**
 * Options for building a TurnContext
 */
export type BuildTurnContextOptions<
  TTools extends readonly Tool[] = readonly Tool[],
> = {
  /** Base request parameters (model, instructions, etc.) - excludes input, tools, maxToolRounds */
  request: Record<string, unknown>;
  /** Current conversation input - can be string or array, will be normalized to array */
  input: models.OpenResponsesInput;
  /** Tools being used */
  tools?: TTools;
  /** Max tool rounds configuration */
  maxToolRounds?: MaxToolRounds;
  /** Changes made this turn */
  changes: TurnChange<TTools>[];
  /** Current tool call arguments (optional) */
  arguments?: TypedToolCallUnion<TTools>;
};

/**
 * Builds a TurnContext object from the provided options.
 * This provides a centralized way to construct TurnContext objects.
 */
export function buildTurnContext<
  TTools extends readonly Tool[] = readonly Tool[],
>(options: BuildTurnContextOptions<TTools>): TurnContext<TTools> {
  const {
    request,
    input,
    tools,
    maxToolRounds,
    changes,
    arguments: args,
  } = options;

  // Normalize input to always be an array
  const normalizedInput = normalizeInputToArray(input);

  // Build the base context from request params
  // Cast is required: TypeScript cannot verify that spreading 'request'
  // (typed as Record<string, unknown>) preserves the TTools generic parameter,
  // but it does since request comes from CallModelRequest<TTools> at call sites.
  const context: TurnContext<TTools> = {
    ...request,
    input: normalizedInput,
    changes,
  } as TurnContext<TTools>;

  // Only add optional fields if they are defined
  if (tools !== undefined) {
    context.tools = tools;
  }
  if (maxToolRounds !== undefined) {
    context.maxToolRounds = maxToolRounds;
  }
  if (args !== undefined) {
    context.arguments = args;
  }

  return context;
}

/**
 * Base tool function interface with inputSchema
 */
export interface BaseToolFunction<TInput extends ZodObject<ZodRawShape>> {
  name: string;
  description?: string;
  inputSchema: TInput;
}

/**
 * Regular tool with synchronous or asynchronous execute function and optional outputSchema
 */
export interface ToolFunctionWithExecute<
  TInput extends ZodObject<ZodRawShape>,
  TOutput extends ZodType = ZodType<unknown>,
> extends BaseToolFunction<TInput> {
  outputSchema?: TOutput;
  nextTurnParams?: NextTurnParams<z.infer<TInput>>;
  execute: (
    params: z.infer<TInput>,
    context: TurnContext
  ) => Promise<z.infer<TOutput>> | z.infer<TOutput>;
}

/**
 * Generator-based tool with async generator execute function
 * Emits preliminary events (validated by eventSchema) during execution
 * and a final output (validated by outputSchema) as the last emission
 *
 * @example
 * ```typescript
 * {
 *   eventSchema: z.object({ status: z.string() }),  // For progress events
 *   outputSchema: z.object({ result: z.number() }), // For final output
 *   execute: async function* (params) {
 *     yield { status: "processing..." };  // Event
 *     yield { status: "almost done..." }; // Event
 *     yield { result: 42 };               // Final output (must be last)
 *   }
 * }
 * ```
 */
export interface ToolFunctionWithGenerator<
  TInput extends ZodObject<ZodRawShape>,
  TEvent extends ZodType = ZodType<unknown>,
  TOutput extends ZodType = ZodType<unknown>,
> extends BaseToolFunction<TInput> {
  eventSchema: TEvent;
  outputSchema: TOutput;
  nextTurnParams?: NextTurnParams<z.infer<TInput>>;
  execute: (
    params: z.infer<TInput>,
    context?: TurnContext
  ) => AsyncGenerator<z.infer<TEvent> | z.infer<TOutput>>;
}

/**
 * Manual tool without execute function - requires manual handling by developer
 */
export interface ManualToolFunction<
  TInput extends ZodObject<ZodRawShape>,
  TOutput extends ZodType = ZodType<unknown>,
> extends BaseToolFunction<TInput> {
  outputSchema?: TOutput;
}

/**
 * Tool with execute function (regular or generator)
 */
export type ToolWithExecute<
  TInput extends ZodObject<ZodRawShape> = ZodObject<ZodRawShape>,
  TOutput extends ZodType = ZodType<unknown>,
> = {
  type: ToolType.Function;
  function: ToolFunctionWithExecute<TInput, TOutput>;
};

/**
 * Tool with generator execute function
 */
export type ToolWithGenerator<
  TInput extends ZodObject<ZodRawShape> = ZodObject<ZodRawShape>,
  TEvent extends ZodType = ZodType<unknown>,
  TOutput extends ZodType = ZodType<unknown>,
> = {
  type: ToolType.Function;
  function: ToolFunctionWithGenerator<TInput, TEvent, TOutput>;
};

/**
 * Tool without execute function (manual handling)
 */
export type ManualTool<
  TInput extends ZodObject<ZodRawShape> = ZodObject<ZodRawShape>,
  TOutput extends ZodType = ZodType<unknown>,
> = {
  type: ToolType.Function;
  function: ManualToolFunction<TInput, TOutput>;
};

/**
 * Union type of all enhanced tool types
 */
export type Tool =
  | ToolWithExecute<ZodObject<ZodRawShape>, ZodType<unknown>>
  | ToolWithGenerator<
      ZodObject<ZodRawShape>,
      ZodType<unknown>,
      ZodType<unknown>
    >
  | ManualTool<ZodObject<ZodRawShape>, ZodType<unknown>>;

/**
 * Extracts the input type from a tool definition
 */
export type InferToolInput<T> = T extends { function: { inputSchema: infer S } }
  ? S extends ZodType
    ? z.infer<S>
    : unknown
  : unknown;

/**
 * Extracts the output type from a tool definition
 */
export type InferToolOutput<T> = T extends {
  function: { outputSchema: infer S };
}
  ? S extends ZodType
    ? z.infer<S>
    : unknown
  : unknown;

/**
 * A tool call with typed arguments based on the tool's inputSchema
 */
export type TypedToolCall<T extends Tool> = {
  id: string;
  name: T extends { function: { name: infer N } } ? N : string;
  arguments: InferToolInput<T>;
};

/**
 * Union of typed tool calls for a tuple of tools
 */
export type TypedToolCallUnion<T extends readonly Tool[]> = {
  [K in keyof T]: T[K] extends Tool ? TypedToolCall<T[K]> : never;
}[number];

/**
 * Extracts the event type from a generator tool definition
 * Returns `never` for non-generator tools
 */
export type InferToolEvent<T> = T extends { function: { eventSchema: infer S } }
  ? S extends ZodType
    ? z.infer<S>
    : never
  : never;

/**
 * Union of event types for all generator tools in a tuple
 * Filters out non-generator tools (which return `never`)
 */
export type InferToolEventsUnion<T extends readonly Tool[]> = {
  [K in keyof T]: T[K] extends Tool ? InferToolEvent<T[K]> : never;
}[number];

/**
 * Type guard to check if a tool has an execute function
 */
export function hasExecuteFunction(
  tool: Tool
): tool is ToolWithExecute | ToolWithGenerator {
  return (
    "execute" in tool.function && typeof tool.function.execute === "function"
  );
}

/**
 * Type guard to check if a tool uses a generator (has eventSchema)
 */
export function isGeneratorTool(tool: Tool): tool is ToolWithGenerator {
  return "eventSchema" in tool.function;
}

/**
 * Type guard to check if a tool is a regular execution tool (not generator)
 */
export function isRegularExecuteTool(tool: Tool): tool is ToolWithExecute {
  return hasExecuteFunction(tool) && !isGeneratorTool(tool);
}

/**
 * Type guard to check if a tool has nextTurnParams defined
 */
export function hasNextTurnParams(
  tool: Tool
): tool is ToolWithExecute | ToolWithGenerator {
  return (
    "nextTurnParams" in tool.function &&
    tool.function.nextTurnParams !== undefined
  );
}

/**
 * Parsed tool call from API response
 */
export interface ParsedToolCall {
  id: string;
  name: string;
  arguments: unknown; // Parsed from JSON string
}

/**
 * Result of tool execution
 */
export interface ToolExecutionResult {
  toolCallId: string;
  toolName: string;
  result: unknown; // Final result (sent to model)
  preliminaryResults?: unknown[]; // All yielded values from generator
  error?: Error;
}

/**
 * Type for maxToolRounds - can be a number or a function that determines if execution should continue
 */
export type MaxToolRounds = number | ((context: TurnContext) => boolean); // Return true to allow another turn, false to stop

/**
 * Result of executeTools operation
 */
export interface ExecuteToolsResult {
  finalResponse: ModelResult;
  allResponses: ModelResult[];
  toolResults: Map<
    string,
    {
      result: unknown;
      preliminaryResults?: unknown[];
    }
  >;
}

/**
 * Standard tool format for OpenRouter API (JSON Schema based)
 * Matches OpenResponsesRequestToolFunction structure
 */
export interface APITool {
  type: "function";
  name: string;
  description?: string | null;
  strict?: boolean | null;
  parameters: {
    [k: string]: unknown;
  } | null;
}

/**
 * Tool preliminary result event emitted during generator tool execution
 * @template TEvent - The event type from the tool's eventSchema
 */
export type ToolPreliminaryResultEvent<TEvent = unknown> = {
  type: "tool.preliminary_result";
  toolCallId: string;
  result: TEvent;
  timestamp: number;
};

/**
 * Enhanced stream event types for getFullResponsesStream
 * Extends OpenResponsesStreamEvent with tool preliminary results
 * @template TEvent - The event type from generator tools
 */
export type EnhancedResponseStreamEvent<TEvent = unknown> =
  | OpenResponsesStreamEvent
  | ToolPreliminaryResultEvent<TEvent>;

/**
 * Type guard to check if an event is a tool preliminary result event
 */
export function isToolPreliminaryResultEvent<TEvent = unknown>(
  event: EnhancedResponseStreamEvent<TEvent>
): event is ToolPreliminaryResultEvent<TEvent> {
  return event.type === "tool.preliminary_result";
}

/**
 * Tool stream event types for getToolStream
 * Includes both argument deltas and preliminary results
 * @template TEvent - The event type from generator tools
 */
export type ToolStreamEvent<TEvent = unknown> =
  | {
      type: "delta";
      content: string;
    }
  | {
      type: "preliminary_result";
      toolCallId: string;
      result: TEvent;
    };

/**
 * Chat stream event types for getFullChatStream
 * Includes content deltas, completion events, and tool preliminary results
 * @template TEvent - The event type from generator tools
 */
export type ChatStreamEvent<TEvent = unknown> =
  | {
      type: "content.delta";
      delta: string;
    }
  | {
      type: "message.complete";
      response: models.OpenResponsesNonStreamingResponse;
    }
  | {
      type: "tool.preliminary_result";
      toolCallId: string;
      result: TEvent;
    }
  | {
      type: string;
      event: OpenResponsesStreamEvent;
    }; // Pass-through for other events
