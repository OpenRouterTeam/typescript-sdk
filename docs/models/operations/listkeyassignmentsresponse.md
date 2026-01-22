# ListKeyAssignmentsResponse

List of key assignments

## Example Usage

```typescript
import { ListKeyAssignmentsResponse } from "@openrouter/sdk/models/operations";

let value: ListKeyAssignmentsResponse = {
  data: [
    {
      id: "550e8400-e29b-41d4-a716-446655440000",
      keyHash:
        "c56454edb818d6b14bc0d61c46025f1450b0f4012d12304ab40aacb519fcbc93",
      guardrailId: "550e8400-e29b-41d4-a716-446655440001",
      keyName: "Production Key",
      keyLabel: "prod-key",
      assignedBy: "user_abc123",
      createdAt: "2025-08-24T10:30:00Z",
    },
  ],
  totalCount: 25,
};
```

## Fields

| Field                                                                                    | Type                                                                                     | Required                                                                                 | Description                                                                              | Example                                                                                  |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `data`                                                                                   | [operations.ListKeyAssignmentsData](../../models/operations/listkeyassignmentsdata.md)[] | :heavy_check_mark:                                                                       | List of key assignments                                                                  |                                                                                          |
| `totalCount`                                                                             | *number*                                                                                 | :heavy_check_mark:                                                                       | Total number of key assignments for this guardrail                                       | 25                                                                                       |