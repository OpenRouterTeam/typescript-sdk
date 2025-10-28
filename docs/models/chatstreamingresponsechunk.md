# ChatStreamingResponseChunk

## Example Usage

```typescript
import { ChatStreamingResponseChunk } from "@openrouter/sdk/models";

let value: ChatStreamingResponseChunk = {
  data: {
    id: "<id>",
    choices: [
      {
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
        finishReason: "tool_calls",
        index: 8525.14,
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
      },
    ],
    created: 9152.94,
    model: "Model 3",
    object: "chat.completion.chunk",
    systemFingerprint: null,
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
        cachedTokens: 6205.53,
        audioTokens: 1522.95,
      },
    },
  },
};
```

## Fields

| Field                                                                                | Type                                                                                 | Required                                                                             | Description                                                                          |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `data`                                                                               | [models.ChatStreamingResponseChunkData](../models/chatstreamingresponsechunkdata.md) | :heavy_check_mark:                                                                   | N/A                                                                                  |