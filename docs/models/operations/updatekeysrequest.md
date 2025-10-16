# UpdateKeysRequest

## Example Usage

```typescript
import { UpdateKeysRequest } from "@openrouter/sdk/models/operations";

let value: UpdateKeysRequest = {
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

| Field                                                                                | Type                                                                                 | Required                                                                             | Description                                                                          | Example                                                                              |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `hash`                                                                               | *string*                                                                             | :heavy_check_mark:                                                                   | N/A                                                                                  | sk-or-v1-abc123def456                                                                |
| `requestBody`                                                                        | [operations.UpdateKeysRequestBody](../../models/operations/updatekeysrequestbody.md) | :heavy_check_mark:                                                                   | N/A                                                                                  |                                                                                      |