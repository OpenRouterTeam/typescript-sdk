# ChatToolChoice

Tool choice configuration


## Supported Types

### `models.ChatToolChoiceNone`

```typescript
const value: models.ChatToolChoiceNone = "none";
```

### `models.ChatToolChoiceAuto`

```typescript
const value: models.ChatToolChoiceAuto = "auto";
```

### `models.ChatToolChoiceRequired`

```typescript
const value: models.ChatToolChoiceRequired = "required";
```

### `models.ChatNamedToolChoice`

```typescript
const value: models.ChatNamedToolChoice = {
  type: "function",
  function: {
    name: "get_weather",
  },
};
```

