# OutputCodeInterpreterServerToolItem

An openrouter:code_interpreter server tool output item

## Example Usage

```typescript
import { OutputCodeInterpreterServerToolItem } from "@openrouter/sdk/models";

let value: OutputCodeInterpreterServerToolItem = {
  status: "completed",
  type: "openrouter:code_interpreter",
};
```

## Fields

| Field                                                | Type                                                 | Required                                             | Description                                          | Example                                              |
| ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| `code`                                               | *string*                                             | :heavy_minus_sign:                                   | N/A                                                  |                                                      |
| `exitCode`                                           | *number*                                             | :heavy_minus_sign:                                   | N/A                                                  |                                                      |
| `id`                                                 | *string*                                             | :heavy_minus_sign:                                   | N/A                                                  |                                                      |
| `language`                                           | *string*                                             | :heavy_minus_sign:                                   | N/A                                                  |                                                      |
| `status`                                             | [models.ToolCallStatus](../models/toolcallstatus.md) | :heavy_check_mark:                                   | N/A                                                  | completed                                            |
| `stderr`                                             | *string*                                             | :heavy_minus_sign:                                   | N/A                                                  |                                                      |
| `stdout`                                             | *string*                                             | :heavy_minus_sign:                                   | N/A                                                  |                                                      |
| `type`                                               | *"openrouter:code_interpreter"*                      | :heavy_check_mark:                                   | N/A                                                  |                                                      |