# Part2


## Supported Types

### `models.ResponseOutputText`

```typescript
const value: models.ResponseOutputText = {
  type: "output_text",
  text: "The capital of France is Paris.",
};
```

### `models.ReasoningTextContent`

```typescript
const value: models.ReasoningTextContent = {
  type: "reasoning_text",
  text: "Let me think step by step about this problem...",
};
```

### `models.OpenAIResponsesRefusalContent`

```typescript
const value: models.OpenAIResponsesRefusalContent = {
  type: "refusal",
  refusal: "I'm sorry, I cannot assist with that request",
};
```

