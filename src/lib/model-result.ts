import type { OpenRouterCore } from '../core.js';
import type * as models from '../models/index.js';
import type { CallModelInput } from './async-params.js';
import type { EventStream } from './event-streams.js';
import type { RequestOptions } from './sdks.js';
import type {
  ConversationState,
  ResponseStreamEvent,
  InferToolEventsUnion,
  InferToolOutputsUnion,
  ParsedToolCall,
  StateAccessor,
  StopWhen,
  Tool,
  ToolStreamEvent,
  TurnContext,
  UnsentToolResult,
} from './tool-types.js';
import { ToolEventBroadcaster } from './tool-event-broadcaster.js';

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
  buildItemsStream,
  buildResponsesMessageStream,
  buildToolCallStream,
  consumeStreamForCompletion,
  extractReasoningDeltas,
  extractResponsesMessageFromResponse,
  extractTextDeltas,
  extractTextFromResponse,
  extractToolCallsFromResponse,
  extractToolDeltas,
  type StreamableOutputItem,
} from './stream-transformers.js';
import { executeTool } from './tool-executor.js';
import { executeNextTurnParamsFunctions, applyNextTurnParamsToRequest } from './next-turn-params.js';
import { hasExecuteFunction } from './tool-types.js';
import { isStopConditionMet, stepCountIs } from './stop-conditions.js';
import {
  isOutputMessage,
  isFunctionCallOutputItem,
  isReasoningOutputItem,
  isWebSearchCallOutputItem,
  isFileSearchCallOutputItem,
  isImageGenerationCallOutputItem,
  hasTypeProperty,
} from './stream-type-guards.js';

/**
 * Default maximum number of tool execution steps if no stopWhen is specified.
 * This prevents infinite loops in tool execution.
 */
const DEFAULT_MAX_STEPS = 5;

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

export interface GetResponseOptions<
  TTools extends readonly Tool[],
