/*
 * Types copied from @anthropic-ai/sdk for ClaudeMessage format.
 * These types represent the Anthropic Claude API message response structure.
 */

/**
 * Reason why the model stopped generating.
 */
export type ClaudeStopReason =
  | "end_turn"
  | "max_tokens"
  | "stop_sequence"
  | "tool_use"
  | "pause_turn"
  | "refusal";

/**
 * Character-level citation location within a document.
 */
export type ClaudeCitationCharLocation = {
  type: "char_location";
  cited_text: string;
  document_index: number;
  document_title: string;
  file_id: string;
  start_char_index: number;
  end_char_index: number;
};

/**
 * Page-level citation location within a document.
 */
export type ClaudeCitationPageLocation = {
  type: "page_location";
  cited_text: string;
  document_index: number;
  document_title: string;
  file_id: string;
  start_page_number: number;
  end_page_number: number;
};

/**
 * Content block citation location within a document.
 */
export type ClaudeCitationContentBlockLocation = {
  type: "content_block_location";
  cited_text: string;
  document_index: number;
  document_title: string;
  file_id: string;
  start_block_index: number;
  end_block_index: number;
};

/**
 * Web search result citation location.
 */
export type ClaudeCitationWebSearchResultLocation = {
  type: "web_search_result_location";
  cited_text: string;
  title: string;
  url: string;
  encrypted_index: string;
};

/**
 * Search result citation location.
 */
export type ClaudeCitationSearchResultLocation = {
  type: "search_result_location";
  cited_text: string;
  title: string;
  source: string;
  start_block_index: number;
  end_block_index: number;
  search_result_index: number;
};

/**
 * Union of all text citation types.
 */
export type ClaudeTextCitation =
  | ClaudeCitationCharLocation
  | ClaudeCitationPageLocation
  | ClaudeCitationContentBlockLocation
  | ClaudeCitationWebSearchResultLocation
  | ClaudeCitationSearchResultLocation;

/**
 * Text content block.
 */
export type ClaudeTextBlock = {
  type: "text";
  text: string;
  citations?: ClaudeTextCitation[];
};

/**
 * Extended thinking content block.
 */
export type ClaudeThinkingBlock = {
  type: "thinking";
  thinking: string;
  signature: string;
};

/**
 * Redacted thinking content block.
 */
export type ClaudeRedactedThinkingBlock = {
  type: "redacted_thinking";
  data: string;
};

/**
 * Tool use content block.
 */
export type ClaudeToolUseBlock = {
  type: "tool_use";
  id: string;
  name: string;
  input: Record<string, unknown>;
};

/**
 * Server-side tool use content block (e.g., web_search).
 */
export type ClaudeServerToolUseBlock = {
  type: "server_tool_use";
  id: string;
  name: "web_search";
  input: Record<string, unknown>;
};

/**
 * Union of all content block types.
 */
export type ClaudeContentBlock =
  | ClaudeTextBlock
  | ClaudeThinkingBlock
  | ClaudeRedactedThinkingBlock
  | ClaudeToolUseBlock
  | ClaudeServerToolUseBlock;

/**
 * Token usage information.
 */
export type ClaudeUsage = {
  input_tokens: number;
  output_tokens: number;
  cache_creation_input_tokens?: number;
  cache_read_input_tokens?: number;
};

/**
 * Claude Message response format compatible with the Anthropic SDK.
 * This represents a complete assistant response from the Claude API.
 */
export type ClaudeMessage = {
  id: string;
  type: "message";
  role: "assistant";
  model: string;
  content: ClaudeContentBlock[];
  stop_reason: ClaudeStopReason | null;
  stop_sequence?: string | null;
  usage: ClaudeUsage;
};

// --- INPUT TYPES (MessageParam) ---
// These types represent the Anthropic Claude API message input structure.

/**
 * Cache control for prompt caching.
 */
export type ClaudeCacheControl = {
  type: "ephemeral";
};

/**
 * Text content block parameter for input.
 */
export type ClaudeTextBlockParam = {
  type: "text";
  text: string;
  cache_control?: ClaudeCacheControl | null;
};

/**
 * Base64-encoded image source.
 */
export type ClaudeBase64ImageSource = {
  type: "base64";
  media_type: "image/jpeg" | "image/png" | "image/gif" | "image/webp";
  data: string;
};

/**
 * URL-based image source.
 */
export type ClaudeURLImageSource = {
  type: "url";
  url: string;
};

/**
 * Image content block parameter for input.
 */
export type ClaudeImageBlockParam = {
  type: "image";
  source: ClaudeBase64ImageSource | ClaudeURLImageSource;
  cache_control?: ClaudeCacheControl | null;
};

/**
 * Tool use content block parameter for input (when passing assistant's tool use back).
 */
export type ClaudeToolUseBlockParam = {
  type: "tool_use";
  id: string;
  name: string;
  input: Record<string, unknown>;
  cache_control?: ClaudeCacheControl | null;
};

/**
 * Tool result content block parameter for input.
 */
export type ClaudeToolResultBlockParam = {
  type: "tool_result";
  tool_use_id: string;
  content: string | Array<ClaudeTextBlockParam | ClaudeImageBlockParam>;
  is_error?: boolean;
  cache_control?: ClaudeCacheControl | null;
};

/**
 * Union of all input content block types.
 */
export type ClaudeContentBlockParam =
  | ClaudeTextBlockParam
  | ClaudeImageBlockParam
  | ClaudeToolUseBlockParam
  | ClaudeToolResultBlockParam;

/**
 * Claude MessageParam input format compatible with the Anthropic SDK.
 * This represents a message in a conversation for the Claude API.
 */
export type ClaudeMessageParam = {
  role: "user" | "assistant";
  content: string | Array<ClaudeContentBlockParam>;
};
