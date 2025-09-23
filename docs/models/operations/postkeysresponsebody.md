# PostKeysResponseBody

API key created successfully

## Example Usage

```typescript
import { PostKeysResponseBody } from "openrouter/models/operations";

let value: PostKeysResponseBody = {
  data: {
    hash: "sk-or-v1-abc123def456",
    name: "My Production Key",
    label: "Production API Key",
    disabled: false,
    limit: 100,
    usage: 25.5,
    createdAt: "2025-08-24T10:30:00Z",
    updatedAt: "2025-08-24T15:45:00Z",
  },
  key: "sk-or-v1-abc123def456ghi789jkl012",
};
```

## Fields

| Field                                                              | Type                                                               | Required                                                           | Description                                                        | Example                                                            |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `data`                                                             | [operations.PostKeysData](../../models/operations/postkeysdata.md) | :heavy_check_mark:                                                 | The created API key information                                    |                                                                    |
| `key`                                                              | *string*                                                           | :heavy_check_mark:                                                 | The actual API key string (only shown once)                        | sk-or-v1-abc123def456ghi789jkl012                                  |