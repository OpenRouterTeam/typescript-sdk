# ResponsesOutputItem

Output item in Responses API


## Supported Types

### `models.ResponsesOutputMessage`

```typescript
const value: models.ResponsesOutputMessage = {
  type: "message",
  id: "<id>",
  status: "completed",
  role: "assistant",
  content: [
    {
      type: "refusal",
      refusal: "<value>",
    },
  ],
};
```

### `models.ResponsesOutputItemReasoning`

```typescript
const value: models.ResponsesOutputItemReasoning = {
  type: "reasoning",
  id: "<id>",
  content: [
    {
      type: "reasoning_text",
      text: "<value>",
    },
  ],
  summary: [
    {
      type: "summary_text",
      text: "Based on the analysis, the answer is...",
    },
  ],
  encryptedContent: "<value>",
  signature: "<value>",
  format: "unknown",
};
```

### `models.ResponsesOutputItemFunctionCall`

```typescript
const value: models.ResponsesOutputItemFunctionCall = {
  type: "function_call",
  id: "<id>",
  name: "<value>",
  arguments: "<value>",
  callId: "<id>",
};
```

### `models.ResponsesWebSearchCallOutput`

```typescript
const value: models.ResponsesWebSearchCallOutput = {
  type: "web_search_call",
  id: "<id>",
  status: "in_progress",
};
```

### `models.ResponsesOutputItemFileSearchCall`

```typescript
const value: models.ResponsesOutputItemFileSearchCall = {
  type: "file_search_call",
  id: "<id>",
  queries: [
    "<value 1>",
    "<value 2>",
  ],
  status: "searching",
};
```

### `models.ResponsesImageGenerationCall`

```typescript
const value: models.ResponsesImageGenerationCall = {
  type: "image_generation_call",
  id: "<id>",
  result: "<value>",
  status: "completed",
};
```

