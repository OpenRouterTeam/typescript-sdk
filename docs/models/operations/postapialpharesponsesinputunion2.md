# PostApiAlphaResponsesInputUnion2


## Supported Types

### `operations.InputMessage1`

```typescript
const value: operations.InputMessage1 = {
  role: "system",
  content: "<value>",
};
```

### `operations.InputMessage2`

```typescript
const value: operations.InputMessage2 = {
  id: "<id>",
  role: "user",
  content: [],
};
```

### `operations.InputFunctionCall1`

```typescript
const value: operations.InputFunctionCall1 = {
  type: "function_call",
  callId: "<id>",
  name: "<value>",
  arguments: "<value>",
};
```

### `operations.InputFunctionCallOutput`

```typescript
const value: operations.InputFunctionCallOutput = {
  type: "function_call_output",
  id: "<id>",
  callId: "<id>",
  output: "<value>",
};
```

### `operations.InputImageGenerationCall1`

```typescript
const value: operations.InputImageGenerationCall1 = {
  type: "image_generation_call",
  id: "<id>",
  result: "<value>",
  status: "in_progress",
};
```

### `operations.InputAssistant1`

```typescript
const value: operations.InputAssistant1 = {
  type: "message",
  id: "<id>",
  status: "in_progress",
  role: "assistant",
  content: [],
};
```

### `operations.PostApiAlphaResponsesInputUnion3`

```typescript
const value: operations.PostApiAlphaResponsesInputUnion3 = {
  type: "file_search_call",
  id: "<id>",
  queries: [
    "<value 1>",
    "<value 2>",
    "<value 3>",
  ],
  status: "searching",
};
```

