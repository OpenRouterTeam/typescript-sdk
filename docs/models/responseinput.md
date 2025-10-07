# ResponseInput

Input for Responses API (can be a string or array of input items)


## Supported Types

### `string`

```typescript
const value: string = "Hello, how can I help you today?";
```

### `models.ResponseInputItem[]`

```typescript
const value: models.ResponseInputItem[] = [
  {
    type: "message",
    role: "user",
    content: "Hello, how can I help you today?",
  },
];
```

