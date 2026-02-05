# BulkUnassignMembersFromGuardrailRequest

## Example Usage

```typescript
import { BulkUnassignMembersFromGuardrailRequest } from "@openrouter/sdk/models/operations";

let value: BulkUnassignMembersFromGuardrailRequest = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  requestBody: {
    memberUserIds: [
      "user_abc123",
      "user_def456",
    ],
  },
};
```

## Fields

| Field                                                                                                                                             | Type                                                                                                                                              | Required                                                                                                                                          | Description                                                                                                                                       | Example                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `httpReferer`                                                                                                                                     | *string*                                                                                                                                          | :heavy_minus_sign:                                                                                                                                | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br/>This is used to track API usage per application.<br/> |                                                                                                                                                   |
| `xTitle`                                                                                                                                          | *string*                                                                                                                                          | :heavy_minus_sign:                                                                                                                                | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br/>                                                 |                                                                                                                                                   |
| `id`                                                                                                                                              | *string*                                                                                                                                          | :heavy_check_mark:                                                                                                                                | The unique identifier of the guardrail                                                                                                            | 550e8400-e29b-41d4-a716-446655440000                                                                                                              |
| `requestBody`                                                                                                                                     | [operations.BulkUnassignMembersFromGuardrailRequestBody](../../models/operations/bulkunassignmembersfromguardrailrequestbody.md)                  | :heavy_check_mark:                                                                                                                                | N/A                                                                                                                                               |                                                                                                                                                   |