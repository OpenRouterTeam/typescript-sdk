# InstructionsUnion10


## Supported Types

### `models.InstructionsMessage19`

```typescript
const value: models.InstructionsMessage19 = {
  role: "system",
  content: "<value>",
};
```

### `models.InstructionsMessage20`

```typescript
const value: models.InstructionsMessage20 = {
  id: "<id>",
  role: "developer",
  content: [],
};
```

### `models.InstructionsFunctionCallOutput10`

```typescript
const value: models.InstructionsFunctionCallOutput10 = {
  type: "function_call_output",
  callId: "<id>",
  output: "<value>",
};
```

### `models.InstructionsFunctionCall10`

```typescript
const value: models.InstructionsFunctionCall10 = {
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

