import { describe, expect, it } from 'vitest';
import { z } from 'zod/v4';
import {
  createInitialState,
  updateState,
  generateConversationId,
  createUnsentResult,
  createRejectedResult,
  partitionToolCalls,
  toolRequiresApproval,
  appendToMessages,
} from '../../src/lib/conversation-state.js';
import { tool } from '../../src/lib/tool.js';

describe('Conversation State Utilities', () => {
  describe('generateConversationId', () => {
    it('should generate unique IDs with conv_ prefix', () => {
      const id1 = generateConversationId();
      const id2 = generateConversationId();

      expect(id1).toMatch(/^conv_/);
      expect(id2).toMatch(/^conv_/);
      expect(id1).not.toBe(id2);
    });
  });

  describe('createInitialState', () => {
    it('should create state with default values', () => {
      const state = createInitialState();

      expect(state.id).toMatch(/^conv_/);
      expect(state.messages).toEqual([]);
      expect(state.status).toBe('in_progress');
      expect(state.createdAt).toBeDefined();
      expect(state.updatedAt).toBeDefined();
    });

    it('should use custom ID when provided', () => {
      const state = createInitialState('custom-id');
      expect(state.id).toBe('custom-id');
    });
  });

  describe('updateState', () => {
    it('should update status and timestamp', () => {
      const initial = createInitialState();
      const originalUpdatedAt = initial.updatedAt;

      const updated = updateState(initial, { status: 'complete' });

      expect(updated.status).toBe('complete');
      expect(updated.updatedAt).toBeGreaterThanOrEqual(originalUpdatedAt);
      expect(updated.id).toBe(initial.id); // ID unchanged
    });

    it('should preserve fields not being updated', () => {
      const initial = createInitialState('test-id');
      const updated = updateState(initial, { status: 'awaiting_approval' });

      expect(updated.id).toBe('test-id');
      expect(updated.messages).toEqual([]);
      expect(updated.createdAt).toBe(initial.createdAt);
    });
  });

  describe('createUnsentResult', () => {
    it('should create valid unsent result', () => {
      const result = createUnsentResult('call-1', 'test_tool', { data: 'test' });

      expect(result.callId).toBe('call-1');
      expect(result.name).toBe('test_tool');
      expect(result.output).toEqual({ data: 'test' });
      expect(result.error).toBeUndefined();
    });

    it('should handle null output', () => {
      const result = createUnsentResult('call-1', 'test_tool', null);

      expect(result.callId).toBe('call-1');
      expect(result.output).toBeNull();
    });
  });

  describe('createRejectedResult', () => {
    it('should create rejected result with default message', () => {
      const result = createRejectedResult('call-1', 'test_tool');

      expect(result.callId).toBe('call-1');
      expect(result.output).toBeNull();
      expect(result.error).toBe('Tool call rejected by user');
    });

    it('should use custom rejection reason', () => {
      const result = createRejectedResult('call-1', 'test_tool', 'Not allowed');
      expect(result.error).toBe('Not allowed');
    });
  });

  describe('toolRequiresApproval', () => {
    const toolWithApproval = tool({
      name: 'dangerous_action',
      inputSchema: z.object({}),
      requireApproval: true,
      execute: async () => ({}),
    });

    const toolWithoutApproval = tool({
      name: 'safe_action',
      inputSchema: z.object({}),
      execute: async () => ({}),
    });

    const context = { numberOfTurns: 1 };

    it('should return true for tools with requireApproval', async () => {
      const toolCall = { id: '1', name: 'dangerous_action', arguments: {} };
      expect(await toolRequiresApproval(toolCall, [toolWithApproval, toolWithoutApproval], context)).toBe(true);
    });

    it('should return false for tools without requireApproval', async () => {
      const toolCall = { id: '1', name: 'safe_action', arguments: {} };
      expect(await toolRequiresApproval(toolCall, [toolWithApproval, toolWithoutApproval], context)).toBe(false);
    });

    it('should return false for unknown tools', async () => {
      const toolCall = { id: '1', name: 'unknown_tool', arguments: {} };
      expect(await toolRequiresApproval(toolCall, [toolWithApproval, toolWithoutApproval], context)).toBe(false);
    });

    it('should use call-level check when provided', async () => {
      const toolCall = { id: '1', name: 'safe_action', arguments: {} };
      const alwaysRequire = () => true;

      expect(await toolRequiresApproval(toolCall, [toolWithoutApproval], context, alwaysRequire)).toBe(true);
    });

    it('should call-level check can override tool-level approval', async () => {
      const toolCall = { id: '1', name: 'dangerous_action', arguments: {} };
      const neverRequire = () => false;

      // Call-level check takes precedence
      expect(await toolRequiresApproval(toolCall, [toolWithApproval], context, neverRequire)).toBe(false);
    });

    it('should support async call-level check', async () => {
      const toolCall = { id: '1', name: 'safe_action', arguments: {} };
      const asyncCheck = async (_tc: unknown, ctx: { numberOfTurns: number }) => {
        // Simulate async operation
        await Promise.resolve();
        return ctx.numberOfTurns > 0;
      };

      expect(await toolRequiresApproval(toolCall, [toolWithoutApproval], context, asyncCheck)).toBe(true);
      expect(await toolRequiresApproval(toolCall, [toolWithoutApproval], { numberOfTurns: 0 }, asyncCheck)).toBe(false);
    });
  });

  describe('partitionToolCalls', () => {
    const approvalTool = tool({
      name: 'needs_approval',
      inputSchema: z.object({}),
      requireApproval: true,
      execute: async () => ({}),
    });

    const autoTool = tool({
      name: 'auto_execute',
      inputSchema: z.object({}),
      execute: async () => ({}),
    });

    const context = { numberOfTurns: 1 };

    it('should partition tool calls correctly', async () => {
      const toolCalls = [
        { id: '1', name: 'needs_approval', arguments: {} },
        { id: '2', name: 'auto_execute', arguments: {} },
      ];

      const { requiresApproval, autoExecute } = await partitionToolCalls(
        toolCalls,
        [approvalTool, autoTool],
        context
      );

      expect(requiresApproval).toHaveLength(1);
      expect(requiresApproval[0]?.name).toBe('needs_approval');
      expect(autoExecute).toHaveLength(1);
      expect(autoExecute[0]?.name).toBe('auto_execute');
    });

    it('should handle all tools requiring approval', async () => {
      const toolCalls = [
        { id: '1', name: 'needs_approval', arguments: {} },
      ];

      const { requiresApproval, autoExecute } = await partitionToolCalls(
        toolCalls,
        [approvalTool, autoTool],
        context
      );

      expect(requiresApproval).toHaveLength(1);
      expect(autoExecute).toHaveLength(0);
    });

    it('should handle all tools auto-executing', async () => {
      const toolCalls = [
        { id: '1', name: 'auto_execute', arguments: {} },
      ];

      const { requiresApproval, autoExecute } = await partitionToolCalls(
        toolCalls,
        [approvalTool, autoTool],
        context
      );

      expect(requiresApproval).toHaveLength(0);
      expect(autoExecute).toHaveLength(1);
    });

    it('should handle empty tool calls', async () => {
      const { requiresApproval, autoExecute } = await partitionToolCalls(
        [],
        [approvalTool, autoTool],
        context
      );

      expect(requiresApproval).toHaveLength(0);
      expect(autoExecute).toHaveLength(0);
    });
  });

  describe('appendToMessages', () => {
    it('should append to empty messages', () => {
      const result = appendToMessages([], [
        { role: 'user' as const, content: 'Hello' },
      ]);

      expect(result).toHaveLength(1);
    });

    it('should append to existing messages', () => {
      const existing = [
        { role: 'user' as const, content: 'Hello' },
      ];
      const result = appendToMessages(existing, [
        { role: 'assistant' as const, content: 'Hi there!' },
      ]);

      expect(result).toHaveLength(2);
    });

    it('should handle string input', () => {
      const result = appendToMessages('What is 2+2?', [
        { role: 'assistant' as const, content: '4' },
      ]);

      expect(result).toHaveLength(2);
    });
  });
});
