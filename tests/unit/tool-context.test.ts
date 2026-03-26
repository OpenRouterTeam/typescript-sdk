import { describe, it, expect } from 'vitest';
import * as z4 from 'zod/v4';
import { ToolContextStore, buildToolExecuteContext, resolveContext, extractToolContext } from '../../src/lib/tool-context.js';
import type { TurnContext } from '../../src/lib/tool-types.js';
import { tool } from '../../src/lib/tool.js';

//#region ToolContextStore

describe('ToolContextStore', () => {
  it('should initialize with provided values', () => {
    const store = new ToolContextStore({ get_weather: { apiKey: 'sk-123' }, db_query: { dbUrl: 'postgres://...' } });
    const snapshot = store.getSnapshot();

    expect(snapshot).toEqual({ get_weather: { apiKey: 'sk-123' }, db_query: { dbUrl: 'postgres://...' } });
  });

  it('should return a shallow copy from getSnapshot', () => {
    const store = new ToolContextStore({ my_tool: { key: 'value' } });
    const snapshot1 = store.getSnapshot();
    const snapshot2 = store.getSnapshot();

    expect(snapshot1).toEqual(snapshot2);
    expect(snapshot1).not.toBe(snapshot2);
  });

  it('should get tool context by name', () => {
    const store = new ToolContextStore({ get_weather: { apiKey: 'sk-123' } });

    expect(store.getToolContext('get_weather')).toEqual({ apiKey: 'sk-123' });
    expect(store.getToolContext('nonexistent')).toEqual({});
  });

  it('should set tool context and notify listeners', () => {
    const store = new ToolContextStore({ get_weather: { apiKey: 'old' } });
    const snapshots: Record<string, Record<string, unknown>>[] = [];

    store.subscribe((snapshot) => snapshots.push(snapshot));
    store.setToolContext('get_weather', { apiKey: 'new' });

    expect(store.getToolContext('get_weather')).toEqual({ apiKey: 'new' });
    expect(snapshots).toHaveLength(1);
    expect(snapshots[0]).toEqual({ get_weather: { apiKey: 'new' } });
  });

  it('should merge partial values into tool context and notify listeners', () => {
    const store = new ToolContextStore({ my_tool: { a: 1, b: 2 } });
    const snapshots: Record<string, Record<string, unknown>>[] = [];

    store.subscribe((snapshot) => snapshots.push(snapshot));
    store.mergeToolContext('my_tool', { b: 3, c: 4 });

    expect(store.getToolContext('my_tool')).toEqual({ a: 1, b: 3, c: 4 });
    expect(snapshots).toHaveLength(1);
  });

  it('should support unsubscribing', () => {
    const store = new ToolContextStore({});
    const snapshots: Record<string, Record<string, unknown>>[] = [];

    const unsubscribe = store.subscribe((snapshot) => snapshots.push(snapshot));
    store.setToolContext('my_tool', { key: 'value1' });
    expect(snapshots).toHaveLength(1);

    unsubscribe();
    store.setToolContext('my_tool', { key: 'value2' });
    expect(snapshots).toHaveLength(1);
  });
});

//#endregion

//#region buildToolExecuteContext

