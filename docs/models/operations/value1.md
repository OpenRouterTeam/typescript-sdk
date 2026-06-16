# Value1

Filter value (scalar or array depending on operator). Dimension-specific formats: `model` — permaslug (e.g. "openai/gpt-4o"); `provider` — provider slug (e.g. "openai"); `api_key_id` — numeric ID or key hash (64-char hex from GET /api/v1/keys); `user` — Clerk user ID (e.g. "user_abc123"); `workspace` — workspace UUID; `app` — numeric app ID (from generation responses); `external_user` — the end-user identifier you set via x-openrouter-external-user-id header; `country` — ISO 3166-1 alpha-2 code (e.g. "US"); `origin` — request origin URL.


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

