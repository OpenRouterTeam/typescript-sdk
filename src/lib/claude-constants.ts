/**
 * Claude-specific content block types
 * Used for detecting Claude message format
 */
export const ClaudeContentBlockType = {
  Text: "text",
  Image: "image",
  ToolUse: "tool_use",
  ToolResult: "tool_result",
} as const;

export type ClaudeContentBlockType =
  (typeof ClaudeContentBlockType)[keyof typeof ClaudeContentBlockType];

/**
 * Message roles that are NOT supported in Claude format
 * Used for distinguishing Claude vs OpenAI format
 */
export const NonClaudeMessageRole = {
  System: "system",
  Developer: "developer",
  Tool: "tool",
} as const;

export type NonClaudeMessageRole =
  (typeof NonClaudeMessageRole)[keyof typeof NonClaudeMessageRole];
