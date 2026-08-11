import type { StandardSchemaV1 } from '@standard-schema/spec';
import type { $ZodType } from 'zod/v4/core';
import type { $ZodObject, $ZodShape } from 'zod/v4/core';
import type {
  APITool,
  ParsedToolCall,
  Tool,
  ToolExecutionResult,
  TurnContext,
  ToolExecuteContext,
  ToolSchema,
  InferSchemaOutput,
} from './tool-types.js';

import * as z4 from 'zod/v4';
import { hasExecuteFunction, isGeneratorTool, isRegularExecuteTool } from './tool-types.js';
import { type ToolContextStore, buildToolExecuteContext } from './tool-context.js';

// Re-export ZodError for convenience
export const ZodError = z4.ZodError;

export class StandardSchemaError extends Error {
  readonly issues: ReadonlyArray<StandardSchemaV1.Issue>;

  constructor(issues: ReadonlyArray<StandardSchemaV1.Issue>) {
    super('Standard Schema validation failed');
    this.name = 'StandardSchemaError';
    this.issues = issues;
  }
}

/**
 * Typeguard to check if a value is a non-null object (not an array).
 */
function isNonNullObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Recursively remove keys prefixed with ~ from an object.
 * These are metadata properties (like ~standard from Standard Schema)
 * that should not be sent to downstream providers.
 * @see https://github.com/OpenRouterTeam/typescript-sdk/issues/131
 *
 * When given a Record<string, unknown>, returns Record<string, unknown>.
 * When given unknown, returns unknown (preserves primitives, null, etc).
 */
export function sanitizeJsonSchema(obj: Record<string, unknown>): Record<string, unknown>;
export function sanitizeJsonSchema(obj: unknown): unknown;
export function sanitizeJsonSchema(obj: unknown): unknown {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(sanitizeJsonSchema);
  }

  // At this point, obj is a non-null, non-array object
  // Use typeguard to narrow the type for type-safe property access
  if (!isNonNullObject(obj)) {
    return obj;
  }

  const result: Record<string, unknown> = {};
  for (const key of Object.keys(obj)) {
    if (!key.startsWith('~')) {
      result[key] = sanitizeJsonSchema(obj[key]);
    }
  }
  return result;
}

/**
 * Typeguard to check if a value is a valid Zod schema compatible with zod/v4.
 * Zod schemas have a _zod property that contains schema metadata.
 */
function isZodSchema(value: unknown): value is z4.ZodType {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  if (!('_zod' in value)) {
    return false;
  }
  // After the 'in' check, TypeScript knows value has _zod property
  return typeof value._zod === 'object';
}

function isStandardSchema(value: unknown): value is StandardSchemaV1 {
  return typeof value === 'object'
    && value !== null
    && '~standard' in value
    && typeof value['~standard'] === 'object'
    && value['~standard'] !== null
    && 'validate' in value['~standard']
    && typeof value['~standard'].validate === 'function';
}

/**
 * Convert a Zod schema to JSON Schema using Zod v4's toJSONSchema function.
 * Accepts ZodType from the main zod package for user compatibility.
 * The resulting schema is sanitized to remove metadata properties (like ~standard)
 * that would cause 400 errors with downstream providers.
 */
export function convertZodToJsonSchema(zodSchema: $ZodType): Record<string, unknown> {
  if (!isZodSchema(zodSchema)) {
    throw new Error('Invalid Zod schema provided');
  }
  // Use draft-7 as it's closest to OpenAPI 3.0's JSON Schema variant
  const jsonSchema = z4.toJSONSchema(zodSchema, {
    target: 'draft-7',
  });
  // jsonSchema is always a Record<string, unknown> from toJSONSchema
  // The overloaded sanitizeJsonSchema preserves this type
  return sanitizeJsonSchema(jsonSchema);
}

/**
 * Convert tools to OpenRouter API format
 * Accepts readonly arrays for better type compatibility
 */
export function convertToolsToAPIFormat(tools: readonly Tool[]): APITool[] {
  return tools.map((tool) => {
    const parameters = isZodSchema(tool.function.inputSchema)
      ? convertZodToJsonSchema(tool.function.inputSchema)
      : tool.function.inputJsonSchema;

    if (!parameters) {
      throw new Error(
        `Tool "${tool.function.name}" must provide inputJsonSchema when inputSchema is not a Zod schema`,
      );
    }

    return {
      type: 'function' as const,
      name: tool.function.name,
      description: tool.function.description || null,
      strict: null,
      parameters: sanitizeJsonSchema(parameters),
    };
  });
}

