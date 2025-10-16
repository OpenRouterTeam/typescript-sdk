# GetKeyResponseBody

API key details

## Example Usage

```typescript
import { GetKeyResponseBody } from "@openrouter/sdk/models/operations";

let value: GetKeyResponseBody = {
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
};
```

## Fields

| Field                                                          | Type                                                           | Required                                                       | Description                                                    |
| -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- |
| `data`                                                         | [operations.GetKeyData](../../models/operations/getkeydata.md) | :heavy_check_mark:                                             | The API key information                                        |