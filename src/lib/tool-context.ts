import type { $ZodObject, $ZodShape } from 'zod/v4/core';
import * as z4 from 'zod/v4';
import type { ToolExecuteContext, TurnContext } from './tool-types.js';
import { SHARED_CONTEXT_KEY } from './tool-types.js';

//#region Types

/**
 * Listener function called when context values change
 * Receives a shallow copy of the full context store
 */
type ContextChangeListener = (snapshot: Record<string, Record<string, unknown>>) => void;

/**
 * Context input can be a static value, a sync function, or an async function
 */
export type ContextInput<T extends Record<string, Record<string, unknown>>> =
  | T
  | ((turn: TurnContext) => T)
  | ((turn: TurnContext) => Promise<T>);

//#endregion

//#region ToolContextStore

/**
 * Mutable context store shared across all tool executions within a callModel invocation.
 * Stores context keyed by tool name: `{ get_weather: { apiKey: '...' }, db_query: { dbUrl: '...' } }`.
 * Notifies listeners on changes.
 */
export class ToolContextStore {
  private store: Record<string, Record<string, unknown>>;
  private listeners: Set<ContextChangeListener> = new Set();

  constructor(initialValues: Record<string, Record<string, unknown>> = {}) {
    this.store = {};
    for (const [key, value] of Object.entries(initialValues)) {
      this.store[key] = { ...value };
    }
  }

  /** Subscribe to context changes. Returns an unsubscribe function. */
  subscribe(listener: ContextChangeListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /** Get a deep-shallow copy of the full context (all tools) */
  getSnapshot(): Record<string, Record<string, unknown>> {
    const snapshot: Record<string, Record<string, unknown>> = {};
    for (const [key, value] of Object.entries(this.store)) {
      snapshot[key] = { ...value };
    }
    return snapshot;
  }

  /** Get a shallow copy of context for a specific tool */
  getToolContext(toolName: string): Record<string, unknown> {
    const data = this.store[toolName];
    if (!data) {
      return {};
    }
    return { ...data };
  }

  /** Set context for a specific tool and notify listeners */
  setToolContext(toolName: string, values: Record<string, unknown>): void {
    this.store[toolName] = { ...values };
    this.notifyListeners();
  }

  /** Merge partial values into a specific tool's context and notify listeners */
  mergeToolContext(toolName: string, partial: Record<string, unknown>): void {
    const existing = this.store[toolName] ?? {};
    this.store[toolName] = { ...existing, ...partial };
    this.notifyListeners();
  }

  private notifyListeners(): void {
    const snapshot: Record<string, Record<string, unknown>> = {};
    for (const [key, value] of Object.entries(this.store)) {
      snapshot[key] = { ...value };
    }
    for (const listener of this.listeners) {
      listener(snapshot);
    }
  }
}

//#endregion

//#region buildToolExecuteContext

/**
 * Validate a partial update against a schema's shape, filtering to known keys
 * and validating each key individually. Returns the filtered partial.
 */
function validatePartialAgainstSchema(
  partial: Record<string, unknown>,
  schema: $ZodObject<$ZodShape>,
): Record<string, unknown> {
  const schemaKeys = Object.keys(schema._zod.def.shape);
  const filteredPartial: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(partial)) {
    if (schemaKeys.includes(key)) {
      filteredPartial[key] = value;
    }
  }

  const shape = schema._zod.def.shape;
  for (const [key, value] of Object.entries(filteredPartial)) {
    const keySchema = shape[key];
    if (keySchema) {
      z4.parse(keySchema, value);
    }
  }

  return filteredPartial;
}

/**
 * Build a flat ToolExecuteContext for a specific tool.
 * Returns a merged object with TurnContext fields, a `local` getter
 * (reads from the store on each access), `shared` getter, and mutation methods.
 *
 * The `local` and `shared` getters are live — calling `setContext()` or
 * `setSharedContext()` and then reading the property reflects updated values immediately.
 *
 * @param turnContext - The current turn context
 * @param store - The shared context store (keyed by tool name)
 * @param toolName - The tool's name
 * @param schema - The tool's contextSchema (for validation)
 * @param sharedSchema - The shared contextSchema (for validation)
 * @returns A flat ToolExecuteContext
 */
export function buildToolExecuteContext<
  TName extends string,
  TContext extends Record<string, unknown>,
  TShared extends Record<string, unknown> = Record<string, unknown>,
>(
  turnContext: TurnContext,
  store: ToolContextStore | undefined,
  toolName: TName,
  schema: $ZodObject<$ZodShape> | undefined,
  sharedSchema?: $ZodObject<$ZodShape> | undefined,
): ToolExecuteContext<TName, TContext, TShared> {
  // Validate initial context eagerly (throws on bad data)
  if (store && schema) {
    extractToolContext(store, toolName, schema);
  }
  if (store && sharedSchema) {
    extractToolContext(store, SHARED_CONTEXT_KEY, sharedSchema);
  }

  const ctx: ToolExecuteContext<TName, TContext, TShared> = {
    ...turnContext,

    get local(): Readonly<TContext> {
      const data = store ? store.getToolContext(toolName) : {};
      return Object.freeze(data) as Readonly<TContext>;
    },

    setContext(partial: Partial<TContext>): void {
      if (!store || !schema) {
        return;
      }
      const filteredPartial = validatePartialAgainstSchema(partial as Record<string, unknown>, schema);
      store.mergeToolContext(toolName, filteredPartial);
    },

    get shared(): Readonly<TShared> {
      const data = store ? store.getToolContext(SHARED_CONTEXT_KEY) : {};
      return Object.freeze(data) as Readonly<TShared>;
    },

    setSharedContext(partial: Partial<TShared>): void {
      if (!store || !sharedSchema) {
        return;
      }
      const filteredPartial = validatePartialAgainstSchema(partial as Record<string, unknown>, sharedSchema);
      store.mergeToolContext(SHARED_CONTEXT_KEY, filteredPartial);
    },
  };

  return ctx;
}

//#endregion

//#region resolveContext

/**
 * Resolve a context input (static value, sync function, or async function) to a plain object.
 *
 * @param contextInput - The context value or function from callModel
 * @param turnContext - The current turn context for function resolution
 * @returns The resolved context object (keyed by tool name)
 */
export async function resolveContext<T extends Record<string, Record<string, unknown>>>(
  contextInput: ContextInput<T> | undefined,
  turnContext: TurnContext,
): Promise<T> {
  if (contextInput === undefined) {
    return {} as T;
  }

  if (typeof contextInput === 'function') {
    return Promise.resolve((contextInput as (turn: TurnContext) => T | Promise<T>)(turnContext));
  }

  return contextInput;
}

//#endregion

//#region extractToolContext

/**
 * Extract and validate context values for a specific tool from the context store.
 * Returns a shallow copy so the caller cannot mutate the store directly.
 *
 * @param store - The shared context store (keyed by tool name)
 * @param toolName - The tool's name
 * @param schema - The tool's contextSchema
 * @returns A shallow copy of the validated context values for this tool
 */
export function extractToolContext(
  store: ToolContextStore,
  toolName: string,
  schema: $ZodObject<$ZodShape> | undefined,
): Record<string, unknown> {
  if (!schema) {
    return {};
  }

  const toolData = store.getToolContext(toolName);

  // Validate the extracted values against the schema
  z4.parse(schema, toolData);

  // getToolContext already returns a shallow copy
  return toolData;
}

//#endregion
