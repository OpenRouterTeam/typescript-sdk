import { z, ZodType, ZodObject, ZodRawShape } from "zod";
import * as models from "../models/index.js";

/**
 * Turn context passed to tool execute functions
 * Contains information about the current conversation state
 */
export interface TurnContext {
  /** Number of tool execution turns so far (1-indexed: first turn = 1) */
  numberOfTurns: number;
  /** Current message history being sent to the API */
  messageHistory: models.OpenResponsesInput;
  /** Model name if request.model is set */
  model?: string;
  /** Model names if request.models is set */
  models?: string[];
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
  TOutput extends ZodType = ZodType<any>
> extends BaseToolFunction<TInput> {
  outputSchema?: TOutput;
  execute: (
    params: z.infer<TInput>,
    context?: TurnContext
  ) => Promise<z.infer<TOutput>> | z.infer<TOutput>;
}

/**
 * Generator-based tool with async generator execute function and eventSchema
 * Follows Vercel AI SDK pattern:
 * - All yielded values are "preliminary results" (streamed to UI)
 * - Last yielded value is the "final result" (sent to model)
 */
export interface ToolFunctionWithGenerator<
  TInput extends ZodObject<ZodRawShape>,
  TEvent extends ZodType = ZodType<any>
> extends BaseToolFunction<TInput> {
  eventSchema: TEvent;
  execute: (
    params: z.infer<TInput>,
    context?: TurnContext
  ) => AsyncGenerator<z.infer<TEvent>>;
}

/**
 * Manual tool without execute function - requires manual handling by developer
 */
export interface ManualToolFunction<
  TInput extends ZodObject<ZodRawShape>,
  TOutput extends ZodType = ZodType<any>
> extends BaseToolFunction<TInput> {
  outputSchema?: TOutput;
}

/**
 * Tool with execute function (regular or generator)
 */
export type ToolWithExecute<
  TInput extends ZodObject<ZodRawShape> = ZodObject<ZodRawShape>,
  TOutput extends ZodType = ZodType<any>
> = {
  type: "function";
  function: ToolFunctionWithExecute<TInput, TOutput>;
};

/**
 * Tool with generator execute function
 */
export type ToolWithGenerator<
  TInput extends ZodObject<ZodRawShape> = ZodObject<ZodRawShape>,
  TEvent extends ZodType = ZodType<any>
> = {
  type: "function";
  function: ToolFunctionWithGenerator<TInput, TEvent>;
};

/**
 * Tool without execute function (manual handling)
 */
export type ManualTool<
  TInput extends ZodObject<ZodRawShape> = ZodObject<ZodRawShape>,
  TOutput extends ZodType = ZodType<any>
> = {
  type: "function";
  function: ManualToolFunction<TInput, TOutput>;
};

/**
 * Union type of all enhanced tool types
 */
export type EnhancedTool =
  | ToolWithExecute<any, any>
  | ToolWithGenerator<any, any>
  | ManualTool<any, any>;

/**
 * Type guard to check if a tool has an execute function
 */
export function hasExecuteFunction(
  tool: EnhancedTool
): tool is ToolWithExecute | ToolWithGenerator {
  return "execute" in tool.function && typeof tool.function.execute === "function";
}

/**
 * Type guard to check if a tool uses a generator (has eventSchema)
 */
export function isGeneratorTool(
  tool: EnhancedTool
): tool is ToolWithGenerator {
  return "eventSchema" in tool.function;
}

/**
 * Type guard to check if a tool is a regular execution tool (not generator)
 */
export function isRegularExecuteTool(
  tool: EnhancedTool
): tool is ToolWithExecute {
  return hasExecuteFunction(tool) && !isGeneratorTool(tool);
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
export type MaxToolRounds =
  | number
  | ((context: TurnContext) => boolean); // Return true to allow another turn, false to stop

/**
 * Result of executeTools operation
 */
export interface ExecuteToolsResult {
  finalResponse: any; // ResponseWrapper (avoiding circular dependency)
  allResponses: any[]; // All ResponseWrappers from each round
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
  parameters: { [k: string]: any | null } | null;
}

/**
 * Enhanced stream event types for getFullResponsesStream
 * Extends OpenResponsesStreamEvent with tool preliminary results
 */
export type EnhancedResponseStreamEvent =
  | { _tag: "original"; event: any } // Original OpenResponsesStreamEvent
  | {
      _tag: "tool_preliminary";
      type: "tool.preliminary_result";
      toolCallId: string;
      result: unknown;
      timestamp: number;
    };

/**
 * Tool stream event types for getToolStream
 * Includes both argument deltas and preliminary results
 */
export type ToolStreamEvent =
  | { type: "delta"; content: string }
  | {
      type: "preliminary_result";
      toolCallId: string;
      result: unknown;
    };

/**
 * Chat stream event types for getFullChatStream
 * Includes content deltas, completion events, and tool preliminary results
 */
export type ChatStreamEvent =
  | { type: "content.delta"; delta: string }
  | { type: "message.complete"; response: any }
  | {
      type: "tool.preliminary_result";
      toolCallId: string;
      result: unknown;
    }
  | { type: string; event: any }; // Pass-through for other events
