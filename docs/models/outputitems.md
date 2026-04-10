# OutputItems

An output item from the response


## Supported Types

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

### `models.OutputFunctionCallItem`

```typescript
const value: models.OutputFunctionCallItem = {
  arguments: "{\"location\":\"San Francisco\"}",
  callId: "call-abc123",
  name: "get_weather",
  type: "function_call",
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

### `models.OutputMessageItem`

```typescript
const value: models.OutputMessageItem = {
  content: [
    {
      text: "Hello! How can I help you today?",
      type: "output_text",
    },
  ],
  id: "msg-abc123",
  role: "assistant",
  type: "message",
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

### `models.OutputReasoningItem`

```typescript
const value: models.OutputReasoningItem = {
  id: "msg-abc123",
  summary: [
    {
      text: "Analyzed the problem using first principles",
      type: "summary_text",
    },
  ],
  type: "reasoning",
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

