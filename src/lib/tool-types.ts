import type { ZodObject, ZodRawShape, ZodType, z } from 'zod/v4';
import type * as models from '../models/index.js';
import type { OpenResponsesStreamEvent } from '../models/index.js';
import type { ModelResult } from './model-result.js';

/**
 * Tool type enum for enhanced tools
 */
export enum ToolType {
  Function = 'function',
}

/**
 * Turn context passed to tool execute functions and async parameter resolution
 * Contains information about the current conversation state
 */
export interface TurnContext {
  /** The specific tool call being executed (only available during tool execution) */
  toolCall?: models.OpenResponsesFunctionToolCall;
  /** Number of tool execution turns so far (1-indexed: first turn = 1, 0 = initial request) */
  numberOfTurns: number;
  /** The full request being sent to the API (only available during tool execution) */
  turnRequest?: models.OpenResponsesRequest;
}

/**
 * Context passed to nextTurnParams functions
 * Contains current request state for parameter computation
 * Allows modification of key request parameters between turns
 */
export type NextTurnParamsContext = {
  /** Current input (messages) */
  input: models.OpenResponsesInput;
  /** Current model selection */
  model: string;
  /** Current models array */
  models: string[];
  /** Current temperature */
  temperature: number | null;
  /** Current maxOutputTokens */
  maxOutputTokens: number | null;
  /** Current topP */
  topP: number | null;
  /** Current topK */
  topK?: number | undefined;
  /** Current instructions */
  instructions: string | null;
};

/**
 * Functions to compute next turn parameters
 * Each function receives the tool's input params and current request context
 */
export type NextTurnParamsFunctions<TInput> = {
  [K in keyof NextTurnParamsContext]?: (
    params: TInput,
    context: NextTurnParamsContext
  ) => NextTurnParamsContext[K] | Promise<NextTurnParamsContext[K]>;
};

/**
 * Base tool function interface with inputSchema
 */
export interface BaseToolFunction<TInput extends ZodObject<ZodRawShape>> {
  name: string;
  description?: string;
  inputSchema: TInput;
  nextTurnParams?: NextTurnParamsFunctions<z.infer<TInput>>;
}

/**
 * Regular tool with synchronous or asynchronous execute function and optional outputSchema
 */
export interface ToolFunctionWithExecute<
  TInput extends ZodObject<ZodRawShape>,
  TOutput extends ZodType = ZodType<unknown>,
> extends BaseToolFunction<TInput> {
  outputSchema?: TOutput;
  execute: (
    params: z.infer<TInput>,
    context?: TurnContext,
  ) => Promise<z.infer<TOutput>> | z.infer<TOutput>;
}

/**
 * Generator-based tool with async generator execute function
 * Emits preliminary events (validated by eventSchema) during execution
 * and a final output (validated by outputSchema) as the last emission
 *
 * The generator can yield both events and the final output.
 * All yields are validated against eventSchema (which should be a union of event and output types),
 * and the last yield is additionally validated against outputSchema.
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
  // Generator can yield both events (TEvent) and the final output (TOutput)
  execute: (params: z.infer<TInput>, context?: TurnContext) => AsyncGenerator<z.infer<TEvent> | z.infer<TOutput>>;
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
  | ToolWithGenerator<ZodObject<ZodRawShape>, ZodType<unknown>, ZodType<unknown>>
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
export type InferToolOutput<T> = T extends { function: { outputSchema: infer S } }
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
  tool: Tool,
): tool is ToolWithExecute | ToolWithGenerator {
  return 'execute' in tool.function && typeof tool.function.execute === 'function';
}

/**
 * Type guard to check if a tool uses a generator (has eventSchema)
 */
export function isGeneratorTool(tool: Tool): tool is ToolWithGenerator {
  return 'eventSchema' in tool.function;
}

/**
 * Type guard to check if a tool is a regular execution tool (not generator)
 */
export function isRegularExecuteTool(tool: Tool): tool is ToolWithExecute {
  return hasExecuteFunction(tool) && !isGeneratorTool(tool);
}

/**
 * Type guard to check if a tool is a manual tool (no execute function)
 */
export function isManualTool(tool: Tool): tool is ManualTool {
  return !('execute' in tool.function);
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
 * Warning from step execution
 */
export interface Warning {
  type: string;
  message: string;
}

/**
 * Result of a single step in the tool execution loop
 * Compatible with Vercel AI SDK pattern
 */
export interface StepResult<_TOOLS extends readonly Tool[] = readonly Tool[]> {
  readonly stepType: 'initial' | 'continue';
  readonly text: string;
  readonly toolCalls: ParsedToolCall[];
  readonly toolResults: ToolExecutionResult[];
  readonly response: models.OpenResponsesNonStreamingResponse;
  readonly usage?: models.OpenResponsesUsage | undefined;
  readonly finishReason?: string | undefined;
  readonly warnings?: Warning[] | undefined;
  readonly experimental_providerMetadata?: Record<string, unknown> | undefined;
}

/**
 * A condition function that determines whether to stop tool execution
 * Returns true to STOP execution, false to CONTINUE
 * (Matches Vercel AI SDK semantics)
 */
export type StopCondition<TOOLS extends readonly Tool[] = readonly Tool[]> = (options: {
  readonly steps: ReadonlyArray<StepResult<TOOLS>>;
}) => boolean | Promise<boolean>;

/**
 * Stop condition configuration
 * Can be a single condition or array of conditions
 */
export type StopWhen<TOOLS extends readonly Tool[] = readonly Tool[]> =
  | StopCondition<TOOLS>
  | ReadonlyArray<StopCondition<TOOLS>>;

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
  type: 'function';
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
  type: 'tool.preliminary_result';
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
  event: EnhancedResponseStreamEvent<TEvent>,
): event is ToolPreliminaryResultEvent<TEvent> {
  return event.type === 'tool.preliminary_result';
}

/**
 * Tool stream event types for getToolStream
 * Includes both argument deltas and preliminary results
 * @template TEvent - The event type from generator tools
 */
export type ToolStreamEvent<TEvent = unknown> =
  | {
    type: 'delta';
    content: string;
  }
  | {
    type: 'preliminary_result';
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
    type: 'content.delta';
    delta: string;
  }
  | {
    type: 'message.complete';
    response: models.OpenResponsesNonStreamingResponse;
  }
  | {
    type: 'tool.preliminary_result';
    toolCallId: string;
    result: TEvent;
  }
  | {
    type: string;
    event: OpenResponsesStreamEvent;
  }; // Pass-through for other events
