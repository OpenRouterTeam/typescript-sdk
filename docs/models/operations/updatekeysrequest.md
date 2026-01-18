# UpdateKeysRequest

## Example Usage

```typescript
import { UpdateKeysRequest } from "@openrouter/sdk/models/operations";

let value: UpdateKeysRequest = {
  hash: "f01d52606dc8f0a8303a7b5cc3fa07109c2e346cec7c0a16b40de462992ce943",
  requestBody: {},
};
```

## Fields

| Field                                                                                                                     | Type                                                                                                                      | Required                                                                                                                  | Description                                                                                                               | Example                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `hash`                                                                                                                    | *string*                                                                                                                  | :heavy_check_mark:                                                                                                        | The hash identifier of the API key to update                                                                              | f01d52606dc8f0a8303a7b5cc3fa07109c2e346cec7c0a16b40de462992ce943                                                          |
| `requestBody`                                                                                                             | [operations.UpdateKeysRequestBody](../../models/operations/updatekeysrequestbody.md)                                      | :heavy_check_mark:                                                                                                        | N/A                                                                                                                       | {<br/>"name": "Updated API Key Name",<br/>"disabled": false,<br/>"limit": 75,<br/>"limit_reset": "daily",<br/>"include_byok_in_limit": true<br/>} |