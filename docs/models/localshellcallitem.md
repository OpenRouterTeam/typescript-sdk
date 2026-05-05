# LocalShellCallItem

A local shell command execution call

## Example Usage

```typescript
import { LocalShellCallItem } from "@openrouter/sdk/models";

let value: LocalShellCallItem = {
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

## Fields

| Field                                                                    | Type                                                                     | Required                                                                 | Description                                                              | Example                                                                  |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `action`                                                                 | [models.LocalShellCallItemAction](../models/localshellcallitemaction.md) | :heavy_check_mark:                                                       | N/A                                                                      |                                                                          |
| `callId`                                                                 | *string*                                                                 | :heavy_check_mark:                                                       | N/A                                                                      |                                                                          |
| `id`                                                                     | *string*                                                                 | :heavy_check_mark:                                                       | N/A                                                                      |                                                                          |
| `status`                                                                 | [models.ToolCallStatus](../models/toolcallstatus.md)                     | :heavy_check_mark:                                                       | N/A                                                                      | completed                                                                |
| `type`                                                                   | [models.TypeLocalShellCall](../models/typelocalshellcall.md)             | :heavy_check_mark:                                                       | N/A                                                                      |                                                                          |