# ListWorkspaceBudgetsResponse

## Example Usage

```typescript
import { ListWorkspaceBudgetsResponse } from "@openrouter/sdk/models";

let value: ListWorkspaceBudgetsResponse = {
  data: [
    {
      createdAt: "2025-08-24T10:30:00Z",
      id: "770e8400-e29b-41d4-a716-446655440000",
      limitUsd: 100,
      resetInterval: "monthly",
      updatedAt: "2025-08-24T15:45:00Z",
      workspaceId: "550e8400-e29b-41d4-a716-446655440000",
    },
  ],
};
```

## Fields

| Field                                                    | Type                                                     | Required                                                 | Description                                              |
| -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- |
| `data`                                                   | [models.WorkspaceBudget](../models/workspacebudget.md)[] | :heavy_check_mark:                                       | List of budgets configured for the workspace             |