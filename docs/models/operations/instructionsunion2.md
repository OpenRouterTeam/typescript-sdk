# InstructionsUnion2


## Supported Types

### `operations.InstructionsMessage1`

```typescript
const value: operations.InstructionsMessage1 = {
  role: "assistant",
  content: [],
};
```

### `operations.InstructionsMessage2`

```typescript
const value: operations.InstructionsMessage2 = {
  id: "<id>",
  role: "system",
  content: [],
};
```

### `operations.InstructionsFunctionCall1`

```typescript
const value: operations.InstructionsFunctionCall1 = {
  type: "function_call",
  callId: "<id>",
  name: "<value>",
  arguments: "<value>",
};
```

### `operations.InstructionsFunctionCallOutput`

```typescript
const value: operations.InstructionsFunctionCallOutput = {
  type: "function_call_output",
  id: "<id>",
  callId: "<id>",
  output: "<value>",
};
```

### `operations.InstructionsImageGenerationCall1`

```typescript
const value: operations.InstructionsImageGenerationCall1 = {
  type: "image_generation_call",
  id: "<id>",
  result: "<value>",
  status: "failed",
};
```

### `operations.InstructionsAssistant1`

```typescript
const value: operations.InstructionsAssistant1 = {
  type: "message",
  id: "<id>",
  status: "completed",
  role: "assistant",
  content: [],
};
```

### `operations.InstructionsUnion1`

```typescript
const value: operations.InstructionsUnion1 = {
  type: "message",
  id: "<id>",
  status: "incomplete",
  role: "assistant",
  content: [],
};
```

