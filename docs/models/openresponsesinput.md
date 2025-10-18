# OpenResponsesInput

Input for a response request - can be a string or array of items


## Supported Types

### `string`

```typescript
const value: string =
  "[{\"role\":\"user\",\"content\":\"What is the weather today?\"}]";
```

### `models.OpenResponsesInputItem[]`

```typescript
const value: models.OpenResponsesInputItem[] = [
  {
    type: "message",
    role: "user",
    content: "What is the weather today?",
  },
];
```

### `any`

```typescript
const value: any = [
  {
    "role": "user",
    "content": "What is the weather today?",
  },
];
```

