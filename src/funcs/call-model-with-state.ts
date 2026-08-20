import type { $ZodObject, $ZodShape, infer as zodInfer } from 'zod/v4/core';
import type { OpenRouterCore } from '../core.js';
import type { CallModelInput } from '../lib/async-params.js';
import type {
  ConversationStateStore,
} from '../lib/conversation-state-store.js';
import type { RequestOptions } from '../lib/sdks.js';
import type { Tool } from '../lib/tool-types.js';

import { callModel } from './call-model.js';
import {
  createStateAccessor,
} from '../lib/conversation-state-store.js';
import type { ModelResult } from '../lib/model-result.js';

/**
 * Input for {@link callModelWithState}: everything `callModel` accepts, plus
 * the conversation identity and the store that owns its state document.
 *
 * The `state` field of the base input is intentionally omitted — the accessor
 * is derived from `conversationId` + `stateStore`, and supplying both would be
 * contradictory.
 */
export type CallModelWithStateInput<
  TTools extends readonly Tool[] = readonly Tool[],
  TShared extends Record<string, unknown> = Record<string, never>,
> = Omit<CallModelInput<TTools, TShared>, 'state'> & {
  /**
   * Conversation/session id the turn belongs to. On the first turn (or after
   * TTL expiry) the store creates a fresh state document under this id; on
   * continuation turns the prior message history is loaded from it and the
   * updated state — new input, response output, and tool-call outputs — is
   * persisted back under the same id before the response is returned.
   */
  conversationId: string;
  /**
   * The store that owns this conversation's state. Callers choose the backend
   * (in-memory, file, Redis, …) once and pass it for every turn.
   */
  stateStore: ConversationStateStore<TTools>;
};

/**
 * Multi-turn variant of `callModel` wired into the conversation state store
 * (DEV-127 / docs/multi-turn-state.md).
 *
 * Each incoming turn:
 *  1. loads the prior state by `conversationId` (missing or TTL-expired state
 *     falls back to a freshly created state under the same id),
 *  2. appends the new turn — caller input is appended to the stored message
 *     history, response output and tool-call outputs are appended as they
 *     complete, and
 *  3. persists the updated state before the response is consumed.
 *
 * Callers that do not supply a conversation id should use `callModel`
 * directly — single-turn behavior there is unchanged.
 *
 * @example
 * ```typescript
 * const store = new ConversationStateStore(new InMemoryConversationStateBackend());
 * const first = client.callModelWithState({
 *   model: 'gpt-4',
 *   input: 'My name is Ada.',
 *   conversationId: 'user-123',
 *   stateStore: store,
 * });
 * await first.getText();
 *
 * const second = client.callModelWithState({
 *   model: 'gpt-4',
 *   input: 'What is my name?',
 *   conversationId: 'user-123',
 *   stateStore: store,
 * });
 * // The model sees the first turn's context and answers "Ada".
 * ```
 */
export function callModelWithState<
  TTools extends readonly Tool[],
  TSharedSchema extends $ZodObject<$ZodShape> | undefined = undefined,
  TShared extends Record<string, unknown> = TSharedSchema extends $ZodObject<$ZodShape> ? zodInfer<TSharedSchema> : Record<string, never>,
>(
  client: OpenRouterCore,
  request: CallModelWithStateInput<TTools, TShared> & { sharedContextSchema?: TSharedSchema },
  options?: RequestOptions,
): ModelResult<TTools, TShared> {
  const { conversationId, stateStore, ...rest } = request;

  if (typeof conversationId !== 'string' || conversationId.length === 0) {
    throw new TypeError(
      'callModelWithState requires a non-empty "conversationId" string. ' +
      'Use callModel for single-turn requests without conversation state.',
    );
  }
  if (!stateStore) {
    throw new TypeError(
      'callModelWithState requires a "stateStore" (ConversationStateStore) ' +
      'that owns the conversation\'s state document.',
    );
  }

  const state = createStateAccessor<TTools>(stateStore, conversationId);

  // The rest of the pipeline (ModelResult) already implements load/create/
  // resume, message-history merging, and per-turn persistence against the
  // StateAccessor contract — the integration is supplying that accessor.
  return callModel<TTools, TSharedSchema, TShared>(
    client,
    {
      ...rest,
      state,
    } as CallModelInput<TTools, TShared> & { sharedContextSchema?: TSharedSchema },
    options,
  );
}
