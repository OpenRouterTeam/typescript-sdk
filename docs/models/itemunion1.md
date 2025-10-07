# ItemUnion1


## Supported Types

### `models.ItemAssistant`

```typescript
const value: models.ItemAssistant = {
  type: "message",
  id: "<id>",
  content: [
    {
      type: "output_text",
      text: "The weather today is sunny with a high of 75°F.",
      annotations: [],
    },
  ],
  role: "assistant",
  status: "completed",
};
```

### `models.ItemFunctionCall1`

```typescript
const value: models.ItemFunctionCall1 = {
  type: "function_call",
  id: "<id>",
  callId: "<id>",
  name: "<value>",
  arguments: "<value>",
};
```

### `models.ItemReasoning1`

```typescript
const value: models.ItemReasoning1 = {
  type: "reasoning",
  id: "<id>",
  summary: [],
  encryptedContent: "<value>",
};
```

### `models.ItemWebSearchCall1`

```typescript
const value: models.ItemWebSearchCall1 = {
  type: "web_search_call",
  id: "<id>",
  status: "failed",
};
```

### `models.ItemFileSearchCall`

```typescript
const value: models.ItemFileSearchCall = {
  type: "file_search_call",
  id: "<id>",
  queries: [
    "<value 1>",
    "<value 2>",
  ],
  status: "searching",
};
```

