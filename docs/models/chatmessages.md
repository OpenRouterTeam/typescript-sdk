# ChatMessages

Chat completion message with role-based discrimination


## Supported Types

### `models.ChatSystemMessage`

```typescript
const value: models.ChatSystemMessage = {
  role: "system",
  content: "What is the capital of France?",
};
```

### `models.ChatUserMessage`

```typescript
const value: models.ChatUserMessage = {
  role: "user",
  content: "What is the capital of France?",
};
```

### `models.ChatDeveloperMessage`

```typescript
const value: models.ChatDeveloperMessage = {
  role: "developer",
  content: "What is the capital of France?",
};
```

### `models.ChatAssistantMessage`

```typescript
const value: models.ChatAssistantMessage = {
  role: "assistant",
};
```

### `models.ChatToolMessage`

```typescript
const value: models.ChatToolMessage = {
  role: "tool",
  content: "What is the capital of France?",
  toolCallId: "call_abc123",
};
```

