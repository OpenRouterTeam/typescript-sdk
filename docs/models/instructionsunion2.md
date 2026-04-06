# InstructionsUnion2


## Supported Types

### `models.InstructionsMessage3`

```typescript
const value: models.InstructionsMessage3 = {
  role: "system",
  content: [],
};
```

### `models.InstructionsMessage4`

```typescript
const value: models.InstructionsMessage4 = {
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

### `models.InstructionsFunctionCallOutput2`

```typescript
const value: models.InstructionsFunctionCallOutput2 = {
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

### `models.InstructionsFunctionCall2`

```typescript
const value: models.InstructionsFunctionCall2 = {
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

