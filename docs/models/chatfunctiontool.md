# ChatFunctionTool

Tool definition for function calling (regular function or OpenRouter built-in server tool)


## Supported Types

### `models.ChatFunctionToolFunction`

```typescript
const value: models.ChatFunctionToolFunction = {
  function: {
    name: "get_weather",
  },
  type: "function",
};
```

### `models.AdvisorServerTool`

```typescript
const value: models.AdvisorServerTool = {
  parameters: {
    model: "anthropic/claude-opus-4-7",
  },
  type: "openrouter:advisor",
};
```

### `models.DatetimeServerTool`

```typescript
const value: models.DatetimeServerTool = {
  type: "openrouter:datetime",
};
```

### `models.ImageGenerationServerToolOpenRouter`

```typescript
const value: models.ImageGenerationServerToolOpenRouter = {
  type: "openrouter:image_generation",
};
```

### `models.ChatSearchModelsServerTool`

```typescript
const value: models.ChatSearchModelsServerTool = {
  type: "openrouter:experimental__search_models",
};
```

### `models.WebFetchServerTool`

```typescript
const value: models.WebFetchServerTool = {
  type: "openrouter:web_fetch",
};
```

### `models.OpenRouterWebSearchServerTool`

```typescript
const value: models.OpenRouterWebSearchServerTool = {
  type: "openrouter:web_search",
};
```

### `models.ChatWebSearchShorthand`

```typescript
const value: models.ChatWebSearchShorthand = {
  type: "web_search",
};
```

