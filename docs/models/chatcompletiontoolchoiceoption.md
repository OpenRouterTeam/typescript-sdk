# ChatCompletionToolChoiceOption

Tool choice configuration


## Supported Types

### `models.ChatCompletionToolChoiceOptionNone`

```typescript
const value: models.ChatCompletionToolChoiceOptionNone = "none";
```

### `models.ChatCompletionToolChoiceOptionAuto`

```typescript
const value: models.ChatCompletionToolChoiceOptionAuto = "auto";
```

### `models.ChatCompletionToolChoiceOptionRequired`

```typescript
const value: models.ChatCompletionToolChoiceOptionRequired = "required";
```

### `models.ChatCompletionNamedToolChoice`

```typescript
const value: models.ChatCompletionNamedToolChoice = {
  type: "function",
  function: {
    name: "<value>",
  },
};
```

