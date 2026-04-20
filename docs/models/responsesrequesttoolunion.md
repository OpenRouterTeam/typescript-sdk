# ResponsesRequestToolUnion


## Supported Types

### `models.ResponsesRequestToolFunction`

```typescript
const value: models.ResponsesRequestToolFunction = {
  name: "get_weather",
  parameters: {
    "properties": {
      "location": {
        "description": "The city and state",
        "type": "string",
      },
      "unit": {
        "enum": [
          "celsius",
          "fahrenheit",
        ],
        "type": "string",
        "x-speakeasy-unknown-values": "allow",
      },
    },
    "required": [
      "location",
    ],
    "type": "object",
  },
  type: "function",
};
```

### `models.PreviewWebSearchServerTool`

```typescript
const value: models.PreviewWebSearchServerTool = {
  type: "web_search_preview",
};
```

### `models.Preview20250311WebSearchServerTool`

```typescript
const value: models.Preview20250311WebSearchServerTool = {
  type: "web_search_preview_2025_03_11",
};
```

### `models.LegacyWebSearchServerTool`

```typescript
const value: models.LegacyWebSearchServerTool = {
  type: "web_search",
};
```

### `models.WebSearchServerTool`

```typescript
const value: models.WebSearchServerTool = {
  type: "web_search_2025_08_26",
};
```

### `models.FileSearchServerTool`

```typescript
const value: models.FileSearchServerTool = {
  type: "file_search",
  vectorStoreIds: [
    "vs_abc123",
  ],
};
```

### `models.ComputerUseServerTool`

```typescript
const value: models.ComputerUseServerTool = {
  displayHeight: 768,
  displayWidth: 1024,
  environment: "linux",
  type: "computer_use_preview",
};
```

### `models.CodeInterpreterServerTool`

```typescript
const value: models.CodeInterpreterServerTool = {
  container: "auto",
  type: "code_interpreter",
};
```

### `models.McpServerTool`

```typescript
const value: models.McpServerTool = {
  serverLabel: "my-server",
  type: "mcp",
};
```

### `models.ImageGenerationServerTool`

```typescript
const value: models.ImageGenerationServerTool = {
  type: "image_generation",
};
```

### `models.CodexLocalShellTool`

```typescript
const value: models.CodexLocalShellTool = {
  type: "local_shell",
};
```

### `models.ShellServerTool`

```typescript
const value: models.ShellServerTool = {
  type: "shell",
};
```

### `models.ApplyPatchServerTool`

```typescript
const value: models.ApplyPatchServerTool = {
  type: "apply_patch",
};
```

### `models.CustomTool`

```typescript
const value: models.CustomTool = {
  name: "my_tool",
  type: "custom",
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

### `models.WebSearchServerToolOpenRouter`

```typescript
const value: models.WebSearchServerToolOpenRouter = {
  type: "openrouter:web_search",
};
```

### `models.WebFetchServerToolOpenRouter`

```typescript
const value: models.WebFetchServerToolOpenRouter = {
  type: "openrouter:web_fetch",
};
```

