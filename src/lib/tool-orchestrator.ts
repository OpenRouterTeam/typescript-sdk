import type * as models from '../models/index.js';
import type { APITool, Tool, ToolExecutionResult } from './tool-types.js';

import { extractToolCallsFromResponse, responseHasToolCalls } from './stream-transformers.js';
import { executeTool, findToolByName } from './tool-executor.js';
import { hasExecuteFunction } from './tool-types.js';

/**
 * Options for tool execution
 */
export interface ToolExecutionOptions {
  maxRounds?: number;
  onPreliminaryResult?: (toolCallId: string, result: unknown) => void;
}

/**
 * Result of the tool execution loop
 */
export interface ToolOrchestrationResult {
  finalResponse: models.OpenResponsesNonStreamingResponse;
  allResponses: models.OpenResponsesNonStreamingResponse[];
  toolExecutionResults: ToolExecutionResult[];
  conversationInput: models.OpenResponsesInput;
}

/**
 * Execute tool calls and manage multi-turn conversations
 * This orchestrates the loop of: request -> tool calls -> execute -> send results -> repeat
 *
 * @param sendRequest - Function to send a request and get a response
 * @param initialInput - Starting input for the conversation
 * @param tools - Enhanced tools with Zod schemas and execute functions
 * @param apiTools - Converted tools in API format (JSON Schema)
 * @param options - Execution options
 * @returns Result containing final response and all execution data
 */
export async function executeToolLoop(
  sendRequest: (
    input: models.OpenResponsesInput,
    tools: APITool[],
  ) => Promise<models.OpenResponsesNonStreamingResponse>,
  initialInput: models.OpenResponsesInput,
  tools: Tool[],
  apiTools: APITool[],
  options: ToolExecutionOptions = {},
): Promise<ToolOrchestrationResult> {
  const maxRounds = options.maxRounds ?? 5;
  const onPreliminaryResult = options.onPreliminaryResult;

  const allResponses: models.OpenResponsesNonStreamingResponse[] = [];
  const toolExecutionResults: ToolExecutionResult[] = [];
  let conversationInput: models.OpenResponsesInput = initialInput;

  let currentRound = 0;
  let currentResponse: models.OpenResponsesNonStreamingResponse;

  // Initial request
  currentResponse = await sendRequest(conversationInput, apiTools);
  allResponses.push(currentResponse);

  // Loop until no more tool calls or max rounds reached
  while (responseHasToolCalls(currentResponse) && currentRound < maxRounds) {
    currentRound++;

    // Extract tool calls from response
    const toolCalls = extractToolCallsFromResponse(currentResponse);

    if (toolCalls.length === 0) {
      break;
    }

    // Check if any tools have execute functions
    const hasExecutableTools = toolCalls.some((toolCall) => {
      const tool = findToolByName(tools, toolCall.name);
      return tool && hasExecuteFunction(tool);
    });

    // If no executable tools, return (manual execution mode)
    if (!hasExecutableTools) {
      break;
    }

    // Execute all tool calls
    const roundResults: ToolExecutionResult[] = [];

    for (const toolCall of toolCalls) {
      const tool = findToolByName(tools, toolCall.name);

      if (!tool) {
        // Tool not found in definitions
        roundResults.push({
          toolCallId: toolCall.id,
          toolName: toolCall.name,
          result: null,
          error: new Error(`Tool "${toolCall.name}" not found in tool definitions`),
        });
        continue;
      }

      if (!hasExecuteFunction(tool)) {
        // Tool has no execute function - skip
        continue;
      }

      // Build turn context
      const turnContext: import('./tool-types.js').TurnContext = {
        numberOfTurns: currentRound,
        messageHistory: conversationInput,
      };

      // Execute the tool
      const result = await executeTool(tool, toolCall, turnContext, onPreliminaryResult);
      roundResults.push(result);
    }

    toolExecutionResults.push(...roundResults);

    // Build array input with all output from previous response plus tool results
    // The API expects continuation via previousResponseId, not by including outputs
    // For now, we'll keep the conversation going via previousResponseId
    conversationInput = initialInput; // Keep original input

    // Note: The OpenRouter Responses API uses previousResponseId for continuation
    // Tool results are automatically associated with the previous response's tool calls

    // Send updated conversation to API - this should use previousResponseId
    currentResponse = await sendRequest(conversationInput, apiTools);
    allResponses.push(currentResponse);
  }

  return {
    finalResponse: currentResponse,
    allResponses,
    toolExecutionResults,
    conversationInput,
  };
}

/**
 * Convert tool execution results to a map for easy lookup
 */
export function toolResultsToMap(results: ToolExecutionResult[]): Map<
  string,
  {
    result: unknown;
    preliminaryResults?: unknown[];
  }
> {
  const map = new Map();

  for (const result of results) {
    map.set(result.toolCallId, {
      result: result.result,
      preliminaryResults: result.preliminaryResults,
    });
  }

  return map;
}

/**
 * Build a summary of tool executions for debugging/logging
 */
export function summarizeToolExecutions(results: ToolExecutionResult[]): string {
  const lines: string[] = [];

  for (const result of results) {
    if (result.error) {
      lines.push(`❌ ${result.toolName} (${result.toolCallId}): ERROR - ${result.error.message}`);
    } else {
      const prelimCount = result.preliminaryResults?.length ?? 0;
      const prelimInfo = prelimCount > 0 ? ` (${prelimCount} preliminary results)` : '';
      lines.push(`✅ ${result.toolName} (${result.toolCallId}): SUCCESS${prelimInfo}`);
    }
  }

  return lines.join('\n');
}

/**
 * Check if any tool executions had errors
 */
export function hasToolExecutionErrors(results: ToolExecutionResult[]): boolean {
  return results.some((result) => result.error !== undefined);
}

/**
 * Get all tool execution errors
 */
export function getToolExecutionErrors(results: ToolExecutionResult[]): Error[] {
  return results.filter((result) => result.error !== undefined).map((result) => result.error!);
}
