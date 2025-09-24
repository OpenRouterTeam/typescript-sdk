# PatchKeysHashResponse

API key updated successfully

## Example Usage

```typescript
import { PatchKeysHashResponse } from "@openrouter/sdk/models/operations";

let value: PatchKeysHashResponse = {
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
};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `data`                                                                       | [operations.PatchKeysHashData](../../models/operations/patchkeyshashdata.md) | :heavy_check_mark:                                                           | The updated API key information                                              |