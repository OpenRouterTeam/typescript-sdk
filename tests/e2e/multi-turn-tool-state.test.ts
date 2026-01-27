import * as dotenv from 'dotenv';
import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { z } from 'zod/v4';
import {
  OpenRouter,
  tool,
  stepCountIs,
  type StreamableOutputItem,
  type BeforeRequestHook,
  type BeforeRequestContext,
  type TurnContext,
} from '../../src/index.js';
import type { ModelResult } from '../../src/lib/model-result.js';
import type { Tool } from '../../src/lib/tool-types.js';
import type { OpenResponsesInput, OpenResponsesInput1 } from '../../src/models/openresponsesinput.js';

dotenv.config();

/**
 * Multi-Turn Tool State E2E Test
 *
 * TDD Red-Green-Refactor flow to identify and fix bugs in callModel:
 * 1. RED: Write test specifying expected behavior - test will fail due to existing bugs
 * 2. GREEN: Fix bugs in callModel to make test pass
 * 3. REFACTOR: Clean up implementation
 *
 * Expected Behavior:
 * - Request inspection via constructor hooks to verify items never lost
 * - In-memory task store managed by tools works correctly across turns
 * - getItemsStream() emits all item types cumulatively
 * - All items keyed by ID in same Map - items only updated, never lost
 */
