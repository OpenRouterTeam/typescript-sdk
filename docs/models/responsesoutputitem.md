# ResponsesOutputItem

An output item from the response


## Supported Types

### `models.ResponsesOutputItemMessage`

```typescript
const value: models.ResponsesOutputItemMessage = {
  id: "<id>",
  role: "assistant",
  type: "message",
  status: "in_progress",
  content: [],
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
      text: "<value>",
    },
  ],
  encryptedContent: "<value>",
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

### `models.ResponsesOutputItemWebSearchCall`

```typescript
const value: models.ResponsesOutputItemWebSearchCall = {
  type: "web_search_call",
  id: "<id>",
  status: "completed",
};
```

### `models.ResponsesOutputItemFileSearchCall`

```typescript
const value: models.ResponsesOutputItemFileSearchCall = {
  type: "file_search_call",
  id: "<id>",
  queries: [
    "<value 1>",
  ],
  status: "failed",
};
```

### `models.ResponsesOutputItemImageGenerationCall`

```typescript
const value: models.ResponsesOutputItemImageGenerationCall = {
  type: "image_generation_call",
  id: "<id>",
  result: null,
  status: "generating",
};
```

