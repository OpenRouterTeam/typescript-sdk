# UpdateKeysRequest

## Example Usage

```typescript
import { UpdateKeysRequest } from "@openrouter/sdk/models/operations";

let value: UpdateKeysRequest = {
  hash:
    "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",
  requestBody: {},
};
```

## Fields

| Field                                                                                                                     | Type                                                                                                                      | Required                                                                                                                  | Description                                                                                                               | Example                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `hash`                                                                                                                    | *string*                                                                                                                  | :heavy_check_mark:                                                                                                        | The hash identifier of the API key to update                                                                              | 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                                                 |
| `requestBody`                                                                                                             | [operations.UpdateKeysRequestBody](../../models/operations/updatekeysrequestbody.md)                                      | :heavy_check_mark:                                                                                                        | N/A                                                                                                                       | {<br/>"name": "Updated API Key Name",<br/>"disabled": false,<br/>"limit": 75,<br/>"limit_reset": "daily",<br/>"include_byok_in_limit": true<br/>} |