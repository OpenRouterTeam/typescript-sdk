# BaseInputsUnion1


## Supported Types

### `models.BaseInputsMessage1`

```typescript
const value: models.BaseInputsMessage1 = {
  role: "user",
  content: "<value>",
};
```

### `models.BaseInputsMessage2`

```typescript
const value: models.BaseInputsMessage2 = {
  id: "<id>",
  role: "system",
  content: [
    {
      type: "input_text",
      text: "Hello, how can I help you?",
    },
  ],
};
```

### `models.BaseInputsFunctionCallOutput`

```typescript
const value: models.BaseInputsFunctionCallOutput = {
  type: "function_call_output",
  callId: "<id>",
  output: "<value>",
};
```

### `models.BaseInputsFunctionCall`

```typescript
const value: models.BaseInputsFunctionCall = {
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

