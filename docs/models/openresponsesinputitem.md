# OpenResponsesInputItem

An item in the input array for a response request


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
  signature: "<value>",
  format: "unknown",
};
```

### `models.OpenResponsesEasyInputMessage`

```typescript
const value: models.OpenResponsesEasyInputMessage = {
  type: "message",
  role: "user",
  content: "What is the weather today?",
};
```

### `models.OpenResponsesInputMessageItem`

```typescript
const value: models.OpenResponsesInputMessageItem = {
  id: "<id>",
  type: "message",
  role: "user",
  content: [
    {
      type: "input_image",
      detail: "low",
      imageUrl: "https://white-squid.biz",
    },
  ],
};
```

### `models.OpenResponsesFunctionToolCall`

```typescript
const value: models.OpenResponsesFunctionToolCall = {
  type: "function_call",
  callId: "<id>",
  name: "<value>",
  arguments: "<value>",
  id: "<id>",
  status: "completed",
};
```

### `models.OpenResponsesFunctionCallOutput`

```typescript
const value: models.OpenResponsesFunctionCallOutput = {
  type: "function_call_output",
  id: "<id>",
  callId: "<id>",
  output: "<value>",
  status: "completed",
};
```

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

