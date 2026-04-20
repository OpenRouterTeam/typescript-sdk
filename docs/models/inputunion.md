# InputUnion

The input to the generation — either a prompt string or an array of messages


## Supported Types

### `models.Input1`

```typescript
const value: models.Input1 = {
  prompt: "What is the meaning of life?",
};
```

### `models.Input2`

```typescript
const value: models.Input2 = {
  messages: [
    {
      "content": "What is the meaning of life?",
      "role": "user",
    },
  ],
};
```