/**
 * Validate tool input against Zod schema
 * @throws ZodError if validation fails
 */
function validateSchema<T extends ToolSchema>(
  schema: T,
  value: unknown,
): InferSchemaOutput<T> | Promise<InferSchemaOutput<T>> {
  if (isZodSchema(schema)) {
    return z4.parse(schema, value) as InferSchemaOutput<T>;
  }
  if (!isStandardSchema(schema)) {
    throw new Error('Invalid tool schema provided');
  }

  return Promise.resolve(schema['~standard'].validate(value)).then((result) => {
    if (result.issues) {
      throw new StandardSchemaError(result.issues);
    }
    return result.value as InferSchemaOutput<T>;
  });
}

/** Validate tool input against its schema. Zod validation remains synchronous. */
export function validateToolInput<T>(schema: $ZodType<T>, args: unknown): T;
export function validateToolInput<T extends StandardSchemaV1>(
  schema: T,
  args: unknown,
): Promise<StandardSchemaV1.InferOutput<T>>;
export function validateToolInput<T extends ToolSchema>(
  schema: T,
  args: unknown,
): InferSchemaOutput<T> | Promise<InferSchemaOutput<T>> {
  return validateSchema(schema, args);
}

/** Validate tool output against its schema. Zod validation remains synchronous. */
export function validateToolOutput<T>(schema: $ZodType<T>, result: unknown): T;
export function validateToolOutput<T extends StandardSchemaV1>(
  schema: T,
  result: unknown,
): Promise<StandardSchemaV1.InferOutput<T>>;
export function validateToolOutput<T extends ToolSchema>(
  schema: T,
  result: unknown,
): InferSchemaOutput<T> | Promise<InferSchemaOutput<T>> {
  return validateSchema(schema, result);
}

