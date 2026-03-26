# ListGuardrailMemberAssignmentsResponse

List of member assignments

## Example Usage

```typescript
import { ListGuardrailMemberAssignmentsResponse } from "@openrouter/sdk/models/operations";

let value: ListGuardrailMemberAssignmentsResponse = {
  data: [
    {
      id: "550e8400-e29b-41d4-a716-446655440000",
      userId: "user_abc123",
      organizationId: "org_xyz789",
      guardrailId: "550e8400-e29b-41d4-a716-446655440001",
      assignedBy: "user_abc123",
      createdAt: "2025-08-24T10:30:00Z",
    },
  ],
  totalCount: 10,
};
```

## Fields

| Field                                                                                                            | Type                                                                                                             | Required                                                                                                         | Description                                                                                                      | Example                                                                                                          |
| ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `data`                                                                                                           | [operations.ListGuardrailMemberAssignmentsData](../../models/operations/listguardrailmemberassignmentsdata.md)[] | :heavy_check_mark:                                                                                               | List of member assignments                                                                                       |                                                                                                                  |
| `totalCount`                                                                                                     | *number*                                                                                                         | :heavy_check_mark:                                                                                               | Total number of member assignments                                                                               | 10                                                                                                               |