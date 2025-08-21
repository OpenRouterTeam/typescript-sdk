# ChatCompletionChunk

Streaming chat completion chunk

## Example Usage

```typescript
import { ChatCompletionChunk } from "open-router/models";

let value: ChatCompletionChunk = {
  id: "<id>",
  choices: [
    {
      delta: {},
      finishReason: "length",
      index: 7881.03,
    },
  ],
  created: 6771.54,
  model: "PT Cruiser",
  object: "chat.completion.chunk",
};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `id`                                                                         | *string*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `choices`                                                                    | [models.ChatCompletionChunkChoice](../models/chatcompletionchunkchoice.md)[] | :heavy_check_mark:                                                           | N/A                                                                          |
| `created`                                                                    | *number*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `model`                                                                      | *string*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `object`                                                                     | [models.ChatCompletionChunkObject](../models/chatcompletionchunkobject.md)   | :heavy_check_mark:                                                           | N/A                                                                          |
| `systemFingerprint`                                                          | *string*                                                                     | :heavy_minus_sign:                                                           | N/A                                                                          |
| `usage`                                                                      | [models.CompletionUsage](../models/completionusage.md)                       | :heavy_minus_sign:                                                           | Token usage statistics                                                       |