describe('buildToolExecuteContext', () => {
  const turnContext: TurnContext = { numberOfTurns: 1 };

  it('should return flat context with local, shared, and setContext', () => {
    const store = new ToolContextStore({ get_weather: { apiKey: 'sk-123' } });
    const schema = z4.object({ apiKey: z4.string() });

    const ctx = buildToolExecuteContext<'get_weather', { apiKey: string }>(
      turnContext, store, 'get_weather', schema,
    );

    // TurnContext fields are merged in
    expect(ctx.numberOfTurns).toBe(1);

    // local getter contains this tool's context
    expect(ctx.local.apiKey).toBe('sk-123');

    // shared getter is available
    expect(ctx.shared).toEqual({});

    // setContext and setSharedContext are available
    expect(typeof ctx.setContext).toBe('function');
    expect(typeof ctx.setSharedContext).toBe('function');
  });

  it('should allow setContext to mutate store', () => {
    const store = new ToolContextStore({ get_weather: { apiKey: 'old' } });
    const schema = z4.object({ apiKey: z4.string() });

    const ctx = buildToolExecuteContext<'get_weather', { apiKey: string }>(
      turnContext, store, 'get_weather', schema,
    );

    ctx.setContext({ apiKey: 'new' });

    // Store is updated
    expect(store.getToolContext('get_weather')).toEqual({ apiKey: 'new' });
  });

  it('should validate setContext values against schema', () => {
    const store = new ToolContextStore({ my_tool: { count: 0 } });
    const schema = z4.object({ count: z4.number() });

    const ctx = buildToolExecuteContext<'my_tool', { count: number }>(
      turnContext, store, 'my_tool', schema,
    );

    expect(() => ctx.setContext({ count: 'not a number' as unknown as number })).toThrow();
  });

  it('should filter out keys not in schema on setContext', () => {
    const store = new ToolContextStore({ my_tool: { apiKey: 'old', extra: 'extra' } });
    const schema = z4.object({ apiKey: z4.string() });

    const ctx = buildToolExecuteContext<'my_tool', { apiKey: string }>(
      turnContext, store, 'my_tool', schema,
    );

    ctx.setContext({ apiKey: 'new', notInSchema: 'ignored' } as Record<string, unknown> as { apiKey: string });

    // Only apiKey is in schema, so only it gets merged; extra stays from initial store
    expect(store.getToolContext('my_tool').apiKey).toBe('new');
    expect(store.getToolContext('my_tool').extra).toBe('extra');
  });

  it('should be a no-op for setContext when schema is undefined', () => {
    const store = new ToolContextStore({ my_tool: { key: 'value' } });

    const ctx = buildToolExecuteContext<'my_tool', Record<string, unknown>>(
      turnContext, store, 'my_tool', undefined,
    );

    ctx.setContext({ key: 'new' });
    // setContext is a no-op when no schema
    expect(store.getToolContext('my_tool')).toEqual({ key: 'value' });
  });

  it('should return empty context when store is undefined', () => {
    const ctx = buildToolExecuteContext<'my_tool', Record<string, unknown>>(
      turnContext, undefined, 'my_tool', undefined,
    );

    expect(ctx.numberOfTurns).toBe(1);
    expect(ctx.local).toEqual({});
  });

  it('should notify store listeners when setContext is called', () => {
    const store = new ToolContextStore({ get_weather: { apiKey: 'old' } });
    const schema = z4.object({ apiKey: z4.string() });
    const ctx = buildToolExecuteContext<'get_weather', { apiKey: string }>(
      turnContext, store, 'get_weather', schema,
    );

    const snapshots: Record<string, Record<string, unknown>>[] = [];
    store.subscribe((s) => snapshots.push(s));

    ctx.setContext({ apiKey: 'new' });

    expect(snapshots).toHaveLength(1);
    expect(snapshots[0]?.get_weather).toEqual({ apiKey: 'new' });
  });
});

//#endregion

//#region resolveContext

describe('resolveContext', () => {
  const turnContext: TurnContext = { numberOfTurns: 0 };

  it('should return empty object when input is undefined', async () => {
    const result = await resolveContext(undefined, turnContext);
    expect(result).toEqual({});
  });

  it('should return static value as-is', async () => {
    const input = { get_weather: { apiKey: 'sk-123' } };
    const result = await resolveContext(input, turnContext);
    expect(result).toEqual(input);
  });

  it('should resolve sync function', async () => {
    const input = (turn: TurnContext) => ({ my_tool: { turnNum: turn.numberOfTurns } });
    const result = await resolveContext(input, turnContext);
    expect(result).toEqual({ my_tool: { turnNum: 0 } });
  });

  it('should resolve async function', async () => {
    const input = async (turn: TurnContext) => ({ my_tool: { turnNum: turn.numberOfTurns + 1 } });
    const result = await resolveContext(input, turnContext);
    expect(result).toEqual({ my_tool: { turnNum: 1 } });
  });
});

//#endregion

//#region extractToolContext

