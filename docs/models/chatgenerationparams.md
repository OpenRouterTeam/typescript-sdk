# ChatGenerationParams

## Example Usage

```typescript
import { ChatGenerationParams } from "@openrouter/sdk/models";

let value: ChatGenerationParams = {
  messages: [
    {
      role: "system",
      content: "<value>",
      name: "<value>",
    },
  ],
  model: "Mustang",
  frequencyPenalty: 7589.96,
  logitBias: {
    "key": 847.22,
    "key1": 4831.07,
    "key2": 1268.36,
  },
  logprobs: true,
  topLogprobs: 1190.39,
  maxCompletionTokens: 4025.63,
  maxTokens: 6504,
  metadata: {
    "key": "<value>",
  },
  presencePenalty: 7597.29,
  reasoning: {
    effort: "minimal",
    generateSummary: "detailed",
    summary: null,
  },
  responseFormat: {
    type: "json_object",
  },
  seed: 814447,
  stop: [
    "<value 1>",
  ],
  streamOptions: {
    includeUsage: false,
  },
  toolChoice: {
    type: "function",
    function: {
      name: "<value>",
    },
  },
  tools: [
    {
      type: "function",
      function: {
        name: "<value>",
        description:
          "rural toward while since midst finally tributary consequently underneath till",
        parameters: {
          "key": "<value>",
          "key1": "<value>",
        },
        strict: false,
      },
    },
  ],
  user: "Antonia_Harber35",
};
```

## Fields

| Field                                                      | Type                                                       | Required                                                   | Description                                                |
| ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `messages`                                                 | *models.Message*[]                                         | :heavy_check_mark:                                         | N/A                                                        |
| `model`                                                    | *string*                                                   | :heavy_check_mark:                                         | N/A                                                        |
| `frequencyPenalty`                                         | *number*                                                   | :heavy_minus_sign:                                         | N/A                                                        |
| `logitBias`                                                | Record<string, *number*>                                   | :heavy_minus_sign:                                         | N/A                                                        |
| `logprobs`                                                 | *boolean*                                                  | :heavy_minus_sign:                                         | N/A                                                        |
| `topLogprobs`                                              | *number*                                                   | :heavy_minus_sign:                                         | N/A                                                        |
| `maxCompletionTokens`                                      | *number*                                                   | :heavy_minus_sign:                                         | N/A                                                        |
| `maxTokens`                                                | *number*                                                   | :heavy_minus_sign:                                         | N/A                                                        |
| `metadata`                                                 | Record<string, *string*>                                   | :heavy_minus_sign:                                         | N/A                                                        |
| `presencePenalty`                                          | *number*                                                   | :heavy_minus_sign:                                         | N/A                                                        |
| `reasoning`                                                | [models.Reasoning](../models/reasoning.md)                 | :heavy_minus_sign:                                         | N/A                                                        |
| `responseFormat`                                           | *models.ChatGenerationParamsResponseFormatUnion*           | :heavy_minus_sign:                                         | N/A                                                        |
| `seed`                                                     | *number*                                                   | :heavy_minus_sign:                                         | N/A                                                        |
| `stop`                                                     | *models.ChatGenerationParamsStop*                          | :heavy_minus_sign:                                         | N/A                                                        |
| `stream`                                                   | *boolean*                                                  | :heavy_minus_sign:                                         | N/A                                                        |
| `streamOptions`                                            | [models.ChatStreamOptions](../models/chatstreamoptions.md) | :heavy_minus_sign:                                         | N/A                                                        |
| `temperature`                                              | *number*                                                   | :heavy_minus_sign:                                         | N/A                                                        |
| `toolChoice`                                               | *any*                                                      | :heavy_minus_sign:                                         | N/A                                                        |
| `tools`                                                    | [models.Tool](../models/tool.md)[]                         | :heavy_minus_sign:                                         | N/A                                                        |
| `topP`                                                     | *number*                                                   | :heavy_minus_sign:                                         | N/A                                                        |
| `user`                                                     | *string*                                                   | :heavy_minus_sign:                                         | N/A                                                        |