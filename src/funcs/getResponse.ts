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
 * - `await response.getMessage()` - Get the completed message
 * - `await response.getText()` - Get just the text content
 * - `for await (const delta of response.getTextStream())` - Stream text deltas
 * - `for await (const delta of response.getReasoningStream())` - Stream reasoning deltas
 * - `for await (const delta of response.getToolStream())` - Stream tool call argument deltas
 * - `for await (const msg of response.getNewMessagesStream())` - Stream incremental message updates
 * - `for await (const event of response.getFullResponsesStream())` - Stream all response events
 * - `for await (const chunk of response.getFullChatStream())` - Stream in chat-compatible format
 *
 * All consumption patterns can be used concurrently on the same response.
 *
 * @example
 * ```typescript
 * // Simple text extraction
 * const response = await openrouter.beta.responses.get({
 *   model: "anthropic/claude-3-opus",
 *   input: [{ role: "user", content: "Hello!" }]
 * });
 * const text = await response.getText();
 * console.log(text);
 *
 * // Streaming text
 * const response = openrouter.beta.responses.get({
 *   model: "anthropic/claude-3-opus",
 *   input: [{ role: "user", content: "Hello!" }]
 * });
 * for await (const delta of response.getTextStream()) {
 *   process.stdout.write(delta);
 * }
 *
 * // Full message with metadata
 * const response = openrouter.beta.responses.get({
 *   model: "anthropic/claude-3-opus",
 *   input: [{ role: "user", content: "Hello!" }]
 * });
 * const message = await response.getMessage();
 * console.log(message.content);
 * ```
 */
export function getResponse(
  client: OpenRouterCore,
  request: Omit<models.OpenResponsesRequest, "stream">,
  options?: RequestOptions,
): ResponseWrapper {
  return new ResponseWrapper({
    client,
    request: { ...request },
    options: options ?? {},
  });
}