describe('extractToolContext', () => {
  it('should extract and validate context for a tool', () => {
    const store = new ToolContextStore({
      get_weather: { apiKey: 'sk-123', dbUrl: 'pg://' },
      other_tool: { extra: 'x' },
    });
    const schema = z4.object({ apiKey: z4.string(), dbUrl: z4.string() });

    const result = extractToolContext(store, 'get_weather', schema);
    expect(result).toEqual({ apiKey: 'sk-123', dbUrl: 'pg://' });
  });

  it('should return empty object when schema is undefined', () => {
    const store = new ToolContextStore({ my_tool: { key: 'value' } });
    const result = extractToolContext(store, 'my_tool', undefined);
    expect(result).toEqual({});
  });

  it('should throw when validation fails', () => {
    const store = new ToolContextStore({ my_tool: { apiKey: 123 } });
    const schema = z4.object({ apiKey: z4.string() });

    expect(() => extractToolContext(store, 'my_tool', schema)).toThrow();
  });
});

//#endregion

//#region tool() with contextSchema

describe('tool() with contextSchema', () => {
  it('should store contextSchema on the tool function', () => {
    const schema = z4.object({ apiKey: z4.string() });
    const t = tool({
      name: 'test_tool',
      inputSchema: z4.object({ query: z4.string() }),
      contextSchema: schema,
      execute: async (_params, context) => {
        const key = context!.local.apiKey;
        return `result: ${key}`;
      },
    });

    expect(t.function.contextSchema).toBe(schema);
  });

  it('should work without contextSchema', () => {
    const t = tool({
      name: 'test_tool',
      inputSchema: z4.object({ query: z4.string() }),
      execute: async (_params, context) => {
        return `turn ${context!.numberOfTurns}`;
      },
    });

    expect(t.function.contextSchema).toBeUndefined();
  });

  it('should set contextSchema on generator tools', () => {
    const ctxSchema = z4.object({ sessionId: z4.string() });
    const t = tool({
      name: 'gen_tool',
      inputSchema: z4.object({ data: z4.string() }),
      eventSchema: z4.object({ progress: z4.number() }),
      outputSchema: z4.object({ result: z4.string() }),
      contextSchema: ctxSchema,
      execute: async function* (_params, _context) {
        yield { progress: 50 };
        yield { result: 'done' };
      },
    });

    expect(t.function.contextSchema).toBe(ctxSchema);
  });

  it('should set contextSchema on manual tools', () => {
    const ctxSchema = z4.object({ userId: z4.string() });
    const t = tool({
      name: 'manual_tool',
      inputSchema: z4.object({ action: z4.string() }),
      contextSchema: ctxSchema,
      execute: false,
    });

    expect(t.function.contextSchema).toBe(ctxSchema);
  });

  it('should type ctx.shared via tool<TShared>() generic', () => {
    type SharedCtx = { _sessionId?: string };
    const t = tool<SharedCtx>({
      name: 'typed_shared',
      inputSchema: z4.object({ cmd: z4.string() }),
      execute: async (_params, ctx) => {
        // Compile-time check: ctx.shared._sessionId is string | undefined
        const sid: string | undefined = ctx!.shared._sessionId;
        return `sid=${sid}`;
      },
    });

    expect(t.function.name).toBe('typed_shared');
  });

  it('should type ctx.shared as Record<string, unknown> without TShared generic', () => {
    const t = tool({
      name: 'untyped_shared',
      inputSchema: z4.object({ cmd: z4.string() }),
      execute: async (_params, ctx) => {
        // Without TShared, shared is Record<string, unknown>
        const val: unknown = ctx!.shared['anything'];
        return `val=${val}`;
      },
    });

    expect(t.function.name).toBe('untyped_shared');
  });
});

//#endregion

//#region Context mutation persistence

describe('context mutation persistence across tool calls', () => {
  const turnContext: TurnContext = { numberOfTurns: 1 };

  it('should persist mutations across calls via shared store', () => {
    const store = new ToolContextStore({ my_tool: { counter: 0 } });
    const schema = z4.object({ counter: z4.number() });

    // First tool call
    const ctx1 = buildToolExecuteContext<'my_tool', { counter: number }>(
      turnContext, store, 'my_tool', schema,
    );
    ctx1.setContext({ counter: 1 });

    // Second tool call — same store, different context instance
    const ctx2 = buildToolExecuteContext<'my_tool', { counter: number }>(
      turnContext, store, 'my_tool', schema,
    );
    expect(ctx2.local.counter).toBe(1);

    ctx2.setContext({ counter: 2 });

    // Third context reads latest value
    const ctx3 = buildToolExecuteContext<'my_tool', { counter: number }>(
      turnContext, store, 'my_tool', schema,
    );
    expect(ctx3.local.counter).toBe(2);
  });
});

