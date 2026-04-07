# InstructionsUnion9


## Supported Types

### `models.InstructionsMessage17`

```typescript
const value: models.InstructionsMessage17 = {
  role: "system",
  content: [
    {
      type: "input_text",
      text: "Hello, how can I help you?",
    },
  ],
};
```

### `models.InstructionsMessage18`

```typescript
const value: models.InstructionsMessage18 = {
  id: "<id>",
  role: "developer",
  content: [],
};
```

### `models.InstructionsFunctionCallOutput9`

```typescript
const value: models.InstructionsFunctionCallOutput9 = {
  type: "function_call_output",
  callId: "<id>",
  output: [],
};
```

### `models.InstructionsFunctionCall9`

```typescript
const value: models.InstructionsFunctionCall9 = {
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

