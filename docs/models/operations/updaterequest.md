# UpdateRequest

## Example Usage

```typescript
import { UpdateRequest } from "@openrouter/sdk/models/operations";

let value: UpdateRequest = {
  hash: "sk-or-v1-abc123def456",
  requestBody: {
    name: "Updated API Key Name",
    disabled: false,
    limit: 75,
    limitReset: "daily",
    includeByokInLimit: true,
  },
};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  | Example                                                                      |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `hash`                                                                       | *string*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          | sk-or-v1-abc123def456                                                        |
| `requestBody`                                                                | [operations.UpdateRequestBody](../../models/operations/updaterequestbody.md) | :heavy_check_mark:                                                           | N/A                                                                          |                                                                              |