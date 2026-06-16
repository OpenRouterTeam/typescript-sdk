# Value1

Filter value (scalar or array depending on operator). Several dimensions are enriched in responses (returned as human-readable labels), but filters must use the underlying ID: `api_key_id` — numeric ID (from generation metadata) or key hash (64-char hex from GET /api/v1/keys, resolved server-side); `user` — Clerk user ID (e.g. "user_abc123"), not the display name; `workspace` — workspace UUID, not the workspace name; `app` — numeric app ID, not the app title; `model` — permaslug (e.g. "openai/gpt-4o"), not the display name. Other dimensions (provider, origin, country, etc.) are not enriched and accept the value as returned.


## Supported Types

### `string`

```typescript
const value: string = "<value>";
```

### `number`

```typescript
const value: number = 1284.03;
```

### `operations.Value2[]`

```typescript
const value: operations.Value2[] = [];
```