//#endregion

//#region Live reads after setContext

describe('live reads after setContext within same execution', () => {
  const turnContext: TurnContext = { numberOfTurns: 1 };

  it('should reflect setContext changes immediately via local getter', () => {
    const store = new ToolContextStore({ my_tool: { counter: 0 } });
    const schema = z4.object({ counter: z4.number() });

    const ctx = buildToolExecuteContext<'my_tool', { counter: number }>(
      turnContext, store, 'my_tool', schema,
    );

    // Initial read
    expect(ctx.local.counter).toBe(0);

    // Mutate via setContext
    ctx.setContext({ counter: 42 });

    // Same context instance sees the update immediately
    expect(ctx.local.counter).toBe(42);
  });

  it('should return frozen snapshots from local getter', () => {
    const store = new ToolContextStore({ my_tool: { value: 'original' } });
    const schema = z4.object({ value: z4.string() });

    const ctx = buildToolExecuteContext<'my_tool', { value: string }>(
      turnContext, store, 'my_tool', schema,
    );

    const snapshot = ctx.local;
    expect(Object.isFrozen(snapshot)).toBe(true);
  });
});

//#endregion

//#region Tool isolation

describe('tool isolation — each tool sees only its own context via local', () => {
  const turnContext: TurnContext = { numberOfTurns: 1 };

  it('should expose own tool context via local', () => {
    const store = new ToolContextStore({
      get_weather: { apiKey: 'weather-key' },
      db_query: { connectionString: 'pg://...' },
    });
    const weatherSchema = z4.object({ apiKey: z4.string() });
    const dbSchema = z4.object({ connectionString: z4.string() });

    const weatherCtx = buildToolExecuteContext<'get_weather', { apiKey: string }>(
      turnContext, store, 'get_weather', weatherSchema,
    );
    const dbCtx = buildToolExecuteContext<'db_query', { connectionString: string }>(
      turnContext, store, 'db_query', dbSchema,
    );

    // Weather tool sees its own context
    expect(weatherCtx.local.apiKey).toBe('weather-key');

    // DB tool sees its own context
    expect(dbCtx.local.connectionString).toBe('pg://...');
  });

  it('should not leak mutations between tools', () => {
    const store = new ToolContextStore({
      tool_a: { count: 0 },
      tool_b: { count: 100 },
    });
    const schema = z4.object({ count: z4.number() });

    const ctxA = buildToolExecuteContext<'tool_a', { count: number }>(
      turnContext, store, 'tool_a', schema,
    );
    const ctxB = buildToolExecuteContext<'tool_b', { count: number }>(
      turnContext, store, 'tool_b', schema,
    );

    ctxA.setContext({ count: 1 });

    // Tool B's context is unchanged
    expect(ctxB.local.count).toBe(100);
    // Tool A's context is updated
    expect(ctxA.local.count).toBe(1);
  });
});

//#endregion

//#region getToolContext returns defensive copies

describe('getToolContext returns defensive copies', () => {
  it('should not allow external mutation of store via returned reference', () => {
    const store = new ToolContextStore({ my_tool: { key: 'original' } });

    const retrieved = store.getToolContext('my_tool');
    retrieved['key'] = 'mutated';

    // Store should be unchanged
    expect(store.getToolContext('my_tool').key).toBe('original');
  });
});

//#endregion

//#region Shared context

