# PostChatCompletionsResponse


## Supported Types

### `models.ChatCompletion`

```typescript
const value: models.ChatCompletion = {
  id: "<id>",
  choices: [
    {
      finishReason: "stop",
      index: 7209.22,
      message: {
        role: "assistant",
      },
    },
  ],
  created: 3224.32,
  model: "Roadster",
  object: "chat.completion",
};
```

### `EventStream<models.ChatCompletionChunk>`

