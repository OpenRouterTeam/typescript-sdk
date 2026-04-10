# BulkUnassignMembersRequest

## Example Usage

```typescript
import { BulkUnassignMembersRequest } from "@openrouter/sdk/models";

let value: BulkUnassignMembersRequest = {
  memberUserIds: [
    "user_abc123",
    "user_def456",
  ],
};
```

## Fields

| Field                                                   | Type                                                    | Required                                                | Description                                             | Example                                                 |
| ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- |
| `memberUserIds`                                         | *string*[]                                              | :heavy_check_mark:                                      | Array of member user IDs to unassign from the guardrail | [<br/>"user_abc123",<br/>"user_def456"<br/>]            |