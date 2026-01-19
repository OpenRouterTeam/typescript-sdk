# BulkUnassignMembersFromGuardrailRequestBody

## Example Usage

```typescript
import { BulkUnassignMembersFromGuardrailRequestBody } from "@openrouter/sdk/models/operations";

let value: BulkUnassignMembersFromGuardrailRequestBody = {
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