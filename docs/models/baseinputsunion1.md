# BaseInputsUnion1


## Supported Types

### `models.BaseInputsMessage`

```typescript
const value: models.BaseInputsMessage = {
  role: "assistant",
  content: [],
};
```

### `models.BaseResponseInputMessageItem`

```typescript
const value: models.BaseResponseInputMessageItem = {
  id: "<id>",
  role: "system",
  content: [],
};
```

### `models.BaseResponseFunctionToolCallOutput`

```typescript
const value: models.BaseResponseFunctionToolCallOutput = {
  type: "function_call_output",
  callId: "<id>",
  output: [],
};
```

### `models.BaseResponseFunctionToolCall`

```typescript
const value: models.BaseResponseFunctionToolCall = {
  type: "function_call",
  callId: "<id>",
  name: "<value>",
  arguments: "<value>",
};
```

### `models.OutputItemImageGenerationCall`

```typescript
const value: models.OutputItemImageGenerationCall = {
  type: "image_generation_call",
  id: "imagegen-abc123",
  result:
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  status: "completed",
};
```

### `models.OutputMessage`

```typescript
const value: models.OutputMessage = {
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

