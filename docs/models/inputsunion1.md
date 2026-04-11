# InputsUnion1


## Supported Types

### `models.ReasoningItem`

```typescript
const value: models.ReasoningItem = {
  id: "reasoning-abc123",
  summary: [
    {
      text: "Step by step analysis",
      type: "summary_text",
    },
  ],
  type: "reasoning",
};
```

### `models.EasyInputMessage`

```typescript
const value: models.EasyInputMessage = {
  role: "user",
};
```

### `models.InputMessageItem`

```typescript
const value: models.InputMessageItem = {
  role: "user",
};
```

### `models.FunctionCallItem`

```typescript
const value: models.FunctionCallItem = {
  arguments: "{\"location\":\"San Francisco\"}",
  callId: "call-abc123",
  id: "call-abc123",
  name: "get_weather",
  type: "function_call",
};
```

### `models.FunctionCallOutputItem`

```typescript
const value: models.FunctionCallOutputItem = {
  callId: "call-abc123",
  output: "{\"temperature\":72,\"conditions\":\"sunny\"}",
  type: "function_call_output",
};
```

### `models.InputsMessage`

```typescript
const value: models.InputsMessage = {
  content: [
    {
      text: "Hello! How can I help you?",
      type: "output_text",
    },
  ],
  id: "msg-123",
  role: "assistant",
  type: "message",
};
```

### `models.InputsReasoning`

```typescript
const value: models.InputsReasoning = {
  id: "reasoning-123",
  summary: [
    {
      text: "Analyzed the problem and found the optimal solution.",
      type: "summary_text",
    },
  ],
  type: "reasoning",
};
```

### `models.OutputFunctionCallItem`

```typescript
const value: models.OutputFunctionCallItem = {
  arguments: "{\"location\":\"San Francisco\"}",
  callId: "call-abc123",
  name: "get_weather",
  type: "function_call",
};
```

### `models.OutputWebSearchCallItem`

```typescript
const value: models.OutputWebSearchCallItem = {
  action: {
    pattern: "<value>",
    type: "find_in_page",
    url: "https://tragic-requirement.com/",
  },
  id: "ws-abc123",
  status: "completed",
  type: "web_search_call",
};
```

### `models.OutputFileSearchCallItem`

```typescript
const value: models.OutputFileSearchCallItem = {
  id: "fs-abc123",
  queries: [
    "search term",
  ],
  status: "completed",
  type: "file_search_call",
};
```

### `models.OutputImageGenerationCallItem`

```typescript
const value: models.OutputImageGenerationCallItem = {
  id: "img-abc123",
  status: "completed",
  type: "image_generation_call",
};
```

### `models.OutputDatetimeItem`

```typescript
const value: models.OutputDatetimeItem = {
  datetime: "2026-03-12T14:30:00.000Z",
  status: "completed",
  timezone: "UTC",
  type: "openrouter:datetime",
};
```

### `models.OutputWebSearchServerToolItem`

```typescript
const value: models.OutputWebSearchServerToolItem = {
  status: "completed",
  type: "openrouter:web_search",
};
```

