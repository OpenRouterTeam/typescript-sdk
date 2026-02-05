# CreateKeysRequest

## Example Usage

```typescript
import { CreateKeysRequest } from "@openrouter/sdk/models/operations";

let value: CreateKeysRequest = {
  requestBody: {
    name: "My New API Key",
  },
};
```

## Fields

| Field                                                                                                                                             | Type                                                                                                                                              | Required                                                                                                                                          | Description                                                                                                                                       | Example                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `httpReferer`                                                                                                                                     | *string*                                                                                                                                          | :heavy_minus_sign:                                                                                                                                | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br/>This is used to track API usage per application.<br/> |                                                                                                                                                   |
| `xTitle`                                                                                                                                          | *string*                                                                                                                                          | :heavy_minus_sign:                                                                                                                                | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br/>                                                 |                                                                                                                                                   |
| `requestBody`                                                                                                                                     | [operations.CreateKeysRequestBody](../../models/operations/createkeysrequestbody.md)                                                              | :heavy_check_mark:                                                                                                                                | N/A                                                                                                                                               | {<br/>"name": "My New API Key",<br/>"limit": 50,<br/>"limit_reset": "monthly",<br/>"include_byok_in_limit": true,<br/>"expires_at": "2027-12-31T23:59:59Z"<br/>} |