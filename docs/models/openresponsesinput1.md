# OpenResponsesInput1


## Supported Types

### `models.OpenResponsesReasoning`

```typescript
const value: models.OpenResponsesReasoning = {
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

### `models.OpenResponsesEasyInputMessage`

```typescript
const value: models.OpenResponsesEasyInputMessage = {
  role: "system",
  content: "<value>",
};
```

### `models.OpenResponsesInputMessageItem`

```typescript
const value: models.OpenResponsesInputMessageItem = {
  role: "system",
  content: [
    {
      type: "input_text",
      text: "Hello, how can I help you?",
    },
  ],
};
```

### `models.OpenResponsesFunctionToolCall`

```typescript
const value: models.OpenResponsesFunctionToolCall = {
  type: "function_call",
  callId: "call-abc123",
  name: "get_weather",
  arguments: "{\"location\":\"San Francisco\"}",
  id: "call-abc123",
};
```

### `models.OpenResponsesFunctionCallOutput`

```typescript
const value: models.OpenResponsesFunctionCallOutput = {
  type: "function_call_output",
  id: "output-abc123",
  callId: "call-abc123",
  output: "{\"temperature\":72,\"conditions\":\"sunny\"}",
};
```

### `models.ResponsesOutputMessage`

```typescript
const value: models.ResponsesOutputMessage = {
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

### `models.ResponsesOutputItemReasoning`

```typescript
const value: models.ResponsesOutputItemReasoning = {
  type: "reasoning",
  summary: [
    {
      type: "summary_text",
      text: "Analyzed the problem and found the optimal solution.",
    },
  ],
};
```

### `models.ResponsesOutputItemFunctionCall`

```typescript
const value: models.ResponsesOutputItemFunctionCall = {
  type: "function_call",
  name: "get_weather",
  arguments: "{\"location\":\"San Francisco\",\"unit\":\"celsius\"}",
  callId: "call-abc123",
};
```

### `models.ResponsesWebSearchCallOutput`

```typescript
const value: models.ResponsesWebSearchCallOutput = {
  type: "web_search_call",
  id: "search-abc123",
  status: "completed",
};
```

### `models.ResponsesOutputItemFileSearchCall`

```typescript
const value: models.ResponsesOutputItemFileSearchCall = {
  type: "file_search_call",
  id: "filesearch-abc123",
  queries: [
    "machine learning algorithms",
    "neural networks",
  ],
  status: "completed",
};
```

### `models.ResponsesImageGenerationCall`

```typescript
const value: models.ResponsesImageGenerationCall = {
  type: "image_generation_call",
  id: "imagegen-abc123",
  result:
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  status: "completed",
};
```

