# ChatCompletionMessageParam

Chat completion message with role-based discrimination


## Supported Types

### `models.ChatCompletionSystemMessageParam`

```typescript
const value: models.ChatCompletionSystemMessageParam = {
  role: "system",
  content: [
    {
      type: "text",
      text: "<value>",
    },
  ],
};
```

### `models.ChatCompletionUserMessageParam`

```typescript
const value: models.ChatCompletionUserMessageParam = {
  role: "user",
  content: [],
};
```

### `models.ChatCompletionAssistantMessageParam`

```typescript
const value: models.ChatCompletionAssistantMessageParam = {
  role: "assistant",
};
```

### `models.ChatCompletionToolMessageParam`

```typescript
const value: models.ChatCompletionToolMessageParam = {
  role: "tool",
  content: [
    {
      type: "input_audio",
      inputAudio: {
        data: "<value>",
        format: "pcm24",
      },
    },
  ],
  toolCallId: "<id>",
};
```

