import type { OpenRouterCore } from '../core.js';
import type * as models from '../models/index.js';
import type { EventStream } from './event-streams.js';
import type { RequestOptions } from './sdks.js';
import type {
  ChatStreamEvent,
  EnhancedResponseStreamEvent,
  EnhancedTool,
  MaxToolRounds,
  ParsedToolCall,
  ToolStreamEvent,
  TurnContext,
} from './tool-types.js';

import { betaResponsesSend } from '../funcs/betaResponsesSend.js';
import { ReusableReadableStream } from './reusable-stream.js';
import {
  buildMessageStream,
  buildToolCallStream,
  consumeStreamForCompletion,
  extractMessageFromResponse,
  extractReasoningDeltas,
  extractTextDeltas,
  extractTextFromResponse,
  extractToolCallsFromResponse,
  extractToolDeltas,
} from './stream-transformers.js';
import { executeTool } from './tool-executor.js';
import { hasExecuteFunction } from './tool-types.js';

export interface GetResponseOptions {
  request: models.OpenResponsesRequest;
  client: OpenRouterCore;
  options?: RequestOptions;
  tools?: EnhancedTool[];
  maxToolRounds?: MaxToolRounds;
}

/**
 * A wrapper around a streaming response that provides multiple consumption patterns.
 *
 * Allows consuming the response in multiple ways:
 * - `await response.getMessage()` - Get the completed message
 * - `await response.getText()` - Get just the text
 * - `for await (const delta of response.getTextStream())` - Stream text deltas
 * - `for await (const msg of response.getNewMessagesStream())` - Stream incremental message updates
 * - `for await (const event of response.getFullResponsesStream())` - Stream all response events
 *
 * All consumption patterns can be used concurrently thanks to the underlying
 * ReusableReadableStream implementation.
 */
