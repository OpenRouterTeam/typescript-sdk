# Output


## Supported Types

### `operations.OutputAssistant`

```typescript
const value: operations.OutputAssistant = {
  type: "message",
  id: "<id>",
  status: "in_progress",
  role: "assistant",
  content: [
    {
      type: "refusal",
      refusal: "<value>",
    },
  ],
};
```

### `operations.OutputReasoning`

```typescript
const value: operations.OutputReasoning = {
  type: "reasoning",
  id: "<id>",
  summary: [
    {
      type: "summary_text",
      text: "<value>",
    },
  ],
};
```

### `operations.OutputFunctionCall`

```typescript
const value: operations.OutputFunctionCall = {
  type: "function_call",
  name: "<value>",
  arguments: "<value>",
  callId: "<id>",
};
```

### `operations.OutputWebSearchCall`

```typescript
const value: operations.OutputWebSearchCall = {
  type: "web_search_call",
  id: "<id>",
  status: "in_progress",
};
```

### `operations.OutputFileSearchCall`

```typescript
const value: operations.OutputFileSearchCall = {
  type: "file_search_call",
  id: "<id>",
  queries: [],
  status: "searching",
};
```

### `operations.OutputImageGenerationCall`

```typescript
const value: operations.OutputImageGenerationCall = {
  type: "image_generation_call",
  id: "<id>",
  result: "<value>",
  status: "failed",
};
```

