# ResponsesOutputItem

An output item from the response


## Supported Types

### `models.ResponsesOutputMessage`

```typescript
const value: models.ResponsesOutputMessage = {
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

### `models.ResponsesOutputItemReasoning`

```typescript
const value: models.ResponsesOutputItemReasoning = {
  type: "reasoning",
  id: "msg-abc123",
  content: [
    {
      type: "reasoning_text",
      text: "Hello! How can I help you today?",
    },
  ],
  summary: [
    {
      type: "summary_text",
      text: "Analyzed the problem using first principles",
    },
  ],
  encryptedContent: "<value>",
};
```

### `models.ResponsesOutputItemFunctionCall`

```typescript
const value: models.ResponsesOutputItemFunctionCall = {
  type: "function_call",
  id: "call-abc123",
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