/** Try to validate a value against a schema without throwing. */
async function tryValidate(schema: ToolSchema, value: unknown): Promise<boolean> {
  try {
    await validateSchema(schema, value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Parse tool call arguments from JSON string.
 * Treats empty/whitespace-only strings as an empty object — some providers
 * return `arguments: ""` for tools that take no parameters.
 */
export function parseToolCallArguments(argumentsString: string): unknown {
  const trimmed = argumentsString.trim();
  if (!trimmed) {
    return {};
  }
  try {
    return JSON.parse(trimmed);
  } catch (error) {
    throw new Error(
      `Failed to parse tool call arguments: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }
}

/**
 * Build a ToolExecuteContext for a tool from a TurnContext and optional context store
 */
function buildExecuteCtx(
  tool: Tool,
  turnContext: TurnContext,
  contextStore?: ToolContextStore,
  sharedSchema?: $ZodObject<$ZodShape>,
): ToolExecuteContext {
  return buildToolExecuteContext(
    turnContext,
    contextStore,
    tool.function.name,
    tool.function.contextSchema,
    sharedSchema,
  );
}

/**
 * Execute a regular (non-generator) tool
 */
export async function executeRegularTool(
  tool: Tool,
  toolCall: ParsedToolCall<Tool>,
  context: TurnContext,
  contextStore?: ToolContextStore,
  sharedSchema?: $ZodObject<$ZodShape>,
): Promise<ToolExecutionResult<Tool>> {
  if (!isRegularExecuteTool(tool)) {
    throw new Error(
      `Tool "${toolCall.name}" is not a regular execute tool or has no execute function`,
    );
  }

  try {
    const validatedInput = await validateToolInput(tool.function.inputSchema, toolCall.arguments);
    const executeContext = buildExecuteCtx(tool, context, contextStore, sharedSchema);

    // Execute tool with context
    const result = await Promise.resolve(tool.function.execute(validatedInput, executeContext));

    // Validate output if schema is provided
    if (tool.function.outputSchema) {
      const validatedOutput = await validateToolOutput(tool.function.outputSchema, result);

      return {
        toolCallId: toolCall.id,
        toolName: toolCall.name,
        result: validatedOutput,
      };
    }

    return {
      toolCallId: toolCall.id,
      toolName: toolCall.name,
      result,
    };
  } catch (error) {
    return {
      toolCallId: toolCall.id,
      toolName: toolCall.name,
      result: null,
      error: error instanceof Error ? error : new Error(String(error)),
    };
  }
}

/**
 * Execute a generator tool and collect preliminary and final results
 * - Intermediate yields are validated against eventSchema (preliminary events)
 * - Last yield is validated against outputSchema (final result sent to model)
 * - Generator must emit at least one value
 */
export async function executeGeneratorTool(
  tool: Tool,
  toolCall: ParsedToolCall<Tool>,
  context: TurnContext,
  onPreliminaryResult?: (toolCallId: string, result: unknown) => void,
  contextStore?: ToolContextStore,
  sharedSchema?: $ZodObject<$ZodShape>,
): Promise<ToolExecutionResult<Tool>> {
  if (!isGeneratorTool(tool)) {
    throw new Error(`Tool "${toolCall.name}" is not a generator tool`);
  }

  try {
    const validatedInput = await validateToolInput(tool.function.inputSchema, toolCall.arguments);
    const executeContext = buildExecuteCtx(tool, context, contextStore, sharedSchema);

    const preliminaryResults: unknown[] = [];
    let finalResult: unknown;
    let hasFinalResult = false;
    let lastEmittedValue: unknown;
    let hasEmittedValue = false;

    const iterator = tool.function.execute(validatedInput, executeContext);
    let iterResult = await iterator.next();

    while (!iterResult.done) {
      const event = iterResult.value;
      lastEmittedValue = event;
      hasEmittedValue = true;

      const matchesOutputSchema = await tryValidate(tool.function.outputSchema, event);
      const matchesEventSchema = await tryValidate(tool.function.eventSchema, event);

      if (matchesOutputSchema && !matchesEventSchema && !hasFinalResult) {
        finalResult = await validateToolOutput(tool.function.outputSchema, event);
        hasFinalResult = true;
      } else {
        const validatedPreliminary = await validateToolOutput(tool.function.eventSchema, event);
        preliminaryResults.push(validatedPreliminary);
        if (onPreliminaryResult) {
          onPreliminaryResult(toolCall.id, validatedPreliminary);
        }
      }

      iterResult = await iterator.next();
    }

    if (iterResult.value !== undefined) {
      finalResult = await validateToolOutput(tool.function.outputSchema, iterResult.value);
      hasFinalResult = true;
    }

    if (!hasFinalResult) {
      if (!hasEmittedValue) {
        throw new Error(
          `Generator tool "${toolCall.name}" completed without emitting any values or returning a result`,
        );
      }
      finalResult = await validateToolOutput(tool.function.outputSchema, lastEmittedValue);
    }

    return {
      toolCallId: toolCall.id,
      toolName: toolCall.name,
      result: finalResult,
      preliminaryResults,
    };
  } catch (error) {
    return {
      toolCallId: toolCall.id,
      toolName: toolCall.name,
      result: null,
      error: error instanceof Error ? error : new Error(String(error)),
    };
  }
}

/**
 * Execute a tool call
 * Automatically detects if it's a regular or generator tool
 */
export async function executeTool(
  tool: Tool,
  toolCall: ParsedToolCall<Tool>,
  context: TurnContext,
  onPreliminaryResult?: (toolCallId: string, result: unknown) => void,
  contextStore?: ToolContextStore,
  sharedSchema?: $ZodObject<$ZodShape>,
): Promise<ToolExecutionResult<Tool>> {
  if (!hasExecuteFunction(tool)) {
    throw new Error(`Tool "${toolCall.name}" has no execute function. Use manual tool execution.`);
  }

  if (isGeneratorTool(tool)) {
    return executeGeneratorTool(tool, toolCall, context, onPreliminaryResult, contextStore, sharedSchema);
  }

  return executeRegularTool(tool, toolCall, context, contextStore, sharedSchema);
}

/**
 * Find a tool by name in the tools array
 */
export function findToolByName(tools: Tool[], name: string): Tool | undefined {
  return tools.find((tool) => tool.function.name === name);
}

/**
 * Format tool execution result as a string for sending to the model
 */
export function formatToolResultForModel(result: ToolExecutionResult<Tool>): string {
  if (result.error) {
    return JSON.stringify({
      error: result.error.message,
      toolName: result.toolName,
    });
  }

  return JSON.stringify(result.result);
}

/**
 * Create a user-friendly error message for tool execution errors
 */
export function formatToolExecutionError(error: Error, toolCall: ParsedToolCall<Tool>): string {
  if (error instanceof ZodError || error instanceof StandardSchemaError) {
    const issues = error.issues.map((issue) => ({
      path: issue.path
        ?.map((segment) => typeof segment === 'object' ? segment.key : segment)
        .join('.') ?? '',
      message: issue.message,
    }));

    return `Tool "${toolCall.name}" validation error:\n${JSON.stringify(issues, null, 2)}`;
  }

  return `Tool "${toolCall.name}" execution error: ${error.message}`;
}
