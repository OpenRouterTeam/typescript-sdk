/**
 * Experimental features for enhanced chat completions
 * This file contains custom types and logic for the experimental_send method
 */

import type { ZodType, ZodObject, ZodRawShape } from "zod/v3";
import { zodToJsonSchema } from "zod-to-json-schema";
import type { ChatGenerationParams } from "../models/chatgenerationparams.js";
import type { Message } from "../models/message.js";
import type { ChatResponse } from "../models/chatresponse.js";
import type { ChatStreamingResponseChunk } from "../models/chatstreamingresponsechunk.js";
import type { ChatMessageContentItem } from "../models/chatmessagecontentitem.js";
import type { ResponseFormatJSONSchema } from "../models/responseformatjsonschema.js";
import type { OpenRouterCore } from "../core.js";
import type { RequestOptions } from "./sdks.js";
import { chatSend } from "../funcs/chatSend.js";
import { SendChatCompletionRequestResponse } from "../models/operations/sendchatcompletionrequest.js";
import { EventStream } from "./event-streams.js";
import { MCPManager } from "./mcp-manager.js";
import type { Tool as MCPToolDefinition } from "@modelcontextprotocol/sdk/types.js";

/**
 * MCP (Model Context Protocol) server configuration
 */
export type MCPServerConfig = {
  type: "mcp";
  server_label: string;
  server_description: string;
  server_url: string;
  require_approval: "always" | "never" | "auto";
};

/**
 * Enhanced function tool with Zod schema support and optional run callback
 */
export type ExperimentalFunctionTool<
  TName extends string = string,
  TParams extends ZodObject<ZodRawShape> = ZodObject<ZodRawShape>,
  TReturns extends ZodType<unknown> = ZodType<unknown>
> = {
  type: "function";
  function: {
    name: TName;
    description?: string;
    parameters: TParams;
    returns: TReturns;
    run?: (params: TParams["_output"]) => Promise<TReturns["_output"]> | TReturns["_output"];
  };
};

/**
 * Union of all tool types for experimental_send
 */
export type ExperimentalTool = MCPServerConfig | ExperimentalFunctionTool<string, ZodObject<ZodRawShape>, ZodType<unknown>>;

/**
 * Extract tool map from array of tools for type inference
 */
export type ToolMap<TTools extends readonly ExperimentalTool[]> = {
  [K in TTools[number] as K extends ExperimentalFunctionTool<infer TName, any, any> ? TName : never]: K extends ExperimentalFunctionTool<any, infer TParams, infer TReturns>
    ? { params: TParams["_output"]; returns: TReturns["_output"] }
    : never;
};

/**
 * Extended chat parameters with experimental features
 */
export type ExperimentalChatParams<
  TTools extends readonly ExperimentalTool[] = readonly ExperimentalTool[],
  TOutput extends ZodType<any> = ZodType<any>
> = Omit<ChatGenerationParams, "tools"> & {
  tools?: TTools;
  outputSchema?: TOutput;
};

/**
 * Function call with parsed arguments (for non-streaming)
 */
export type FunctionCall<TToolMap = Record<string, { params: any; returns: any }>> = {
  [K in keyof TToolMap]: {
    name: K;
    arguments: TToolMap[K] extends { params: infer P } ? P : never;
  };
}[keyof TToolMap];

/**
 * Enhanced message type with structured content
 */
export type EnhancedMessage<TToolMap = Record<string, { params: any; returns: any }>> = Message & {
  tool_calls?: Array<{
    id: string;
    type: "function";
    function: {
      name: keyof TToolMap & string;
      arguments: string;
    };
  }>;
  tool_call_id?: string;
  content?: string | null | (TToolMap[keyof TToolMap] extends { returns: infer R } ? R : never);
};

/**
 * Partial function call (for streaming)
 */
type PartialFunctionCall = {
  name: string;
  arguments: string;
};

/**
 * Non-streaming response with enhanced fields
 * Extends ChatResponse to provide both raw access and enhanced fields
 */
