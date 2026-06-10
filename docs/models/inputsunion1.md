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

### `models.ApplyPatchCallItem`

```typescript
const value: models.ApplyPatchCallItem = {
  callId: "call_abc123",
  operation: {
    diff: "@@ function main() {\n+  console.log(\"hi\");\n }",
    path: "/src/main.ts",
    type: "update_file",
  },
  status: "completed",
  type: "apply_patch_call",
};
```

### `models.ApplyPatchCallOutputItem`

```typescript
const value: models.ApplyPatchCallOutputItem = {
  callId: "call_abc123",
  status: "completed",
  type: "apply_patch_call_output",
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

### `models.OutputCustomToolCallItem`

```typescript
const value: models.OutputCustomToolCallItem = {
  callId: "call-abc123",
  input: "*** Begin Patch\n*** End Patch",
  name: "apply_patch",
  type: "custom_tool_call",
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

### `models.LocalShellCallItem`

```typescript
const value: models.LocalShellCallItem = {
  action: {
    command: [
      "ls",
      "-la",
    ],
    env: {
      "PATH": "/usr/bin",
    },
    type: "exec",
  },
  callId: "call-abc123",
  id: "shell-abc123",
  status: "completed",
  type: "local_shell_call",
};
```

### `models.LocalShellCallOutputItem`

```typescript
const value: models.LocalShellCallOutputItem = {
  id: "output-abc123",
  output: "total 24\ndrwxr-xr-x  5 user  staff  160 Jan  1 12:00 .",
  type: "local_shell_call_output",
};
```

### `models.ShellCallItem`

```typescript
const value: models.ShellCallItem = {
  action: {
    commands: [
      "ls",
      "-la",
    ],
  },
  callId: "call-abc123",
  type: "shell_call",
};
```

### `models.ShellCallOutputItem`

```typescript
const value: models.ShellCallOutputItem = {
  callId: "call-abc123",
  output: [
    {
      type: "stdout",
    },
  ],
  type: "shell_call_output",
};
```

### `models.McpListToolsItem`

```typescript
const value: models.McpListToolsItem = {
  id: "mcp-list-abc123",
  serverLabel: "database-server",
  tools: [
    {
      inputSchema: {
        "properties": {
          "query": {
            "type": "string",
          },
        },
        "type": "object",
      },
      name: "query_database",
    },
  ],
  type: "mcp_list_tools",
};
```

### `models.McpApprovalRequestItem`

```typescript
const value: models.McpApprovalRequestItem = {
  arguments: "{\"id\":\"123\"}",
  id: "approval-abc123",
  name: "delete_record",
  serverLabel: "database-server",
  type: "mcp_approval_request",
};
```

### `models.McpApprovalResponseItem`

```typescript
const value: models.McpApprovalResponseItem = {
  approvalRequestId: "approval-abc123",
  approve: true,
  type: "mcp_approval_response",
};
```

### `models.McpCallItem`

```typescript
const value: models.McpCallItem = {
  arguments: "{\"query\":\"SELECT * FROM users\"}",
  id: "mcp-call-abc123",
  name: "query_database",
  serverLabel: "database-server",
  type: "mcp_call",
};
```

### `models.CustomToolCallItem`

```typescript
const value: models.CustomToolCallItem = {
  callId: "call-abc123",
  input: "*** Begin Patch\n*** End Patch",
  name: "apply_patch",
  type: "custom_tool_call",
};
```

### `models.CustomToolCallOutputItem`

```typescript
const value: models.CustomToolCallOutputItem = {
  callId: "call-abc123",
  output: "patch applied successfully",
  type: "custom_tool_call_output",
};
```

### `models.CompactionItem`

```typescript
const value: models.CompactionItem = {
  encryptedContent: "enc_abc123...",
  type: "compaction",
};
```

### `models.ItemReferenceItem`

```typescript
const value: models.ItemReferenceItem = {
  id: "msg-abc123",
  type: "item_reference",
};
```

