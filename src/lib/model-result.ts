import type { OpenRouterCore } from "../core.js";
import type * as models from "../models/index.js";
import type { EventStream } from "./event-streams.js";
import type { RequestOptions } from "./sdks.js";
import type {
  ChatStreamEvent,
  EnhancedResponseStreamEvent,
  InferToolEventsUnion,
  Tool,
  MaxToolRounds,
  ParsedToolCall,
  ToolStreamEvent,
  TurnChange,
  TurnContext,
  TypedToolCallUnion,
} from "./tool-types.js";

import { betaResponsesSend } from "../funcs/betaResponsesSend.js";
import { ReusableReadableStream } from "./reusable-stream.js";
import {
  buildResponsesMessageStream,
  buildToolCallStream,
  consumeStreamForCompletion,
  convertToClaudeMessage,
  extractMessageFromResponse,
  extractReasoningDeltas,
  extractResponsesMessageFromResponse,
  extractTextDeltas,
  extractTextFromResponse,
  extractToolCallsFromResponse,
  extractToolDeltas,
} from "./stream-transformers.js";
import { executeTool } from "./tool-executor.js";
import {
  hasExecuteFunction,
  hasNextTurnParams,
  buildTurnContext,
  normalizeInputToArray,
} from "./tool-types.js";

export interface GetResponseOptions<TTools extends readonly Tool[] = Tool[]> {
  request: models.OpenResponsesRequest;
  client: OpenRouterCore;
  options?: RequestOptions;
  tools?: TTools;
  maxToolRounds?: MaxToolRounds;
}

/**
 * A wrapper around a streaming response that provides multiple consumption patterns.
 *
 * Allows consuming the response in multiple ways:
 * - `await result.getText()` - Get just the text
 * - `await result.getResponse()` - Get the full response object
 * - `for await (const delta of result.getTextStream())` - Stream text deltas
 * - `for await (const msg of result.getNewMessagesStream())` - Stream incremental message updates
 * - `for await (const event of result.getFullResponsesStream())` - Stream all response events
 *
 * For message format conversion, use the helper functions:
 * - `toChatMessage(response)` for OpenAI chat format
 * - `toClaudeMessage(response)` for Anthropic Claude format
 *
 * All consumption patterns can be used concurrently thanks to the underlying
 * ReusableReadableStream implementation.
 */
export class ResponseWrapper<TTools extends readonly Tool[] = Tool[]> {
  private reusableStream: ReusableReadableStream<models.OpenResponsesStreamEvent> | null =
    null;
  private streamPromise: Promise<
    EventStream<models.OpenResponsesStreamEvent>
  > | null = null;
  private chatMessagePromise: Promise<models.AssistantMessage> | null = null;
  private claudeMessagePromise: Promise<models.ClaudeMessage> | null = null;
  private textPromise: Promise<string> | null = null;
  private options: GetResponseOptions<TTools>;
  private initPromise: Promise<void> | null = null;
  private toolExecutionPromise: Promise<void> | null = null;
  private finalResponse: models.OpenResponsesNonStreamingResponse | null = null;
  private preliminaryResults: Map<string, unknown[]> = new Map();
  private allToolExecutionRounds: Array<{
    round: number;
    toolCalls: ParsedToolCall[];
    response: models.OpenResponsesNonStreamingResponse;
  }> = [];

  constructor(options: GetResponseOptions<TTools>) {
    this.options = options;
  }

  /**
   * Type guard to check if a value is a non-streaming response
   */
  private isNonStreamingResponse(
    value: unknown
  ): value is models.OpenResponsesNonStreamingResponse {
    return (
      value !== null &&
      typeof value === "object" &&
      "id" in value &&
      "object" in value &&
      "output" in value &&
      !("toReadableStream" in value)
    );
  }

  /**
   * Type guard to check if a value is an EventStream
   */
  private isEventStream(
    value: unknown
  ): value is EventStream<models.OpenResponsesStreamEvent> {
    return (
      value !== null && typeof value === "object" && "toReadableStream" in value
    );
  }