export class ResponseWrapper {
  private reusableStream: ReusableReadableStream<models.OpenResponsesStreamEvent> | null = null;
  private streamPromise: Promise<EventStream<models.OpenResponsesStreamEvent>> | null = null;
  private messagePromise: Promise<models.AssistantMessage> | null = null;
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
  }> = [];

  constructor(options: GetResponseOptions) {
    this.options = options;
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
        this.options.options,
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
        throw new Error('Stream not initialized');
      }

      // Get the initial response
      const initialResponse = await consumeStreamForCompletion(this.reusableStream);

      // Check if we have tools and if auto-execution is enabled
      const shouldAutoExecute =
        this.options.tools &&
        this.options.tools.length > 0 &&
        initialResponse.output.some((item) => 'type' in item && item.type === 'function_call');

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

      // Get maxToolRounds configuration
      const maxToolRounds = this.options.maxToolRounds ?? 5;

      let currentResponse = initialResponse;
      let currentRound = 0;
      let currentInput: models.OpenResponsesInput = this.options.request.input || [];

      while (true) {
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

        // Check if we should continue based on maxToolRounds
        if (typeof maxToolRounds === 'number') {
          if (currentRound >= maxToolRounds) {
            break;
          }
        } else if (typeof maxToolRounds === 'function') {
          // Function signature: (context: TurnContext) => boolean
          const turnContext: TurnContext = {
            numberOfTurns: currentRound + 1,
            messageHistory: currentInput,
            ...(this.options.request.model && {
              model: this.options.request.model,
            }),
            ...(this.options.request.models && {
              models: this.options.request.models,
            }),
          };
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
        const turnContext: TurnContext = {
          numberOfTurns: currentRound + 1, // 1-indexed
          messageHistory: currentInput,
          ...(this.options.request.model && {
            model: this.options.request.model,
          }),
          ...(this.options.request.models && {
            models: this.options.request.models,
          }),
        };

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

        // Update current input for next iteration
        currentInput = newInput;

        // Make new request with tool results
        const newRequest: models.OpenResponsesRequest = {
          ...this.options.request,
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
        if (value && typeof value === 'object' && 'toReadableStream' in value) {
          // It's a stream, consume it
          const stream = new ReusableReadableStream(
            value as EventStream<models.OpenResponsesStreamEvent>,
          );
          currentResponse = await consumeStreamForCompletion(stream);
        } else {
          currentResponse = value as models.OpenResponsesNonStreamingResponse;
        }

        currentRound++;
      }

      this.finalResponse = currentResponse;
    })();

    return this.toolExecutionPromise;
  }

  /**
   * Get the completed message from the response.
   * This will consume the stream until completion, execute any tools, and extract the first message.
   * Returns an AssistantMessage in chat format.
   */
  getMessage(): Promise<models.AssistantMessage> {
    if (this.messagePromise) {
      return this.messagePromise;
    }

    this.messagePromise = (async (): Promise<models.AssistantMessage> => {
      await this.executeToolsIfNeeded();

      if (!this.finalResponse) {
        throw new Error('Response not available');
      }

      return extractMessageFromResponse(this.finalResponse);
    })();

    return this.messagePromise;
  }

  /**
   * Get just the text content from the response.
   * This will consume the stream until completion, execute any tools, and extract the text.
   */
  getText(): Promise<string> {
    if (this.textPromise) {
      return this.textPromise;
    }

    this.textPromise = (async () => {
      await this.executeToolsIfNeeded();

      if (!this.finalResponse) {
        throw new Error('Response not available');
      }

      return extractTextFromResponse(this.finalResponse);
    })();

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
    return async function* (this: ResponseWrapper) {
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
    return async function* (this: ResponseWrapper) {
      await this.initStream();
      if (!this.reusableStream) {
        throw new Error('Stream not initialized');
      }

      yield* extractTextDeltas(this.reusableStream);
    }.call(this);
  }

  /**
   * Stream incremental message updates as content is added.
   * Each iteration yields an updated version of the message with new content.
   * Also yields ToolResponseMessages after tool execution completes.
   * Returns AssistantMessage or ToolResponseMessage in chat format.
   */
  getNewMessagesStream(): AsyncIterableIterator<
    models.AssistantMessage | models.ToolResponseMessage
  > {
    return async function* (this: ResponseWrapper) {
      await this.initStream();
      if (!this.reusableStream) {
        throw new Error('Stream not initialized');
      }

      // First yield assistant messages from the stream
      yield* buildMessageStream(this.reusableStream);

      // Execute tools if needed
      await this.executeToolsIfNeeded();

      // Yield tool response messages for each executed tool
      for (const round of this.allToolExecutionRounds) {
        for (const toolCall of round.toolCalls) {
          // Find the tool to check if it was executed
          const tool = this.options.tools?.find((t) => t.function.name === toolCall.name);
          if (!tool || !hasExecuteFunction(tool)) {
            continue;
          }

          // Get the result from preliminary results or construct from the response
          const prelimResults = this.preliminaryResults.get(toolCall.id);
          const result =
            prelimResults && prelimResults.length > 0
              ? prelimResults[prelimResults.length - 1] // Last result is the final output
              : undefined;

          // Yield tool response message
          yield {
            role: 'tool' as const,
            content: result !== undefined ? JSON.stringify(result) : '',
            toolCallId: toolCall.id,
          } as models.ToolResponseMessage;
        }
      }

      // If tools were executed, yield the final assistant message (if there is one)
      if (this.finalResponse && this.allToolExecutionRounds.length > 0) {
        // Check if the final response contains a message
        const hasMessage = this.finalResponse.output.some(
          (item) => 'type' in item && item.type === 'message',
        );
        if (hasMessage) {
          yield extractMessageFromResponse(this.finalResponse);
        }
      }
    }.call(this);
  }

  /**
   * Stream only reasoning deltas as they arrive.
   * This filters the full event stream to only yield reasoning content.
   */
  getReasoningStream(): AsyncIterableIterator<string> {
    return async function* (this: ResponseWrapper) {
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
    return async function* (this: ResponseWrapper) {
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
    return async function* (this: ResponseWrapper) {
      await this.initStream();
      if (!this.reusableStream) {
        throw new Error('Stream not initialized');
      }

      const consumer = this.reusableStream.createConsumer();

      for await (const event of consumer) {
        if (!('type' in event)) {
          continue;
        }

        // Transform responses events to chat-like format
        // This is a simplified transformation - you may need to adjust based on your needs
        if (event.type === 'response.output_text.delta') {
          const deltaEvent = event as models.OpenResponsesStreamEventResponseOutputTextDelta;
          yield {
            type: 'content.delta' as const,
            delta: deltaEvent.delta,
          };
        } else if (event.type === 'response.completed') {
          const completedEvent = event as models.OpenResponsesStreamEventResponseCompleted;
          yield {
            type: 'message.complete' as const,
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
    return async function* (this: ResponseWrapper) {
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
