# InstructionsUnion1


## Supported Types

### `operations.InstructionsAssistant2`

```typescript
const value: operations.InstructionsAssistant2 = {
  type: "message",
  id: "<id>",
  status: "incomplete",
  role: "assistant",
  content: [],
};
```

### `operations.InstructionsReasoning`

```typescript
const value: operations.InstructionsReasoning = {
  type: "reasoning",
  id: "<id>",
  summary: [
    {
      type: "summary_text",
      text: "<value>",
    },
  ],
};
```

### `operations.InstructionsFunctionCall2`

```typescript
const value: operations.InstructionsFunctionCall2 = {
  type: "function_call",
  name: "<value>",
  arguments: "<value>",
  callId: "<id>",
};
```

### `operations.InstructionsWebSearchCall`

```typescript
const value: operations.InstructionsWebSearchCall = {
  type: "web_search_call",
  id: "<id>",
  status: "completed",
};
```

### `operations.InstructionsFileSearchCall`

```typescript
const value: operations.InstructionsFileSearchCall = {
  type: "file_search_call",
  id: "<id>",
  queries: [],
  status: "in_progress",
};
```

### `operations.InstructionsImageGenerationCall2`

```typescript
const value: operations.InstructionsImageGenerationCall2 = {
  type: "image_generation_call",
  id: "<id>",
  result: "<value>",
  status: "completed",
};
```

