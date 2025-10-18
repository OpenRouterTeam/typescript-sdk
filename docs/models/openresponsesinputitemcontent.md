# OpenResponsesInputItemContent


## Supported Types

### `models.OutputTextContent`

```typescript
const value: models.OutputTextContent = {
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

### `models.RefusalContent`

```typescript
const value: models.RefusalContent = {
  type: "refusal",
  refusal: "I'm sorry, I cannot assist with that request",
};
```