describe('shared context via sharedSchema', () => {
  const turnContext: TurnContext = { numberOfTurns: 1 };

  it('should read shared context from store', () => {
    const store = new ToolContextStore({
      my_tool: { apiKey: 'sk-123' },
      shared: { _sessionId: 'sess-abc' },
    });
    const schema = z4.object({ apiKey: z4.string() });
    const sharedSchema = z4.object({ _sessionId: z4.string().optional() });

    const ctx = buildToolExecuteContext<'my_tool', { apiKey: string }, { _sessionId?: string }>(
      turnContext, store, 'my_tool', schema, sharedSchema,
    );

    expect(ctx.shared._sessionId).toBe('sess-abc');
    expect(ctx.local.apiKey).toBe('sk-123');
  });

  it('should allow setSharedContext to mutate shared store', () => {
    const store = new ToolContextStore({
      shared: { _sessionId: 'old' },
    });
    const sharedSchema = z4.object({ _sessionId: z4.string().optional() });

    const ctx = buildToolExecuteContext<'my_tool', Record<string, unknown>, { _sessionId?: string }>(
      turnContext, store, 'my_tool', undefined, sharedSchema,
    );

    ctx.setSharedContext({ _sessionId: 'new' });
    expect(ctx.shared._sessionId).toBe('new');
    expect(store.getToolContext('shared')).toEqual({ _sessionId: 'new' });
  });

  it('should validate setSharedContext values against sharedSchema', () => {
    const store = new ToolContextStore({ shared: { count: 0 } });
    const sharedSchema = z4.object({ count: z4.number() });

    const ctx = buildToolExecuteContext<'my_tool', Record<string, unknown>, { count: number }>(
      turnContext, store, 'my_tool', undefined, sharedSchema,
    );

    expect(() => ctx.setSharedContext({ count: 'not a number' as unknown as number })).toThrow();
  });

  it('should be a no-op for setSharedContext when sharedSchema is undefined', () => {
    const store = new ToolContextStore({ shared: { key: 'value' } });

    const ctx = buildToolExecuteContext<'my_tool', Record<string, unknown>>(
      turnContext, store, 'my_tool', undefined,
    );

    ctx.setSharedContext({ key: 'new' } as Record<string, unknown>);
    // setSharedContext is a no-op when no sharedSchema
    expect(store.getToolContext('shared')).toEqual({ key: 'value' });
  });

  it('should share context across different tools', () => {
    const store = new ToolContextStore({
      tool_a: { key_a: 'a' },
      tool_b: { key_b: 'b' },
      shared: { sessionId: 'sess-1' },
    });
    const schemaA = z4.object({ key_a: z4.string() });
    const schemaB = z4.object({ key_b: z4.string() });
    const sharedSchema = z4.object({ sessionId: z4.string() });

    const ctxA = buildToolExecuteContext<'tool_a', { key_a: string }, { sessionId: string }>(
      turnContext, store, 'tool_a', schemaA, sharedSchema,
    );
    const ctxB = buildToolExecuteContext<'tool_b', { key_b: string }, { sessionId: string }>(
      turnContext, store, 'tool_b', schemaB, sharedSchema,
    );

    // Both tools see the same shared context
    expect(ctxA.shared.sessionId).toBe('sess-1');
    expect(ctxB.shared.sessionId).toBe('sess-1');

    // Tool A updates shared context
    ctxA.setSharedContext({ sessionId: 'sess-2' });

    // Tool B sees the updated value
    expect(ctxB.shared.sessionId).toBe('sess-2');
  });

  it('should return frozen snapshots from shared getter', () => {
    const store = new ToolContextStore({ shared: { key: 'value' } });
    const sharedSchema = z4.object({ key: z4.string() });

    const ctx = buildToolExecuteContext<'my_tool', Record<string, unknown>, { key: string }>(
      turnContext, store, 'my_tool', undefined, sharedSchema,
    );

    const snapshot = ctx.shared;
    expect(Object.isFrozen(snapshot)).toBe(true);
  });
});

//#endregion

//#region Reserved name 'shared'

describe('tool() rejects reserved name "shared"', () => {
  it('should throw when name is "shared"', () => {
    expect(() =>
      tool({
        name: 'shared',
        inputSchema: z4.object({ query: z4.string() }),
        execute: async () => 'result',
      }),
    ).toThrow('Tool name "shared" is reserved');
  });

  it('should not throw for other names', () => {
    expect(() =>
      tool({
        name: 'my_tool',
        inputSchema: z4.object({ query: z4.string() }),
        execute: async () => 'result',
      }),
    ).not.toThrow();
  });
});

//#endregion
