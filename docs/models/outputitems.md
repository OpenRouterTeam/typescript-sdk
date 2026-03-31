# OutputItems

An output item from the response


## Supported Types

### `models.OutputMessageItem`

```typescript
const value: models.OutputMessageItem = {
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

### `models.OutputReasoningItem`

```typescript
const value: models.OutputReasoningItem = {
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

### `models.OutputServerToolItem`

```typescript
const value: models.OutputServerToolItem = {
  type: "openrouter:web_search",
  status: "completed",
};
```

