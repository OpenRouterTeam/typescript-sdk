# Part1


## Supported Types

### `models.OpenResponsesOutputText`

```typescript
const value: models.OpenResponsesOutputText = {
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

### `models.ReasoningTextContent`

```typescript
const value: models.ReasoningTextContent = {
  type: "reasoning_text",
  text: "Let me think step by step about this problem...",
};
```

### `models.OpenResponsesRefusalContent`

```typescript
const value: models.OpenResponsesRefusalContent = {
  type: "refusal",
  refusal: "I'm sorry, I cannot assist with that request",
};
```

