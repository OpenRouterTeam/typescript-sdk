# Part2


## Supported Types

### `models.OpenResponsesOutputText`

```typescript
const value: models.OpenResponsesOutputText = {
  type: "output_text",
  text: "<value>",
  annotations: [
    {
      type: "file_path",
      fileId: "<id>",
      index: 722.68,
    },
  ],
};
```

### `models.ReasoningTextContent`

```typescript
const value: models.ReasoningTextContent = {
  type: "reasoning_text",
  text: "<value>",
};
```

### `models.OpenResponsesRefusalContent`

```typescript
const value: models.OpenResponsesRefusalContent = {
  type: "refusal",
  refusal: "<value>",
};
```

