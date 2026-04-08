# BaseInputsUnion1


## Supported Types

### `models.BaseInputsMessage`

```typescript
const value: models.BaseInputsMessage = {
  role: "assistant",
  content: [],
};
```

### `models.OpenAIResponseInputMessageItem`

```typescript
const value: models.OpenAIResponseInputMessageItem = {
  id: "msg-abc123",
  role: "user",
  content: [
    {
      type: "input_text",
      text: "Hello, how are you?",
    },
  ],
};
```

### `models.OpenAIResponseFunctionToolCallOutput`

```typescript
const value: models.OpenAIResponseFunctionToolCallOutput = {
  type: "function_call_output",
  callId: "call-abc123",
  output: "{\"temperature\":72,\"conditions\":\"sunny\"}",
};
```

### `models.OpenAIResponseFunctionToolCall`

```typescript
const value: models.OpenAIResponseFunctionToolCall = {
  type: "function_call",
  callId: "call-abc123",
  name: "get_weather",
  arguments: "{\"location\":\"San Francisco\"}",
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

