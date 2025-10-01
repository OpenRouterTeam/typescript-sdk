# PostApiAlphaResponsesInputUnion3


## Supported Types

### `operations.InputAssistant2`

```typescript
const value: operations.InputAssistant2 = {
  type: "message",
  id: "<id>",
  status: "completed",
  role: "assistant",
  content: [],
};
```

### `operations.InputReasoning`

```typescript
const value: operations.InputReasoning = {
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

### `operations.InputFunctionCall2`

```typescript
const value: operations.InputFunctionCall2 = {
  type: "function_call",
  name: "<value>",
  arguments: "<value>",
  callId: "<id>",
};
```

### `operations.InputWebSearchCall`

```typescript
const value: operations.InputWebSearchCall = {
  type: "web_search_call",
  id: "<id>",
  status: "failed",
};
```

### `operations.InputFileSearchCall`

```typescript
const value: operations.InputFileSearchCall = {
  type: "file_search_call",
  id: "<id>",
  queries: [
    "<value 1>",
  ],
  status: "searching",
};
```

### `operations.InputImageGenerationCall2`

```typescript
const value: operations.InputImageGenerationCall2 = {
  type: "image_generation_call",
  id: "<id>",
  result: "<value>",
  status: "in_progress",
};
```

