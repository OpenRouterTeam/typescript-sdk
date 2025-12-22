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
 * Tool-level approval check function type
 * Receives the tool's input params and turn context
 * Returns true if approval is required, false otherwise
 */
export type ToolApprovalCheck<TInput> = (
  params: TInput,
  context: TurnContext
) => boolean | Promise<boolean>;

/**
 * Base tool function interface with inputSchema
 */
export interface BaseToolFunction<TInput extends ZodObject<ZodRawShape>> {
  name: string;
  description?: string;
  inputSchema: TInput;
  nextTurnParams?: NextTurnParamsFunctions<z.infer<TInput>>;
  /**
   * Whether this tool requires human approval before execution
   * Can be a boolean or an async function that receives the tool's input params and context
   */
  requireApproval?: boolean | ToolApprovalCheck<z.infer<TInput>>;
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
 * Union of typed tool execution results for a tuple of tools
 */
export type ToolExecutionResultUnion<T extends readonly Tool[]> = {
  [K in keyof T]: T[K] extends Tool ? ToolExecutionResult<T[K]> : never;
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
 * @template T - The tool type to infer argument types from
 */
export interface ParsedToolCall<T extends Tool> {
  id: string;
  name: T extends { function: { name: infer N } } ? N : string;
  arguments: InferToolInput<T>; // Typed based on tool's inputSchema
}

/**
 * Result of tool execution
 * @template T - The tool type to infer result types from
 */
export interface ToolExecutionResult<T extends Tool> {
  toolCallId: string;
  toolName: string;
  result: T extends ToolWithExecute<any, infer O> | ToolWithGenerator<any, any, infer O>
  ? z.infer<O>
  : unknown; // Final result (sent to model)
  preliminaryResults?: T extends ToolWithGenerator<any, infer E, any>
  ? z.infer<E>[]
  : undefined; // All yielded values from generator
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
export interface StepResult<TTools extends readonly Tool[] = readonly Tool[]> {
  readonly stepType: 'initial' | 'continue';
  readonly text: string;
  readonly toolCalls: TypedToolCallUnion<TTools>[];
  readonly toolResults: ToolExecutionResultUnion<TTools>[];
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
export type StopCondition<TTools extends readonly Tool[] = readonly Tool[]> = (options: {
  readonly steps: ReadonlyArray<StepResult<TTools>>;
}) => boolean | Promise<boolean>;

/**
 * Stop condition configuration
 * Can be a single condition or array of conditions
 */
export type StopWhen<TTools extends readonly Tool[] = readonly Tool[]> =
  | StopCondition<TTools>
  | ReadonlyArray<StopCondition<TTools>>;

/**
 * Result of executeTools operation
 */
export interface ExecuteToolsResult<TTools extends readonly Tool[]> {
  finalResponse: ModelResult<TTools>;
  allResponses: ModelResult<TTools>[];
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
export type ResponseStreamEvent<TEvent = unknown> =
  | OpenResponsesStreamEvent
  | ToolPreliminaryResultEvent<TEvent>;

/**
 * Type guard to check if an event is a tool preliminary result event
 */
export function isToolPreliminaryResultEvent<TEvent = unknown>(
  event: ResponseStreamEvent<TEvent>,
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

// =============================================================================
// Multi-Turn Conversation State Types
// =============================================================================

/**
 * Result of a tool execution that hasn't been sent to the model yet
 * Used for interrupted or awaiting approval states
 * @template TTools - The tools array type for proper type inference
 */
export interface UnsentToolResult<TTools extends readonly Tool[] = readonly Tool[]> {
  /** The ID of the tool call this result is for */
  callId: string;
  /** The name of the tool that was executed */
  name: TTools[number]['function']['name'];
  /** The output of the tool execution */
  output: unknown;
  /** Error message if the tool call was rejected or failed */
  error?: string;
}

/**
 * Partial response captured during interruption
 * @template TTools - The tools array type for proper type inference
 */
export interface PartialResponse<TTools extends readonly Tool[] = readonly Tool[]> {
  /** Partial text response accumulated before interruption */
  text?: string;
  /** Tool calls that were in progress when interrupted */
  toolCalls?: Array<ParsedToolCall<TTools[number]>>;
}

/**
 * Status of a conversation state
 */
export type ConversationStatus =
  | 'complete'
  | 'interrupted'
  | 'awaiting_approval'
  | 'in_progress';

/**
 * State for multi-turn conversations with persistence and approval gates
 * @template TTools - The tools array type for proper type inference
 */
export interface ConversationState<TTools extends readonly Tool[] = readonly Tool[]> {
  /** Unique identifier for this conversation */
  id: string;
  /** Full message history */
  messages: models.OpenResponsesInput;
  /** Previous response ID for chaining (OpenRouter server-side optimization) */
  previousResponseId?: string;
  /** Tool calls awaiting human approval */
  pendingToolCalls?: Array<ParsedToolCall<TTools[number]>>;
  /** Tool results executed but not yet sent to the model */
  unsentToolResults?: Array<UnsentToolResult<TTools>>;
  /** Partial response data captured during interruption */
  partialResponse?: PartialResponse<TTools>;
  /** Signal from a new request to interrupt this conversation */
  interruptedBy?: string;
  /** Current status of the conversation */
  status: ConversationStatus;
  /** Creation timestamp (Unix ms) */
  createdAt: number;
  /** Last update timestamp (Unix ms) */
  updatedAt: number;
}

/**
 * State accessor for loading and saving conversation state
 * Enables any storage backend (memory, Redis, database, etc.)
 * @template TTools - The tools array type for proper type inference
 */
export interface StateAccessor<TTools extends readonly Tool[] = readonly Tool[]> {
  /** Load the current conversation state, or null if none exists */
  load: () => Promise<ConversationState<TTools> | null>;
  /** Save the conversation state */
  save: (state: ConversationState<TTools>) => Promise<void>;
}

// =============================================================================
// Approval Detection Helper Types
// =============================================================================

/**
 * Check if a single tool has approval configured (non-false, non-undefined)
 * Returns true if the tool definitely requires approval,
 * false if it definitely doesn't, or boolean if it's uncertain
 */
export type ToolHasApproval<T extends Tool> =
  T extends { function: { requireApproval: true | ToolApprovalCheck<unknown> } }
    ? true
    : T extends { function: { requireApproval: false } }
      ? false
      : T extends { function: { requireApproval: undefined } }
        ? false
        : boolean; // Could be either (optional property)

/**
 * Check if ANY tool in an array has approval configured
 * Returns true if at least one tool might require approval
 */
export type HasApprovalTools<TTools extends readonly Tool[]> =
  TTools extends readonly [infer First extends Tool, ...infer Rest extends Tool[]]
    ? ToolHasApproval<First> extends true
      ? true
      : HasApprovalTools<Rest>
    : false;

/**
 * Type guard to check if a tool has approval configured at runtime
 */
export function toolHasApprovalConfigured(tool: Tool): boolean {
  const requireApproval = tool.function.requireApproval;
  return requireApproval === true || typeof requireApproval === 'function';
}

/**
 * Type guard to check if any tools in array have approval configured at runtime
 */
export function hasApprovalRequiredTools(tools: readonly Tool[]): boolean {
  return tools.some(toolHasApprovalConfigured);
}
