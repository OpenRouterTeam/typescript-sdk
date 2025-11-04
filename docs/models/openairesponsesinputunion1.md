# OpenAIResponsesInputUnion1


## Supported Types

### `models.OpenAIResponsesInputMessage1`

```typescript
const value: models.OpenAIResponsesInputMessage1 = {
  role: "assistant",
  content: "<value>",
};
```

### `models.OpenAIResponsesInputMessage2`

```typescript
const value: models.OpenAIResponsesInputMessage2 = {
  id: "<id>",
  role: "user",
  content: [
    {
      type: "input_text",
      text: "Hello, how can I help you?",
    },
  ],
};
```

### `models.OpenAIResponsesInputFunctionCallOutput`

```typescript
const value: models.OpenAIResponsesInputFunctionCallOutput = {
  type: "function_call_output",
  id: "<id>",
  callId: "<id>",
  output: "<value>",
};
```

### `models.OpenAIResponsesInputFunctionCall`

```typescript
const value: models.OpenAIResponsesInputFunctionCall = {
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

