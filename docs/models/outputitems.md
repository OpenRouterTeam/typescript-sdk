# OutputItems

An output item from the response


## Supported Types

### `models.OutputCodeInterpreterCallItem`

```typescript
const value: models.OutputCodeInterpreterCallItem = {
  code: "print(\"hello\")",
  containerId: "ctr-xyz789",
  id: "ci-abc123",
  outputs: [
    {
      logs: "hello\n",
      type: "logs",
    },
  ],
  status: "completed",
  type: "code_interpreter_call",
};
```

### `models.OutputComputerCallItem`

```typescript
const value: models.OutputComputerCallItem = {
  callId: "call-abc123",
  pendingSafetyChecks: [],
  status: "completed",
  type: "computer_call",
};
```

### `models.OutputFileSearchCallItem`

```typescript
const value: models.OutputFileSearchCallItem = {
  id: "fs-abc123",
  queries: [
    "search term",
  ],
  status: "completed",
  type: "file_search_call",
};
```

### `models.OutputFunctionCallItem`

```typescript
const value: models.OutputFunctionCallItem = {
  arguments: "{\"location\":\"San Francisco\"}",
  callId: "call-abc123",
  name: "get_weather",
  type: "function_call",
};
```

### `models.OutputImageGenerationCallItem`

```typescript
const value: models.OutputImageGenerationCallItem = {
  id: "img-abc123",
  status: "completed",
  type: "image_generation_call",
};
```

### `models.OutputMessageItem`

```typescript
const value: models.OutputMessageItem = {
  content: [
    {
      text: "Hello! How can I help you today?",
      type: "output_text",
    },
  ],
  id: "msg-abc123",
  role: "assistant",
  type: "message",
};
```

### `models.OutputApplyPatchServerToolItem`

```typescript
const value: models.OutputApplyPatchServerToolItem = {
  status: "completed",
  type: "openrouter:apply_patch",
};
```

### `models.OutputBashServerToolItem`

```typescript
const value: models.OutputBashServerToolItem = {
  status: "completed",
  type: "openrouter:bash",
};
```

### `models.OutputBrowserUseServerToolItem`

```typescript
const value: models.OutputBrowserUseServerToolItem = {
  status: "completed",
  type: "openrouter:browser_use",
};
```

### `models.OutputCodeInterpreterServerToolItem`

```typescript
const value: models.OutputCodeInterpreterServerToolItem = {
  status: "completed",
  type: "openrouter:code_interpreter",
};
```

### `models.OutputDatetimeItem`

```typescript
const value: models.OutputDatetimeItem = {
  datetime: "2026-03-12T14:30:00.000Z",
  status: "completed",
  timezone: "UTC",
  type: "openrouter:datetime",
};
```

### `models.OutputSearchModelsServerToolItem`

```typescript
const value: models.OutputSearchModelsServerToolItem = {
  status: "completed",
  type: "openrouter:experimental__search_models",
};
```

### `models.OutputFileSearchServerToolItem`

```typescript
const value: models.OutputFileSearchServerToolItem = {
  status: "completed",
  type: "openrouter:file_search",
};
```

### `models.OutputImageGenerationServerToolItem`

```typescript
const value: models.OutputImageGenerationServerToolItem = {
  status: "completed",
  type: "openrouter:image_generation",
};
```

### `models.OutputMcpServerToolItem`

```typescript
const value: models.OutputMcpServerToolItem = {
  status: "completed",
  type: "openrouter:mcp",
};
```

### `models.OutputMemoryServerToolItem`

```typescript
const value: models.OutputMemoryServerToolItem = {
  status: "completed",
  type: "openrouter:memory",
};
```

### `models.OutputTextEditorServerToolItem`

```typescript
const value: models.OutputTextEditorServerToolItem = {
  status: "completed",
  type: "openrouter:text_editor",
};
```

### `models.OutputToolSearchServerToolItem`

```typescript
const value: models.OutputToolSearchServerToolItem = {
  status: "completed",
  type: "openrouter:tool_search",
};
```

### `models.OutputWebFetchServerToolItem`

```typescript
const value: models.OutputWebFetchServerToolItem = {
  status: "completed",
  type: "openrouter:web_fetch",
};
```

### `models.OutputWebSearchServerToolItem`

```typescript
const value: models.OutputWebSearchServerToolItem = {
  status: "completed",
  type: "openrouter:web_search",
};
```

### `models.OutputReasoningItem`

```typescript
const value: models.OutputReasoningItem = {
  id: "msg-abc123",
  summary: [
    {
      text: "Analyzed the problem using first principles",
      type: "summary_text",
    },
  ],
  type: "reasoning",
};
```

### `models.OutputWebSearchCallItem`

```typescript
const value: models.OutputWebSearchCallItem = {
  action: {
    pattern: "<value>",
    type: "find_in_page",
    url: "https://tragic-requirement.com/",
  },
  id: "ws-abc123",
  status: "completed",
  type: "web_search_call",
};
```