export type ExperimentalNonStreamingResponse<
  TToolMap = Record<string, { params: any; returns: any }>,
  TOutput = unknown
> = ChatResponse & {
  raw: ChatResponse;
  allNewMessages: EnhancedMessage<TToolMap>[];
  responseMessage: EnhancedMessage<TToolMap>;
  responseText: string | null;
  responseFunctionCall: FunctionCall<TToolMap> | null;
  output: TOutput | null;
};

/**
 * Chunk for the full stream (all messages)
 */
export type ExperimentalFullStreamChunk<TToolMap = Record<string, { params: any; returns: any }>> = {
  raw: ChatStreamingResponseChunk;
  message: Partial<EnhancedMessage<TToolMap>>;
};

/**
 * Chunk for the response stream (final message only)
 */
export type ExperimentalResponseStreamChunk<
  TToolMap = Record<string, { params: any; returns: any }>,
  TOutput = unknown
> = {
  message: Partial<EnhancedMessage<TToolMap>>;
  text: string | null;
  functionCall: FunctionCall<TToolMap> | null;
  output: TOutput | null;
};

/**
 * Streaming response with two iterator types
 */
export type ExperimentalStreamingResponse<
  TToolMap = Record<string, { params: any; returns: any }>,
  TOutput = unknown
> = {
  fullStream: AsyncIterable<ExperimentalFullStreamChunk<TToolMap>>;
  response: AsyncIterable<ExperimentalResponseStreamChunk<TToolMap, TOutput>>;
};

/**
 * Union response type
 */
export type ExperimentalChatResponse<
  TToolMap = Record<string, { params: any; returns: any }>,
  TOutput = unknown
> =
  | ExperimentalNonStreamingResponse<TToolMap, TOutput>
  | ExperimentalStreamingResponse<TToolMap, TOutput>;

/**
 * JSON Schema type
 */
type JsonSchema = Record<string, unknown>;

/**
 * Convert Zod schema to JSON Schema for API compatibility
 */
function zodSchemaToJsonSchema(zodSchema: ZodType<unknown>): JsonSchema {
  const jsonSchema = zodToJsonSchema(zodSchema, {
    target: "openApi3",
    $refStrategy: "none",
  });

  // Remove top-level $schema property as it's not needed for OpenAPI
  if (jsonSchema && typeof jsonSchema === "object" && "$schema" in jsonSchema) {
    const { $schema: _unused, ...rest } = jsonSchema as JsonSchema & { $schema?: string };
    return rest;
  }

  return jsonSchema as JsonSchema;
}

/**
 * API Tool type - represents tool in API format
 */
type ApiTool = MCPServerConfig | {
  type: "function";
  function: {
    name: string;
    description?: string | undefined;
    parameters: JsonSchema;
  };
};

/**
 * Tool source tracking - maps tool names to their execution source
 */
type ToolSource =
  | { type: "mcp"; serverUrl: string; toolName: string }
  | { type: "function"; tool: ExperimentalFunctionTool<string, ZodObject<ZodRawShape>, ZodType<unknown>> };

/**
 * Convert MCP tool to API format
 */
function convertMCPToolToAPI(mcpTool: MCPToolDefinition): ApiTool {
  return {
    type: "function",
    function: {
      name: mcpTool.name,
      description: mcpTool.description,
      parameters: mcpTool.inputSchema as JsonSchema,
    },
  };
}

/**
 * Convert experimental tools to API-compatible format and build tool source map
 */
