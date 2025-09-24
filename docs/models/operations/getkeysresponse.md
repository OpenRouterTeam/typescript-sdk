# GetKeysResponse

List of API keys

## Example Usage

```typescript
import { GetKeysResponse } from "@openrouter/sdk/models/operations";

let value: GetKeysResponse = {
  data: [
    {
      hash: "sk-or-v1-abc123def456",
      name: "My Production Key",
      label: "Production API Key",
      disabled: false,
      limit: 100,
      usage: 25.5,
      createdAt: "2025-08-24T10:30:00Z",
      updatedAt: "2025-08-24T15:45:00Z",
    },
  ],
};
```

## Fields

| Field                                                              | Type                                                               | Required                                                           | Description                                                        |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `data`                                                             | [operations.GetKeysData](../../models/operations/getkeysdata.md)[] | :heavy_check_mark:                                                 | List of API keys                                                   |