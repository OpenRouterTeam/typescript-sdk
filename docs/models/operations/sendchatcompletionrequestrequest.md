# SendChatCompletionRequestRequest

## Example Usage

```typescript
import { SendChatCompletionRequestRequest } from "@openrouter/sdk/models/operations";

let value: SendChatCompletionRequestRequest = {
  chatGenerationParams: {
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },
      {
        role: "user",
        content: "What is the capital of France?",
      },
    ],
    temperature: 0.7,
  },
};
```

## Fields

| Field                                                                                                                                                                                                                | Type                                                                                                                                                                                                                 | Required                                                                                                                                                                                                             | Description                                                                                                                                                                                                          | Example                                                                                                                                                                                                              |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `httpReferer`                                                                                                                                                                                                        | *string*                                                                                                                                                                                                             | :heavy_minus_sign:                                                                                                                                                                                                   | The app identifier should be your app's URL and is used as the primary identifier for rankings.<br/>This is used to track API usage per application.<br/>                                                            |                                                                                                                                                                                                                      |
| `xTitle`                                                                                                                                                                                                             | *string*                                                                                                                                                                                                             | :heavy_minus_sign:                                                                                                                                                                                                   | The app display name allows you to customize how your app appears in OpenRouter's dashboard.<br/>                                                                                                                    |                                                                                                                                                                                                                      |
| `chatGenerationParams`                                                                                                                                                                                               | [models.ChatGenerationParams](../../models/chatgenerationparams.md)                                                                                                                                                  | :heavy_check_mark:                                                                                                                                                                                                   | N/A                                                                                                                                                                                                                  | {<br/>"messages": [<br/>{<br/>"role": "system",<br/>"content": "You are a helpful assistant."<br/>},<br/>{<br/>"role": "user",<br/>"content": "What is the capital of France?"<br/>}<br/>],<br/>"model": "openai/gpt-4",<br/>"temperature": 0.7,<br/>"max_tokens": 150<br/>} |