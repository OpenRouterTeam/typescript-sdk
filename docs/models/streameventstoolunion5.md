# StreamEventsToolUnion5


## Supported Types

### `models.StreamEventsToolFunction5`

```typescript
const value: models.StreamEventsToolFunction5 = {
  type: "function",
  name: "get_weather",
  parameters: {
    "type": "object",
    "properties": {
      "location": {
        "type": "string",
        "description": "The city and state",
      },
      "unit": {
        "type": "string",
        "enum": [
          "celsius",
          "fahrenheit",
        ],
        "x-speakeasy-unknown-values": "allow",
      },
    },
    "required": [
      "location",
    ],
  },
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
  type: "computer_use_preview",
  displayHeight: 768,
  displayWidth: 1024,
  environment: "linux",
};
```

### `models.CodeInterpreterServerTool`

```typescript
const value: models.CodeInterpreterServerTool = {
  type: "code_interpreter",
  container: "auto",
};
```

### `models.McpServerTool`

```typescript
const value: models.McpServerTool = {
  type: "mcp",
  serverLabel: "my-server",
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
  type: "custom",
  name: "my_tool",
};
```

