# InstructionsUnion8


## Supported Types

### `models.InstructionsMessage15`

```typescript
const value: models.InstructionsMessage15 = {
  role: "assistant",
  content: "<value>",
};
```

### `models.InstructionsMessage16`

```typescript
const value: models.InstructionsMessage16 = {
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

### `models.InstructionsFunctionCallOutput8`

```typescript
const value: models.InstructionsFunctionCallOutput8 = {
  type: "function_call_output",
  callId: "<id>",
  output: [
    {
      type: "input_text",
      text: "Hello, how can I help you?",
    },
  ],
};
```

### `models.InstructionsFunctionCall8`

```typescript
const value: models.InstructionsFunctionCall8 = {
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

