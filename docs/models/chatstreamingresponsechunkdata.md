# ChatStreamingResponseChunkData

## Example Usage

```typescript
import { ChatStreamingResponseChunkData } from "@openrouter/sdk/models";

let value: ChatStreamingResponseChunkData = {
  id: "<id>",
  choices: [],
  created: 3957.6,
  model: "F-150",
  object: "chat.completion.chunk",
  systemFingerprint: "<value>",
  error: {
    message: "<value>",
    code: 4181.38,
  },
  usage: {
    completionTokens: 6813.22,
    promptTokens: 9802.3,
    totalTokens: 8877.64,
    completionTokensDetails: {
      reasoningTokens: 1093.75,
      audioTokens: 130.3,
      acceptedPredictionTokens: 7308.38,
      rejectedPredictionTokens: 2801.33,
    },
    promptTokensDetails: {
      cachedTokens: 1522.95,
      audioTokens: 8854.61,
    },
  },
};
```

## Fields

| Field                                                                                  | Type                                                                                   | Required                                                                               | Description                                                                            |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `id`                                                                                   | *string*                                                                               | :heavy_check_mark:                                                                     | N/A                                                                                    |
| `choices`                                                                              | [models.ChatStreamingChoice](../models/chatstreamingchoice.md)[]                       | :heavy_check_mark:                                                                     | N/A                                                                                    |
| `created`                                                                              | *number*                                                                               | :heavy_check_mark:                                                                     | N/A                                                                                    |
| `model`                                                                                | *string*                                                                               | :heavy_check_mark:                                                                     | N/A                                                                                    |
| `object`                                                                               | *string*                                                                               | :heavy_check_mark:                                                                     | N/A                                                                                    |
| `systemFingerprint`                                                                    | *string*                                                                               | :heavy_minus_sign:                                                                     | N/A                                                                                    |
| `error`                                                                                | [models.ChatStreamingResponseChunkError](../models/chatstreamingresponsechunkerror.md) | :heavy_minus_sign:                                                                     | N/A                                                                                    |
| `usage`                                                                                | [models.ChatGenerationTokenUsage](../models/chatgenerationtokenusage.md)               | :heavy_minus_sign:                                                                     | N/A                                                                                    |