> {
  // Request can have async functions that will be resolved before sending to API
  request: CallModelInput<TTools>;
  client: OpenRouterCore;
  options?: RequestOptions;
  tools?: TTools;
  stopWhen?: StopWhen<TTools>;
  // State management for multi-turn conversations
  state?: StateAccessor<TTools>;

  /**
   * Call-level approval check - overrides tool-level requireApproval setting
   * Receives the tool call and turn context, can be sync or async
   */
  requireApproval?: (
    toolCall: ParsedToolCall<TTools[number]>,
    context: TurnContext
  ) => boolean | Promise<boolean>;
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
  private toolEventBroadcaster: ToolEventBroadcaster<
    | {
        type: 'preliminary_result';
        toolCallId: string;
        result: InferToolEventsUnion<TTools>;
      }
    | {
        type: 'tool_result';
        toolCallId: string;
        result: InferToolOutputsUnion<TTools>;
        preliminaryResults?: InferToolEventsUnion<TTools>[];
      }
  > | null = null;
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
  private requireApprovalFn: ((toolCall: ParsedToolCall<TTools[number]>, context: TurnContext) => boolean | Promise<boolean>) | null = null;
  private approvedToolCalls: string[] = [];
  private rejectedToolCalls: string[] = [];
  private isResumingFromApproval = false;

  constructor(options: GetResponseOptions<TTools>) {
    this.options = options;

    // Runtime validation: approval decisions require state
    const hasApprovalDecisions =
      (options.approveToolCalls && options.approveToolCalls.length > 0) ||
      (options.rejectToolCalls && options.rejectToolCalls.length > 0);

    if (hasApprovalDecisions && !options.state) {
      throw new Error(
        'approveToolCalls and rejectToolCalls require a state accessor. ' +
        'Provide a StateAccessor via the "state" parameter to persist approval decisions.'
      );
    }

    // Initialize state management
    this.stateAccessor = options.state ?? null;
    this.requireApprovalFn = options.requireApproval ?? null;
    this.approvedToolCalls = options.approveToolCalls ?? [];
    this.rejectedToolCalls = options.rejectToolCalls ?? [];
  }

  /**
   * Get or create the tool event broadcaster (lazy initialization).
   * Ensures only one broadcaster exists for the lifetime of this ModelResult.
   * Broadcasts both preliminary results and final tool results.
   */
  private ensureBroadcaster(): ToolEventBroadcaster<
    | {
        type: 'preliminary_result';
        toolCallId: string;
        result: InferToolEventsUnion<TTools>;
      }
    | {
        type: 'tool_result';
        toolCallId: string;
        result: InferToolOutputsUnion<TTools>;
        preliminaryResults?: InferToolEventsUnion<TTools>[];
      }
  > {
    if (!this.toolEventBroadcaster) {
      this.toolEventBroadcaster = new ToolEventBroadcaster();
    }
    return this.toolEventBroadcaster;
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

  // =========================================================================
  // Extracted Helper Methods for executeToolsIfNeeded
  // =========================================================================

  /**
   * Get initial response from stream or cached final response.
   * Consumes the stream to completion if needed to extract the response.
   *
   * @returns The complete non-streaming response
   * @throws Error if neither stream nor response has been initialized
   */
  private async getInitialResponse(): Promise<models.OpenResponsesNonStreamingResponse> {
    if (this.finalResponse) {
      return this.finalResponse;
    }
    if (this.reusableStream) {
      return consumeStreamForCompletion(this.reusableStream);
    }
    throw new Error('Neither stream nor response initialized');
  }

  /**
   * Save response output to state.
   * Appends the response output to the message history and records the response ID.
   *
   * @param response - The API response to save
   */
  private async saveResponseToState(
    response: models.OpenResponsesNonStreamingResponse
  ): Promise<void> {
    if (!this.stateAccessor || !this.currentState) return;

    const outputItems = Array.isArray(response.output)
      ? response.output
      : [response.output];

    await this.saveStateSafely({
      messages: appendToMessages(
        this.currentState.messages,
        outputItems as models.OpenResponsesInput1[]
      ),
      previousResponseId: response.id,
    });
  }

  /**
   * Mark state as complete.
   * Sets the conversation status to 'complete' indicating no further tool execution is needed.
   */
  private async markStateComplete(): Promise<void> {
    await this.saveStateSafely({ status: 'complete' });
  }

  /**
   * Save tool results to state.
   * Appends tool execution results to the message history for multi-turn context.
   *
   * @param toolResults - The tool execution results to save
   */
  private async saveToolResultsToState(
    toolResults: models.OpenResponsesFunctionCallOutput[]
  ): Promise<void> {
    if (!this.currentState) return;
    await this.saveStateSafely({
      messages: appendToMessages(this.currentState.messages, toolResults),
    });
  }

  /**
   * Check if execution should be interrupted by external signal.
   * Polls the state accessor for interruption flags set by external processes.
   *
   * @param currentResponse - The current response to save as partial state
   * @returns True if interrupted and caller should exit, false to continue
   */
  private async checkForInterruption(
    currentResponse: models.OpenResponsesNonStreamingResponse
  ): Promise<boolean> {
    if (!this.stateAccessor) return false;

    const freshState = await this.stateAccessor.load();
    if (!freshState?.interruptedBy) return false;

    // Save partial state
    if (this.currentState) {
      const currentToolCalls = extractToolCallsFromResponse(currentResponse);
      await this.saveStateSafely({
        status: 'interrupted',
        partialResponse: {
          text: extractTextFromResponseState(currentResponse),
          toolCalls: currentToolCalls as ParsedToolCall<TTools[number]>[],
        },
      });
    }

    this.finalResponse = currentResponse;
    return true;
  }

  /**
   * Check if stop conditions are met.
   * Returns true if execution should stop.
   *
   * @remarks
   * Default: stepCountIs(DEFAULT_MAX_STEPS) if no stopWhen is specified.
   * This evaluates stop conditions against the complete step history.
   */
  private async shouldStopExecution(): Promise<boolean> {
    const stopWhen = this.options.stopWhen ?? stepCountIs(DEFAULT_MAX_STEPS);

    const stopConditions = Array.isArray(stopWhen)
      ? stopWhen
      : [stopWhen];

    return isStopConditionMet({
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
        finishReason: undefined,
      })),
    });
  }

  /**
   * Check if any tool calls have execute functions.
   * Used to determine if automatic tool execution should be attempted.
   *
   * @param toolCalls - The tool calls to check
   * @returns True if at least one tool call has an executable function
   */
  private hasExecutableToolCalls(toolCalls: ParsedToolCall<Tool>[]): boolean {
    return toolCalls.some((toolCall) => {
      const tool = this.options.tools?.find((t) => t.function.name === toolCall.name);
      return tool && hasExecuteFunction(tool);
    });
  }

  /**
   * Execute tools that can auto-execute (don't require approval).
   * Processes tool calls that are approved for automatic execution.
   *
   * @param toolCalls - The tool calls to execute
   * @param turnContext - The current turn context
   * @returns Array of unsent tool results for later submission
   */
  private async executeAutoApproveTools(
    toolCalls: ParsedToolCall<TTools[number]>[],
    turnContext: TurnContext
  ): Promise<UnsentToolResult<TTools>[]> {
    const results: UnsentToolResult<TTools>[] = [];

    for (const tc of toolCalls) {
      const tool = this.options.tools?.find(t => t.function.name === tc.name);
      if (!tool || !hasExecuteFunction(tool)) continue;

      const result = await executeTool(tool, tc as ParsedToolCall<Tool>, turnContext);

      if (result.error) {
        results.push(createRejectedResult(tc.id, String(tc.name), result.error.message));
      } else {
        results.push(createUnsentResult(tc.id, String(tc.name), result.result));
      }
    }

    return results;
  }

  /**
   * Check for tools requiring approval and handle accordingly.
   * Partitions tool calls into those needing approval and those that can auto-execute.
   *
   * @param toolCalls - The tool calls to check
   * @param currentRound - The current execution round (1-indexed)
   * @param currentResponse - The current response to save if pausing
   * @returns True if execution should pause for approval, false to continue
   * @throws Error if approval is required but no state accessor is configured
   */
  private async handleApprovalCheck(
    toolCalls: ParsedToolCall<Tool>[],
    currentRound: number,
    currentResponse: models.OpenResponsesNonStreamingResponse
  ): Promise<boolean> {
    if (!this.options.tools) return false;

    const turnContext: TurnContext = { numberOfTurns: currentRound };

    const { requiresApproval: needsApproval, autoExecute } = await partitionToolCalls(
      toolCalls as ParsedToolCall<TTools[number]>[],
      this.options.tools,
      turnContext,
      this.requireApprovalFn ?? undefined
    );

    if (needsApproval.length === 0) return false;

    // Validate: approval requires state accessor
    if (!this.stateAccessor) {
      const toolNames = needsApproval.map(tc => tc.name).join(', ');
      throw new Error(
        `Tool(s) require approval but no state accessor is configured: ${toolNames}. ` +
        'Provide a StateAccessor via the "state" parameter to enable approval workflows.'
      );
    }

    // Execute auto-approve tools
    const unsentResults = await this.executeAutoApproveTools(autoExecute, turnContext);

    // Save state with pending approvals
    const stateUpdates: Partial<Omit<ConversationState<TTools>, 'id' | 'createdAt' | 'updatedAt'>> = {
      pendingToolCalls: needsApproval,
      status: 'awaiting_approval',
    };
    if (unsentResults.length > 0) {
      stateUpdates.unsentToolResults = unsentResults;
    }
    await this.saveStateSafely(stateUpdates);

    this.finalResponse = currentResponse;
    return true; // Pause for approval
  }

  /**
   * Execute all tools in a single round.
   * Runs each tool call sequentially and collects results for API submission.
   * Emits tool.result events after each tool execution completes.
   *
   * @param toolCalls - The tool calls to execute
   * @param turnContext - The current turn context
   * @returns Array of function call outputs formatted for the API
   */
  private async executeToolRound(
    toolCalls: ParsedToolCall<Tool>[],
    turnContext: TurnContext
  ): Promise<models.OpenResponsesFunctionCallOutput[]> {
    const toolResults: models.OpenResponsesFunctionCallOutput[] = [];

    for (const toolCall of toolCalls) {
      const tool = this.options.tools?.find((t) => t.function.name === toolCall.name);
      if (!tool || !hasExecuteFunction(tool)) continue;

      // Track preliminary results for this specific tool call
      const preliminaryResultsForCall: InferToolEventsUnion<TTools>[] = [];

      // Create callback for real-time preliminary results
      const onPreliminaryResult = this.toolEventBroadcaster
        ? (callId: string, resultValue: unknown) => {
            // Track preliminary results for the tool.result event
            const typedResult = resultValue as InferToolEventsUnion<TTools>;
            preliminaryResultsForCall.push(typedResult);
            // Emit preliminary result event
            this.toolEventBroadcaster?.push({
              type: 'preliminary_result' as const,
              toolCallId: callId,
              result: typedResult,
            });
          }
        : undefined;

      const result = await executeTool(tool, toolCall, turnContext, onPreliminaryResult);

      // Emit tool.result event with final result and any preliminary results
      if (this.toolEventBroadcaster) {
        const toolResultEvent = {
          type: 'tool_result' as const,
          toolCallId: toolCall.id,
          result: (result.error ? { error: result.error.message } : result.result) as InferToolOutputsUnion<TTools>,
          ...(preliminaryResultsForCall.length > 0 && { preliminaryResults: preliminaryResultsForCall }),
        };
        this.toolEventBroadcaster.push(toolResultEvent);
      }

      toolResults.push({
        type: 'function_call_output' as const,
        id: `output_${toolCall.id}`,
        callId: toolCall.id,
        output: result.error
          ? JSON.stringify({ error: result.error.message })
          : JSON.stringify(result.result),
      });
    }

    return toolResults;
  }

  /**
   * Resolve async functions for the current turn.
   * Updates the resolved request with turn-specific parameter values.
   *
   * @param turnContext - The turn context for parameter resolution
   */
  private async resolveAsyncFunctionsForTurn(turnContext: TurnContext): Promise<void> {
    if (hasAsyncFunctions(this.options.request)) {
      const resolved = await resolveAsyncFunctions(this.options.request, turnContext);
      this.resolvedRequest = { ...resolved, stream: false };
    }
  }

  /**
   * Apply nextTurnParams from executed tools.
   * Allows tools to modify request parameters for subsequent turns.
   *
   * @param toolCalls - The tool calls that were just executed
   */
  private async applyNextTurnParams(toolCalls: ParsedToolCall<Tool>[]): Promise<void> {
    if (!this.options.tools || toolCalls.length === 0 || !this.resolvedRequest) {
      return;
    }

    const computedParams = await executeNextTurnParamsFunctions(
      toolCalls,
      this.options.tools,
      this.resolvedRequest
    );

    if (Object.keys(computedParams).length > 0) {
      this.resolvedRequest = applyNextTurnParamsToRequest(
        this.resolvedRequest,
        computedParams
      );
    }
  }

  /**
   * Make a follow-up API request with tool results.
   * Continues the conversation after tool execution.
   *
   * @param currentResponse - The response that contained tool calls
   * @param toolResults - The results from executing those tools
   * @returns The new response from the API
   */
  private async makeFollowupRequest(
    currentResponse: models.OpenResponsesNonStreamingResponse,
    toolResults: models.OpenResponsesFunctionCallOutput[]
  ): Promise<models.OpenResponsesNonStreamingResponse> {
    // Build new input with tool results
    const newInput: models.OpenResponsesInput = [
      ...(Array.isArray(currentResponse.output)
        ? currentResponse.output
        : [currentResponse.output]),
      ...toolResults,
    ];

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

    // Handle streaming or non-streaming response
    const value = newResult.value;
    if (isEventStream(value)) {
      const stream = new ReusableReadableStream(value);
      return consumeStreamForCompletion(stream);
    } else if (this.isNonStreamingResponse(value)) {
      return value;
    } else {
      throw new Error('Unexpected response type from API');
    }
  }

  /**
   * Validate the final response has required fields.
   *
   * @param response - The response to validate
   * @throws Error if response is missing required fields or has invalid output
   */
  private validateFinalResponse(
    response: models.OpenResponsesNonStreamingResponse
  ): void {
    if (!response?.id || !response?.output) {
      throw new Error('Invalid final response: missing required fields');
    }
    if (!Array.isArray(response.output) || response.output.length === 0) {
      throw new Error('Invalid final response: empty or invalid output');
    }
  }

  /**
   * Resolve async functions in the request for a given turn context.
   * Extracts non-function fields and resolves any async parameter functions.
   *
   * @param context - The turn context for parameter resolution
   * @returns The resolved request without async functions
   */
  private async resolveRequestForContext(context: TurnContext): Promise<ResolvedCallModelInput> {
    if (hasAsyncFunctions(this.options.request)) {
      return resolveAsyncFunctions(this.options.request, context);
    }
    // Already resolved, extract non-function fields
    // Filter out stopWhen and state-related fields that aren't part of the API request
    const { stopWhen: _, state: _s, requireApproval: _r, approveToolCalls: _a, rejectToolCalls: _rj, ...rest } = this.options.request;
    return rest as ResolvedCallModelInput;
  }

  /**
   * Safely persist state with error handling.
   * Wraps state save operations to ensure failures are properly reported.
   *
   * @param updates - Optional partial state updates to apply before saving
   * @throws Error if state persistence fails
   */
  private async saveStateSafely(
    updates?: Partial<Omit<ConversationState<TTools>, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<void> {
    if (!this.stateAccessor || !this.currentState) return;

    if (updates) {
      this.currentState = updateState(this.currentState, updates);
    }

    try {
      await this.stateAccessor.save(this.currentState);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to persist conversation state: ${message}`);
    }
  }

  /**
   * Remove optional properties from state when they should be cleared.
   * Uses delete to properly remove optional properties rather than setting undefined.
   *
   * @param props - Array of property names to remove from current state
   */
  private clearOptionalStateProperties(
    props: Array<'pendingToolCalls' | 'unsentToolResults' | 'interruptedBy' | 'partialResponse'>
  ): void {
    if (!this.currentState) return;
    for (const prop of props) {
      delete this.currentState[prop];
    }
  }

  // =========================================================================
  // Core Methods
  // =========================================================================

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
            this.currentState = updateState(loadedState, { status: 'in_progress' });
            this.clearOptionalStateProperties(['interruptedBy']);
            await this.saveStateSafely();
          }
        } else {
          this.currentState = createInitialState<TTools>();
        }

        // Update status to in_progress
        await this.saveStateSafely({ status: 'in_progress' });
      }

      // Resolve async functions before initial request
      // Build initial turn context (turn 0 for initial request)
      const initialContext: TurnContext = {
        numberOfTurns: 0,
      };

      // Resolve any async functions first
      let baseRequest = await this.resolveRequestForContext(initialContext);

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

    // Build turn context - numberOfTurns represents the current turn (1-indexed after initial)
    const turnContext: TurnContext = {
      numberOfTurns: this.allToolExecutionRounds.length + 1,
    };

    // Process approvals - execute the approved tools
    for (const callId of this.approvedToolCalls) {
      const toolCall = pendingCalls.find(tc => tc.id === callId);
      if (!toolCall) continue;

      const tool = this.options.tools?.find(t => t.function.name === toolCall.name);
      if (!tool || !hasExecuteFunction(tool)) {
        // Can't execute, create error result
        unsentResults.push(createRejectedResult(callId, String(toolCall.name), 'Tool not found or not executable'));
        continue;
      }

      const result = await executeTool(tool, toolCall as ParsedToolCall<Tool>, turnContext);

      if (result.error) {
        unsentResults.push(createRejectedResult(callId, String(toolCall.name), result.error.message));
      } else {
        unsentResults.push(createUnsentResult(callId, String(toolCall.name), result.result));
      }
    }

    // Process rejections
    for (const callId of this.rejectedToolCalls) {
      const toolCall = pendingCalls.find(tc => tc.id === callId);
      if (!toolCall) continue;

      unsentResults.push(createRejectedResult(callId, String(toolCall.name), 'Rejected by user'));
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
    await this.saveStateSafely(stateUpdates);

    // Clear optional properties if they should be empty
    const propsToClear: Array<'pendingToolCalls' | 'unsentToolResults'> = [];
    if (remainingPending.length === 0) propsToClear.push('pendingToolCalls');
    if (unsentResults.length === 0) propsToClear.push('unsentToolResults');
    if (propsToClear.length > 0) {
      this.clearOptionalStateProperties(propsToClear);
      await this.saveStateSafely();
    }

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
    this.clearOptionalStateProperties(['unsentToolResults']);
    await this.saveStateSafely();

    // Build request with the updated input
    // numberOfTurns represents the current turn number (1-indexed after initial)
    const turnContext: TurnContext = {
      numberOfTurns: this.allToolExecutionRounds.length + 1,
    };

    const baseRequest = await this.resolveRequestForContext(turnContext);

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

      // If resuming from approval and still pending, don't continue
      if (this.isResumingFromApproval && this.currentState?.status === 'awaiting_approval') {
        return;
      }

      // Get initial response
      let currentResponse = await this.getInitialResponse();

      // Save initial response to state
      await this.saveResponseToState(currentResponse);

      // Check if tools should be executed
      const hasToolCalls = currentResponse.output.some(
        (item) => hasTypeProperty(item) && item.type === 'function_call'
      );

      if (!this.options.tools?.length || !hasToolCalls) {
        this.finalResponse = currentResponse;
        await this.markStateComplete();
        return;
      }

      // Extract and check tool calls
      const toolCalls = extractToolCallsFromResponse(currentResponse);

      // Check for approval requirements
      if (await this.handleApprovalCheck(toolCalls, 0, currentResponse)) {
        return; // Paused for approval
      }

      if (!this.hasExecutableToolCalls(toolCalls)) {
        this.finalResponse = currentResponse;
        await this.markStateComplete();
        return;
      }

      // Main execution loop
      let currentRound = 0;

      while (true) {
        // Check for external interruption
        if (await this.checkForInterruption(currentResponse)) {
          return;
        }

        // Check stop conditions
        if (await this.shouldStopExecution()) {
          break;
        }

        const currentToolCalls = extractToolCallsFromResponse(currentResponse);
        if (currentToolCalls.length === 0) {
          break;
        }

        // Check for approval requirements
        if (await this.handleApprovalCheck(currentToolCalls, currentRound + 1, currentResponse)) {
          return;
        }

        if (!this.hasExecutableToolCalls(currentToolCalls)) {
          break;
        }

        // Build turn context
        const turnContext: TurnContext = { numberOfTurns: currentRound + 1 };

        // Resolve async functions for this turn
        await this.resolveAsyncFunctionsForTurn(turnContext);

        // Execute tools
        const toolResults = await this.executeToolRound(currentToolCalls, turnContext);

        // Track execution round
        this.allToolExecutionRounds.push({
          round: currentRound,
          toolCalls: currentToolCalls,
          response: currentResponse,
          toolResults,
        });

        // Save tool results to state
        await this.saveToolResultsToState(toolResults);

        // Apply nextTurnParams
        await this.applyNextTurnParams(currentToolCalls);

        // Make follow-up request
        currentResponse = await this.makeFollowupRequest(currentResponse, toolResults);

        // Save new response to state
        await this.saveResponseToState(currentResponse);

        currentRound++;
      }

      // Validate and finalize
      this.validateFinalResponse(currentResponse);
      this.finalResponse = currentResponse;
      await this.markStateComplete();
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
   * Preliminary tool results and tool results are streamed in REAL-TIME as generator tools yield.
   */
  getFullResponsesStream(): AsyncIterableIterator<ResponseStreamEvent<InferToolEventsUnion<TTools>, InferToolOutputsUnion<TTools>>> {
    return async function* (this: ModelResult<TTools>) {
      await this.initStream();
      if (!this.reusableStream) {
        throw new Error('Stream not initialized');
      }

      // Get or create broadcaster for real-time tool events (lazy init prevents race conditions)
      const broadcaster = this.ensureBroadcaster();
      const toolEventConsumer = broadcaster.createConsumer();

      // Start tool execution in background (completes broadcaster when done)
      const executionPromise = this.executeToolsIfNeeded().finally(() => {
        broadcaster.complete();
      });

      const consumer = this.reusableStream.createConsumer();

      // Yield original API events
      for await (const event of consumer) {
        yield event;
      }

      // Yield tool events as they arrive (real-time!)
      for await (const event of toolEventConsumer) {
        if (event.type === 'preliminary_result') {
          yield {
            type: 'tool.preliminary_result' as const,
            toolCallId: event.toolCallId,
            result: event.result,
            timestamp: Date.now(),
          };
        } else if (event.type === 'tool_result') {
          yield {
            type: 'tool.result' as const,
            toolCallId: event.toolCallId,
            result: event.result,
            timestamp: Date.now(),
            ...(event.preliminaryResults && { preliminaryResults: event.preliminaryResults }),
          };
        }
      }

      // Ensure execution completed (handles errors)
      await executionPromise;
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
   * Stream all output items cumulatively as they arrive.
   * Items are emitted with the same ID but progressively updated content as streaming progresses.
   * Also yields tool results (function_call_output) after tool execution completes.
   *
   * Item types include:
   * - message: Assistant text responses (emitted cumulatively as text streams)
   * - function_call: Tool calls (emitted cumulatively as arguments stream)
   * - reasoning: Model reasoning (emitted cumulatively as thinking streams)
   * - web_search_call: Web search operations
   * - file_search_call: File search operations
   * - image_generation_call: Image generation operations
   * - function_call_output: Results from executed tools
   */
  getItemsStream(): AsyncIterableIterator<StreamableOutputItem> {
    return async function* (this: ModelResult<TTools>) {
      await this.initStream();
      if (!this.reusableStream) {
        throw new Error('Stream not initialized');
      }

      // Stream all items from the API response cumulatively
      yield* buildItemsStream(this.reusableStream);

      // Execute tools if needed
      await this.executeToolsIfNeeded();

      // Yield function call outputs for each executed tool
      for (const round of this.allToolExecutionRounds) {
        for (const toolResult of round.toolResults) {
          yield toolResult;
        }
      }

      // If tools were executed, yield all items from the final response
      if (this.finalResponse && this.allToolExecutionRounds.length > 0) {
        for (const item of this.finalResponse.output) {
          if (
            isOutputMessage(item) ||
            isFunctionCallOutputItem(item) ||
            isReasoningOutputItem(item) ||
            isWebSearchCallOutputItem(item) ||
            isFileSearchCallOutputItem(item) ||
            isImageGenerationCallOutputItem(item)
          ) {
            yield item;
          }
        }
      }
    }.call(this);
  }

  /**
   * @deprecated Use `getItemsStream()` instead. This method only streams messages,
   * while `getItemsStream()` streams all output item types (messages, function_calls,
   * reasoning, etc.) with cumulative updates.
   *
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
   * Preliminary results are streamed in REAL-TIME as generator tools yield.
   * - Tool call argument deltas as { type: "delta", content: string }
   * - Preliminary results as { type: "preliminary_result", toolCallId, result }
   */
  getToolStream(): AsyncIterableIterator<ToolStreamEvent<InferToolEventsUnion<TTools>>> {
    return async function* (this: ModelResult<TTools>) {
      await this.initStream();
      if (!this.reusableStream) {
        throw new Error('Stream not initialized');
      }

      // Get or create broadcaster for real-time tool events (lazy init prevents race conditions)
      const broadcaster = this.ensureBroadcaster();
      const toolEventConsumer = broadcaster.createConsumer();

      // Start tool execution in background (completes broadcaster when done)
      const executionPromise = this.executeToolsIfNeeded().finally(() => {
        broadcaster.complete();
      });

      // Yield tool deltas from API stream
      for await (const delta of extractToolDeltas(this.reusableStream)) {
        yield {
          type: 'delta' as const,
          content: delta,
        };
      }

      // Yield only preliminary_result events (filter out tool_result events)
      for await (const event of toolEventConsumer) {
        if (event.type === 'preliminary_result') {
          yield event;
        }
      }

      // Ensure execution completed (handles errors)
      await executionPromise;
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

    // Handle non-streaming response case - use finalResponse directly
    if (this.finalResponse) {
      return extractToolCallsFromResponse(this.finalResponse) as ParsedToolCall<TTools[number]>[];
    }

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
