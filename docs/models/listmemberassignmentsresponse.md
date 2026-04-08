# ListMemberAssignmentsResponse

## Example Usage

```typescript
import { ListMemberAssignmentsResponse } from "@openrouter/sdk/models";

let value: ListMemberAssignmentsResponse = {
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
  totalCount: 1,
};
```

## Fields

| Field                                                      | Type                                                       | Required                                                   | Description                                                | Example                                                    |
| ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `data`                                                     | [models.MemberAssignment](../models/memberassignment.md)[] | :heavy_check_mark:                                         | List of member assignments                                 |                                                            |
| `totalCount`                                               | *number*                                                   | :heavy_check_mark:                                         | Total number of member assignments                         | 10                                                         |