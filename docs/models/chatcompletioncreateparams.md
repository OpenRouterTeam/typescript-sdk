# ChatCompletionCreateParams

## Example Usage

```typescript
import { ChatCompletionCreateParams } from "open-router/models";

let value: ChatCompletionCreateParams = {
  messages: [
    {
      role: "assistant",
    },
  ],
  model: "Spyder",
};
```

## Fields

| Field                                                                          | Type                                                                           | Required                                                                       | Description                                                                    |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `messages`                                                                     | *models.ChatCompletionMessageParam*[]                                          | :heavy_check_mark:                                                             | N/A                                                                            |
| `model`                                                                        | *string*                                                                       | :heavy_check_mark:                                                             | N/A                                                                            |
| `frequencyPenalty`                                                             | *number*                                                                       | :heavy_minus_sign:                                                             | N/A                                                                            |
| `logitBias`                                                                    | Record<string, *number*>                                                       | :heavy_minus_sign:                                                             | N/A                                                                            |
| `logprobs`                                                                     | *boolean*                                                                      | :heavy_minus_sign:                                                             | N/A                                                                            |
| `topLogprobs`                                                                  | *number*                                                                       | :heavy_minus_sign:                                                             | N/A                                                                            |
| `maxCompletionTokens`                                                          | *number*                                                                       | :heavy_minus_sign:                                                             | N/A                                                                            |
| `maxTokens`                                                                    | *number*                                                                       | :heavy_minus_sign:                                                             | N/A                                                                            |
| `metadata`                                                                     | Record<string, *string*>                                                       | :heavy_minus_sign:                                                             | N/A                                                                            |
| `presencePenalty`                                                              | *number*                                                                       | :heavy_minus_sign:                                                             | N/A                                                                            |
| `reasoning`                                                                    | [models.Reasoning](../models/reasoning.md)                                     | :heavy_minus_sign:                                                             | N/A                                                                            |
| `responseFormat`                                                               | *models.ResponseFormat*                                                        | :heavy_minus_sign:                                                             | N/A                                                                            |
| `seed`                                                                         | *number*                                                                       | :heavy_minus_sign:                                                             | N/A                                                                            |
| `stop`                                                                         | *models.Stop*                                                                  | :heavy_minus_sign:                                                             | N/A                                                                            |
| `stream`                                                                       | *boolean*                                                                      | :heavy_minus_sign:                                                             | N/A                                                                            |
| `streamOptions`                                                                | [models.ChatCompletionStreamOptions](../models/chatcompletionstreamoptions.md) | :heavy_minus_sign:                                                             | N/A                                                                            |
| `temperature`                                                                  | *number*                                                                       | :heavy_minus_sign:                                                             | N/A                                                                            |
| `toolChoice`                                                                   | *any*                                                                          | :heavy_minus_sign:                                                             | N/A                                                                            |
| `tools`                                                                        | [models.ChatCompletionTool](../models/chatcompletiontool.md)[]                 | :heavy_minus_sign:                                                             | N/A                                                                            |
| `topP`                                                                         | *number*                                                                       | :heavy_minus_sign:                                                             | N/A                                                                            |
| `user`                                                                         | *string*                                                                       | :heavy_minus_sign:                                                             | N/A                                                                            |