  /**
   * Creates a TurnContext with the given input, changes, and optional mutations.
   * Uses the stored options for request params, tools, and maxToolRounds.
   *
   * @param input - The current conversation input
   * @param changes - Array of changes made this turn
   * @param mutations - Optional request param mutations from tools' nextTurnParams
   */
  private createTurnContext(
    input: models.OpenResponsesInput,
    changes: TurnChange<TTools>[],
    mutations?: Record<string, unknown>
  ): TurnContext<TTools> {
    // Extract non-tool/non-input properties from request for context
    const {
      input: _input,
      stream: _stream,
      tools: _tools,
      ...requestParams
    } = this.options.request;

    const baseRequest = mutations
      ? { ...requestParams, ...mutations }
      : requestParams;

    return buildTurnContext<TTools>({
      request: baseRequest,
      input,
      changes,
      ...(this.options.tools !== undefined
        ? { tools: this.options.tools }
        : {}),
      ...(this.options.maxToolRounds !== undefined
        ? { maxToolRounds: this.options.maxToolRounds }
        : {}),
    });
  }

  /**
   * Type guard to check if a value is an EventStream
   */
  private isEventStream(
    value: unknown
  ): value is EventStream<models.OpenResponsesStreamEvent> {
    return (
      value !== null && typeof value === "object" && "toReadableStream" in value
    );
  }

  /**
   * Creates a TurnContext with the given input, changes, and optional mutations.
   * Uses the stored options for request params, tools, and maxToolRounds.
   *
   * @param input - The current conversation input
   * @param changes - Array of changes made this turn
   * @param mutations - Optional request param mutations from tools' nextTurnParams
   */
  private createTurnContext(
    input: models.OpenResponsesInput,
    changes: TurnChange<TTools>[],
    mutations?: Record<string, unknown>
  ): TurnContext<TTools> {
    // Extract non-tool/non-input properties from request for context
    const {
      input: _input,
      stream: _stream,
      tools: _tools,
      ...requestParams
    } = this.options.request;

    const baseRequest = mutations
      ? { ...requestParams, ...mutations }
      : requestParams;

    return buildTurnContext<TTools>({
      request: baseRequest,
      input,
      changes,
      ...(this.options.tools !== undefined
        ? { tools: this.options.tools }
        : {}),
      ...(this.options.maxToolRounds !== undefined
        ? { maxToolRounds: this.options.maxToolRounds }
        : {}),
    });
  }

  /**
   * Initialize the stream if not already started
   * This is idempotent - multiple calls will return the same promise
   */
  private initStream(): Promise<void> {
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = (async () => {
      // Force stream mode
      const request = {
        ...this.options.request,
        stream: true as const,
      };

      // Create the stream promise
      this.streamPromise = betaResponsesSend(
        this.options.client,
        request,
        this.options.options
      ).then((result) => {
        if (!result.ok) {
          throw result.error;
        }
        return result.value;
      });

      // Wait for the stream and create the reusable stream
      const eventStream = await this.streamPromise;
      this.reusableStream = new ReusableReadableStream(eventStream);
    })();

    return this.initPromise;
  }

