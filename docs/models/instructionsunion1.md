# InstructionsUnion1


## Supported Types

### `models.InstructionsMessage1`

```typescript
const value: models.InstructionsMessage1 = {
  type: "message",
  role: "assistant",
  content: [],
};
```

### `models.InstructionsMessage2`

```typescript
const value: models.InstructionsMessage2 = {
  id: "<id>",
  type: "message",
  role: "system",
  content: [],
};
```

### `models.InstructionsFunctionCallOutput`

```typescript
const value: models.InstructionsFunctionCallOutput = {
  type: "function_call_output",
  id: "<id>",
  callId: "<id>",
  output: "<value>",
  status: "completed",
};
```

### `models.InstructionsFunctionCall`

```typescript
const value: models.InstructionsFunctionCall = {
  type: "function_call",
  callId: "<id>",
  name: "<value>",
  arguments: "<value>",
  id: "<id>",
  status: "completed",
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
  status: "completed",
  content: [
    {
      type: "output_text",
      text: "Hello! How can I help you today?",
      annotations: [
        {
          type: "file_citation",
          fileId: "file-abc123",
          filename: "research_paper.pdf",
          index: 0,
        },
      ],
    },
  ],
};
```

