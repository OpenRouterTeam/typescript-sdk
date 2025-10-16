# OpenResponsesInputItem

An item in the input array for a response request


## Supported Types

### `models.OpenResponsesReasoning`

```typescript
const value: models.OpenResponsesReasoning = {
  type: "reasoning",
  id: "<id>",
  content: [
    {
      type: "reasoning_text",
      text: "<value>",
    },
  ],
  summary: [
    {
      type: "summary_text",
      text: "<value>",
    },
  ],
  encryptedContent: "<value>",
  signature: "<value>",
  format: "unknown",
};
```

### `models.OpenResponsesEasyInputMessage`

```typescript
const value: models.OpenResponsesEasyInputMessage = {
  type: "message",
  role: "user",
  content: "What is the weather today?",
};
```

### `models.OpenResponsesInputMessageItem`

```typescript
const value: models.OpenResponsesInputMessageItem = {
  id: "<id>",
  type: "message",
  role: "user",
  content: [
    {
      type: "input_image",
      detail: "low",
      imageUrl: "https://white-squid.biz",
    },
  ],
};
```

### `models.OpenResponsesFunctionToolCall`

```typescript
const value: models.OpenResponsesFunctionToolCall = {
  type: "function_call",
  callId: "<id>",
  name: "<value>",
  arguments: "<value>",
  id: "<id>",
  status: "completed",
};
```

### `models.OpenResponsesFunctionCallOutput`

```typescript
const value: models.OpenResponsesFunctionCallOutput = {
  type: "function_call_output",
  id: "<id>",
  callId: "<id>",
  output: "<value>",
  status: "completed",
};
```

### `models.OpenResponsesInputItemMessage`

```typescript
const value: models.OpenResponsesInputItemMessage = {
  id: "<id>",
  role: "assistant",
  type: "message",
  status: "incomplete",
  content: [
    {
      type: "refusal",
      refusal: "<value>",
    },
  ],
};
```

### `models.OpenResponsesInputItemReasoning`

```typescript
const value: models.OpenResponsesInputItemReasoning = {
  type: "reasoning",
  id: "<id>",
  content: [
    {
      type: "reasoning_text",
      text: "<value>",
    },
  ],
  summary: [
    {
      type: "summary_text",
      text: "<value>",
    },
  ],
  encryptedContent: "<value>",
};
```

### `models.OpenResponsesInputItemFunctionCall`

```typescript
const value: models.OpenResponsesInputItemFunctionCall = {
  type: "function_call",
  id: "<id>",
  name: "<value>",
  arguments: "<value>",
  callId: "<id>",
};
```

### `models.OpenResponsesInputItemWebSearchCall`

```typescript
const value: models.OpenResponsesInputItemWebSearchCall = {
  type: "web_search_call",
  id: "<id>",
  status: "failed",
};
```

### `models.OpenResponsesInputItemFileSearchCall`

```typescript
const value: models.OpenResponsesInputItemFileSearchCall = {
  type: "file_search_call",
  id: "<id>",
  queries: [],
  status: "completed",
};
```

### `models.OpenResponsesInputItemImageGenerationCall`

```typescript
const value: models.OpenResponsesInputItemImageGenerationCall = {
  type: "image_generation_call",
  id: "<id>",
  result: "<value>",
  status: "generating",
};
```

