# BulkAddWorkspaceMembersResponse

## Example Usage

```typescript
import { BulkAddWorkspaceMembersResponse } from "@openrouter/sdk/models";

let value: BulkAddWorkspaceMembersResponse = {
  addedCount: 1,
  data: [
    {
      createdAt: "2025-08-24T10:30:00Z",
      id: "660e8400-e29b-41d4-a716-446655440000",
      role: "member",
      userId: "user_abc123",
      workspaceId: "550e8400-e29b-41d4-a716-446655440000",
    },
  ],
};
```

## Fields

| Field                                                    | Type                                                     | Required                                                 | Description                                              | Example                                                  |
| -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- |
| `addedCount`                                             | *number*                                                 | :heavy_check_mark:                                       | Number of members added                                  | 2                                                        |
| `data`                                                   | [models.WorkspaceMember](../models/workspacemember.md)[] | :heavy_check_mark:                                       | List of added workspace memberships                      |                                                          |