async function convertToolsForAPI(
  tools: readonly ExperimentalTool[],
  mcpManager: MCPManager
): Promise<{ apiTools: ApiTool[]; toolSources: Map<string, ToolSource> }> {
  const apiTools: ApiTool[] = [];
  const toolSources = new Map<string, ToolSource>();

  // Separate MCP servers from function tools
  const mcpServers = tools.filter((t) => t.type === "mcp") as MCPServerConfig[];
  const functionTools = tools.filter((t) => t.type === "function") as ExperimentalFunctionTool<string, ZodObject<ZodRawShape>, ZodType<unknown>>[];

  // Add function tools
  for (const tool of functionTools) {
    const apiTool: ApiTool = {
      type: "function",
      function: {
        name: tool.function.name,
        ...(tool.function.description !== undefined && { description: tool.function.description }),
        parameters: zodSchemaToJsonSchema(tool.function.parameters),
      },
    };
    apiTools.push(apiTool);
    toolSources.set(tool.function.name, { type: "function", tool });
  }

  // Get tools from MCP servers
  if (mcpServers.length > 0) {
    const mcpTools = await mcpManager.getAllTools(
      mcpServers.map((server) => ({
        server_url: server.server_url,
        server_label: server.server_label,
        server_description: server.server_description,
      }))
    );

    for (const mcpTool of mcpTools) {
      apiTools.push(convertMCPToolToAPI(mcpTool));
      toolSources.set(mcpTool.name, {
        type: "mcp",
        serverUrl: mcpTool.serverUrl,
        toolName: mcpTool.name,
      });
    }
  }

  return { apiTools, toolSources };
}

/**
 * Extract text content from a message
 */
function extractTextContent(message: Message): string | null {
  if (typeof message.content === "string") {
    return message.content;
  }

  if (Array.isArray(message.content)) {
    const textParts = message.content
      .filter((part: ChatMessageContentItem) => part.type === "text")
      .map((part) => {
        if (part.type === "text") {
          return part.text;
        }
        return "";
      });
    return textParts.length > 0 ? textParts.join("") : null;
  }

  return null;
}

/**
 * Process non-streaming response
 */
async function processNonStreamingResponse<TToolMap, TOutput>(
  response: ChatResponse,
  _tools: readonly ExperimentalTool[],
  outputSchema: ZodType<TOutput> | undefined,
  allMessages: EnhancedMessage<TToolMap>[]
): Promise<ExperimentalNonStreamingResponse<TToolMap, TOutput>> {
  const lastChoice = response.choices[response.choices.length - 1];
  if (!lastChoice) {
    throw new Error("No choices in response");
  }

  const responseMessage = lastChoice.message as EnhancedMessage<TToolMap>;

  const responseText = extractTextContent(responseMessage);

  let responseFunctionCall = null;
  if (responseMessage.tool_calls && responseMessage.tool_calls.length > 0) {
    const toolCall = responseMessage.tool_calls[0];
    if (toolCall) {
      responseFunctionCall = {
        name: toolCall.function.name,
        arguments: JSON.parse(toolCall.function.arguments),
      } as FunctionCall<TToolMap>;
    }
  }

  let output: TOutput | null = null;
  if (outputSchema && responseText) {
    try {
      const parsed = JSON.parse(responseText);
      output = outputSchema.parse(parsed);
    } catch (e) {
      // Output validation failed, return null
      output = null;
    }
  }

  return {
    ...response,
    raw: response,
    allNewMessages: [...allMessages, responseMessage],
    responseMessage,
    responseText,
    responseFunctionCall,
    output,
  };
}

/**
 * Execute tools (both MCP and local function tools) and get results
 */
