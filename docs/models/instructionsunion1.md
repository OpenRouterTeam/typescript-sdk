# InstructionsUnion1


## Supported Types

### `models.InstructionsMessage1`

```typescript
const value: models.InstructionsMessage1 = {
  role: "assistant",
  content: [],
};
```

### `models.InstructionsMessage2`

```typescript
const value: models.InstructionsMessage2 = {
  id: "<id>",
  role: "system",
  content: [],
};
```

### `models.InstructionsFunctionCallOutput1`

```typescript
const value: models.InstructionsFunctionCallOutput1 = {
  type: "function_call_output",
  callId: "<id>",
  output: [],
};
```

### `models.InstructionsFunctionCall1`

```typescript
const value: models.InstructionsFunctionCall1 = {
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

