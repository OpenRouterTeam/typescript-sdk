# CreateAPIKeyData

The created API key information

## Example Usage

```typescript
import { CreateAPIKeyData } from "@openrouter/sdk/models";

let value: CreateAPIKeyData = {
  hash: "sk-or-v1-abc123def456",
  name: "My New API Key",
  label: "Production API Key",
  disabled: false,
  limit: 50,
  limitRemaining: 50,
  limitReset: "monthly",
  includeByokInLimit: false,
  usage: 0,
  usageDaily: 0,
  usageWeekly: 0,
  usageMonthly: 0,
  byokUsage: 0,
  byokUsageDaily: 0,
  byokUsageWeekly: 0,
  byokUsageMonthly: 0,
  createdAt: "2025-08-24T10:30:00Z",
  updatedAt: null,
};
```

## Fields

| Field                                                                     | Type                                                                      | Required                                                                  | Description                                                               | Example                                                                   |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `hash`                                                                    | *string*                                                                  | :heavy_check_mark:                                                        | Unique hash identifier for the API key                                    | sk-or-v1-abc123def456                                                     |
| `name`                                                                    | *string*                                                                  | :heavy_check_mark:                                                        | Name of the API key                                                       | My Production Key                                                         |
| `label`                                                                   | *string*                                                                  | :heavy_check_mark:                                                        | Human-readable label for the API key                                      | Production API Key                                                        |
| `disabled`                                                                | *boolean*                                                                 | :heavy_check_mark:                                                        | Whether the API key is disabled                                           | false                                                                     |
| `limit`                                                                   | *number*                                                                  | :heavy_check_mark:                                                        | Spending limit for the API key in USD                                     | 100                                                                       |
| `limitRemaining`                                                          | *number*                                                                  | :heavy_check_mark:                                                        | Remaining spending limit in USD                                           | 74.5                                                                      |
| `limitReset`                                                              | *string*                                                                  | :heavy_check_mark:                                                        | Type of limit reset for the API key                                       | monthly                                                                   |
| `includeByokInLimit`                                                      | *boolean*                                                                 | :heavy_check_mark:                                                        | Whether to include external BYOK usage in the credit limit                | false                                                                     |
| `usage`                                                                   | *number*                                                                  | :heavy_check_mark:                                                        | Total OpenRouter credit usage (in USD) for the API key                    | 25.5                                                                      |
| `usageDaily`                                                              | *number*                                                                  | :heavy_check_mark:                                                        | OpenRouter credit usage (in USD) for the current UTC day                  | 25.5                                                                      |
| `usageWeekly`                                                             | *number*                                                                  | :heavy_check_mark:                                                        | OpenRouter credit usage (in USD) for the current UTC week (Monday-Sunday) | 25.5                                                                      |
| `usageMonthly`                                                            | *number*                                                                  | :heavy_check_mark:                                                        | OpenRouter credit usage (in USD) for the current UTC month                | 25.5                                                                      |
| `byokUsage`                                                               | *number*                                                                  | :heavy_check_mark:                                                        | Total external BYOK usage (in USD) for the API key                        | 17.38                                                                     |
| `byokUsageDaily`                                                          | *number*                                                                  | :heavy_check_mark:                                                        | External BYOK usage (in USD) for the current UTC day                      | 17.38                                                                     |
| `byokUsageWeekly`                                                         | *number*                                                                  | :heavy_check_mark:                                                        | External BYOK usage (in USD) for the current UTC week (Monday-Sunday)     | 17.38                                                                     |
| `byokUsageMonthly`                                                        | *number*                                                                  | :heavy_check_mark:                                                        | External BYOK usage (in USD) for current UTC month                        | 17.38                                                                     |
| `createdAt`                                                               | *string*                                                                  | :heavy_check_mark:                                                        | ISO 8601 timestamp of when the API key was created                        | 2025-08-24T10:30:00Z                                                      |
| `updatedAt`                                                               | *string*                                                                  | :heavy_check_mark:                                                        | ISO 8601 timestamp of when the API key was last updated                   | 2025-08-24T15:45:00Z                                                      |