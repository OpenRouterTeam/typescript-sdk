# BulkAddWorkspaceMembersRequest

## Example Usage

```typescript
import { BulkAddWorkspaceMembersRequest } from "@openrouter/sdk/models";

let value: BulkAddWorkspaceMembersRequest = {
  memberUserIds: [
    "user_abc123",
    "user_def456",
  ],
};
```

## Fields

| Field                                                                                                       | Type                                                                                                        | Required                                                                                                    | Description                                                                                                 | Example                                                                                                     |
| ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `memberUserIds`                                                                                             | *string*[]                                                                                                  | :heavy_check_mark:                                                                                          | List of user IDs to add to the workspace. Members are assigned the same role they hold in the organization. | [<br/>"user_abc123",<br/>"user_def456"<br/>]                                                                |