# OutputShellCallOutputItem

A native `shell_call_output` item matching OpenAI's Responses API shape. Carries per-command stdout, stderr, and the exit/timeout outcome.

## Example Usage

```typescript
import { OutputShellCallOutputItem } from "@openrouter/sdk/models";

let value: OutputShellCallOutputItem = {
  callId: "<id>",
  id: "msg-abc123",
  output: [],
  status: "completed",
  type: "shell_call_output",
};
```

## Fields

| Field                                                                                    | Type                                                                                     | Required                                                                                 | Description                                                                              | Example                                                                                  |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `callId`                                                                                 | *string*                                                                                 | :heavy_check_mark:                                                                       | N/A                                                                                      |                                                                                          |
| `id`                                                                                     | *string*                                                                                 | :heavy_check_mark:                                                                       | N/A                                                                                      |                                                                                          |
| `maxOutputLength`                                                                        | *number*                                                                                 | :heavy_minus_sign:                                                                       | N/A                                                                                      |                                                                                          |
| `output`                                                                                 | [models.OutputShellCallOutputItemOutput](../models/outputshellcalloutputitemoutput.md)[] | :heavy_check_mark:                                                                       | N/A                                                                                      |                                                                                          |
| `status`                                                                                 | [models.ShellCallStatus](../models/shellcallstatus.md)                                   | :heavy_check_mark:                                                                       | Status of a shell call or its output.                                                    | completed                                                                                |
| `type`                                                                                   | *"shell_call_output"*                                                                    | :heavy_check_mark:                                                                       | N/A                                                                                      |                                                                                          |