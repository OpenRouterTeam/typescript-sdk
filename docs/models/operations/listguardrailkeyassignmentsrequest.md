# ListGuardrailKeyAssignmentsRequest

## Example Usage

```typescript
import { ListGuardrailKeyAssignmentsRequest } from "@openrouter/sdk/models/operations";

let value: ListGuardrailKeyAssignmentsRequest = {
  id: "550e8400-e29b-41d4-a716-446655440000",
};
```

## Fields

| Field                                         | Type                                          | Required                                      | Description                                   | Example                                       |
| --------------------------------------------- | --------------------------------------------- | --------------------------------------------- | --------------------------------------------- | --------------------------------------------- |
| `id`                                          | *string*                                      | :heavy_check_mark:                            | The unique identifier of the guardrail        | 550e8400-e29b-41d4-a716-446655440000          |
| `offset`                                      | *string*                                      | :heavy_minus_sign:                            | Number of records to skip for pagination      | 0                                             |
| `limit`                                       | *string*                                      | :heavy_minus_sign:                            | Maximum number of records to return (max 100) | 50                                            |