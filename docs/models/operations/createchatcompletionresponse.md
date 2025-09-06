# CreateChatCompletionResponse


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
        content: "<value>",
        refusal: "<value>",
      },
    },
  ],
  created: 4940.1,
  model: "Accord",
  object: "chat.completion",
};
```

### `EventStream<models.ChatCompletionChunkWrapper>`

```typescript
const value: EventStream<models.ChatCompletionChunkWrapper> = ;
```

