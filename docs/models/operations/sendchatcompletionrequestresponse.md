# SendChatCompletionRequestResponse


## Supported Types

### `models.ChatResult`

```typescript
const value: models.ChatResult = {
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
  systemFingerprint: "fp_44709d6fcb",
};
```

### `EventStream<operations.SendChatCompletionRequestResponseBody>`

