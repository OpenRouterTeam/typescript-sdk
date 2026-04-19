# WorkspaceMember

## Example Usage

```typescript
import { WorkspaceMember } from "@openrouter/sdk/models";

let value: WorkspaceMember = {
  createdAt: "2025-08-24T10:30:00Z",
  id: "660e8400-e29b-41d4-a716-446655440000",
  role: "member",
  userId: "user_abc123",
  workspaceId: "550e8400-e29b-41d4-a716-446655440000",
};
```

## Fields

| Field                                                 | Type                                                  | Required                                              | Description                                           | Example                                               |
| ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- |
| `createdAt`                                           | *string*                                              | :heavy_check_mark:                                    | ISO 8601 timestamp of when the membership was created | 2025-08-24T10:30:00Z                                  |
| `id`                                                  | *string*                                              | :heavy_check_mark:                                    | Unique identifier for the workspace membership        | 660e8400-e29b-41d4-a716-446655440000                  |
| `role`                                                | *string*                                              | :heavy_check_mark:                                    | Role of the member in the workspace (admin or member) | member                                                |
| `userId`                                              | *string*                                              | :heavy_check_mark:                                    | Clerk user ID of the member                           | user_abc123                                           |
| `workspaceId`                                         | *string*                                              | :heavy_check_mark:                                    | ID of the workspace                                   | 550e8400-e29b-41d4-a716-446655440000                  |