  /**
   * Execute tools automatically if they are provided and have execute functions
   * This is idempotent - multiple calls will return the same promise
   */
  private async executeToolsIfNeeded(): Promise<void> {
    if (this.toolExecutionPromise) {
      return this.toolExecutionPromise;
    }

    this.toolExecutionPromise = (async () => {
      await this.initStream();

      if (!this.reusableStream) {
        throw new Error("Stream not initialized");
      }

      // Get the initial response
      const initialResponse = await consumeStreamForCompletion(
        this.reusableStream
      );

      // Check if we have tools and if auto-execution is enabled
      const shouldAutoExecute =
        this.options.tools &&
        this.options.tools.length > 0 &&
        initialResponse.output.some(
          (item) => "type" in item && item.type === "function_call"
        );

      if (!shouldAutoExecute) {
        // No tools to execute, use initial response
        this.finalResponse = initialResponse;
        return;
      }

      // Extract tool calls
      const toolCalls = extractToolCallsFromResponse(initialResponse);

      // Check if any have execute functions
      const executableTools = toolCalls.filter((toolCall) => {
        const tool = this.options.tools?.find(
          (t) => t.function.name === toolCall.name
        );
        return tool && hasExecuteFunction(tool);
      });

      if (executableTools.length === 0) {
        // No executable tools, use initial response
        this.finalResponse = initialResponse;
        return;
      }

      // Get maxToolRounds configuration
      const maxToolRounds = this.options.maxToolRounds ?? 5;

      let currentResponse = initialResponse;
      let currentRound = 0;
      let currentInput: models.OpenResponsesInput1[] =
        normalizeInputToArray(this.options.request.input);

      while (true) {
        const currentToolCalls = extractToolCallsFromResponse(currentResponse);

        if (currentToolCalls.length === 0) {
          break;
        }

        const hasExecutable = currentToolCalls.some((toolCall) => {
          const tool = this.options.tools?.find(
            (t) => t.function.name === toolCall.name
          );
          return tool && hasExecuteFunction(tool);
        });

        if (!hasExecutable) {
          break;
        }

        // Check if we should continue based on maxToolRounds
        if (typeof maxToolRounds === "number") {
          if (currentRound >= maxToolRounds) {
            break;
          }
        } else if (typeof maxToolRounds === "function") {
          // Function signature: (context: TurnContext) => boolean
          const turnContext = this.createTurnContext(currentInput, []);
          const shouldContinue = maxToolRounds(turnContext);
          if (!shouldContinue) {
            break;
          }
        }

        // Store execution round info
        this.allToolExecutionRounds.push({
          round: currentRound,
          toolCalls: currentToolCalls,
          response: currentResponse,
        });

        // Build turn context for tool execution
        const turnContext = this.createTurnContext(currentInput, []);

        // Execute all tool calls
        const toolResults: Array<models.OpenResponsesFunctionCallOutput> = [];
        // Track execution results for changes array
        const executionResults: Array<{
          toolName: string;
          toolCallId: string;
          result: unknown;
          error: Error | undefined;
        }> = [];

        for (const toolCall of currentToolCalls) {
          const tool = this.options.tools?.find(
            (t) => t.function.name === toolCall.name
          );

          if (!tool || !hasExecuteFunction(tool)) {
            continue;
          }

          const result = await executeTool(tool, toolCall, turnContext);

          // Store preliminary results
          if (
            result.preliminaryResults &&
            result.preliminaryResults.length > 0
          ) {
            this.preliminaryResults.set(toolCall.id, result.preliminaryResults);
          }

          // Track execution result for changes array
          executionResults.push({
            toolName: toolCall.name,
            toolCallId: toolCall.id,
            result: result.result,
            error: result.error,
          });

          toolResults.push({
            type: "function_call_output" as const,
            id: `output_${toolCall.id}`,
            callId: toolCall.id,
            output: result.error
              ? JSON.stringify({
                  error: result.error.message,
                })
              : JSON.stringify(result.result),
          });
        }

        // Build new input with tool results
        // For the Responses API, we need to include the tool results in the input
        const newInput: models.OpenResponsesInput1[] = [
          ...(Array.isArray(currentResponse.output)
            ? currentResponse.output
            : [currentResponse.output]),
          ...toolResults,
        ];

        // Update current input for next iteration
        currentInput = newInput;

        // Build changes array starting with tool results
        const changes: TurnChange<TTools>[] = executionResults.map(
          (execResult): TurnChange<TTools> => {
            const change: TurnChange<TTools> = {
              type: "tool_result" as const,
              toolName: execResult.toolName,
              toolCallId: execResult.toolCallId,
              result: execResult.result,
            };
            if (execResult.error !== undefined) {
              change.error = execResult.error;
            }
            return change;
          }
        );

        // Build context with updated input for nextTurnParams
        let nextTurnContext = this.createTurnContext(newInput, changes);

        // Collect and apply request mutations from tools that were called
        // Using Record<string, unknown> allows dynamic key assignment without type assertions
        const accumulatedMutations: Record<string, unknown> = {};

        // Apply in tools array order (for tools that were actually called this turn)
        for (const tool of this.options.tools ?? []) {
          // Find the tool call for this tool (if it was called)
          const toolCall = currentToolCalls.find(
            (tc) => tc.name === tool.function.name
          );

          if (toolCall && hasNextTurnParams(tool)) {
            const nextTurnParams = tool.function.nextTurnParams;
            if (!nextTurnParams) continue;

            const thisDelta: Record<string, unknown> = {};

            // Apply each param mutation (supports sync and async mutators)
            for (const [key, mutator] of Object.entries(nextTurnParams)) {
              if (typeof mutator === "function") {
                // mutator is typed as a function from NextTurnParams
                // First arg is the tool's input params, second is context
                // The toolCall.arguments have been parsed from JSON and validated
                // against the tool's inputSchema by executeTool, so this cast is safe
                const toolParams = toolCall.arguments as Record<string, unknown>;
                const newValue = await Promise.resolve(
                  mutator(toolParams, nextTurnContext)
                );
                thisDelta[key] = newValue;
                accumulatedMutations[key] = newValue;
              }
            }

            // Record this mutation in changes
            if (Object.keys(thisDelta).length > 0) {
              const mutationChange: TurnChange<TTools> = {
                type: "request_mutation",
                source: tool.function.name,
                delta: thisDelta,
              };
              changes.push(mutationChange);

              // Update context for next tool to see accumulated changes
              nextTurnContext = this.createTurnContext(
                newInput,
                [...changes],
                accumulatedMutations
              );
            }
          }
        }

        // Make new request with tool results and accumulated mutations
        // Exclude tools and maxToolRounds from mutations as they're managed separately
        const {
          tools: _tools,
          maxToolRounds: _maxToolRounds,
          ...safeMutations
        } = accumulatedMutations;
        const newRequest: models.OpenResponsesRequest = {
          ...this.options.request,
          ...safeMutations,
          input: newInput,
          stream: false,
        };

        const newResult = await betaResponsesSend(
          this.options.client,
          newRequest,
          this.options.options
        );

        if (!newResult.ok) {
          throw newResult.error;
        }

        // Handle the result - it might be a stream or a response
        const value = newResult.value;
        if (this.isEventStream(value)) {
          // It's a stream, consume it
          const stream = new ReusableReadableStream(value);
          currentResponse = await consumeStreamForCompletion(stream);
        } else if (this.isNonStreamingResponse(value)) {
          currentResponse = value;
        } else {
          throw new Error("Unexpected response type from API");
        }

        currentRound++;
      }

      // Validate the final response has required fields
      if (!currentResponse || !currentResponse.id || !currentResponse.output) {
        throw new Error("Invalid final response: missing required fields");
      }

      // Ensure the response is in a completed state (has output content)
      if (
        !Array.isArray(currentResponse.output) ||
        currentResponse.output.length === 0
      ) {
        throw new Error("Invalid final response: empty or invalid output");
      }

      this.finalResponse = currentResponse;
    })();

    return this.toolExecutionPromise;
  }

