# OpenResponsesNonStreamingResponseToolUnion


## Supported Types

### `models.OpenResponsesNonStreamingResponseToolFunction`

```typescript
const value: models.OpenResponsesNonStreamingResponseToolFunction = {
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

### `models.OpenResponsesWebSearchPreviewTool`

```typescript
const value: models.OpenResponsesWebSearchPreviewTool = {
  type: "web_search_preview",
};
```

### `models.OpenResponsesWebSearchPreview20250311Tool`

```typescript
const value: models.OpenResponsesWebSearchPreview20250311Tool = {
  type: "web_search_preview_2025_03_11",
};
```

### `models.OpenResponsesWebSearchTool`

```typescript
const value: models.OpenResponsesWebSearchTool = {
  type: "web_search",
};
```

### `models.OpenResponsesWebSearch20250826Tool`

```typescript
const value: models.OpenResponsesWebSearch20250826Tool = {
  type: "web_search_2025_08_26",
};
```

### `models.OpenResponsesFileSearchTool`

```typescript
const value: models.OpenResponsesFileSearchTool = {
  type: "file_search",
  vectorStoreIds: [
    "vs_abc123",
  ],
};
```

### `models.OpenResponsesComputerTool`

```typescript
const value: models.OpenResponsesComputerTool = {
  type: "computer_use_preview",
  displayHeight: 768,
  displayWidth: 1024,
  environment: "linux",
};
```

### `models.OpenResponsesCodeInterpreterTool`

```typescript
const value: models.OpenResponsesCodeInterpreterTool = {
  type: "code_interpreter",
  container: "auto",
};
```

### `models.OpenResponsesMcpTool`

```typescript
const value: models.OpenResponsesMcpTool = {
  type: "mcp",
  serverLabel: "my-server",
};
```

### `models.OpenResponsesImageGenerationTool`

```typescript
const value: models.OpenResponsesImageGenerationTool = {
  type: "image_generation",
};
```

### `models.OpenResponsesLocalShellTool`

```typescript
const value: models.OpenResponsesLocalShellTool = {
  type: "local_shell",
};
```

### `models.OpenResponsesFunctionShellTool`

```typescript
const value: models.OpenResponsesFunctionShellTool = {
  type: "shell",
};
```

### `models.OpenResponsesApplyPatchTool`

```typescript
const value: models.OpenResponsesApplyPatchTool = {
  type: "apply_patch",
};
```

### `models.OpenResponsesCustomTool`

```typescript
const value: models.OpenResponsesCustomTool = {
  type: "custom",
  name: "my_tool",
};
```

