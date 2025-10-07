# CreateResponse

API key created successfully

## Example Usage

```typescript
import { CreateResponse } from "@openrouter/sdk/models/operations";

let value: CreateResponse = {
  data: {
    hash: "sk-or-v1-abc123def456",
    name: "My New API Key",
    label: "Production API Key",
    disabled: false,
    limit: 50,
    usage: 0,
    createdAt: "2025-08-24T10:30:00Z",
    updatedAt: null,
  },
  key: "sk-or-v1-abc123def456ghi789jkl012",
};
```

## Fields

| Field                                                                                                                                                                                              | Type                                                                                                                                                                                               | Required                                                                                                                                                                                           | Description                                                                                                                                                                                        | Example                                                                                                                                                                                            |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`                                                                                                                                                                                             | [operations.CreateData](../../models/operations/createdata.md)                                                                                                                                     | :heavy_check_mark:                                                                                                                                                                                 | The created API key information                                                                                                                                                                    | {<br/>"hash": "sk-or-v1-abc123def456",<br/>"name": "My New API Key",<br/>"label": "Production API Key",<br/>"disabled": false,<br/>"limit": 50,<br/>"usage": 0,<br/>"created_at": "2025-08-24T10:30:00Z",<br/>"updated_at": null<br/>} |
| `key`                                                                                                                                                                                              | *string*                                                                                                                                                                                           | :heavy_check_mark:                                                                                                                                                                                 | The actual API key string (only shown once)                                                                                                                                                        | sk-or-v1-abc123def456ghi789jkl012                                                                                                                                                                  |