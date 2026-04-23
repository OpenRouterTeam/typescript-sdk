# OutputCodeInterpreterCallItem

A code interpreter execution call with outputs

## Example Usage

```typescript
import { OutputCodeInterpreterCallItem } from "@openrouter/sdk/models";

let value: OutputCodeInterpreterCallItem = {
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

## Fields

| Field                                                                  | Type                                                                   | Required                                                               | Description                                                            | Example                                                                |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `code`                                                                 | *string*                                                               | :heavy_check_mark:                                                     | N/A                                                                    |                                                                        |
| `containerId`                                                          | *string*                                                               | :heavy_check_mark:                                                     | N/A                                                                    |                                                                        |
| `id`                                                                   | *string*                                                               | :heavy_check_mark:                                                     | N/A                                                                    |                                                                        |
| `outputs`                                                              | *models.OutputCodeInterpreterCallItemOutputUnion*[]                    | :heavy_check_mark:                                                     | N/A                                                                    |                                                                        |
| `status`                                                               | [models.ToolCallStatus](../models/toolcallstatus.md)                   | :heavy_check_mark:                                                     | N/A                                                                    | completed                                                              |
| `type`                                                                 | [models.TypeCodeInterpreterCall](../models/typecodeinterpretercall.md) | :heavy_check_mark:                                                     | N/A                                                                    |                                                                        |