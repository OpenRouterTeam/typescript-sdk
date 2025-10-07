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
          refusal: null,
          toolCalls: [
            {
              index: 5916.2,
              id: "<id>",
              function: {
                name: "<value>",
                arguments: "<value>",
              },
            },
          ],
        },
        finishReason: "content_filter",
        index: 564.35,
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
    created: 9352.59,
    model: "Ranchero",
    object: "chat.completion.chunk",
    systemFingerprint: "<value>",
    error: {
      message: "<value>",
      code: 4598.98,
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

| Field                            | Type                             | Required                         | Description                      |
| -------------------------------- | -------------------------------- | -------------------------------- | -------------------------------- |
| `data`                           | [models.Data](../models/data.md) | :heavy_check_mark:               | N/A                              |