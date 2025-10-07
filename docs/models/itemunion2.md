# ItemUnion2


## Supported Types

### `models.ItemMessage`

```typescript
const value: models.ItemMessage = {
  type: "message",
};
```

### `models.ItemFunctionCall2`

```typescript
const value: models.ItemFunctionCall2 = {
  type: "function_call",
  id: "<id>",
  callId: "<id>",
  name: "<value>",
  arguments: "<value>",
};
```

### `models.ItemReasoning2`

```typescript
const value: models.ItemReasoning2 = {
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

### `models.ItemImageGenerationCall`

```typescript
const value: models.ItemImageGenerationCall = {
  type: "image_generation_call",
  id: "<id>",
  status: "in_progress",
};
```

### `models.ItemWebSearchCall2`

```typescript
const value: models.ItemWebSearchCall2 = {
  type: "web_search_call",
  id: "<id>",
  status: "in_progress",
};
```

