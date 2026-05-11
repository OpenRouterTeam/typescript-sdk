# BaseInputsUnion1


## Supported Types

### `models.BaseInputsMessage`

```typescript
const value: models.BaseInputsMessage = {
  content: "<value>",
  role: "user",
};
```

### `models.OpenAIResponseInputMessageItem`

```typescript
const value: models.OpenAIResponseInputMessageItem = {
  content: [
    {
      text: "Hello, how are you?",
      type: "input_text",
    },
  ],
  id: "msg-abc123",
  role: "user",
};
```

### `models.OpenAIResponseFunctionToolCallOutput`

```typescript
const value: models.OpenAIResponseFunctionToolCallOutput = {
  callId: "call-abc123",
  output: "{\"temperature\":72,\"conditions\":\"sunny\"}",
  type: "function_call_output",
};
```

### `models.OpenAIResponseFunctionToolCall`

```typescript
const value: models.OpenAIResponseFunctionToolCall = {
  arguments: "{\"location\":\"San Francisco\"}",
  callId: "call-abc123",
  name: "get_weather",
  type: "function_call",
};
```

### `models.OutputItemImageGenerationCall`

```typescript
const value: models.OutputItemImageGenerationCall = {
  id: "imagegen-abc123",
  result:
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  status: "completed",
  type: "image_generation_call",
};
```

### `models.OutputMessage`

```typescript
const value: models.OutputMessage = {
  content: [
    {
      text: "Hello! How can I help you today?",
      type: "output_text",
    },
  ],
  id: "msg-abc123",
  role: "assistant",
  type: "message",
};
```

