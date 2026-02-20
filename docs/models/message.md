# Message

Chat completion message with role-based discrimination


## Supported Types

### `models.SystemMessage`

```typescript
const value: models.SystemMessage = {
  role: "system",
  content: "What is the capital of France?",
};
```

### `models.UserMessage`

```typescript
const value: models.UserMessage = {
  role: "user",
  content: "What is the capital of France?",
};
```

### `models.DeveloperMessage`

```typescript
const value: models.DeveloperMessage = {
  role: "developer",
  content: "What is the capital of France?",
};
```

### `models.AssistantMessage`

```typescript
const value: models.AssistantMessage = {
  role: "assistant",
};
```

### `models.ToolResponseMessage`

```typescript
const value: models.ToolResponseMessage = {
  role: "tool",
  content: "What is the capital of France?",
  toolCallId: "call_abc123",
};
```

