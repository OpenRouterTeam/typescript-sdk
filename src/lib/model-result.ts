import type { OpenRouterCore } from '../core.js';
import type * as models from '../models/index.js';
import type { CallModelInput } from './async-params.js';
import type { EventStream } from './event-streams.js';
import type { RequestOptions } from './sdks.js';
import type {
  ChatStreamEvent,
  EnhancedResponseStreamEvent,
  ParsedToolCall,
  Tool,
  ToolStreamEvent,
  TurnContext,
} from './tool-types.js';

import { betaResponsesSend } from '../funcs/betaResponsesSend.js';
import {
  hasAsyncFunctions,
  resolveAsyncFunctions,
  type ResolvedCallModelInput,
} from './async-params.js';
import { ReusableReadableStream } from './reusable-stream.js';
import {
  buildResponsesMessageStream,
  buildToolCallStream,
  consumeStreamForCompletion,
  extractReasoningDeltas,
  extractResponsesMessageFromResponse,
  extractTextDeltas,
  extractTextFromResponse,
  extractToolCallsFromResponse,
  extractToolDeltas,
} from './stream-transformers.js';
import { executeTool } from './tool-executor.js';
import { executeNextTurnParamsFunctions, applyNextTurnParamsToRequest } from './next-turn-params.js';
import { hasExecuteFunction } from './tool-types.js';
import { isStopConditionMet } from './stop-conditions.js';

/**
 * Type guard for stream event with toReadableStream method
 */
function isEventStream(value: unknown): value is EventStream<models.OpenResponsesStreamEvent> {
  return (
    value !== null &&
    typeof value === 'object' &&
    'toReadableStream' in value &&
    typeof (
      value as {
        toReadableStream: unknown;
      }
    ).toReadableStream === 'function'
  );
}

/**
 * Type guard for response.output_text.delta events
 */
function isOutputTextDeltaEvent(
  event: models.OpenResponsesStreamEvent,
): event is models.OpenResponsesStreamEventResponseOutputTextDelta {
  return 'type' in event && event.type === 'response.output_text.delta';
}

/**
 * Type guard for response.completed events
 */
function isResponseCompletedEvent(
  event: models.OpenResponsesStreamEvent,
): event is models.OpenResponsesStreamEventResponseCompleted {
  return 'type' in event && event.type === 'response.completed';
}

/**
 * Type guard for output items with a type property
 */
function hasTypeProperty(item: unknown): item is {
  type: string;
} {
  return (
    typeof item === 'object' &&
    item !== null &&
    'type' in item &&
    typeof (
      item as {
        type: unknown;
      }
    ).type === 'string'
  );
}

export interface GetResponseOptions {
  // Request can have async functions that will be resolved before sending to API
  request: CallModelInput;
  client: OpenRouterCore;
  options?: RequestOptions;
  tools?: Tool[];
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
export class ModelResult {
  private reusableStream: ReusableReadableStream<models.OpenResponsesStreamEvent> | null = null;
  private streamPromise: Promise<EventStream<models.OpenResponsesStreamEvent>> | null = null;
  private textPromise: Promise<string> | null = null;
  private options: GetResponseOptions;
  private initPromise: Promise<void> | null = null;
  private toolExecutionPromise: Promise<void> | null = null;
  private finalResponse: models.OpenResponsesNonStreamingResponse | null = null;
  private preliminaryResults: Map<string, unknown[]> = new Map();
  private allToolExecutionRounds: Array<{
    round: number;
    toolCalls: ParsedToolCall[];
    response: models.OpenResponsesNonStreamingResponse;
    toolResults: Array<models.OpenResponsesFunctionCallOutput>;
  }> = [];
  // Track resolved request after async function resolution
  private resolvedRequest: models.OpenResponsesRequest | null = null;

  constructor(options: GetResponseOptions) {
    this.options = options;
  }

