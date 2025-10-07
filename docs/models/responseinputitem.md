# ResponseInputItem

Input item for Responses API (can be messages, function calls, or output items)


## Supported Types

### `models.ResponseEasyInputMessage`

```typescript
const value: models.ResponseEasyInputMessage = {
  type: "message",
  role: "user",
  content: "Hello, how can I help you today?",
};
```

### `models.ResponseInputMessageItem`

```typescript
const value: models.ResponseInputMessageItem = {
  id: "<id>",
  type: "message",
  role: "user",
  content: [
    {
      type: "input_file",
      fileId: null,
      fileData: "<value>",
      filename: "example.file",
      fileUrl: "https://delirious-fellow.biz/",
    },
  ],
};
```

### `models.ResponseFunctionToolCall`

```typescript
const value: models.ResponseFunctionToolCall = {
  type: "function_call",
  callId: "<id>",
  name: "<value>",
  arguments: "<value>",
  id: "<id>",
  status: "completed",
};
```

### `models.ResponseFunctionCallOutputItem`

```typescript
const value: models.ResponseFunctionCallOutputItem = {
  type: "function_call_output",
  id: "<id>",
  callId: "<id>",
  output: "<value>",
  status: "completed",
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

### `models.ResponsesOutputItem`

```typescript
const value: models.ResponsesOutputItem = {
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

