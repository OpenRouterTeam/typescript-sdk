import type * as models from "../models/index.js";
import {
  ClaudeContentBlockType,
  NonClaudeMessageRole,
} from "./claude-constants.js";

/**
 * Type guard: checks if a value is a valid object (not null, not array)
 */
function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

/**
 * Type guard: checks if a role is an OpenAI/Chat-specific role (not Claude)
 */
function isNonClaudeRole(role: unknown): boolean {
  return (
    role === NonClaudeMessageRole.System ||
    role === NonClaudeMessageRole.Developer ||
    role === NonClaudeMessageRole.Tool
  );
}

/**
 * Type guard: checks if a content block is a Claude tool_result block
 */
function isClaudeToolResultBlock(block: unknown): boolean {
  if (!isRecord(block)) return false;
  return block["type"] === ClaudeContentBlockType.ToolResult;
}

/**
 * Type guard: checks if a content block is a Claude image block with source object
 * (Claude uses 'source' object; OpenAI uses 'image_url' structure)
 */
function isClaudeImageBlockWithSource(block: unknown): boolean {
  if (!isRecord(block)) return false;
  return (
    block["type"] === ClaudeContentBlockType.Image &&
    "source" in block &&
    isRecord(block["source"])
  );
}

/**
 * Type guard: checks if a content block is a Claude tool_use block with id
 * (Claude uses 'tool_use' blocks; OpenAI uses 'tool_calls' array on message)
 */
function isClaudeToolUseBlockWithId(block: unknown): boolean {
  if (!isRecord(block)) return false;
  return (
    block["type"] === ClaudeContentBlockType.ToolUse &&
    "id" in block &&
    typeof block["id"] === "string"
  );
}

/**
 * Checks if a message's content array contains Claude-specific blocks
 */
function hasClaudeSpecificBlocks(content: unknown[]): boolean {
  for (const block of content) {
    if (isClaudeToolResultBlock(block)) return true;
    if (isClaudeImageBlockWithSource(block)) return true;
    if (isClaudeToolUseBlockWithId(block)) return true;
  }
  return false;
}

/**
 * Type guard: checks if input is Anthropic Claude-style messages
 *
 * Claude messages have only 'user' or 'assistant' roles (no 'system', 'tool', 'developer')
 * and may contain Claude-specific block types in content arrays.
 *
 * We check for Claude-ONLY features to distinguish from OpenAI format:
 * - 'tool_result' blocks (Claude-specific; OpenAI uses role: 'tool')
 * - 'image' blocks with 'source' object (Claude-specific structure)
 * - 'tool_use' blocks with 'id' (Claude-specific; OpenAI uses 'tool_calls' array on message)
 */
export function isClaudeStyleMessages(
  input: unknown
): input is models.ClaudeMessageParam[] {
  if (!Array.isArray(input) || input.length === 0) {
    return false;
  }

  for (const msg of input) {
    // Skip non-object entries
    if (!isRecord(msg)) continue;

    // Must have role property
    if (!("role" in msg)) continue;

    // Claude messages don't have top-level 'type' field
    if ("type" in msg) continue;

    // OpenAI has 'system', 'developer', 'tool' roles that Claude doesn't have
    // If we see these roles, it's definitely NOT Claude format
    if (isNonClaudeRole(msg["role"])) {
      return false;
    }

    // Check for Claude-specific content blocks
    const content = msg["content"];
    if (Array.isArray(content) && hasClaudeSpecificBlocks(content)) {
      return true;
    }
  }

  // No Claude-specific features found
  // Default to NOT Claude (prefer OpenAI chat format as it's more common)
  return false;
}
