# OpenResponsesInputUnion1


## Supported Types

### `models.OpenResponsesReasoning`

```typescript
const value: models.OpenResponsesReasoning = {
  type: "reasoning",
  id: "reasoning-abc123",
  content: [
    {
      type: "reasoning_text",
      text: "Let me think step by step about this problem...",
    },
  ],
  summary: [
    {
      type: "summary_text",
      text: "Analyzed the problem using first principles",
    },
  ],
  encryptedContent: "<value>",
  status: "completed",
  signature: "<value>",
  format: "unknown",
};
```

### `models.OpenResponsesEasyInputMessage`

```typescript
const value: models.OpenResponsesEasyInputMessage = {
  type: "message",
  role: "system",
  content: "<value>",
};
```

### `models.OpenResponsesInputMessageItem`

```typescript
const value: models.OpenResponsesInputMessageItem = {
  id: "<id>",
  type: "message",
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
  status: "completed",
};
```

### `models.OpenResponsesFunctionCallOutput`

```typescript
const value: models.OpenResponsesFunctionCallOutput = {
  type: "function_call_output",
  id: "output-abc123",
  callId: "call-abc123",
  output: "{\"temperature\":72,\"conditions\":\"sunny\"}",
  status: "completed",
};
```

### `models.OpenResponsesOutputMessage`

```typescript
const value: models.OpenResponsesOutputMessage = {
  id: "msg-abc123",
  role: "assistant",
  type: "message",
  status: "completed",
  content: [
    {
      type: "output_text",
      text: "Hello! How can I help you today?",
      annotations: [
        {
          type: "file_citation",
          fileId: "file-abc123",
          filename: "research_paper.pdf",
          index: 0,
        },
      ],
    },
  ],
};
```

### `models.OpenResponsesOutputItemReasoning`

```typescript
const value: models.OpenResponsesOutputItemReasoning = {
  type: "reasoning",
  id: "reasoning-abc123",
  content: [
    {
      type: "reasoning_text",
      text: "Let me think step by step about this problem...",
    },
  ],
  summary: [
    {
      type: "summary_text",
      text: "Analyzed the problem using first principles",
    },
  ],
  encryptedContent: "<value>",
  status: "completed",
};
```

### `models.OpenResponsesInputFunctionCall`

```typescript
const value: models.OpenResponsesInputFunctionCall = {
  type: "function_call",
  id: "call-abc123",
  name: "get_weather",
  arguments: "{\"location\":\"San Francisco\",\"unit\":\"celsius\"}",
  callId: "call-abc123",
  status: "completed",
};
```

### `models.OpenResponsesInputWebSearchCall`

```typescript
const value: models.OpenResponsesInputWebSearchCall = {
  type: "web_search_call",
  id: "search-abc123",
  status: "completed",
};
```

### `models.OpenResponsesInputFileSearchCall`

```typescript
const value: models.OpenResponsesInputFileSearchCall = {
  type: "file_search_call",
  id: "filesearch-abc123",
  queries: [
    "machine learning algorithms",
    "neural networks",
  ],
  status: "completed",
};
```

### `models.OpenResponsesInputImageGenerationCall`

```typescript
const value: models.OpenResponsesInputImageGenerationCall = {
  type: "image_generation_call",
  id: "imagegen-abc123",
  result:
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  status: "completed",
};
```

