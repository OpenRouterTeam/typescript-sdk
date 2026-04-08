# InstructionsUnion4


## Supported Types

### `models.InstructionsMessage7`

```typescript
const value: models.InstructionsMessage7 = {
  role: "user",
  content: "<value>",
};
```

### `models.InstructionsMessage8`

```typescript
const value: models.InstructionsMessage8 = {
  id: "<id>",
  role: "developer",
  content: [
    {
      type: "input_text",
      text: "Hello, how can I help you?",
    },
  ],
};
```

### `models.InstructionsFunctionCallOutput4`

```typescript
const value: models.InstructionsFunctionCallOutput4 = {
  type: "function_call_output",
  callId: "<id>",
  output: "<value>",
};
```

### `models.InstructionsFunctionCall4`

```typescript
const value: models.InstructionsFunctionCall4 = {
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