describe('Multi-Turn Tool State E2E Tests', () => {
  let client: OpenRouter;
  let capturedRequests: Array<{ input: unknown[]; timestamp: number }>;

  //#region Request Tracking Hook

  /**
   * BeforeRequestHook that intercepts all API calls and captures the input array
   * for later verification of message ordering and structure.
   */
  const createRequestInspector = (): BeforeRequestHook => ({
    beforeRequest: async (_hookCtx: BeforeRequestContext, request: Request) => {
      const cloned = request.clone();
      try {
        const body = await cloned.json();
        capturedRequests.push({
          input: Array.isArray(body.input) ? body.input : [],
          timestamp: Date.now(),
        });
      } catch {
        // Non-JSON body, skip
      }
      return request;
    },
  });

  //#endregion

  //#region Task Management Tools

  interface Task {
    id: string;
    name: string;
    createdAt: string;
  }

  let taskStore: Map<string, Task>;

  const createListTasksTool = () =>
    tool({
      name: 'list_tasks',
      description: 'List all tasks in the system',
      inputSchema: z.object({}),
      outputSchema: z.object({
        tasks: z.array(z.object({ id: z.string(), name: z.string() })),
      }),
      execute: async () => ({
        tasks: Array.from(taskStore.values()).map((t) => ({ id: t.id, name: t.name })),
      }),
    });

  const createCreateTaskTool = () =>
    tool({
      name: 'create_task',
      description: 'Create a new task with the given name',
      inputSchema: z.object({ name: z.string() }),
      outputSchema: z.object({
        task: z.object({ id: z.string(), name: z.string() }),
      }),
      execute: async (params) => {
        const id = `task_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
        const task: Task = {
          id,
          name: params.name,
          createdAt: new Date().toISOString(),
        };
        taskStore.set(id, task);
        return { task: { id, name: params.name } };
      },
    });

  const createDeleteTaskTool = () =>
    tool({
      name: 'delete_task',
      description: 'Delete a task by its name',
      inputSchema: z.object({ name: z.string() }),
      outputSchema: z.object({
        deleted: z.boolean(),
        taskName: z.string(),
      }),
      execute: async (params) => {
        const entry = Array.from(taskStore.entries()).find(
          ([_, t]) => t.name === params.name,
        );
        if (entry) {
          taskStore.delete(entry[0]);
          return { deleted: true, taskName: params.name };
        }
        return { deleted: false, taskName: params.name };
      },
    });

  //#endregion

  //#region Test Setup

  beforeAll(() => {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      throw new Error('OPENROUTER_API_KEY environment variable is required');
    }

    const requestInspector = createRequestInspector();
    client = new OpenRouter({
      apiKey,
      hooks: requestInspector,
    });
  });

  beforeEach(() => {
    // Reset state before each test
    capturedRequests = [];
    taskStore = new Map();
  });

  //#endregion

  //#region Helper Functions

  interface InputItem {
    role?: string;
    type?: string;
    callId?: string;
    id?: string;
  }

  interface CapturedRequest {
    input: unknown[];
    timestamp: number;
  }

  /**
   * Verify the structure of captured API requests.
   * Checks ordering, uniqueness, and proper pairing of function calls and results.
   */
  function verifyRequestStructure(request: CapturedRequest): void {
    const items = request.input as InputItem[];

    // 1. System messages should appear before all non-system messages
    // This verifies that if any system message exists at index N, all items at indices < N are also system messages
    const systemIndices = items
      .map((item, i) => (item.role === 'system' ? i : -1))
      .filter((i) => i >= 0);

    const firstNonSystemIdx = items.findIndex((i) => i.role !== 'system');
    if (firstNonSystemIdx >= 0 && systemIndices.length > 0) {
      // All system message indices should be less than the first non-system index
      // e.g., [system, system, user] is valid; [user, system] is invalid
      for (const idx of systemIndices) {
        expect(idx, 'System messages must appear before non-system messages').toBeLessThan(firstNonSystemIdx);
      }
    }

    // 2. Track function calls and results
    const functionCalls = new Map<string, number>(); // callId -> index
    const functionResults = new Map<string, number>(); // callId -> index

    items.forEach((item, idx) => {
      if (item.type === 'function_call' && item.callId) {
        // 3. No duplicate function calls with same callId
        expect(
          functionCalls.has(item.callId),
          `Duplicate function_call with callId ${item.callId}`,
        ).toBe(false);
        functionCalls.set(item.callId, idx);
      }
      if (item.type === 'function_call_output' && item.callId) {
        // 4. No duplicate results with same callId
        expect(
          functionResults.has(item.callId),
          `Duplicate function_call_output with callId ${item.callId}`,
        ).toBe(false);
        functionResults.set(item.callId, idx);
      }
    });

    // 5. Function calls always before their results
    for (const [callId, resultIdx] of functionResults) {
      const callIdx = functionCalls.get(callId);
      expect(callIdx, `function_call not found for callId ${callId}`).toBeDefined();
      if (callIdx !== undefined) {
        expect(callIdx).toBeLessThan(resultIdx);
      }
    }

    // 6. Tool call and result IDs match
    for (const callId of functionResults.keys()) {
      expect(
        functionCalls.has(callId),
        `function_call_output has no matching function_call for callId ${callId}`,
      ).toBe(true);
    }

    // Note: We intentionally do NOT verify call-result interleaving because
    // parallel tool calls are valid (e.g., [call1, call2, result1, result2])
  }

  /**
   * Generate a unique key for an item.
   * Uses type + id/callId to ensure different item types don't overwrite each other.
   */
  function getItemKey(item: StreamableOutputItem): string | undefined {
    const type = 'type' in item ? item.type : 'unknown';
    const id = 'callId' in item && item.callId
      ? item.callId
      : 'id' in item
        ? item.id
        : undefined;

    if (!id) {
      return undefined;
    }

    // Use composite key to prevent function_call and function_call_output from overwriting
    return `${type}:${id}`;
  }

  /**
   * Consume the items stream and accumulate all items in a map.
   * Items are keyed by type + id to prevent different item types from overwriting each other.
   */
  async function consumeAndTrackItems<TTools extends readonly Tool[]>(
    result: ModelResult<TTools>,
    allItemsMap: Map<string, StreamableOutputItem>,
  ): Promise<string> {
    for await (const item of result.getItemsStream()) {
      const key = getItemKey(item);
      if (key) {
        allItemsMap.set(key, item); // Update existing or add new
      }
    }
    return result.getText();
  }

  //#endregion

  //#region Multi-Turn Tool State Tests

  describe('User-Managed Multi-Turn Conversation', () => {
    it('should maintain cumulative item map across multiple user-managed conversation turns', async () => {
      const tools = [createListTasksTool(), createCreateTaskTool(), createDeleteTaskTool()];
      const conversationInput: Array<{ role: string; content: string }> = [];

      // Cumulative map for ALL item types from getItemsStream
      const allItemsMap = new Map<string, StreamableOutputItem>();

      // Turn 1: Create tasks
      conversationInput.push({
        role: 'user',
        content:
          'Create 2 tasks named "Task A" and "Task B". Use the create_task tool for each one.',
      });

      const result1 = client.callModel({
        model: 'anthropic/claude-haiku-4.5',
        input: conversationInput,
        tools,
        stopWhen: stepCountIs(10),
      });

      const text1 = await consumeAndTrackItems(result1, allItemsMap);
      conversationInput.push({ role: 'assistant', content: text1 });

      const itemCountAfterTurn1 = allItemsMap.size;
      const taskCountAfterTurn1 = taskStore.size;

      // Verify: Items were captured and tasks were created
      expect(itemCountAfterTurn1).toBeGreaterThan(0);
      expect(taskCountAfterTurn1).toBeGreaterThan(0);

      // Turn 2: List tasks
      conversationInput.push({
        role: 'user',
        content: 'List all current tasks using the list_tasks tool.',
      });

      const result2 = client.callModel({
        model: 'anthropic/claude-haiku-4.5',
        input: conversationInput,
        tools,
        stopWhen: stepCountIs(10),
      });

      const text2 = await consumeAndTrackItems(result2, allItemsMap);
      conversationInput.push({ role: 'assistant', content: text2 });

      const itemCountAfterTurn2 = allItemsMap.size;

      // CORE TEST: Map size should grow (or stay same if IDs overlap), never shrink
      expect(itemCountAfterTurn2).toBeGreaterThanOrEqual(itemCountAfterTurn1);

      // Turn 3: Delete a task
      const [firstTask] = taskStore.values();
      if (firstTask) {
        conversationInput.push({
          role: 'user',
          content: `Delete the task named "${firstTask.name}" using the delete_task tool.`,
        });

        const result3 = client.callModel({
          model: 'anthropic/claude-haiku-4.5',
          input: conversationInput,
          tools,
          stopWhen: stepCountIs(10),
        });

        const text3 = await consumeAndTrackItems(result3, allItemsMap);
        conversationInput.push({ role: 'assistant', content: text3 });

        const itemCountAfterTurn3 = allItemsMap.size;

        // CORE TEST: Map size should continue to grow (or stay same), never shrink
        expect(itemCountAfterTurn3).toBeGreaterThanOrEqual(itemCountAfterTurn2);
      }

      // Verify item types present in the cumulative map
      const itemTypes = new Set(
        [...allItemsMap.values()].map((item) => ('type' in item ? item.type : undefined)),
      );

      // Core verification: message type should always be present
      expect(itemTypes.has('message')).toBe(true);

      // If tool calls were made, verify function_call and function_call_output pairs match
      const functionCallKeys = [...allItemsMap.keys()].filter((k) =>
        k.startsWith('function_call:'),
      );
      const functionCallOutputKeys = [...allItemsMap.keys()].filter((k) =>
        k.startsWith('function_call_output:'),
      );

      if (functionCallKeys.length > 0) {
        expect(itemTypes.has('function_call')).toBe(true);
        expect(itemTypes.has('function_call_output')).toBe(true);

        // Each function_call should have a corresponding function_call_output
        for (const callKey of functionCallKeys) {
          const callId = callKey.replace('function_call:', '');
          const outputKey = `function_call_output:${callId}`;
          expect(
            allItemsMap.has(outputKey),
            `Missing function_call_output for ${callId}`,
          ).toBe(true);
        }
      }
    }, 120000);

    it('should verify request structure via hooks on each API call', async () => {
      const tools = [createListTasksTool(), createCreateTaskTool(), createDeleteTaskTool()];
      const conversationInput: Array<{ role: string; content: string }> = [];
      const allItemsMap = new Map<string, StreamableOutputItem>();

      // Execute a simple multi-turn conversation
      conversationInput.push({
        role: 'user',
        content: 'Create a task named "Test Task" using the create_task tool.',
      });

      const result1 = client.callModel({
        model: 'anthropic/claude-haiku-4.5',
        input: conversationInput,
        tools,
        stopWhen: stepCountIs(5),
      });

      await consumeAndTrackItems(result1, allItemsMap);

      // Verify hooks captured requests
      expect(capturedRequests.length).toBeGreaterThan(0);

      // Verify structure of each captured request
      for (const request of capturedRequests) {
        verifyRequestStructure(request);
      }

    }, 60000);

    it('should emit all item types from getItemsStream cumulatively', async () => {
      const tools = [createCreateTaskTool()];
      const allItemsMap = new Map<string, StreamableOutputItem>();

      const result = client.callModel({
        model: 'anthropic/claude-haiku-4.5',
        input: [
          {
            role: 'user',
            content: 'Create a task named "Stream Test" using the create_task tool.',
          },
        ],
        tools,
        stopWhen: stepCountIs(5),
      });

      // Track items as they stream
      const itemsReceived: StreamableOutputItem[] = [];
      for await (const item of result.getItemsStream()) {
        itemsReceived.push(item);
        const key = getItemKey(item);
        if (key) {
          allItemsMap.set(key, item);
        }
      }

      // Should have received items
      expect(itemsReceived.length).toBeGreaterThan(0);

      // Check item types
      const types = new Set(
        itemsReceived.map((item) => ('type' in item ? item.type : undefined)),
      );
      // Should have at least message type; tool calls are not guaranteed due to model non-determinism
      expect(types.has('message')).toBe(true);
    }, 60000);

    it('should never lose items - map size only grows or stays same', async () => {
      const tools = [createCreateTaskTool(), createListTasksTool()];
      const allItemsMap = new Map<string, StreamableOutputItem>();
      const sizeHistory: number[] = [];

      // Track size after each item
      const result = client.callModel({
        model: 'anthropic/claude-haiku-4.5',
        input: [
          {
            role: 'user',
            content:
              'First create a task named "Tracking Test" using create_task, then list all tasks using list_tasks.',
          },
        ],
        tools,
        stopWhen: stepCountIs(10),
      });

      for await (const item of result.getItemsStream()) {
        const key = getItemKey(item);
        if (key) {
          allItemsMap.set(key, item);
          sizeHistory.push(allItemsMap.size);
        }
      }

      // Verify size never decreased
      for (let i = 1; i < sizeHistory.length; i++) {
        const prev = sizeHistory[i - 1];
        const curr = sizeHistory[i];
        if (prev !== undefined && curr !== undefined) {
          expect(curr).toBeGreaterThanOrEqual(prev);
        }
      }

    }, 60000);

    it('should have matching function_call and function_call_output pairs in multi-turn execution', async () => {
      const tools = [createCreateTaskTool(), createListTasksTool()];

      // Request multiple tool calls in sequence
      const result = client.callModel({
        model: 'anthropic/claude-haiku-4.5',
        input: [
          {
            role: 'user',
            content:
              'Do this in order: 1) create_task with name "First", 2) create_task with name "Second", 3) list_tasks to show all tasks.',
          },
        ],
        tools,
        stopWhen: stepCountIs(10),
      });

      // Collect all items
      const allItems: Array<{ key: string; type: string }> = [];

      for await (const item of result.getItemsStream()) {
        const key = getItemKey(item);
        const type = 'type' in item ? item.type : 'unknown';
        if (key) {
          allItems.push({ key, type });
        }
      }

      // Count by type
      const functionCalls = allItems.filter((i) => i.type === 'function_call');
      const functionCallOutputs = allItems.filter((i) => i.type === 'function_call_output');

      // Check for orphaned outputs (outputs without matching calls)
      const callIds = new Set(functionCalls.map((c) => c.key.replace('function_call:', '')));
      const outputCallIds = functionCallOutputs.map((o) =>
        o.key.replace('function_call_output:', ''),
      );

      const orphanedOutputs = outputCallIds.filter((id) => !callIds.has(id));

      // Every function_call_output should have a matching function_call
      expect(orphanedOutputs.length).toBe(0);
    }, 60000);

    it('should execute multiple tools in single callModel with pre-existing tasks', async () => {
      const tools = [createListTasksTool(), createCreateTaskTool(), createDeleteTaskTool()];

      // Pre-populate task store
      taskStore.set('task_1', { id: 'task_1', name: 'Alpha Task', createdAt: new Date().toISOString() });
      taskStore.set('task_2', { id: 'task_2', name: 'Beta Task', createdAt: new Date().toISOString() });

      const result = client.callModel({
        model: 'anthropic/claude-haiku-4.5',
        input: [
          {
            role: 'user',
            content:
              'First, create a new task called "Gamma Task" using create_task. Then delete "Alpha Task" using delete_task. You must call both tools.',
          },
        ],
        tools,
        stopWhen: stepCountIs(10),
      });

      // Track all items and tool calls
      const allItems: Array<{ key: string; type: string; name?: string }> = [];
      const toolCallNames: string[] = [];

      for await (const item of result.getItemsStream()) {
        const type = 'type' in item ? item.type : 'unknown';
        const key = getItemKey(item);

        if (key) {
          const name = type === 'function_call' && 'name' in item ? item.name : undefined;
          allItems.push({ key, type, name });

          if (type === 'function_call' && name && !toolCallNames.includes(name)) {
            toolCallNames.push(name);
          }
        }
      }

      // Verify at least two different tools were called
      expect(toolCallNames.length).toBeGreaterThanOrEqual(2);

      // Verify function_call and function_call_output pairs match (no orphans)
      const functionCalls = allItems.filter((i) => i.type === 'function_call');
      const functionCallOutputs = allItems.filter((i) => i.type === 'function_call_output');

      const callIds = new Set(functionCalls.map((c) => c.key.replace('function_call:', '')));
      const outputCallIds = functionCallOutputs.map((o) => o.key.replace('function_call_output:', ''));

      const orphanedOutputs = outputCallIds.filter((id) => !callIds.has(id));
      expect(orphanedOutputs.length).toBe(0);

      // Verify multi-turn execution happened (more than one API request)
      expect(capturedRequests.length).toBeGreaterThan(1);
    }, 60000);
  });

  //#endregion

  //#region Async Input Function Tests

  describe('Multi-Turn Conversation with Async Input Function', () => {
    it('should maintain cumulative item map with input as function', async () => {
      const tools = [createListTasksTool(), createCreateTaskTool(), createDeleteTaskTool()];

      // Track which turn we're on
      const turnHistory: number[] = [];
      const systemPrompt = 'You are a task management assistant. Use the provided tools to manage tasks.';

      // Initial messages for turn 0
      const initialMessages: Array<{ role: string; content: string }> = [
        {
          role: 'user',
          content:
            'Create 2 tasks named "Task A" and "Task B". Use the create_task tool for each one.',
        },
      ];

      // Cumulative map for ALL item types from getItemsStream
      const allItemsMap = new Map<string, StreamableOutputItem>();

      // Build input function that dynamically constructs messages per turn
      const inputFn = async (ctx: TurnContext): Promise<OpenResponsesInput> => {
        turnHistory.push(ctx.numberOfTurns);

        if (ctx.numberOfTurns === 0) {
          // First turn: include system prompt and initial messages
          return [
            { role: 'system' as const, content: systemPrompt },
            ...initialMessages,
          ];
        }

        // Subsequent turns: get previous input and rebuild with fresh system prompt
        const prevInput = ctx.turnRequest?.input;
        const prevMessages: OpenResponsesInput1[] = typeof prevInput === 'string' ? [] : (prevInput ?? []);
        const messagesWithoutSystem = prevMessages.filter(
          (m) => !('role' in m && m.role === 'system'),
        );
        return [
          { role: 'system' as const, content: systemPrompt },
          ...messagesWithoutSystem,
        ];
      };

      const result = client.callModel({
        model: 'anthropic/claude-haiku-4.5',
        input: inputFn,
        tools,
        stopWhen: stepCountIs(10),
      });

      const text = await consumeAndTrackItems(result, allItemsMap);

      // Verify input function was called
      expect(turnHistory.length).toBeGreaterThan(0);
      expect(turnHistory[0]).toBe(0);

      const itemCountAfterCall = allItemsMap.size;

      // Verify: Items were captured
      expect(itemCountAfterCall).toBeGreaterThan(0);

      // Verify item types present in the cumulative map
      const itemTypes = new Set(
        [...allItemsMap.values()].map((item) => ('type' in item ? item.type : undefined)),
      );

      // Core verification: message type should always be present
      expect(itemTypes.has('message')).toBe(true);

      // If tool calls were made, verify function_call and function_call_output pairs match
      const functionCallKeys = [...allItemsMap.keys()].filter((k) =>
        k.startsWith('function_call:'),
      );

      if (functionCallKeys.length > 0) {
        expect(itemTypes.has('function_call')).toBe(true);
        expect(itemTypes.has('function_call_output')).toBe(true);

        // Each function_call should have a corresponding function_call_output
        for (const callKey of functionCallKeys) {
          const callId = callKey.replace('function_call:', '');
          const outputKey = `function_call_output:${callId}`;
          expect(
            allItemsMap.has(outputKey),
            `Missing function_call_output for ${callId}`,
          ).toBe(true);
        }
      }
    }, 120000);

    it('should verify request structure with input as function', async () => {
      const tools = [createListTasksTool(), createCreateTaskTool(), createDeleteTaskTool()];
      const allItemsMap = new Map<string, StreamableOutputItem>();
      const systemPrompt = 'You are a helpful assistant for task management.';

      // Build input function
      const inputFn = async (ctx: TurnContext): Promise<OpenResponsesInput> => {
        if (ctx.numberOfTurns === 0) {
          return [
            { role: 'system' as const, content: systemPrompt },
            { role: 'user' as const, content: 'Create a task named "Test Task" using the create_task tool.' },
          ];
        }

        const prevInput = ctx.turnRequest?.input;
        const prevMessages: OpenResponsesInput1[] = typeof prevInput === 'string' ? [] : (prevInput ?? []);
        const messagesWithoutSystem = prevMessages.filter(
          (m) => !('role' in m && m.role === 'system'),
        );
        return [
          { role: 'system' as const, content: systemPrompt },
          ...messagesWithoutSystem,
        ];
      };

      const result = client.callModel({
        model: 'anthropic/claude-haiku-4.5',
        input: inputFn,
        tools,
        stopWhen: stepCountIs(5),
      });

      await consumeAndTrackItems(result, allItemsMap);

      // Verify hooks captured requests
      expect(capturedRequests.length).toBeGreaterThan(0);

      // Verify structure of each captured request
      for (const request of capturedRequests) {
        verifyRequestStructure(request);
      }

    }, 60000);

    it('should emit all item types with input as function', async () => {
      const tools = [createCreateTaskTool()];
      const allItemsMap = new Map<string, StreamableOutputItem>();
      const systemPrompt = 'You are a helpful task assistant.';

      const inputFn = async (ctx: TurnContext): Promise<OpenResponsesInput> => {
        if (ctx.numberOfTurns === 0) {
          return [
            { role: 'system' as const, content: systemPrompt },
            { role: 'user' as const, content: 'Create a task named "Stream Test" using the create_task tool.' },
          ];
        }

        const prevInput = ctx.turnRequest?.input;
        const prevMessages: OpenResponsesInput1[] = typeof prevInput === 'string' ? [] : (prevInput ?? []);
        const messagesWithoutSystem = prevMessages.filter(
          (m) => !('role' in m && m.role === 'system'),
        );
        return [
          { role: 'system' as const, content: systemPrompt },
          ...messagesWithoutSystem,
        ];
      };

      const result = client.callModel({
        model: 'anthropic/claude-haiku-4.5',
        input: inputFn,
        tools,
        stopWhen: stepCountIs(5),
      });

      // Track items as they stream
      const itemsReceived: StreamableOutputItem[] = [];
      for await (const item of result.getItemsStream()) {
        itemsReceived.push(item);
        const key = getItemKey(item);
        if (key) {
          allItemsMap.set(key, item);
        }
      }

      // Should have received items
      expect(itemsReceived.length).toBeGreaterThan(0);

      // Check item types
      const types = new Set(
        itemsReceived.map((item) => ('type' in item ? item.type : undefined)),
      );

      // Should have at least message type; tool calls are not guaranteed due to model non-determinism
      expect(types.has('message')).toBe(true);
    }, 60000);

    it('should never lose items with input as function', async () => {
      const tools = [createCreateTaskTool(), createListTasksTool()];
      const allItemsMap = new Map<string, StreamableOutputItem>();
      const sizeHistory: number[] = [];
      const systemPrompt = 'You are a task tracking assistant.';

      const inputFn = async (ctx: TurnContext): Promise<OpenResponsesInput> => {
        if (ctx.numberOfTurns === 0) {
          return [
            { role: 'system' as const, content: systemPrompt },
            {
              role: 'user' as const,
              content:
                'First create a task named "Tracking Test" using create_task, then list all tasks using list_tasks.',
            },
          ];
        }

        const prevInput = ctx.turnRequest?.input;
        const prevMessages: OpenResponsesInput1[] = typeof prevInput === 'string' ? [] : (prevInput ?? []);
        const messagesWithoutSystem = prevMessages.filter(
          (m) => !('role' in m && m.role === 'system'),
        );
        return [
          { role: 'system' as const, content: systemPrompt },
          ...messagesWithoutSystem,
        ];
      };

      const result = client.callModel({
        model: 'anthropic/claude-haiku-4.5',
        input: inputFn,
        tools,
        stopWhen: stepCountIs(10),
      });

      for await (const item of result.getItemsStream()) {
        const key = getItemKey(item);
        if (key) {
          allItemsMap.set(key, item);
          sizeHistory.push(allItemsMap.size);
        }
      }

      // Verify size never decreased
      for (let i = 1; i < sizeHistory.length; i++) {
        const prev = sizeHistory[i - 1];
        const curr = sizeHistory[i];
        if (prev !== undefined && curr !== undefined) {
          expect(curr).toBeGreaterThanOrEqual(prev);
        }
      }

    }, 60000);

    it('should execute multiple tools with input as function and pre-existing tasks', async () => {
      const tools = [createListTasksTool(), createCreateTaskTool(), createDeleteTaskTool()];
      const systemPrompt = 'You are a task management assistant. Execute the requested operations.';

      // Pre-populate task store
      taskStore.set('task_1', { id: 'task_1', name: 'Alpha Task', createdAt: new Date().toISOString() });
      taskStore.set('task_2', { id: 'task_2', name: 'Beta Task', createdAt: new Date().toISOString() });

      const inputFn = async (ctx: TurnContext): Promise<OpenResponsesInput> => {
        if (ctx.numberOfTurns === 0) {
          return [
            { role: 'system' as const, content: systemPrompt },
            {
              role: 'user' as const,
              content:
                'First, create a new task called "Gamma Task" using create_task. Then delete "Alpha Task" using delete_task. You must call both tools.',
            },
          ];
        }

        const prevInput = ctx.turnRequest?.input;
        const prevMessages: OpenResponsesInput1[] = typeof prevInput === 'string' ? [] : (prevInput ?? []);
        const messagesWithoutSystem = prevMessages.filter(
          (m) => !('role' in m && m.role === 'system'),
        );
        return [
          { role: 'system' as const, content: systemPrompt },
          ...messagesWithoutSystem,
        ];
      };

      const result = client.callModel({
        model: 'anthropic/claude-haiku-4.5',
        input: inputFn,
        tools,
        stopWhen: stepCountIs(10),
      });

      // Track all items and tool calls
      const allItems: Array<{ key: string; type: string; name?: string }> = [];
      const toolCallNames: string[] = [];

      for await (const item of result.getItemsStream()) {
        const type = 'type' in item ? item.type : 'unknown';
        const key = getItemKey(item);

        if (key) {
          const name = type === 'function_call' && 'name' in item ? item.name : undefined;
          allItems.push({ key, type, name });

          if (type === 'function_call' && name && !toolCallNames.includes(name)) {
            toolCallNames.push(name);
          }
        }
      }

      // Verify at least two different tools were called
      expect(toolCallNames.length).toBeGreaterThanOrEqual(2);

      // Verify function_call and function_call_output pairs match (no orphans)
      const functionCalls = allItems.filter((i) => i.type === 'function_call');
      const functionCallOutputs = allItems.filter((i) => i.type === 'function_call_output');

      const callIds = new Set(functionCalls.map((c) => c.key.replace('function_call:', '')));
      const outputCallIds = functionCallOutputs.map((o) => o.key.replace('function_call_output:', ''));

      const orphanedOutputs = outputCallIds.filter((id) => !callIds.has(id));
      expect(orphanedOutputs.length).toBe(0);

      // Verify multi-turn execution happened (more than one API request)
      expect(capturedRequests.length).toBeGreaterThan(1);
    }, 60000);

    it('should have matching function_call and function_call_output pairs with input as function', async () => {
      const tools = [createCreateTaskTool(), createListTasksTool()];
      const systemPrompt = 'You are a precise task executor. Execute each step in order.';

      const inputFn = async (ctx: TurnContext): Promise<OpenResponsesInput> => {
        if (ctx.numberOfTurns === 0) {
          return [
            { role: 'system' as const, content: systemPrompt },
            {
              role: 'user' as const,
              content:
                'Do this in order: 1) create_task with name "First", 2) create_task with name "Second", 3) list_tasks to show all tasks.',
            },
          ];
        }

        const prevInput = ctx.turnRequest?.input;
        const prevMessages: OpenResponsesInput1[] = typeof prevInput === 'string' ? [] : (prevInput ?? []);
        const messagesWithoutSystem = prevMessages.filter(
          (m) => !('role' in m && m.role === 'system'),
        );

        return [
          { role: 'system' as const, content: systemPrompt },
          ...messagesWithoutSystem,
        ];
      };

      const result = client.callModel({
        model: 'anthropic/claude-haiku-4.5',
        input: inputFn,
        tools,
        stopWhen: stepCountIs(10),
      });

      // Collect all items
      const allItems: Array<{ key: string; type: string }> = [];

      for await (const item of result.getItemsStream()) {
        const key = getItemKey(item);
        const type = 'type' in item ? item.type : 'unknown';
        if (key) {
          allItems.push({ key, type });
        }
      }

      // Count by type
      const functionCalls = allItems.filter((i) => i.type === 'function_call');
      const functionCallOutputs = allItems.filter((i) => i.type === 'function_call_output');

      // Check for orphaned outputs (outputs without matching calls)
      const callIds = new Set(functionCalls.map((c) => c.key.replace('function_call:', '')));
      const outputCallIds = functionCallOutputs.map((o) =>
        o.key.replace('function_call_output:', ''),
      );

      const orphanedOutputs = outputCallIds.filter((id) => !callIds.has(id));

      // Every function_call_output should have a matching function_call
      expect(orphanedOutputs.length).toBe(0);
    }, 60000);
  });

  //#endregion
});
