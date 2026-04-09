# OutputMcpServerToolItem

An openrouter:mcp server tool output item

## Example Usage

```typescript
import { OutputMcpServerToolItem } from "@openrouter/sdk/models";

let value: OutputMcpServerToolItem = {
  status: "completed",
  type: "openrouter:mcp",
};
```

## Fields

| Field                                                | Type                                                 | Required                                             | Description                                          | Example                                              |
| ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| `id`                                                 | *string*                                             | :heavy_minus_sign:                                   | N/A                                                  |                                                      |
| `serverLabel`                                        | *string*                                             | :heavy_minus_sign:                                   | N/A                                                  |                                                      |
| `status`                                             | [models.ToolCallStatus](../models/toolcallstatus.md) | :heavy_check_mark:                                   | N/A                                                  | completed                                            |
| `toolName`                                           | *string*                                             | :heavy_minus_sign:                                   | N/A                                                  |                                                      |
| `type`                                               | *"openrouter:mcp"*                                   | :heavy_check_mark:                                   | N/A                                                  |                                                      |