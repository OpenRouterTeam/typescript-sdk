import type * as models from "../models/index.js";
import {
  ClaudeContentBlockType,
  NonClaudeMessageRole,
} from "./claude-constants.js";

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isNonClaudeRole(role: unknown): boolean {
  return (
    role === NonClaudeMessageRole.System ||
    role === NonClaudeMessageRole.Developer ||
    role === NonClaudeMessageRole.Tool
  );
}

function isClaudeToolResultBlock(block: unknown): boolean {
  if (!isRecord(block)) return false;
  return block["type"] === ClaudeContentBlockType.ToolResult;
}

function isClaudeImageBlockWithSource(block: unknown): boolean {
  if (!isRecord(block)) return false;
  return (
    block["type"] === ClaudeContentBlockType.Image &&
    "source" in block &&
    isRecord(block["source"])
  );
}

function isClaudeToolUseBlockWithId(block: unknown): boolean {
  if (!isRecord(block)) return false;
  return (
    block["type"] === ClaudeContentBlockType.ToolUse &&
    "id" in block &&
    typeof block["id"] === "string"
  );
}

function hasClaudeSpecificBlocks(content: unknown[]): boolean {
  for (const block of content) {
    if (isClaudeToolResultBlock(block)) return true;
    if (isClaudeImageBlockWithSource(block)) return true;
    if (isClaudeToolUseBlockWithId(block)) return true;
  }
  return false;
}

/**
 * Check if input is in Claude message format
 * Uses structural analysis to detect Claude-specific patterns
 *
 * @param input - Input to check
 * @returns True if input appears to be Claude format
 */
export function isClaudeStyleMessages(
  input: unknown
): input is models.ClaudeMessageParam[] {
  if (!Array.isArray(input) || input.length === 0) {
    return false;
  }

  for (const msg of input) {
    if (!isRecord(msg)) continue;
    if (!("role" in msg)) continue;
    if ("type" in msg) continue; // Claude messages don't have top-level "type"

    // If we find a non-Claude role, it's not Claude format
    if (isNonClaudeRole(msg["role"])) {
      return false;
    }

    // If we find Claude-specific content blocks, it's Claude format
    const content = msg["content"];
    if (Array.isArray(content) && hasClaudeSpecificBlocks(content)) {
      return true;
    }
  }

  return false;
}
