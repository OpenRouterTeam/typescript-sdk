# ListGuardrailKeyAssignmentsData

## Example Usage

```typescript
import { ListGuardrailKeyAssignmentsData } from "@openrouter/sdk/models/operations";

let value: ListGuardrailKeyAssignmentsData = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  keyHash: "c56454edb818d6b14bc0d61c46025f1450b0f4012d12304ab40aacb519fcbc93",
  guardrailId: "550e8400-e29b-41d4-a716-446655440001",
  keyName: "Production Key",
  keyLabel: "prod-key",
  assignedBy: "user_abc123",
  createdAt: "2025-08-24T10:30:00Z",
};
```

## Fields

| Field                                                            | Type                                                             | Required                                                         | Description                                                      | Example                                                          |
| ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| `id`                                                             | *string*                                                         | :heavy_check_mark:                                               | Unique identifier for the assignment                             | 550e8400-e29b-41d4-a716-446655440000                             |
| `keyHash`                                                        | *string*                                                         | :heavy_check_mark:                                               | Hash of the assigned API key                                     | c56454edb818d6b14bc0d61c46025f1450b0f4012d12304ab40aacb519fcbc93 |
| `guardrailId`                                                    | *string*                                                         | :heavy_check_mark:                                               | ID of the guardrail                                              | 550e8400-e29b-41d4-a716-446655440001                             |
| `keyName`                                                        | *string*                                                         | :heavy_check_mark:                                               | Name of the API key                                              | Production Key                                                   |
| `keyLabel`                                                       | *string*                                                         | :heavy_check_mark:                                               | Label of the API key                                             | prod-key                                                         |
| `assignedBy`                                                     | *string*                                                         | :heavy_check_mark:                                               | User ID of who made the assignment                               | user_abc123                                                      |
| `createdAt`                                                      | *string*                                                         | :heavy_check_mark:                                               | ISO 8601 timestamp of when the assignment was created            | 2025-08-24T10:30:00Z                                             |