  /**
   * Type guard to check if a value is a non-streaming response
   */
  private isNonStreamingResponse(
    value: unknown,
  ): value is models.OpenResponsesNonStreamingResponse {
    return (
      value !== null &&
      typeof value === 'object' &&
      'id' in value &&
      'object' in value &&
      'output' in value &&
      !('toReadableStream' in value)
    );
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
      // Resolve async functions before initial request
      // Build initial turn context (turn 0 for initial request)
      const initialContext: TurnContext = {
        numberOfTurns: 0,
      };

      // Resolve any async functions first
      let baseRequest: ResolvedCallModelInput;
      if (hasAsyncFunctions(this.options.request)) {
        baseRequest = await resolveAsyncFunctions(
          this.options.request,
          initialContext,
        );
      } else {
        // Already resolved, extract non-function fields
        // Since request is CallModelInput, we need to filter out tools/stopWhen
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { tools, stopWhen, ...rest } = this.options.request;
        // Cast to ResolvedCallModelInput - we know it's resolved if hasAsyncFunctions returned false
        baseRequest = rest as ResolvedCallModelInput;
      }

      // Store resolved request with stream mode
      this.resolvedRequest = {
        ...baseRequest,
        stream: true as const,
      };

      // Force stream mode for initial request
      const request = this.resolvedRequest;

      // Create the stream promise
      this.streamPromise = betaResponsesSend(
        this.options.client,
        request,
        this.options.options,
      ).then((result) => {
        if (!result.ok) {
          throw result.error;
        }
        // When stream: true, the API returns EventStream
        // TypeScript can't narrow the union type based on runtime parameter values,
        // so we assert the type here based on our knowledge that stream=true
        return result.value as EventStream<models.OpenResponsesStreamEvent>;
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
        throw new Error('Stream not initialized');
      }

      // Note: Async functions already resolved in initStream()
      // Get the initial response
      const initialResponse = await consumeStreamForCompletion(this.reusableStream);

      // Check if we have tools and if auto-execution is enabled
      const shouldAutoExecute =
        this.options.tools &&
        this.options.tools.length > 0 &&
        initialResponse.output.some(
          (item) => hasTypeProperty(item) && item.type === 'function_call',
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
        const tool = this.options.tools?.find((t) => t.function.name === toolCall.name);
        return tool && hasExecuteFunction(tool);
      });

      if (executableTools.length === 0) {
        // No executable tools, use initial response
        this.finalResponse = initialResponse;
        return;
      }

      let currentResponse = initialResponse;
      let currentRound = 0;

      while (true) {
        // Check stopWhen conditions
        if (this.options.request.stopWhen) {
          const stopConditions = Array.isArray(this.options.request.stopWhen)
            ? this.options.request.stopWhen
            : [this.options.request.stopWhen];

          const shouldStop = await isStopConditionMet({
            stopConditions,
            steps: this.allToolExecutionRounds.map((round) => ({
              stepType: 'continue' as const,
              text: extractTextFromResponse(round.response),
              toolCalls: round.toolCalls,
              toolResults: round.toolResults.map((tr) => ({
                toolCallId: tr.callId,
                toolName: round.toolCalls.find((tc) => tc.id === tr.callId)?.name ?? '',
                result: JSON.parse(tr.output),
              })),
              response: round.response,
              usage: round.response.usage,
              finishReason: undefined, // OpenResponsesNonStreamingResponse doesn't have finishReason
            })),
          });

          if (shouldStop) {
            break;
          }
        }

        const currentToolCalls = extractToolCallsFromResponse(currentResponse);

        if (currentToolCalls.length === 0) {
          break;
        }

        const hasExecutable = currentToolCalls.some((toolCall) => {
          const tool = this.options.tools?.find((t) => t.function.name === toolCall.name);
          return tool && hasExecuteFunction(tool);
        });

        if (!hasExecutable) {
          break;
        }

        // Build turn context for this round (for async parameter resolution only)
        const turnContext: TurnContext = {
          numberOfTurns: currentRound + 1, // 1-indexed
        };

        // Resolve async functions for this turn
        if (hasAsyncFunctions(this.options.request)) {
          const resolved = await resolveAsyncFunctions(
            this.options.request,
            turnContext,
          );
          // Update resolved request with new values
          this.resolvedRequest = {
            ...resolved,
            stream: false, // Tool execution turns don't need streaming
          };
        }

        // Execute all tool calls
        const toolResults: Array<models.OpenResponsesFunctionCallOutput> = [];

        for (const toolCall of currentToolCalls) {
          const tool = this.options.tools?.find((t) => t.function.name === toolCall.name);

          if (!tool || !hasExecuteFunction(tool)) {
            continue;
          }

          const result = await executeTool(tool, toolCall, turnContext);

          // Store preliminary results
          if (result.preliminaryResults && result.preliminaryResults.length > 0) {
            this.preliminaryResults.set(toolCall.id, result.preliminaryResults);
          }

          toolResults.push({
            type: 'function_call_output' as const,
            id: `output_${toolCall.id}`,
            callId: toolCall.id,
            output: result.error
              ? JSON.stringify({
                error: result.error.message,
              })
              : JSON.stringify(result.result),
          });
        }

        // Store execution round info including tool results
        this.allToolExecutionRounds.push({
          round: currentRound,
          toolCalls: currentToolCalls,
          response: currentResponse,
          toolResults,
        });

        // Execute nextTurnParams functions for tools that were called
        if (this.options.tools && currentToolCalls.length > 0) {
          if (!this.resolvedRequest) {
            throw new Error('Request not initialized');
          }

          const computedParams = await executeNextTurnParamsFunctions(
            currentToolCalls,
            this.options.tools,
            this.resolvedRequest
          );

          // Apply computed parameters to the resolved request for next turn
          if (Object.keys(computedParams).length > 0) {
            this.resolvedRequest = applyNextTurnParamsToRequest(
              this.resolvedRequest,
              computedParams
            );
          }
        }

        // Build new input with tool results
        // For the Responses API, we need to include the tool results in the input
        const newInput: models.OpenResponsesInput = [
          ...(Array.isArray(currentResponse.output)
            ? currentResponse.output
            : [
              currentResponse.output,
            ]),
          ...toolResults,
        ];

        // Make new request with tool results
        if (!this.resolvedRequest) {
          throw new Error('Request not initialized');
        }

        const newRequest: models.OpenResponsesRequest = {
          ...this.resolvedRequest,
          input: newInput,
          stream: false,
        };

        const newResult = await betaResponsesSend(
          this.options.client,
          newRequest,
          this.options.options,
        );

        if (!newResult.ok) {
          throw newResult.error;
        }

        // Handle the result - it might be a stream or a response
        const value = newResult.value;
        if (isEventStream(value)) {
          // It's a stream, consume it
          const stream = new ReusableReadableStream(value);
          currentResponse = await consumeStreamForCompletion(stream);
        } else if (this.isNonStreamingResponse(value)) {
          currentResponse = value;
        } else {
          throw new Error('Unexpected response type from API');
        }

        currentRound++;
      }

      // Validate the final response has required fields
      if (!currentResponse || !currentResponse.id || !currentResponse.output) {
        throw new Error('Invalid final response: missing required fields');
      }

      // Ensure the response is in a completed state (has output content)
      if (!Array.isArray(currentResponse.output) || currentResponse.output.length === 0) {
        throw new Error('Invalid final response: empty or invalid output');
      }

      this.finalResponse = currentResponse;
    })();

