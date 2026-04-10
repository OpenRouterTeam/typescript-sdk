# OutputCodeInterpreterCallItem

A code interpreter execution call with outputs

## Example Usage

```typescript
import { OutputCodeInterpreterCallItem } from "@openrouter/sdk/models";

let value: OutputCodeInterpreterCallItem = {
  code: "<value>",
  containerId: "<id>",
  id: "msg-abc123",
  outputs: [
    {
      type: "image",
      url: "https://dead-encouragement.com",
    },
  ],
  status: "completed",
  type: "code_interpreter_call",
};
```

## Fields

| Field                                                | Type                                                 | Required                                             | Description                                          | Example                                              |
| ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| `code`                                               | *string*                                             | :heavy_check_mark:                                   | N/A                                                  |                                                      |
| `containerId`                                        | *string*                                             | :heavy_check_mark:                                   | N/A                                                  |                                                      |
| `id`                                                 | *string*                                             | :heavy_check_mark:                                   | N/A                                                  |                                                      |
| `outputs`                                            | *models.OutputCodeInterpreterCallItemOutputUnion*[]  | :heavy_check_mark:                                   | N/A                                                  |                                                      |
| `status`                                             | [models.ToolCallStatus](../models/toolcallstatus.md) | :heavy_check_mark:                                   | N/A                                                  | completed                                            |
| `type`                                               | *"code_interpreter_call"*                            | :heavy_check_mark:                                   | N/A                                                  |                                                      |