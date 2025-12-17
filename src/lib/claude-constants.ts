/**
 * Claude content block types used in message content arrays
 */
export const ClaudeContentBlockType = {
  Text: 'text',
  Image: 'image',
  ToolUse: 'tool_use',
  ToolResult: 'tool_result',
} as const;

export type ClaudeContentBlockType =
  (typeof ClaudeContentBlockType)[keyof typeof ClaudeContentBlockType];

/**
 * Message roles that exist in OpenAI/Chat format but NOT in Claude format.
 * Used to distinguish between the two message formats.
 */
export const NonClaudeMessageRole = {
  System: 'system',
  Developer: 'developer',
  Tool: 'tool',
} as const;

export type NonClaudeMessageRole = (typeof NonClaudeMessageRole)[keyof typeof NonClaudeMessageRole];
