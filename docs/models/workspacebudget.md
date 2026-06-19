# WorkspaceBudget

## Example Usage

```typescript
import { WorkspaceBudget } from "@openrouter/sdk/models";

let value: WorkspaceBudget = {
  createdAt: "2025-08-24T10:30:00Z",
  id: "770e8400-e29b-41d4-a716-446655440000",
  includeByokInLimit: false,
  limitUsd: 100,
  resetInterval: "monthly",
  updatedAt: "2025-08-24T15:45:00Z",
  workspaceId: "550e8400-e29b-41d4-a716-446655440000",
};
```

## Fields

| Field                                                                    | Type                                                                     | Required                                                                 | Description                                                              | Example                                                                  |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `createdAt`                                                              | *string*                                                                 | :heavy_check_mark:                                                       | ISO 8601 timestamp of when the budget was created                        | 2025-08-24T10:30:00Z                                                     |
| `id`                                                                     | *string*                                                                 | :heavy_check_mark:                                                       | Unique identifier for the budget                                         | 770e8400-e29b-41d4-a716-446655440000                                     |
| `includeByokInLimit`                                                     | *boolean*                                                                | :heavy_check_mark:                                                       | Whether BYOK (Bring Your Own Key) usage counts toward this budget limit. | false                                                                    |
| `limitUsd`                                                               | *number*                                                                 | :heavy_check_mark:                                                       | Spending limit in USD for this interval                                  | 100                                                                      |
| `resetInterval`                                                          | [models.ResetInterval](../models/resetinterval.md)                       | :heavy_check_mark:                                                       | Interval at which spend resets. Null means a lifetime (one-time) budget. | monthly                                                                  |
| `updatedAt`                                                              | *string*                                                                 | :heavy_check_mark:                                                       | ISO 8601 timestamp of when the budget was last updated                   | 2025-08-24T15:45:00Z                                                     |
| `workspaceId`                                                            | *string*                                                                 | :heavy_check_mark:                                                       | ID of the workspace the budget belongs to                                | 550e8400-e29b-41d4-a716-446655440000                                     |