  /**
   * Internal helper to get the message after tool execution
   */
  private async getMessageInternal(): Promise<models.AssistantMessage> {
    await this.executeToolsIfNeeded();

    if (!this.finalResponse) {
      throw new Error("Response not available");
    }

    return extractMessageFromResponse(this.finalResponse);
  }

  /**
   * Internal helper to get the text after tool execution
   */
  private async getTextInternal(): Promise<string> {
    await this.executeToolsIfNeeded();

    if (!this.finalResponse) {
      throw new Error("Response not available");
    }

    return extractTextFromResponse(this.finalResponse);
  }

  /**
   * Get the completed message from the response in chat format.
   * This will consume the stream until completion, execute any tools, and extract the first message.
   * Returns an AssistantMessage compatible with OpenAI chat completions API format.
   */
  getChatMessage(): Promise<models.AssistantMessage> {
    if (this.chatMessagePromise) {
      return this.chatMessagePromise;
    }

    this.chatMessagePromise = this.getMessageInternal();
    return this.chatMessagePromise;
  }

  /**
   * Get the completed message in Anthropic Claude format.
   * This will consume the stream until completion, execute any tools, and return
   * a ClaudeMessage compatible with the Anthropic SDK.
   */
  getClaudeMessage(): Promise<models.ClaudeMessage> {
    if (this.claudeMessagePromise) {
      return this.claudeMessagePromise;
    }

    this.claudeMessagePromise = (async () => {
      await this.executeToolsIfNeeded();

      if (!this.finalResponse) {
        throw new Error("Response not available");
      }

      return convertToClaudeMessage(this.finalResponse);
    })();

    return this.claudeMessagePromise;
  }

  /**
   * Get just the text content from the response.
   * This will consume the stream until completion, execute any tools, and extract the text.
   */
  getText(): Promise<string> {
    if (this.textPromise) {
      return this.textPromise;
    }

    this.textPromise = this.getTextInternal();
    return this.textPromise;
  }

  /**
   * Get the complete response object including usage information.
   * This will consume the stream until completion and execute any tools.
   * Returns the full OpenResponsesNonStreamingResponse with usage data (inputTokens, outputTokens, cachedTokens, etc.)
   */
  async getResponse(): Promise<models.OpenResponsesNonStreamingResponse> {
    await this.executeToolsIfNeeded();

    if (!this.finalResponse) {
      throw new Error("Response not available");
    }

    return this.finalResponse;
  }

