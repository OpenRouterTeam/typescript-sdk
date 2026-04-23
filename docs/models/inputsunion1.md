# InputsUnion1


## Supported Types

### `models.ReasoningItem`

```typescript
const value: models.ReasoningItem = {
  id: "reasoning-abc123",
  summary: [
    {
      text: "Step by step analysis",
      type: "summary_text",
    },
  ],
  type: "reasoning",
};
```

### `models.EasyInputMessage`

```typescript
const value: models.EasyInputMessage = {
  role: "user",
};
```

### `models.InputMessageItem`

```typescript
const value: models.InputMessageItem = {
  role: "user",
};
```

### `models.FunctionCallItem`

```typescript
const value: models.FunctionCallItem = {
  arguments: "{\"location\":\"San Francisco\"}",
  callId: "call-abc123",
  id: "call-abc123",
  name: "get_weather",
  type: "function_call",
};
```

### `models.FunctionCallOutputItem`

```typescript
const value: models.FunctionCallOutputItem = {
  callId: "call-abc123",
  output: "{\"temperature\":72,\"conditions\":\"sunny\"}",
  type: "function_call_output",
};
```

### `models.InputsMessage`

```typescript
const value: models.InputsMessage = {
  content: [
    {
      text: "Hello! How can I help you?",
      type: "output_text",
    },
  ],
  id: "msg-123",
  role: "assistant",
  type: "message",
};
```

### `models.InputsReasoning`

```typescript
const value: models.InputsReasoning = {
  id: "reasoning-123",
  summary: [
    {
      text: "Analyzed the problem and found the optimal solution.",
      type: "summary_text",
    },
  ],
  type: "reasoning",
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

### `models.OutputImageGenerationCallItem`

```typescript
const value: models.OutputImageGenerationCallItem = {
  id: "img-abc123",
  status: "completed",
  type: "image_generation_call",
};
```

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

### `models.OutputDatetimeItem`

```typescript
const value: models.OutputDatetimeItem = {
  datetime: "2026-03-12T14:30:00.000Z",
  status: "completed",
  timezone: "UTC",
  type: "openrouter:datetime",
};
```

### `models.OutputWebSearchServerToolItem`

```typescript
const value: models.OutputWebSearchServerToolItem = {
  status: "completed",
  type: "openrouter:web_search",
};
```

### `models.OutputCodeInterpreterServerToolItem`

```typescript
const value: models.OutputCodeInterpreterServerToolItem = {
  status: "completed",
  type: "openrouter:code_interpreter",
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

### `models.OutputBrowserUseServerToolItem`

```typescript
const value: models.OutputBrowserUseServerToolItem = {
  status: "completed",
  type: "openrouter:browser_use",
};
```

### `models.OutputBashServerToolItem`

```typescript
const value: models.OutputBashServerToolItem = {
  status: "completed",
  type: "openrouter:bash",
};
```

### `models.OutputTextEditorServerToolItem`

```typescript
const value: models.OutputTextEditorServerToolItem = {
  status: "completed",
  type: "openrouter:text_editor",
};
```

### `models.OutputApplyPatchServerToolItem`

```typescript
const value: models.OutputApplyPatchServerToolItem = {
  status: "completed",
  type: "openrouter:apply_patch",
};
```

### `models.OutputWebFetchServerToolItem`

```typescript
const value: models.OutputWebFetchServerToolItem = {
  status: "completed",
  type: "openrouter:web_fetch",
};
```

### `models.OutputToolSearchServerToolItem`

```typescript
const value: models.OutputToolSearchServerToolItem = {
  status: "completed",
  type: "openrouter:tool_search",
};
```

### `models.OutputMemoryServerToolItem`

```typescript
const value: models.OutputMemoryServerToolItem = {
  status: "completed",
  type: "openrouter:memory",
};
```

### `models.OutputMcpServerToolItem`

```typescript
const value: models.OutputMcpServerToolItem = {
  status: "completed",
  type: "openrouter:mcp",
};
```

### `models.OutputSearchModelsServerToolItem`

```typescript
const value: models.OutputSearchModelsServerToolItem = {
  status: "completed",
  type: "openrouter:experimental__search_models",
};
```

