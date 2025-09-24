# Message


## Supported Types

### `models.ToolMessage`

```typescript
const value: models.ToolMessage = {
  role: "tool",
  content: [],
  toolCallId: "<id>",
};
```

### `models.SystemMessage`

```typescript
const value: models.SystemMessage = {
  role: "system",
  content: [],
};
```

### `models.UserMessage`

```typescript
const value: models.UserMessage = {
  role: "user",
  content: "<value>",
};
```

### `models.AssistantMessage`

```typescript
const value: models.AssistantMessage = {
  role: "assistant",
};
```

