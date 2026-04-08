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
  id: "msg-abc123",
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
  arguments: "{\"location\":\"San Francisco\"}",
  callId: "call-abc123",
};
```

### `models.OutputWebSearchCallItem`

```typescript
const value: models.OutputWebSearchCallItem = {
  type: "web_search_call",
  id: "ws-abc123",
  action: {
    type: "find_in_page",
    pattern: "<value>",
    url: "https://tragic-requirement.com/",
  },
  status: "completed",
};
```

### `models.OutputFileSearchCallItem`

```typescript
const value: models.OutputFileSearchCallItem = {
  type: "file_search_call",
  id: "fs-abc123",
  queries: [
    "search term",
  ],
  status: "completed",
};
```

### `models.OutputImageGenerationCallItem`

```typescript
const value: models.OutputImageGenerationCallItem = {
  type: "image_generation_call",
  id: "img-abc123",
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

