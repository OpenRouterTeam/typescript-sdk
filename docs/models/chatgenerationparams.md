# ChatGenerationParams

## Example Usage

```typescript
import { ChatGenerationParams } from "@openrouter/sdk/models";

let value: ChatGenerationParams = {
  messages: [
    {
      role: "system",
      content: "<value>",
    },
  ],
};
```

## Fields

| Field                                                          | Type                                                           | Required                                                       | Description                                                    |
| -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- |
| `provider`                                                     | [models.Schema0](../models/schema0.md)                         | :heavy_minus_sign:                                             | N/A                                                            |
| `plugins`                                                      | *models.Schema17*[]                                            | :heavy_minus_sign:                                             | N/A                                                            |
| `route`                                                        | [models.Route](../models/route.md)                             | :heavy_minus_sign:                                             | N/A                                                            |
| `user`                                                         | *string*                                                       | :heavy_minus_sign:                                             | N/A                                                            |
| `sessionId`                                                    | *string*                                                       | :heavy_minus_sign:                                             | N/A                                                            |
| `messages`                                                     | *models.Message*[]                                             | :heavy_check_mark:                                             | N/A                                                            |
| `model`                                                        | *string*                                                       | :heavy_minus_sign:                                             | N/A                                                            |
| `models`                                                       | *string*[]                                                     | :heavy_minus_sign:                                             | N/A                                                            |
| `frequencyPenalty`                                             | *number*                                                       | :heavy_minus_sign:                                             | N/A                                                            |
| `logitBias`                                                    | Record<string, *number*>                                       | :heavy_minus_sign:                                             | N/A                                                            |
| `logprobs`                                                     | *boolean*                                                      | :heavy_minus_sign:                                             | N/A                                                            |
| `topLogprobs`                                                  | *number*                                                       | :heavy_minus_sign:                                             | N/A                                                            |
| `maxCompletionTokens`                                          | *number*                                                       | :heavy_minus_sign:                                             | N/A                                                            |
| `maxTokens`                                                    | *number*                                                       | :heavy_minus_sign:                                             | N/A                                                            |
| `metadata`                                                     | Record<string, *string*>                                       | :heavy_minus_sign:                                             | N/A                                                            |
| `presencePenalty`                                              | *number*                                                       | :heavy_minus_sign:                                             | N/A                                                            |
| `reasoning`                                                    | [models.Reasoning](../models/reasoning.md)                     | :heavy_minus_sign:                                             | N/A                                                            |
| `responseFormat`                                               | *models.ResponseFormat*                                        | :heavy_minus_sign:                                             | N/A                                                            |
| `seed`                                                         | *number*                                                       | :heavy_minus_sign:                                             | N/A                                                            |
| `stop`                                                         | *models.Stop*                                                  | :heavy_minus_sign:                                             | N/A                                                            |
| `stream`                                                       | *boolean*                                                      | :heavy_minus_sign:                                             | N/A                                                            |
| `streamOptions`                                                | [models.ChatStreamOptions](../models/chatstreamoptions.md)     | :heavy_minus_sign:                                             | N/A                                                            |
| `temperature`                                                  | *number*                                                       | :heavy_minus_sign:                                             | N/A                                                            |
| `toolChoice`                                                   | *any*                                                          | :heavy_minus_sign:                                             | N/A                                                            |
| `tools`                                                        | [models.ToolDefinitionJson](../models/tooldefinitionjson.md)[] | :heavy_minus_sign:                                             | N/A                                                            |
| `topP`                                                         | *number*                                                       | :heavy_minus_sign:                                             | N/A                                                            |
| `debug`                                                        | [models.Debug](../models/debug.md)                             | :heavy_minus_sign:                                             | N/A                                                            |
| `imageConfig`                                                  | Record<string, *models.ChatGenerationParamsImageConfig*>       | :heavy_minus_sign:                                             | N/A                                                            |
| `modalities`                                                   | [models.Modality](../models/modality.md)[]                     | :heavy_minus_sign:                                             | N/A                                                            |