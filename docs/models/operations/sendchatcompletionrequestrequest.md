# SendChatCompletionRequestRequest

## Example Usage

```typescript
import { SendChatCompletionRequestRequest } from "@openrouter/sdk/models/operations";

let value: SendChatCompletionRequestRequest = {
  chatGenerationParams: {
    messages: [
      {
        role: "user",
        content: "<value>",
      },
    ],
  },
};
```

## Fields

| Field                                                                                                                                             | Type                                                                                                                                              | Required                                                                                                                                          | Description                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `httpReferer`                                                                                                                                     | *string*                                                                                                                                          | :heavy_minus_sign:                                                                                                                                | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br/>This is used to track API usage per application.<br/> |
| `xTitle`                                                                                                                                          | *string*                                                                                                                                          | :heavy_minus_sign:                                                                                                                                | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br/>                                                 |
| `chatGenerationParams`                                                                                                                            | [models.ChatGenerationParams](../../models/chatgenerationparams.md)                                                                               | :heavy_check_mark:                                                                                                                                | Chat completion request parameters                                                                                                                |