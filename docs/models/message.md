# Message


## Supported Types

### `models.SystemMessage`

```typescript
const value: models.SystemMessage = {
  role: "system",
  content: [],
  name: "<value>",
};
```

### `models.UserMessage`

```typescript
const value: models.UserMessage = {
  role: "user",
  content: "<value>",
  name: "<value>",
};
```

### `models.MessageDeveloper`

```typescript
const value: models.MessageDeveloper = {
  role: "developer",
  content: [],
  name: "<value>",
};
```

### `models.AssistantMessage`

```typescript
const value: models.AssistantMessage = {
  role: "assistant",
  content: "<value>",
  name: "<value>",
  toolCalls: [
    {
      id: "<id>",
      type: "function",
      function: {
        name: "<value>",
        arguments: "<value>",
      },
    },
  ],
  refusal: "<value>",
  reasoning: "<value>",
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

