# OutputBashServerToolItem

An openrouter:bash server tool output item

## Example Usage

```typescript
import { OutputBashServerToolItem } from "@openrouter/sdk/models";

let value: OutputBashServerToolItem = {
  status: "completed",
  type: "openrouter:bash",
};
```

## Fields

| Field                                                | Type                                                 | Required                                             | Description                                          | Example                                              |
| ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| `command`                                            | *string*                                             | :heavy_minus_sign:                                   | N/A                                                  |                                                      |
| `exitCode`                                           | *number*                                             | :heavy_minus_sign:                                   | N/A                                                  |                                                      |
| `id`                                                 | *string*                                             | :heavy_minus_sign:                                   | N/A                                                  |                                                      |
| `status`                                             | [models.ToolCallStatus](../models/toolcallstatus.md) | :heavy_check_mark:                                   | N/A                                                  | completed                                            |
| `stderr`                                             | *string*                                             | :heavy_minus_sign:                                   | N/A                                                  |                                                      |
| `stdout`                                             | *string*                                             | :heavy_minus_sign:                                   | N/A                                                  |                                                      |
| `type`                                               | *"openrouter:bash"*                                  | :heavy_check_mark:                                   | N/A                                                  |                                                      |