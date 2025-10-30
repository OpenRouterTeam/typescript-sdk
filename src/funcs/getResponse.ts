import { OpenRouterCore } from "../core.js";
import { RequestOptions } from "../lib/sdks.js";
import { ResponseWrapper } from "../lib/response-wrapper.js";
import * as models from "../models/index.js";

/**
 * Get a response with multiple consumption patterns
 *
 * @remarks
 * Creates a response using the OpenResponses API in streaming mode and returns
 * a wrapper that allows consuming the response in multiple ways:
 *
 * - `await response.message` - Get the completed message
 * - `await response.text` - Get just the text content
 * - `for await (const delta of response.textStream)` - Stream text deltas
 * - `for await (const delta of response.reasoningStream)` - Stream reasoning deltas
 * - `for await (const delta of response.toolStream)` - Stream tool call argument deltas
 * - `for await (const msg of response.newMessagesStream)` - Stream incremental message updates
 * - `for await (const event of response.fullResponsesStream)` - Stream all response events
 * - `for await (const chunk of response.fullChatStream)` - Stream in chat-compatible format
 *
 * All consumption patterns can be used concurrently on the same response.
 *
 * When memory is configured and threadId/resourceId are provided:
 * - Conversation history will be automatically injected before the input
 * - Messages will be automatically saved after the response completes
 *
 * @example
 * ```typescript
 * // Simple text extraction
 * const response = await openrouter.beta.responses.get({
 *   model: "anthropic/claude-3-opus",
 *   input: [{ role: "user", content: "Hello!" }]
 * });
 * const text = await response.text;
 * console.log(text);
 *
 * // Streaming text
 * const response = openrouter.beta.responses.get({
 *   model: "anthropic/claude-3-opus",
 *   input: [{ role: "user", content: "Hello!" }]
 * });
 * for await (const delta of response.textStream) {
 *   process.stdout.write(delta);
 * }
 *
 * // Full message with metadata
 * const response = openrouter.beta.responses.get({
 *   model: "anthropic/claude-3-opus",
 *   input: [{ role: "user", content: "Hello!" }]
 * });
 * const message = await response.message;
 * console.log(message.content);
 *
 * // With memory (auto-inject history and auto-save)
 * const response = openrouter.beta.responses.get({
 *   model: "anthropic/claude-3-opus",
 *   input: [{ role: "user", content: "Hello!" }],
 *   threadId: "thread-123",
 *   resourceId: "user-456"
 * });
 * const text = await response.text; // Messages automatically saved
 * ```
 */
export function getResponse(
  client: OpenRouterCore,
  request: Omit<models.OpenResponsesRequest, "stream"> & {
    threadId?: string;
    resourceId?: string;
  },
  options?: RequestOptions,
): ResponseWrapper {
  // Extract memory-specific fields
  const { threadId, resourceId, ...apiRequest } = request;

  // Get memory from client if available
  const memory = ("memory" in client && (client as any).memory) ? (client as any).memory : undefined;

  const wrapperOptions: any = {
    client,
    request: { ...apiRequest },
    options: options ?? {},
  };

  // Only add memory fields if they exist
  if (memory !== undefined) wrapperOptions.memory = memory;
  if (threadId !== undefined) wrapperOptions.threadId = threadId;
  if (resourceId !== undefined) wrapperOptions.resourceId = resourceId;
  if (request.input !== undefined) wrapperOptions.originalInput = request.input;

  return new ResponseWrapper(wrapperOptions);
}