async function executeTools(
  toolCalls: Array<{ id: string; type: "function"; function: { name: string; arguments: string } }>,
  toolSources: Map<string, ToolSource>,
  mcpManager: MCPManager
): Promise<Message[]> {
  const results: Message[] = [];

  for (const toolCall of toolCalls) {
    const source = toolSources.get(toolCall.function.name);

    if (!source) {
      continue;
    }

    try {
      const args = JSON.parse(toolCall.function.arguments) as Record<string, unknown>;
      let result: unknown;

      if (source.type === "mcp") {
        // Execute MCP tool
        const mcpResult = await mcpManager.callTool(
          source.serverUrl,
          source.toolName,
          args
        );

        // Format MCP result - can be text or structured content
        if (Array.isArray(mcpResult.content)) {
          // Multiple content items
          result = mcpResult.content.map((item) => {
            if (typeof item === "object" && item !== null && "type" in item && item.type === "text" && "text" in item) {
              return (item as { text: string }).text;
            }
            return JSON.stringify(item);
          }).join("\n");
        } else if (mcpResult.content && typeof mcpResult.content === "object" && "text" in mcpResult.content) {
          result = (mcpResult.content as { text: string }).text;
        } else {
          result = mcpResult.content;
        }
      } else {
        // Execute local function tool
        if (!source.tool.function.run) {
          continue;
        }
        result = await source.tool.function.run(args);
      }

      results.push({
        role: "tool" as const,
        toolCallId: toolCall.id,
        content: typeof result === "string" ? result : JSON.stringify(result),
      } as Message);
    } catch (e) {
      results.push({
        role: "tool" as const,
        toolCallId: toolCall.id,
        content: JSON.stringify({ error: String(e) }),
      } as Message);
    }
  }

  return results;
}

/**
 * Main experimental_send implementation
 */
export async function experimental_Send<
  TTools extends readonly ExperimentalTool[] = readonly ExperimentalTool[],
  TOutput = unknown
>(
  client: OpenRouterCore,
  params: ExperimentalChatParams<TTools, ZodType<TOutput>>,
  options?: RequestOptions
): Promise<ExperimentalChatResponse<ToolMap<TTools>, TOutput>> {
  const { tools, outputSchema, ...baseParams } = params;

  // Create MCP manager for this request
  const mcpManager = new MCPManager();

  try {
    // Convert tools to API format and get tool sources
    const { apiTools, toolSources } = tools
      ? await convertToolsForAPI(tools, mcpManager)
      : { apiTools: undefined, toolSources: new Map<string, ToolSource>() };

  // Handle output schema by setting response_format
  let responseFormat = baseParams.responseFormat;
  if (outputSchema && !responseFormat) {
    const jsonSchemaFormat: ResponseFormatJSONSchema = {
      type: "json_schema",
      jsonSchema: {
        name: "output",
        schema: zodSchemaToJsonSchema(outputSchema),
        strict: true,
      },
    };
    responseFormat = jsonSchemaFormat;
  }

  // Track all messages for multi-turn execution
  let allMessages: Message[] = [...baseParams.messages];
  let shouldContinue = true;
  let lastResponse: ChatResponse | undefined;

  // Execute until no more tool calls with run functions
  while (shouldContinue) {
    const apiParams: ChatGenerationParams = {
      ...baseParams,
      messages: allMessages,
      // ApiTool includes MCPTool which is compatible at runtime but not type-safe
      tools: apiTools as ChatGenerationParams["tools"],
      responseFormat,
    };

    const result = await chatSend(client, apiParams, options);

    if (!result.ok) {
      throw result.error;
    }

    const response: SendChatCompletionRequestResponse = result.value;

    // Handle streaming - check if response is an EventStream (ReadableStream)
    if (response instanceof ReadableStream || (response instanceof EventStream)) {
      // For streaming, we can't auto-execute tools, so just return the stream
      return createStreamingResponse<ToolMap<TTools>, TOutput>(response as EventStream<ChatStreamingResponseChunk>, outputSchema);
    }

    // Non-streaming response
    const chatResponse = response as ChatResponse;
    lastResponse = chatResponse;

    const lastChoice = chatResponse.choices[chatResponse.choices.length - 1];
    if (!lastChoice) {
      throw new Error("No choices in response");
    }

    const message = lastChoice.message as EnhancedMessage<ToolMap<TTools>>;

    // Check if there are tool calls that can be executed
    if (message.tool_calls && message.tool_calls.length > 0) {
      // Check if any tool calls can be executed (either local or MCP)
      const hasExecutableTool = message.tool_calls.some((tc) => {
        const source = toolSources.get(tc.function.name);
        if (!source) return false;
        // MCP tools are always executable, local functions need a run callback
        return source.type === "mcp" || (source.type === "function" && source.tool.function.run !== undefined);
      });

      if (hasExecutableTool) {
        // Execute tools and continue
        allMessages.push(message as Message);
        const toolResults = await executeTools(message.tool_calls, toolSources, mcpManager);
        allMessages.push(...toolResults);
        continue;
      }
    }

    // No more tool calls to execute
    shouldContinue = false;
  }

  if (!lastResponse) {
    throw new Error("No response received");
  }

  const newMessages = allMessages.slice(baseParams.messages.length) as EnhancedMessage<ToolMap<TTools>>[];
  return processNonStreamingResponse<ToolMap<TTools>, TOutput>(lastResponse, tools || [], outputSchema, newMessages);
  } finally {
    // Clean up MCP connections
    await mcpManager.closeAll();
  }
}

