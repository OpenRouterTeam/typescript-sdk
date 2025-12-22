import type { OpenRouterCore } from '../core.js';
import type * as models from '../models/index.js';
import type { CallModelInput } from './async-params.js';
import type { EventStream } from './event-streams.js';
import type { RequestOptions } from './sdks.js';
import type {
  ConversationState,
  ResponseStreamEvent,
  InferToolEventsUnion,
  ParsedToolCall,
  StateAccessor,
  StopWhen,
  Tool,
  ToolStreamEvent,
  TurnContext,
  UnsentToolResult,
} from './tool-types.js';

import { betaResponsesSend } from '../funcs/betaResponsesSend.js';
import {
  hasAsyncFunctions,
  resolveAsyncFunctions,
  type ResolvedCallModelInput,
} from './async-params.js';
import {
  appendToMessages,
  createInitialState,
  createRejectedResult,
  createUnsentResult,
  extractTextFromResponse as extractTextFromResponseState,
  partitionToolCalls,
  unsentResultsToAPIFormat,
  updateState,
} from './conversation-state.js';
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
 * Checks constructor name, prototype, and method availability
 */
function isEventStream(value: unknown): value is EventStream<models.OpenResponsesStreamEvent> {
  if (value === null || typeof value !== 'object') {
    return false;
  }

  // Check constructor name for EventStream
  const constructorName = Object.getPrototypeOf(value)?.constructor?.name;
  if (constructorName === 'EventStream') {
    return true;
  }

  // Fallback: check for toReadableStream method (may be on prototype)
  const maybeStream = value as { toReadableStream?: unknown };
  return typeof maybeStream.toReadableStream === 'function';
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

export interface GetResponseOptions<TTools extends readonly Tool[]> {
  // Request can have async functions that will be resolved before sending to API
  request: CallModelInput<TTools>;
  client: OpenRouterCore;
  options?: RequestOptions;
  tools?: TTools;
  stopWhen?: StopWhen<TTools>;
  // State management for multi-turn conversations
  state?: StateAccessor<TTools>;
  requireApproval?: (toolCall: ParsedToolCall<TTools[number]>) => boolean;
  approveToolCalls?: string[];
  rejectToolCalls?: string[];
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
 *
 * @template TTools - The tools array type to enable typed tool calls and results
 */
export class ModelResult<TTools extends readonly Tool[]> {
  private reusableStream: ReusableReadableStream<models.OpenResponsesStreamEvent> | null = null;
  private textPromise: Promise<string> | null = null;
  private options: GetResponseOptions<TTools>;
  private initPromise: Promise<void> | null = null;
  private toolExecutionPromise: Promise<void> | null = null;
  private finalResponse: models.OpenResponsesNonStreamingResponse | null = null;
  private preliminaryResults: Map<string, unknown[]> = new Map();
  private allToolExecutionRounds: Array<{
    round: number;
    toolCalls: ParsedToolCall<Tool>[];
    response: models.OpenResponsesNonStreamingResponse;
    toolResults: Array<models.OpenResponsesFunctionCallOutput>;
  }> = [];
  // Track resolved request after async function resolution
  private resolvedRequest: models.OpenResponsesRequest | null = null;

  // State management for multi-turn conversations
  private stateAccessor: StateAccessor<TTools> | null = null;
  private currentState: ConversationState<TTools> | null = null;
  private requireApprovalFn: ((toolCall: ParsedToolCall<TTools[number]>) => boolean) | null = null;
  private approvedToolCalls: string[] = [];
  private rejectedToolCalls: string[] = [];
  private isResumingFromApproval = false;

  constructor(options: GetResponseOptions<TTools>) {
    this.options = options;
    // Initialize state management
    this.stateAccessor = options.state ?? null;
    this.requireApprovalFn = options.requireApproval ?? null;
    this.approvedToolCalls = options.approveToolCalls ?? [];
    this.rejectedToolCalls = options.rejectToolCalls ?? [];
  }

  /**
   * Type guard to check if a value is a non-streaming response
   * Only requires 'output' field and absence of 'toReadableStream' method
   */
  private isNonStreamingResponse(
    value: unknown,
  ): value is models.OpenResponsesNonStreamingResponse {
    return (
      value !== null &&
      typeof value === 'object' &&
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
      // Load or create state if accessor provided
      if (this.stateAccessor) {
        const loadedState = await this.stateAccessor.load();
        if (loadedState) {
          this.currentState = loadedState;

          // Check if we're resuming from awaiting_approval with decisions
          if (loadedState.status === 'awaiting_approval' &&
              (this.approvedToolCalls.length > 0 || this.rejectedToolCalls.length > 0)) {
            this.isResumingFromApproval = true;
            await this.processApprovalDecisions();
            return; // Skip normal initialization, we're resuming
          }

          // Check for interruption flag and handle
          if (loadedState.interruptedBy) {
            // Clear interruption flag and continue from saved state
            // Use delete to remove the optional property rather than setting to undefined
            const updatedState = { ...loadedState, status: 'in_progress' as const, updatedAt: Date.now() };
            delete updatedState.interruptedBy;
            this.currentState = updatedState;
            await this.stateAccessor.save(this.currentState);
          }
        } else {
          this.currentState = createInitialState<TTools>();
        }

        // Update status to in_progress
        this.currentState = updateState(this.currentState, { status: 'in_progress' });
        await this.stateAccessor.save(this.currentState);
      }

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
        // Since request is CallModelInput, we need to filter out stopWhen and state-related fields
        // Note: tools are already in API format at this point (converted in callModel())
        const { stopWhen: _, state: _s, requireApproval: _r, approveToolCalls: _a, rejectToolCalls: _rj, ...rest } = this.options.request;
        // Cast to ResolvedCallModelInput - we know it's resolved if hasAsyncFunctions returned false
        baseRequest = rest as ResolvedCallModelInput;
      }

      // If we have state with existing messages, use those as input
      if (this.currentState && this.currentState.messages &&
          Array.isArray(this.currentState.messages) && this.currentState.messages.length > 0) {
        // Append new input to existing messages
        const newInput = baseRequest.input;
        if (newInput) {
          const inputArray = Array.isArray(newInput) ? newInput : [newInput];
          baseRequest = {
            ...baseRequest,
            input: appendToMessages(this.currentState.messages, inputArray as models.OpenResponsesInput1[]),
          };
        } else {
          baseRequest = {
            ...baseRequest,
            input: this.currentState.messages,
          };
        }
      }

      // Store resolved request with stream mode
      this.resolvedRequest = {
        ...baseRequest,
        stream: true as const,
      };

      // Force stream mode for initial request
      const request = this.resolvedRequest;

      // Make the API request
      const apiResult = await betaResponsesSend(
        this.options.client,
        request,
        this.options.options,
      );

      if (!apiResult.ok) {
        throw apiResult.error;
      }

      // Handle both streaming and non-streaming responses
      // The API may return a non-streaming response even when stream: true is requested
      if (isEventStream(apiResult.value)) {
        this.reusableStream = new ReusableReadableStream(apiResult.value);
      } else if (this.isNonStreamingResponse(apiResult.value)) {
        // API returned a complete response directly - use it as the final response
        this.finalResponse = apiResult.value;
      } else {
        throw new Error('Unexpected response type from API');
      }
    })();

    return this.initPromise;
  }

  /**
   * Process approval/rejection decisions and resume execution
   */
  private async processApprovalDecisions(): Promise<void> {
    if (!this.currentState || !this.stateAccessor) {
      throw new Error('Cannot process approval decisions without state');
    }

    const pendingCalls = this.currentState.pendingToolCalls ?? [];
    const unsentResults = [...(this.currentState.unsentToolResults ?? [])];

    // Process approvals - execute the approved tools
    for (const callId of this.approvedToolCalls) {
      const toolCall = pendingCalls.find(tc => tc.id === callId);
      if (!toolCall) continue;

      const tool = this.options.tools?.find(t => t.function.name === toolCall.name);
      if (!tool || !hasExecuteFunction(tool)) {
        // Can't execute, create error result
        unsentResults.push(createRejectedResult(callId, toolCall.name as string, 'Tool not found or not executable'));
        continue;
      }

      // Build context and execute
      const turnContext: TurnContext = {
        numberOfTurns: this.currentState.messages ?
          (Array.isArray(this.currentState.messages) ? this.currentState.messages.length : 1) : 0,
      };

      const result = await executeTool(tool, toolCall as ParsedToolCall<Tool>, turnContext);

      if (result.error) {
        unsentResults.push(createRejectedResult(callId, toolCall.name as string, result.error.message));
      } else {
        unsentResults.push(createUnsentResult(callId, toolCall.name as string, result.result));
      }
    }

    // Process rejections
    for (const callId of this.rejectedToolCalls) {
      const toolCall = pendingCalls.find(tc => tc.id === callId);
      if (!toolCall) continue;

      unsentResults.push(createRejectedResult(callId, toolCall.name as string, 'Rejected by user'));
    }

    // Remove processed calls from pending
    const processedIds = new Set([...this.approvedToolCalls, ...this.rejectedToolCalls]);
    const remainingPending = pendingCalls.filter(tc => !processedIds.has(tc.id));

    // Update state - conditionally include optional properties only if they have values
    const stateUpdates: Partial<Omit<ConversationState<TTools>, 'id' | 'createdAt' | 'updatedAt'>> = {
      status: remainingPending.length > 0 ? 'awaiting_approval' : 'in_progress',
    };
    if (remainingPending.length > 0) {
      stateUpdates.pendingToolCalls = remainingPending;
    }
    if (unsentResults.length > 0) {
      stateUpdates.unsentToolResults = unsentResults as UnsentToolResult<TTools>[];
    }
    this.currentState = updateState(this.currentState, stateUpdates);
    // Remove optional properties if they should be cleared
    if (remainingPending.length === 0) {
      delete this.currentState.pendingToolCalls;
    }
    if (unsentResults.length === 0) {
      delete this.currentState.unsentToolResults;
    }
    await this.stateAccessor.save(this.currentState);

    // If we still have pending approvals, stop here
    if (remainingPending.length > 0) {
      return;
    }

    // Otherwise, continue with tool execution using unsent results
    await this.continueWithUnsentResults();
  }

  /**
   * Continue execution with unsent tool results
   */
  private async continueWithUnsentResults(): Promise<void> {
    if (!this.currentState || !this.stateAccessor) return;

    const unsentResults = this.currentState.unsentToolResults ?? [];
    if (unsentResults.length === 0) return;

    // Convert to API format
    const toolOutputs = unsentResultsToAPIFormat(unsentResults);

    // Build new input with tool results
    const currentMessages = this.currentState.messages;
    const newInput = appendToMessages(currentMessages, toolOutputs);

    // Clear unsent results from state
    this.currentState = updateState(this.currentState, {
      messages: newInput,
    });
    delete this.currentState.unsentToolResults;
    await this.stateAccessor.save(this.currentState);

    // Build request with the updated input
    const initialContext: TurnContext = {
      numberOfTurns: Array.isArray(newInput) ? newInput.length : 1,
    };

    let baseRequest: ResolvedCallModelInput;
    if (hasAsyncFunctions(this.options.request)) {
      baseRequest = await resolveAsyncFunctions(
        this.options.request,
        initialContext,
      );
    } else {
      const { stopWhen: _, state: _s, requireApproval: _r, approveToolCalls: _a, rejectToolCalls: _rj, ...rest } = this.options.request;
      baseRequest = rest as ResolvedCallModelInput;
    }

    // Create request with the accumulated messages
    const request: models.OpenResponsesRequest = {
      ...baseRequest,
      input: newInput,
      stream: true,
    };

    this.resolvedRequest = request;

    // Make the API request
    const apiResult = await betaResponsesSend(
      this.options.client,
      request,
      this.options.options,
    );

    if (!apiResult.ok) {
      throw apiResult.error;
    }

    // Handle both streaming and non-streaming responses
    if (isEventStream(apiResult.value)) {
      this.reusableStream = new ReusableReadableStream(apiResult.value);
    } else if (this.isNonStreamingResponse(apiResult.value)) {
      this.finalResponse = apiResult.value;
    } else {
      throw new Error('Unexpected response type from API');
    }
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

      // If we resumed from approval and still have pending approvals, don't continue
      if (this.isResumingFromApproval && this.currentState?.status === 'awaiting_approval') {
        return;
      }

      // If we already have a final response (from non-streaming API response), use it
      // Otherwise, consume the stream to get the initial response
      let initialResponse: models.OpenResponsesNonStreamingResponse;
      if (this.finalResponse) {
        initialResponse = this.finalResponse;
      } else if (this.reusableStream) {
        // Note: Async functions already resolved in initStream()
        // Get the initial response
        initialResponse = await consumeStreamForCompletion(this.reusableStream);
      } else {
        throw new Error('Neither stream nor response initialized');
      }

      // Save response to state
      if (this.stateAccessor && this.currentState) {
        const outputItems = Array.isArray(initialResponse.output)
          ? initialResponse.output
          : [initialResponse.output];

        this.currentState = updateState(this.currentState, {
          messages: appendToMessages(this.currentState.messages, outputItems as models.OpenResponsesInput1[]),
          previousResponseId: initialResponse.id,
        });
        await this.stateAccessor.save(this.currentState);
      }

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
        if (this.stateAccessor && this.currentState) {
          this.currentState = updateState(this.currentState, { status: 'complete' });
          await this.stateAccessor.save(this.currentState);
        }
        return;
      }

      // Extract tool calls
      const toolCalls = extractToolCallsFromResponse(initialResponse);

      // Check for tools requiring approval
      if (this.options.tools) {
        const { requiresApproval: needsApproval, autoExecute } = partitionToolCalls(
          toolCalls as ParsedToolCall<TTools[number]>[],
          this.options.tools,
          this.requireApprovalFn ?? undefined
        );

        if (needsApproval.length > 0) {
          // Execute auto-approve tools first and store results
          const unsentResults: Array<{
            callId: string;
            name: string;
            output: unknown;
            error?: string;
          }> = [];

          for (const tc of autoExecute) {
            const tool = this.options.tools.find(t => t.function.name === tc.name);
            if (tool && hasExecuteFunction(tool)) {
              const context: TurnContext = { numberOfTurns: 0 };
              const result = await executeTool(tool, tc as ParsedToolCall<Tool>, context);
              if (result.error) {
                unsentResults.push(createRejectedResult(tc.id, tc.name as string, result.error.message));
              } else {
                unsentResults.push(createUnsentResult(tc.id, tc.name as string, result.result));
              }
            }
          }

          // Save state with pending approvals and pause
          if (this.stateAccessor && this.currentState) {
            const stateUpdates: Partial<Omit<ConversationState<TTools>, 'id' | 'createdAt' | 'updatedAt'>> = {
              pendingToolCalls: needsApproval,
              status: 'awaiting_approval',
            };
            if (unsentResults.length > 0) {
              stateUpdates.unsentToolResults = unsentResults as UnsentToolResult<TTools>[];
            }
            this.currentState = updateState(this.currentState, stateUpdates);
            await this.stateAccessor.save(this.currentState);
          }

          this.finalResponse = initialResponse;
          return; // Stop here, awaiting approval
        }
      }

      // Check if any have execute functions
      const executableTools = toolCalls.filter((toolCall) => {
        const tool = this.options.tools?.find((t) => t.function.name === toolCall.name);
        return tool && hasExecuteFunction(tool);
      });

      if (executableTools.length === 0) {
        // No executable tools, use initial response
        this.finalResponse = initialResponse;
        if (this.stateAccessor && this.currentState) {
          this.currentState = updateState(this.currentState, { status: 'complete' });
          await this.stateAccessor.save(this.currentState);
        }
        return;
      }

      let currentResponse = initialResponse;
      let currentRound = 0;

      while (true) {
        // Check for interruption
        if (this.stateAccessor) {
          const freshState = await this.stateAccessor.load();
          if (freshState?.interruptedBy) {
            // Save partial state and exit
            if (this.currentState) {
              const currentToolCalls = extractToolCallsFromResponse(currentResponse);
              this.currentState = updateState(this.currentState, {
                status: 'interrupted',
                partialResponse: {
                  text: extractTextFromResponseState(currentResponse),
                  toolCalls: currentToolCalls as ParsedToolCall<TTools[number]>[],
                },
              });
              await this.stateAccessor.save(this.currentState);
            }
            this.finalResponse = currentResponse;
            return;
          }
        }

        // Check stopWhen conditions
        if (this.options.stopWhen) {
          const stopConditions = Array.isArray(this.options.stopWhen)
            ? this.options.stopWhen
            : [this.options.stopWhen];

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

        // Check for tools requiring approval in subsequent rounds
        if (this.options.tools) {
          const { requiresApproval: needsApproval, autoExecute } = partitionToolCalls(
            currentToolCalls as ParsedToolCall<TTools[number]>[],
            this.options.tools,
            this.requireApprovalFn ?? undefined
          );

          if (needsApproval.length > 0) {
            // Execute auto-approve tools and store results
            const unsentResults: Array<{
              callId: string;
              name: string;
              output: unknown;
              error?: string;
            }> = [];

            for (const tc of autoExecute) {
              const tool = this.options.tools.find(t => t.function.name === tc.name);
              if (tool && hasExecuteFunction(tool)) {
                const context: TurnContext = { numberOfTurns: currentRound + 1 };
                const result = await executeTool(tool, tc as ParsedToolCall<Tool>, context);
                if (result.error) {
                  unsentResults.push(createRejectedResult(tc.id, tc.name as string, result.error.message));
                } else {
                  unsentResults.push(createUnsentResult(tc.id, tc.name as string, result.result));
                }
              }
            }

            // Save state with pending approvals and pause
            if (this.stateAccessor && this.currentState) {
              const stateUpdates: Partial<Omit<ConversationState<TTools>, 'id' | 'createdAt' | 'updatedAt'>> = {
                pendingToolCalls: needsApproval,
                status: 'awaiting_approval',
              };
              if (unsentResults.length > 0) {
                stateUpdates.unsentToolResults = unsentResults as UnsentToolResult<TTools>[];
              }
              this.currentState = updateState(this.currentState, stateUpdates);
              await this.stateAccessor.save(this.currentState);
            }

            this.finalResponse = currentResponse;
            return; // Stop here, awaiting approval
          }
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

        // Save state after tool execution
        if (this.stateAccessor && this.currentState) {
          this.currentState = updateState(this.currentState, {
            messages: appendToMessages(this.currentState.messages, toolResults),
          });
          await this.stateAccessor.save(this.currentState);
        }

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

        // Save response to state
        if (this.stateAccessor && this.currentState) {
          const outputItems = Array.isArray(currentResponse.output)
            ? currentResponse.output
            : [currentResponse.output];

          this.currentState = updateState(this.currentState, {
            messages: appendToMessages(this.currentState.messages, outputItems as models.OpenResponsesInput1[]),
            previousResponseId: currentResponse.id,
          });
          await this.stateAccessor.save(this.currentState);
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

      // Mark as complete in state
      if (this.stateAccessor && this.currentState) {
        this.currentState = updateState(this.currentState, { status: 'complete' });
        await this.stateAccessor.save(this.currentState);
      }
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
  getFullResponsesStream(): AsyncIterableIterator<ResponseStreamEvent<InferToolEventsUnion<TTools>>> {
    return async function* (this: ModelResult<TTools>) {
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
    return async function* (this: ModelResult<TTools>) {
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
    return async function* (this: ModelResult<TTools>) {
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
          (item: unknown) => hasTypeProperty(item) && item.type === 'message',
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
    return async function* (this: ModelResult<TTools>) {
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
  getToolStream(): AsyncIterableIterator<ToolStreamEvent<InferToolEventsUnion<TTools>>> {
    return async function* (this: ModelResult<TTools>) {
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
   * Returns structured tool calls with parsed arguments.
   */
  async getToolCalls(): Promise<ParsedToolCall<TTools[number]>[]> {
    await this.initStream();
    if (!this.reusableStream) {
      throw new Error('Stream not initialized');
    }

    const completedResponse = await consumeStreamForCompletion(this.reusableStream);
    return extractToolCallsFromResponse(completedResponse) as ParsedToolCall<TTools[number]>[];
  }

  /**
   * Stream structured tool call objects as they're completed.
   * Each iteration yields a complete tool call with parsed arguments.
   */
  getToolCallsStream(): AsyncIterableIterator<ParsedToolCall<TTools[number]>> {
    return async function* (this: ModelResult<TTools>) {
      await this.initStream();
      if (!this.reusableStream) {
        throw new Error('Stream not initialized');
      }

      yield* buildToolCallStream(this.reusableStream) as AsyncIterableIterator<ParsedToolCall<TTools[number]>>;
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

  // =========================================================================
  // Multi-Turn Conversation State Methods
  // =========================================================================

  /**
   * Check if the conversation requires human approval to continue.
   * Returns true if there are pending tool calls awaiting approval.
   */
  async requiresApproval(): Promise<boolean> {
    await this.initStream();

    // If we have pending tool calls in state, approval is required
    if (this.currentState?.status === 'awaiting_approval') {
      return true;
    }

    // Also check if pendingToolCalls is populated
    return (this.currentState?.pendingToolCalls?.length ?? 0) > 0;
  }

  /**
   * Get the pending tool calls that require approval.
   * Returns empty array if no approvals needed.
   */
  async getPendingToolCalls(): Promise<ParsedToolCall<TTools[number]>[]> {
    await this.initStream();

    // Try to trigger tool execution to populate pending calls
    if (!this.isResumingFromApproval) {
      await this.executeToolsIfNeeded();
    }

    return (this.currentState?.pendingToolCalls ?? []) as ParsedToolCall<TTools[number]>[];
  }

  /**
   * Get the current conversation state.
   * Useful for inspection, debugging, or custom persistence.
   * Note: This returns the raw ConversationState for inspection only.
   * To resume a conversation, use the StateAccessor pattern.
   */
  async getState(): Promise<ConversationState<TTools>> {
    await this.initStream();

    // Ensure tool execution has been attempted (to populate final state)
    if (!this.isResumingFromApproval) {
      await this.executeToolsIfNeeded();
    }

    if (!this.currentState) {
      throw new Error('State not initialized. Make sure a StateAccessor was provided to callModel.');
    }

    return this.currentState;
  }
}
