# BulkAssignMembersRequest

## Example Usage

```typescript
import { BulkAssignMembersRequest } from "@openrouter/sdk/models";

let value: BulkAssignMembersRequest = {
  memberUserIds: [
    "user_abc123",
    "user_def456",
  ],
};
```

## Fields

| Field                                               | Type                                                | Required                                            | Description                                         | Example                                             |
| --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- |
| `memberUserIds`                                     | *string*[]                                          | :heavy_check_mark:                                  | Array of member user IDs to assign to the guardrail | [<br/>"user_abc123",<br/>"user_def456"<br/>]        |