/**
 * Create streaming response iterators
 */
function createStreamingResponse<TToolMap, TOutput>(
  streamResponse: EventStream<ChatStreamingResponseChunk>,
  outputSchema: ZodType<TOutput> | undefined
): ExperimentalStreamingResponse<TToolMap, TOutput> {
  const fullStreamChunks: ExperimentalFullStreamChunk<TToolMap>[] = [];
  let isFullStreamConsumed = false;

  const fullStream: AsyncIterable<ExperimentalFullStreamChunk<TToolMap>> = {
    async *[Symbol.asyncIterator]() {
      if (isFullStreamConsumed) {
        // Replay from cache
        for (const chunk of fullStreamChunks) {
          yield chunk;
        }
        return;
      }

      // EventStream is already async iterable
      for await (const chunk of streamResponse) {
        const delta = chunk.data.choices?.[0]?.delta;
        const enhancedChunk: ExperimentalFullStreamChunk<TToolMap> = {
          raw: chunk,
          message: delta as Partial<EnhancedMessage<TToolMap>> || {},
        };

        fullStreamChunks.push(enhancedChunk);
        yield enhancedChunk;
      }

      isFullStreamConsumed = true;
    },
  };

  const response: AsyncIterable<ExperimentalResponseStreamChunk<TToolMap, TOutput>> = {
    async *[Symbol.asyncIterator]() {
      let accumulatedText = "";
      let accumulatedPartialCall: PartialFunctionCall | null = null;

      for await (const chunk of fullStream) {
        const delta = chunk.message;

        let text: string | null = null;
        if (delta.content && typeof delta.content === "string") {
          accumulatedText += delta.content;
          text = delta.content;
        }

        let functionCall: FunctionCall<TToolMap> | null = null;
        if (delta.tool_calls && delta.tool_calls.length > 0) {
          const toolCall = delta.tool_calls[0];
          if (toolCall) {
            if (!accumulatedPartialCall) {
              accumulatedPartialCall = {
                name: toolCall.function.name || "",
                arguments: toolCall.function.arguments || "",
              };
            } else {
              accumulatedPartialCall.arguments += toolCall.function.arguments || "";
            }

            // Try to parse arguments if we have a complete JSON string
            try {
              const parsedArgs = JSON.parse(accumulatedPartialCall.arguments);
              functionCall = {
                name: accumulatedPartialCall.name,
                arguments: parsedArgs as Record<string, unknown>,
              } as FunctionCall<TToolMap>;
            } catch (e) {
              // Arguments not complete yet, skip
              functionCall = null;
            }
          }
        }

        let output: TOutput | null = null;
        if (outputSchema && accumulatedText) {
          try {
            const parsed = JSON.parse(accumulatedText);
            output = outputSchema.parse(parsed);
          } catch (e) {
            // Not valid yet or validation failed
            output = null;
          }
        }

        yield {
          message: delta,
          text,
          functionCall,
          output,
        };
      }
    },
  };

  return {
    fullStream,
    response,
  };
}
