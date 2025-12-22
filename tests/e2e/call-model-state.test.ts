import * as dotenv from 'dotenv';
import { beforeAll, describe, expect, it } from 'vitest';
import { z } from 'zod/v4';
import {
  OpenRouter,
  tool,
  createInitialState,
  stepCountIs,
  type ConversationState,
  type StateAccessor,
} from '../../src/index.js';

dotenv.config();

describe('State Management Integration', () => {
  let client: OpenRouter;

  beforeAll(() => {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      throw new Error('OPENROUTER_API_KEY environment variable is required');
    }
    client = new OpenRouter({ apiKey });
  });

  describe('In-Memory StateAccessor', () => {
    it('should persist state across tool execution', async () => {
      // In-memory store
      let storedState: ConversationState | null = null;

      const stateAccessor: StateAccessor = {
        load: async () => storedState,
        save: async (state) => { storedState = state; },
      };

      const echoTool = tool({
        name: 'echo',
        description: 'Echo back the input',
        inputSchema: z.object({ message: z.string() }),
        execute: async (params) => ({ echoed: params.message }),
      });

      const result = await client.callModel({
        model: 'openai/gpt-4o-mini',
        input: [{ role: 'user', content: 'Say hello using the echo tool with message "test"' }],
        tools: [echoTool],
        state: stateAccessor,
        stopWhen: stepCountIs(3),
      });

      await result.getText();

      // State should be saved
      expect(storedState).not.toBeNull();
      expect(storedState?.id).toMatch(/^conv_/);
    }, 30000);

    it('should track conversation status', async () => {
      let storedState: ConversationState | null = null;
      const stateHistory: string[] = [];

      const stateAccessor: StateAccessor = {
        load: async () => storedState,
        save: async (state) => {
          storedState = state;
          stateHistory.push(state.status);
        },
      };

      const simpleTool = tool({
        name: 'get_time',
        description: 'Get current time',
        inputSchema: z.object({}),
        execute: async () => ({ time: new Date().toISOString() }),
      });

      const result = await client.callModel({
        model: 'openai/gpt-4o-mini',
        input: [{ role: 'user', content: 'What time is it? Use the get_time tool.' }],
        tools: [simpleTool],
        state: stateAccessor,
        stopWhen: stepCountIs(3),
      });

      await result.getText();

      // Should have tracked status changes
      expect(stateHistory.length).toBeGreaterThan(0);
      // Final state should be complete or in_progress
      expect(['complete', 'in_progress']).toContain(storedState?.status);
    }, 30000);
  });

  describe('Approval Workflow', () => {
    it('should identify tools requiring approval', async () => {
      let storedState: ConversationState | null = null;

      const stateAccessor: StateAccessor = {
        load: async () => storedState,
        save: async (state) => { storedState = state; },
      };

      const dangerousTool = tool({
        name: 'delete_file',
        description: 'Delete a file (requires approval)',
        inputSchema: z.object({ path: z.string() }),
        requireApproval: true,
        execute: async (params) => ({ deleted: params.path }),
      });

      const result = await client.callModel({
        model: 'openai/gpt-4o-mini',
        input: [{ role: 'user', content: 'Delete the file at /tmp/test.txt' }],
        tools: [dangerousTool],
        state: stateAccessor,
      });

      // Get the response to trigger tool execution
      await result.getResponse();

      // Check if approval is required
      const requiresApproval = await result.requiresApproval();
      const pendingCalls = await result.getPendingToolCalls();

      // The test validates that state management works with approval tools
      // If model called the tool, approval should be required
      // If model didn't call the tool, that's also valid behavior
      expect(storedState).not.toBeNull();

      if (pendingCalls.length > 0) {
        expect(requiresApproval).toBe(true);
        expect(storedState?.status).toBe('awaiting_approval');
        expect(pendingCalls[0]?.name).toBe('delete_file');
      } else {
        // Model chose not to call the tool - state should still be tracked
        expect(['complete', 'in_progress']).toContain(storedState?.status);
      }
    }, 30000);

    it('should use custom requireApproval function', async () => {
      let storedState: ConversationState | null = null;
      const checkedTools: string[] = [];

      const stateAccessor: StateAccessor = {
        load: async () => storedState,
        save: async (state) => { storedState = state; },
      };

      const safeTool = tool({
        name: 'safe_action',
        description: 'A safe action',
        inputSchema: z.object({ action: z.string() }),
        execute: async (params) => ({ result: params.action }),
      });

      // Custom function that requires approval for all tools
      const customRequireApproval = (toolCall: { name: string }) => {
        checkedTools.push(toolCall.name);
        return true; // Always require approval
      };

      const result = await client.callModel({
        model: 'openai/gpt-4o-mini',
        input: [{ role: 'user', content: 'Perform safe_action with action "test"' }],
        tools: [safeTool],
        state: stateAccessor,
        requireApproval: customRequireApproval,
      });

      const pendingCalls = await result.getPendingToolCalls();

      // If the model called the tool, custom function should have been invoked
      if (pendingCalls.length > 0) {
        expect(checkedTools).toContain('safe_action');
        expect(await result.requiresApproval()).toBe(true);
      }
    }, 30000);
  });

  describe('Tool Execution with State', () => {
    it('should accumulate messages in state during multi-turn', async () => {
      let storedState: ConversationState | null = null;

      const stateAccessor: StateAccessor = {
        load: async () => storedState,
        save: async (state) => { storedState = state; },
      };

      const mathTool = tool({
        name: 'add',
        description: 'Add two numbers',
        inputSchema: z.object({
          a: z.number(),
          b: z.number(),
        }),
        execute: async (params) => ({ result: params.a + params.b }),
      });

      const result = await client.callModel({
        model: 'openai/gpt-4o-mini',
        input: [{ role: 'user', content: 'What is 5 + 3? Use the add tool.' }],
        tools: [mathTool],
        state: stateAccessor,
        stopWhen: stepCountIs(3),
      });

      await result.getText();

      // State should contain messages from the conversation
      expect(storedState).not.toBeNull();
      if (storedState?.messages) {
        // Should have at least the initial user message
        const messages = Array.isArray(storedState.messages)
          ? storedState.messages
          : [storedState.messages];
        expect(messages.length).toBeGreaterThan(0);
      }
    }, 30000);
  });
});
