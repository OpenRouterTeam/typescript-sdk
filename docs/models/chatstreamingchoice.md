# ChatStreamingChoice

## Example Usage

```typescript
import { ChatStreamingChoice } from "@openrouter/sdk/models";

let value: ChatStreamingChoice = {
  delta: {
    role: "assistant",
    content: "<value>",
    reasoning: "<value>",
    refusal: "<value>",
    toolCalls: [
      {
        index: 932.78,
        id: "<id>",
        function: {
          name: "<value>",
          arguments: "<value>",
        },
      },
    ],
  },
  finishReason: "error",
  index: 3511.86,
  logprobs: {
    content: [
      {
        token: "<value>",
        logprob: 7572.98,
        bytes: [
          9191.5,
          2986.81,
          8603.48,
        ],
        topLogprobs: [
          {
            token: "<value>",
            logprob: 1362.57,
            bytes: [
              7000.29,
              7450.46,
              6296.9,
            ],
          },
        ],
      },
    ],
    refusal: [],
  },
};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `delta`                                                                      | [models.ChatStreamingMessageChunk](../models/chatstreamingmessagechunk.md)   | :heavy_check_mark:                                                           | N/A                                                                          |
| `finishReason`                                                               | [models.ChatCompletionFinishReason](../models/chatcompletionfinishreason.md) | :heavy_check_mark:                                                           | N/A                                                                          |
| `index`                                                                      | *number*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `logprobs`                                                                   | [models.ChatMessageTokenLogprobs](../models/chatmessagetokenlogprobs.md)     | :heavy_minus_sign:                                                           | N/A                                                                          |