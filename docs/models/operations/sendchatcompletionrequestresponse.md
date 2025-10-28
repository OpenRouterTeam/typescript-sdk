# SendChatCompletionRequestResponse


## Supported Types

### `models.ChatResponse`

```typescript
const value: models.ChatResponse = {
  id: "<id>",
  choices: [],
  created: 9184.01,
  model: "Focus",
  object: "chat.completion",
  systemFingerprint: "<value>",
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

### `EventStream<models.ChatStreamingResponseChunk>`

