# ListGuardrailsResponse

List of guardrails

## Example Usage

```typescript
import { ListGuardrailsResponse } from "@openrouter/sdk/models/operations";

let value: ListGuardrailsResponse = {
  data: [
    {
      id: "550e8400-e29b-41d4-a716-446655440000",
      name: "Production Guardrail",
      createdAt: "2025-08-24T10:30:00Z",
    },
  ],
  totalCount: 1,
};
```

## Fields

| Field                                                                            | Type                                                                             | Required                                                                         | Description                                                                      | Example                                                                          |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `data`                                                                           | [operations.ListGuardrailsData](../../models/operations/listguardrailsdata.md)[] | :heavy_check_mark:                                                               | List of guardrails                                                               |                                                                                  |
| `totalCount`                                                                     | *number*                                                                         | :heavy_check_mark:                                                               | Total number of guardrails                                                       | 25                                                                               |