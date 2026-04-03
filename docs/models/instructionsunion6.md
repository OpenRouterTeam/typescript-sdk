# InstructionsUnion6


## Supported Types

### `models.InstructionsMessage11`

```typescript
const value: models.InstructionsMessage11 = {
  role: "system",
  content: "<value>",
};
```

### `models.InstructionsMessage12`

```typescript
const value: models.InstructionsMessage12 = {
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

### `models.InstructionsFunctionCallOutput6`

```typescript
const value: models.InstructionsFunctionCallOutput6 = {
  type: "function_call_output",
  callId: "<id>",
  output: "<value>",
};
```

### `models.InstructionsFunctionCall6`

```typescript
const value: models.InstructionsFunctionCall6 = {
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

