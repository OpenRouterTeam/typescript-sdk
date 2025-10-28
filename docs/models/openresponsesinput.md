# OpenResponsesInput

Input for a response request - can be a string or array of items


## Supported Types

### `string`

```typescript
const value: string =
  "[{\"role\":\"user\",\"content\":\"What is the weather today?\"}]";
```

### `models.OpenResponsesInput1[]`

```typescript
const value: models.OpenResponsesInput1[] = [
  {
    type: "message",
    role: "user",
    content: "What is the weather today?",
  },
];
```

