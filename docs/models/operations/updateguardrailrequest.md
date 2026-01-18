# UpdateGuardrailRequest

## Example Usage

```typescript
import { UpdateGuardrailRequest } from "@openrouter/sdk/models/operations";

let value: UpdateGuardrailRequest = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  requestBody: {},
};
```

## Fields

| Field                                                                                                                   | Type                                                                                                                    | Required                                                                                                                | Description                                                                                                             | Example                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `id`                                                                                                                    | *string*                                                                                                                | :heavy_check_mark:                                                                                                      | The unique identifier of the guardrail to update                                                                        | 550e8400-e29b-41d4-a716-446655440000                                                                                    |
| `requestBody`                                                                                                           | [operations.UpdateGuardrailRequestBody](../../models/operations/updateguardrailrequestbody.md)                          | :heavy_check_mark:                                                                                                      | N/A                                                                                                                     | {<br/>"name": "Updated Guardrail Name",<br/>"description": "Updated description",<br/>"limit_usd": 75,<br/>"reset_interval": "weekly"<br/>} |