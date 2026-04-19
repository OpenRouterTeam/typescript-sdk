# BulkRemoveWorkspaceMembersRequest

## Example Usage

```typescript
import { BulkRemoveWorkspaceMembersRequest } from "@openrouter/sdk/models";

let value: BulkRemoveWorkspaceMembersRequest = {
  memberUserIds: [
    "user_abc123",
    "user_def456",
  ],
};
```

## Fields

| Field                                         | Type                                          | Required                                      | Description                                   | Example                                       |
| --------------------------------------------- | --------------------------------------------- | --------------------------------------------- | --------------------------------------------- | --------------------------------------------- |
| `memberUserIds`                               | *string*[]                                    | :heavy_check_mark:                            | List of user IDs to remove from the workspace | [<br/>"user_abc123",<br/>"user_def456"<br/>]  |