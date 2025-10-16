# CreateKeysResponseBody

API key created successfully

## Example Usage

```typescript
import { CreateKeysResponseBody } from "@openrouter/sdk/models/operations";

let value: CreateKeysResponseBody = {
  data: {
    hash: "sk-or-v1-abc123def456",
    name: "My Production Key",
    label: "Production API Key",
    disabled: false,
    limit: 100,
    limitRemaining: 74.5,
    limitReset: "monthly",
    includeByokInLimit: false,
    usage: 25.5,
    usageDaily: 25.5,
    usageWeekly: 25.5,
    usageMonthly: 25.5,
    byokUsage: 17.38,
    byokUsageDaily: 17.38,
    byokUsageWeekly: 17.38,
    byokUsageMonthly: 17.38,
    createdAt: "2025-08-24T10:30:00Z",
    updatedAt: "2025-08-24T15:45:00Z",
  },
  key: "sk-or-v1-abc123def456ghi789jkl012",
};
```

## Fields

| Field                                                                  | Type                                                                   | Required                                                               | Description                                                            | Example                                                                |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `data`                                                                 | [operations.CreateKeysData](../../models/operations/createkeysdata.md) | :heavy_check_mark:                                                     | The created API key information                                        |                                                                        |
| `key`                                                                  | *string*                                                               | :heavy_check_mark:                                                     | The actual API key string (only shown once)                            | sk-or-v1-abc123def456ghi789jkl012                                      |