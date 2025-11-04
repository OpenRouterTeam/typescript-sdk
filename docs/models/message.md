# Message


## Supported Types

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

### `models.MessageDeveloper`

```typescript
const value: models.MessageDeveloper = {
  role: "developer",
  content: [],
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
  content: [],
  toolCallId: "<id>",
};
```