  /**
   * Stream all response events as they arrive.
   * Multiple consumers can iterate over this stream concurrently.
   * Includes preliminary tool result events after tool execution.
   */
  getFullResponsesStream(): AsyncIterableIterator<
    EnhancedResponseStreamEvent<InferToolEventsUnion<TTools>>
  > {
    return async function* (
      this: ResponseWrapper<TTools>
    ): AsyncGenerator<
      EnhancedResponseStreamEvent<InferToolEventsUnion<TTools>>
    > {
      await this.initStream();
      if (!this.reusableStream) {
        throw new Error("Stream not initialized");
      }

      const consumer = this.reusableStream.createConsumer();

      // Yield original events directly
      for await (const event of consumer) {
        yield event;
      }

      // After stream completes, check if tools were executed and emit preliminary results
      await this.executeToolsIfNeeded();

      // Emit all preliminary results as new event types
      for (const [toolCallId, results] of this.preliminaryResults) {
        for (const result of results) {
          yield {
            type: "tool.preliminary_result" as const,
            toolCallId,
            result: result as InferToolEventsUnion<TTools>,
            timestamp: Date.now(),
          };
        }
      }
    }.call(this);
  }

  /**
   * Stream only text deltas as they arrive.
   * This filters the full event stream to only yield text content.
   */
  getTextStream(): AsyncIterableIterator<string> {
    return async function* (this: ResponseWrapper<TTools>) {
      await this.initStream();
      if (!this.reusableStream) {
        throw new Error("Stream not initialized");
      }

      yield* extractTextDeltas(this.reusableStream);
    }.call(this);
  }

  /**
   * Stream incremental message updates as content is added in responses format.
   * Each iteration yields an updated version of the message with new content.
   * Also yields OpenResponsesFunctionCallOutput after tool execution completes.
   * Returns ResponsesOutputMessage or OpenResponsesFunctionCallOutput compatible with OpenAI Responses API format.
   */
  getNewMessagesStream(): AsyncIterableIterator<
    models.ResponsesOutputMessage | models.OpenResponsesFunctionCallOutput
  > {
    return async function* (this: ResponseWrapper<TTools>) {
      await this.initStream();
      if (!this.reusableStream) {
        throw new Error("Stream not initialized");
      }

      // First yield messages from the stream in responses format
      yield* buildResponsesMessageStream(this.reusableStream);

      // Execute tools if needed
      await this.executeToolsIfNeeded();

      // Yield function call output for each executed tool
      for (const round of this.allToolExecutionRounds) {
        for (const toolCall of round.toolCalls) {
          // Find the tool to check if it was executed
          const tool = this.options.tools?.find(
            (t) => t.function.name === toolCall.name
          );
          if (!tool || !hasExecuteFunction(tool)) {
            continue;
          }

          // Get the result from preliminary results or construct from the response
          const prelimResults = this.preliminaryResults.get(toolCall.id);
          const result =
            prelimResults && prelimResults.length > 0
              ? prelimResults[prelimResults.length - 1] // Last result is the final output
              : undefined;

          // Yield function call output in responses format
          yield {
            role: "tool" as const,
            content: result !== undefined ? JSON.stringify(result) : "",
            toolCallId: toolCall.id,
          } as models.ToolResponseMessage;
        }
      }

      // If tools were executed, yield the final message (if there is one)
      if (this.finalResponse && this.allToolExecutionRounds.length > 0) {
        // Check if the final response contains a message
        const hasMessage = this.finalResponse.output.some(
          (item) => "type" in item && item.type === "message"
        );
        if (hasMessage) {
          yield extractResponsesMessageFromResponse(this.finalResponse);
        }
      }
    }.call(this);
  }

  /**
   * Stream only reasoning deltas as they arrive.
   * This filters the full event stream to only yield reasoning content.
   */
  getReasoningStream(): AsyncIterableIterator<string> {
    return async function* (this: ResponseWrapper<TTools>) {
      await this.initStream();
      if (!this.reusableStream) {
        throw new Error("Stream not initialized");
      }

      yield* extractReasoningDeltas(this.reusableStream);
    }.call(this);
  }

