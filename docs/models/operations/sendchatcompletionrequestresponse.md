# SendChatCompletionRequestResponse


## Supported Types

### `models.ChatResponse`

```typescript
const value: models.ChatResponse = {
  id: "chatcmpl-123",
  choices: [
    {
      finishReason: "stop",
      index: 0,
      message: {
        role: "assistant",
      },
    },
  ],
  created: 1677652288,
  model: "openai/gpt-4",
  object: "chat.completion",
};
```

### `EventStream<operations.SendChatCompletionRequestResponseBody>`

