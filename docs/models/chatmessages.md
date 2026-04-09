# ChatMessages

Chat completion message with role-based discrimination


## Supported Types

### `models.ChatAssistantMessage`

```typescript
const value: models.ChatAssistantMessage = {
  role: "assistant",
};
```

### `models.ChatDeveloperMessage`

```typescript
const value: models.ChatDeveloperMessage = {
  content: "What is the capital of France?",
  role: "developer",
};
```

### `models.ChatSystemMessage`

```typescript
const value: models.ChatSystemMessage = {
  content: "What is the capital of France?",
  role: "system",
};
```

### `models.ChatToolMessage`

```typescript
const value: models.ChatToolMessage = {
  content: "What is the capital of France?",
  role: "tool",
  toolCallId: "call_abc123",
};
```

### `models.ChatUserMessage`

```typescript
const value: models.ChatUserMessage = {
  content: "What is the capital of France?",
  role: "user",
};
```

