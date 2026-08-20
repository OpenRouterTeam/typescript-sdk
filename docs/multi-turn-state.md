# Multi-Turn Conversation State

The SDK can carry conversation context across turns so the model sees prior
user and assistant messages without the caller re-sending full history on
every request. This document describes how that state is keyed, configured,
expired, and cleared.

> Implementation: `src/lib/conversation-state-store.ts` (store + backends),
> `src/funcs/call-model-with-state.ts` (turn-pipeline entry point).
> Integration tests: `tests/unit/multi-turn-integration.test.ts`.

## Quick start

```typescript
import { OpenRouter } from '@openrouter/sdk';
import {
  ConversationStateStore,
  InMemoryConversationStateBackend,
} from '@openrouter/sdk/lib/conversation-state-store.js';

const client = new OpenRouter();

// One store per application (or per tenant); reuse it for every turn.
const store = new ConversationStateStore(new InMemoryConversationStateBackend(), {
  ttlMs: 30 * 60 * 1000, // optional: expire idle conversations after 30 min
});

// Turn 1
const first = client.callModelWithState({
  model: 'openai/gpt-5',
  input: 'My name is Ada.',
  conversationId: 'user-123',
  stateStore: store,
});
await first.getText();

// Turn 2 — the model sees turn 1's context and answers "Ada".
const second = client.callModelWithState({
  model: 'openai/gpt-5',
  input: 'What is my name?',
  conversationId: 'user-123',
  stateStore: store,
});
console.log(await second.getText());
```

The functional entry point is also available as
`callModelWithState(client, { ... })` from `src/funcs/call-model-with-state.ts`.

## How state is keyed

Every conversation is identified by a caller-supplied `conversationId` string:

- The id is **the only lookup key**. Each turn loads the state document under
  that id, appends the new input and the response output to the stored
  message history, and persists the result back under the same id before the
  response is returned.
- Choose ids that are stable for the lifetime of the conversation — e.g. a
  session id, `user-<id>`, or a UUID minted when the chat starts.
- **Parallel conversations are fully isolated**: two ids never share state,
  even when their turns interleave or run concurrently on the same store.
- The id guard: if the turn pipeline ever produces a state document whose id
  differs from the accessor's bound id (e.g. the first turn creates a
  placeholder state internally), the store rebinds it to your
  `conversationId` on save. State can never strand under an id you don't own.

Single-turn callers don't need any of this: `callModel` without a
`conversationId` behaves exactly as before and touches no store.

## The state document

```typescript
interface ConversationState {
  id: string;                   // your conversationId
  messages: BaseInputsUnion[];  // user inputs + assistant outputs, in turn order
  status: 'in_progress' | 'awaiting_approval' | 'interrupted' | 'complete';
  createdAt: number;            // ms epoch
  updatedAt: number;            // ms epoch; drives TTL expiry
  previousResponseId?: string;  // last Responses API response id
  // ... pending tool results and metadata
}
```

Documents are JSON-serializable and are validated on every read. A document
that fails validation raises `CorruptedStateError` (see "Missing or corrupted
state" below).

## Configuration

```typescript
new ConversationStateStore(backend, {
  ttlMs?: number,      // idle expiry window; omit or 0 to disable
  now?: () => number,  // clock override (testing)
});
```

| Option   | Default      | Effect |
|----------|--------------|--------|
| `ttlMs`  | `0` (off)    | `get` returns `null` for — and `expire()` deletes — conversations whose `updatedAt` is older than this. |
| `now`    | `Date.now`   | Clock used for expiry checks. Inject a fake clock in tests. |

There are **no environment variables or global config flags** for multi-turn
state. Configuration is explicit per store instance — nothing changes unless
the caller constructs a store and passes it to `callModelWithState`.

## Backends

Two zero-dependency backends ship with the SDK:

- **`InMemoryConversationStateBackend`** — process-local `Map`. Right for
  tests and ephemeral single-process use. Documents are deep-copied on
  read/write so callers can't mutate stored state by aliasing. Implements
  `list()`, so store-wide `expire()` works.
- **`FileConversationStateBackend`** — JSON-file-per-conversation under a
  directory (Node.js only). Ids are sanitized to prevent path traversal.
  Useful for local durable execution without Redis.

Any other backend (Redis, Postgres, …) can be implemented against the
`ConversationStateBackend` interface:

```typescript
interface ConversationStateBackend {
  load(id: string): Promise<ConversationState | null>;
  save(id: string, state: ConversationState): Promise<void>;
  delete(id: string): Promise<void>;
  list?(): Promise<string[]>;  // enables store-wide expire()
}
```

## Expiry and cleanup

- **TTL expiry (read-through):** with `ttlMs` set, `store.get(id)` returns
  `null` for idle-expired documents. When a turn then arrives for that id the
  pipeline starts a **fresh conversation under the same id** — the model does
  not see the expired history.
- **Store-wide sweep:** `store.expire()` removes every stale conversation
  (requires the backend to implement `list()`) and returns the removed ids.
  `store.expire(['id1', 'id2'])` sweeps only the given ids. Run this on a
  timer if you want storage reclaimed rather than just hidden.
- **Explicit deletion:** `store.clear(id)` deletes one conversation
  immediately, regardless of TTL. The next turn for that id starts fresh.
  Clearing one conversation never affects siblings.

## Missing or corrupted state

| Situation | Behavior |
|-----------|----------|
| No state for `conversationId` (first turn, after `clear`, after TTL expiry) | Fresh state document created under the same id; turn proceeds normally. |
| Stored document is invalid JSON or fails schema validation | `CorruptedStateError` is thrown on the next read — the SDK fails loudly instead of silently continuing with a mangled history. |
| Backend write fails | The error propagates from the store; no partial in-memory fallback. |

To recover a corrupted conversation, call `store.clear(id)` and let the next
turn recreate it (or restore the document from a backup and re-`put` it).

## Testing recipes

The integration tests in `tests/unit/multi-turn-integration.test.ts` show the
patterns, all without a live API key:

- **3+ turn context:** queue mocked `betaResponsesSend` responses and assert
  that turn N's API request input contains every earlier turn's user input and
  assistant output, in order.
- **Parallel isolation:** interleave turns across two `conversationId`s on one
  store and assert neither request input mentions the other conversation.
- **Expiry:** construct the store with a short `ttlMs` (or a fake `now`
  clock), sleep past the TTL, and assert the next turn starts fresh.
- **Corruption:** poison the backend (or the JSON file for
  `FileConversationStateBackend`) and assert `CorruptedStateError`.
