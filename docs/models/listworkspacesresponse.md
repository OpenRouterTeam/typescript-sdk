# ListWorkspacesResponse

## Example Usage

```typescript
import { ListWorkspacesResponse } from "@openrouter/sdk/models";

let value: ListWorkspacesResponse = {
  data: [
    {
      createdAt: "2025-08-24T10:30:00Z",
      id: "550e8400-e29b-41d4-a716-446655440000",
      isBroadcastEnabled: false,
      isDataDiscountLoggingEnabled: true,
      isPrivateLoggingEnabled: false,
      name: "Production",
      slug: "production",
    },
  ],
  totalCount: 1,
};
```

## Fields

| Field                                        | Type                                         | Required                                     | Description                                  | Example                                      |
| -------------------------------------------- | -------------------------------------------- | -------------------------------------------- | -------------------------------------------- | -------------------------------------------- |
| `data`                                       | [models.Workspace](../models/workspace.md)[] | :heavy_check_mark:                           | List of workspaces                           |                                              |
| `totalCount`                                 | *number*                                     | :heavy_check_mark:                           | Total number of workspaces                   | 5                                            |