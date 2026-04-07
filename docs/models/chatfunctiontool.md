# ChatFunctionTool

Tool definition for function calling (regular function or OpenRouter built-in server tool)


## Supported Types

### `models.ChatFunctionToolFunction`

```typescript
const value: models.ChatFunctionToolFunction = {
  type: "function",
  function: {
    name: "get_weather",
  },
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
  type: "experimental__search_models",
};
```

### `models.ChatWebSearchServerTool`

```typescript
const value: models.ChatWebSearchServerTool = {
  type: "openrouter:web_search",
};
```

### `models.ChatWebSearchShorthand`

```typescript
const value: models.ChatWebSearchShorthand = {
  type: "web_search",
};
```