    return this.toolExecutionPromise;
  }

  /**
   * Internal helper to get the text after tool execution
   */
  private async getTextInternal(): Promise<string> {
    await this.executeToolsIfNeeded();

    if (!this.finalResponse) {
      throw new Error('Response not available');
    }

    return extractTextFromResponse(this.finalResponse);
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
      throw new Error('Response not available');
    }

    return this.finalResponse;
  }

  /**
   * Stream all response events as they arrive.
   * Multiple consumers can iterate over this stream concurrently.
   * Includes preliminary tool result events after tool execution.
   */
  getFullResponsesStream(): AsyncIterableIterator<EnhancedResponseStreamEvent> {
    return async function* (this: ModelResult) {
      await this.initStream();
      if (!this.reusableStream) {
        throw new Error('Stream not initialized');
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
            type: 'tool.preliminary_result' as const,
            toolCallId,
            result,
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
    return async function* (this: ModelResult) {
      await this.initStream();
      if (!this.reusableStream) {
        throw new Error('Stream not initialized');
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
    return async function* (this: ModelResult) {
      await this.initStream();
      if (!this.reusableStream) {
        throw new Error('Stream not initialized');
      }

      // First yield messages from the stream in responses format
      yield* buildResponsesMessageStream(this.reusableStream);

      // Execute tools if needed
      await this.executeToolsIfNeeded();

      // Yield function call outputs for each executed tool
      for (const round of this.allToolExecutionRounds) {
        for (const toolResult of round.toolResults) {
          yield toolResult;
        }
      }

      // If tools were executed, yield the final message (if there is one)
      if (this.finalResponse && this.allToolExecutionRounds.length > 0) {
        // Check if the final response contains a message
        const hasMessage = this.finalResponse.output.some(
          (item) => hasTypeProperty(item) && item.type === 'message',
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
    return async function* (this: ModelResult) {
      await this.initStream();
      if (!this.reusableStream) {
        throw new Error('Stream not initialized');
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
  getToolStream(): AsyncIterableIterator<ToolStreamEvent> {
    return async function* (this: ModelResult) {
      await this.initStream();
      if (!this.reusableStream) {
        throw new Error('Stream not initialized');
      }

      // Yield tool deltas as structured events
      for await (const delta of extractToolDeltas(this.reusableStream)) {
        yield {
          type: 'delta' as const,
          content: delta,
        };
      }

      // After stream completes, check if tools were executed and emit preliminary results
      await this.executeToolsIfNeeded();

      // Emit all preliminary results
      for (const [toolCallId, results] of this.preliminaryResults) {
        for (const result of results) {
          yield {
            type: 'preliminary_result' as const,
            toolCallId,
            result,
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
  getFullChatStream(): AsyncIterableIterator<ChatStreamEvent> {
    return async function* (this: ModelResult) {
      await this.initStream();
      if (!this.reusableStream) {
        throw new Error('Stream not initialized');
      }

      const consumer = this.reusableStream.createConsumer();

      for await (const event of consumer) {
        if (!('type' in event)) {
          continue;
        }

        // Transform responses events to chat-like format using type guards
        if (isOutputTextDeltaEvent(event)) {
          yield {
            type: 'content.delta' as const,
            delta: event.delta,
          };
        } else if (isResponseCompletedEvent(event)) {
          yield {
            type: 'message.complete' as const,
            response: event.response,
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
            type: 'tool.preliminary_result' as const,
            toolCallId,
            result,
          };
        }
      }
    }.call(this);
  }

  /**
   * Get all tool calls from the completed response (before auto-execution).
   * Note: If tools have execute functions, they will be automatically executed
   * and this will return the tool calls from the initial response.
   * Returns structured tool calls with parsed arguments.
   */
  async getToolCalls(): Promise<ParsedToolCall[]> {
    await this.initStream();
    if (!this.reusableStream) {
      throw new Error('Stream not initialized');
    }

    const completedResponse = await consumeStreamForCompletion(this.reusableStream);
    return extractToolCallsFromResponse(completedResponse);
  }

  /**
   * Stream structured tool call objects as they're completed.
   * Each iteration yields a complete tool call with parsed arguments.
   */
  getToolCallsStream(): AsyncIterableIterator<ParsedToolCall> {
    return async function* (this: ModelResult) {
      await this.initStream();
      if (!this.reusableStream) {
        throw new Error('Stream not initialized');
      }

      yield* buildToolCallStream(this.reusableStream);
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
