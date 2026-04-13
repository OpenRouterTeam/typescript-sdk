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

### `models.DatetimeServerTool`

```typescript
const value: models.DatetimeServerTool = {
  type: "openrouter:datetime",
};
```

### `models.ChatSearchModelsServerTool`

```typescript
const value: models.ChatSearchModelsServerTool = {
  type: "openrouter:experimental__search_models",
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