  /**
   * Stream tool call argument deltas and preliminary results.
   * This filters the full event stream to yield:
   * - Tool call argument deltas as { type: "delta", content: string }
   * - Preliminary results as { type: "preliminary_result", toolCallId, result }
   */
  getToolStream(): AsyncIterableIterator<
    ToolStreamEvent<InferToolEventsUnion<TTools>>
  > {
    return async function* (
      this: ResponseWrapper<TTools>
    ): AsyncGenerator<ToolStreamEvent<InferToolEventsUnion<TTools>>> {
      await this.initStream();
      if (!this.reusableStream) {
        throw new Error("Stream not initialized");
      }

      // Yield tool deltas as structured events
      for await (const delta of extractToolDeltas(this.reusableStream)) {
        yield {
          type: "delta" as const,
          content: delta,
        };
      }

      // After stream completes, check if tools were executed and emit preliminary results
      await this.executeToolsIfNeeded();

      // Emit all preliminary results
      for (const [toolCallId, results] of this.preliminaryResults) {
        for (const result of results) {
          yield {
            type: "preliminary_result" as const,
            toolCallId,
            result: result as InferToolEventsUnion<TTools>,
          };
        }
      }
    }.call(this);
  }

  /**
   * Stream events in chat format (compatibility layer).
   * Note: This transforms responses API events into a chat-like format.
   * Includes preliminary tool result events after tool execution.
   *
   * @remarks
   * This is a compatibility method that attempts to transform the responses API
   * stream into a format similar to the chat API. Due to differences in the APIs,
   * this may not be a perfect mapping.
   */
  getFullChatStream(): AsyncIterableIterator<
    ChatStreamEvent<InferToolEventsUnion<TTools>>
  > {
    return async function* (
      this: ResponseWrapper<TTools>
    ): AsyncGenerator<ChatStreamEvent<InferToolEventsUnion<TTools>>> {
      await this.initStream();
      if (!this.reusableStream) {
        throw new Error("Stream not initialized");
      }

      const consumer = this.reusableStream.createConsumer();

      for await (const event of consumer) {
        if (!("type" in event)) {
          continue;
        }

        // Transform responses events to chat-like format
        // This is a simplified transformation - you may need to adjust based on your needs
        if (event.type === "response.output_text.delta") {
          const deltaEvent =
            event as models.OpenResponsesStreamEventResponseOutputTextDelta;
          yield {
            type: "content.delta" as const,
            delta: deltaEvent.delta,
          };
        } else if (event.type === "response.completed") {
          const completedEvent =
            event as models.OpenResponsesStreamEventResponseCompleted;
          yield {
            type: "message.complete" as const,
            response: completedEvent.response,
          };
        } else {
          // Pass through other events
          yield {
            type: event.type,
            event,
          };
        }
      }

      // After stream completes, check if tools were executed and emit preliminary results
      await this.executeToolsIfNeeded();

      // Emit all preliminary results
      for (const [toolCallId, results] of this.preliminaryResults) {
        for (const result of results) {
          yield {
            type: "tool.preliminary_result" as const,
            toolCallId,
            result: result as InferToolEventsUnion<TTools>,
          };
        }
      }
    }.call(this);
  }

  /**
   * Get all tool calls from the completed response (before auto-execution).
   * Note: If tools have execute functions, they will be automatically executed
   * and this will return the tool calls from the initial response.
   * Returns structured tool calls with typed arguments based on tool definitions.
   *
   * @example
   * ```typescript
   * const toolCalls = await response.getToolCalls();
   * // toolCalls[0].arguments is typed based on tool inputSchema
   * ```
   */
  async getToolCalls(): Promise<TypedToolCallUnion<TTools>[]> {
    await this.initStream();
    if (!this.reusableStream) {
      throw new Error("Stream not initialized");
    }

    const completedResponse = await consumeStreamForCompletion(
      this.reusableStream
    );
    return extractToolCallsFromResponse(
      completedResponse
    ) as TypedToolCallUnion<TTools>[];
  }

  /**
   * Stream structured tool call objects as they're completed.
   * Each iteration yields a complete tool call with typed arguments based on tool definitions.
   *
   * @example
   * ```typescript
   * for await (const toolCall of response.getToolCallsStream()) {
   *   // toolCall.arguments is typed based on tool inputSchema
   *   console.log(toolCall.name, toolCall.arguments);
   * }
   * ```
   */
  getToolCallsStream(): AsyncIterableIterator<TypedToolCallUnion<TTools>> {
    return async function* (this: ResponseWrapper<TTools>) {
      await this.initStream();
      if (!this.reusableStream) {
        throw new Error("Stream not initialized");
      }

      for await (const toolCall of buildToolCallStream(this.reusableStream)) {
        yield toolCall as TypedToolCallUnion<TTools>;
      }
    }.call(this);
  }

  /**
   * Cancel the underlying stream and all consumers
   */
  async cancel(): Promise<void> {
    if (this.reusableStream) {
      await this.reusableStream.cancel();
    }
  }
}
