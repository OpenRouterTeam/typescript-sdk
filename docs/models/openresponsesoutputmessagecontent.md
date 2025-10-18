# OpenResponsesOutputMessageContent


## Supported Types

### `models.ResponseOutputText`

```typescript
const value: models.ResponseOutputText = {
  type: "output_text",
  text: "The capital of France is Paris.",
  annotations: [
    {
      type: "url_citation",
      endIndex: 42,
      startIndex: 0,
      title: "Paris - Wikipedia",
      url: "https://en.wikipedia.org/wiki/Paris",
    },
  ],
};
```

### `models.OpenAIResponsesRefusalContent`

```typescript
const value: models.OpenAIResponsesRefusalContent = {
  type: "refusal",
  refusal: "I'm sorry, I cannot assist with that request",
};
```

