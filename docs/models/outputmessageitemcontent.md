# OutputMessageItemContent


## Supported Types

### `models.ResponseOutputText`

```typescript
const value: models.ResponseOutputText = {
  text: "The capital of France is Paris.",
  type: "output_text",
};
```

### `models.OpenAIResponsesRefusalContent`

```typescript
const value: models.OpenAIResponsesRefusalContent = {
  refusal: "I'm sorry, I cannot assist with that request",
  type: "refusal",
};
```

### `models.OutputAudio`

```typescript
const value: models.OutputAudio = {
  data: "UklGRnoGAABXQVZFZm10IBAAAAABAAEA",
  transcript: "Hello! How can I help you today?",
  type: "output_audio",
};
```

