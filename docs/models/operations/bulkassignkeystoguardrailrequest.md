# BulkAssignKeysToGuardrailRequest

## Example Usage

```typescript
import { BulkAssignKeysToGuardrailRequest } from "@openrouter/sdk/models/operations";

let value: BulkAssignKeysToGuardrailRequest = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  requestBody: {
    keyHashes: [
      "c56454edb818d6b14bc0d61c46025f1450b0f4012d12304ab40aacb519fcbc93",
    ],
  },
};
```

## Fields

| Field                                                                                                              | Type                                                                                                               | Required                                                                                                           | Description                                                                                                        | Example                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| `id`                                                                                                               | *string*                                                                                                           | :heavy_check_mark:                                                                                                 | The unique identifier of the guardrail                                                                             | 550e8400-e29b-41d4-a716-446655440000                                                                               |
| `requestBody`                                                                                                      | [operations.BulkAssignKeysToGuardrailRequestBody](../../models/operations/bulkassignkeystoguardrailrequestbody.md) | :heavy_check_mark:                                                                                                 | N/A                                                                                                                |                                                                                                                    |