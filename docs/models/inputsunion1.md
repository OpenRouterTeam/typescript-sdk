# InputsUnion1


## Supported Types

### `models.ReasoningItem`

```typescript
const value: models.ReasoningItem = {
  type: "reasoning",
  id: "reasoning-abc123",
  summary: [
    {
      type: "summary_text",
      text: "Analyzed the problem using first principles",
    },
  ],
};
```

### `models.EasyInputMessage`

```typescript
const value: models.EasyInputMessage = {
  role: "system",
};
```

### `models.InputMessageItem`

```typescript
const value: models.InputMessageItem = {
  role: "system",
};
```

### `models.FunctionCallItem`

```typescript
const value: models.FunctionCallItem = {
  type: "function_call",
  callId: "call-abc123",
  name: "get_weather",
  arguments: "{\"location\":\"San Francisco\"}",
  id: "call-abc123",
};
```

### `models.FunctionCallOutputItem`

```typescript
const value: models.FunctionCallOutputItem = {
  type: "function_call_output",
  callId: "call-abc123",
  output: "{\"temperature\":72,\"conditions\":\"sunny\"}",
};
```

### `models.InputsMessage`

```typescript
const value: models.InputsMessage = {
  id: "msg-abc123",
  role: "assistant",
  type: "message",
  content: [
    {
      type: "output_text",
      text: "Hello! How can I help you today?",
    },
  ],
};
```

### `models.InputsReasoning`

```typescript
const value: models.InputsReasoning = {
  type: "reasoning",
  id: "reasoning-abc123",
  summary: [
    {
      type: "summary_text",
      text: "Analyzed the problem using first principles",
    },
  ],
};
```

### `models.OutputFunctionCallItem`

```typescript
const value: models.OutputFunctionCallItem = {
  type: "function_call",
  name: "get_weather",
  arguments: "{\"location\":\"San Francisco\",\"unit\":\"celsius\"}",
  callId: "call-abc123",
};
```

### `models.OutputWebSearchCallItem`

```typescript
const value: models.OutputWebSearchCallItem = {
  type: "web_search_call",
  id: "search-abc123",
  action: {
    type: "search",
    query: "OpenAI API",
  },
  status: "completed",
};
```

### `models.OutputFileSearchCallItem`

```typescript
const value: models.OutputFileSearchCallItem = {
  type: "file_search_call",
  id: "filesearch-abc123",
  queries: [
    "machine learning algorithms",
    "neural networks",
  ],
  status: "completed",
};
```

### `models.OutputImageGenerationCallItem`

```typescript
const value: models.OutputImageGenerationCallItem = {
  type: "image_generation_call",
  id: "imagegen-abc123",
  result:
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  status: "completed",
};
```

### `models.OutputDatetimeItem`

```typescript
const value: models.OutputDatetimeItem = {
  type: "openrouter:datetime",
  status: "completed",
  datetime: "2026-03-12T14:30:00.000Z",
  timezone: "UTC",
};
```

### `models.OutputServerToolItem`

```typescript
const value: models.OutputServerToolItem = {
  type: "openrouter:web_search",
  status: "completed",
};
```

