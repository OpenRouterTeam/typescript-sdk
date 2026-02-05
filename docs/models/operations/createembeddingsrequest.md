# CreateEmbeddingsRequest

## Example Usage

```typescript
import { CreateEmbeddingsRequest } from "@openrouter/sdk/models/operations";

let value: CreateEmbeddingsRequest = {
  requestBody: {
    input: [
      [],
      [
        3849.69,
      ],
      [],
    ],
    model: "Model Y",
  },
};
```

## Fields

| Field                                                                                                                                             | Type                                                                                                                                              | Required                                                                                                                                          | Description                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `httpReferer`                                                                                                                                     | *string*                                                                                                                                          | :heavy_minus_sign:                                                                                                                                | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br/>This is used to track API usage per application.<br/> |
| `xTitle`                                                                                                                                          | *string*                                                                                                                                          | :heavy_minus_sign:                                                                                                                                | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br/>                                                 |
| `requestBody`                                                                                                                                     | [operations.CreateEmbeddingsRequestBody](../../models/operations/createembeddingsrequestbody.md)                                                  | :heavy_check_mark:                                                                                                                                | N/A                                                                                                                                               |