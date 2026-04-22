# OutputSubagentServerToolItem

An openrouter:subagent server tool output item

## Example Usage

```typescript
import { OutputSubagentServerToolItem } from "@openrouter/sdk/models";

let value: OutputSubagentServerToolItem = {
  status: "completed",
  type: "openrouter:subagent",
};
```

## Fields

| Field                                                | Type                                                 | Required                                             | Description                                          | Example                                              |
| ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| `id`                                                 | *string*                                             | :heavy_minus_sign:                                   | N/A                                                  |                                                      |
| `model`                                              | *string*                                             | :heavy_minus_sign:                                   | The model used by the subagent                       |                                                      |
| `response`                                           | *string*                                             | :heavy_minus_sign:                                   | The text response from the subagent                  |                                                      |
| `status`                                             | [models.ToolCallStatus](../models/toolcallstatus.md) | :heavy_check_mark:                                   | N/A                                                  | completed                                            |
| `type`                                               | *"openrouter:subagent"*                              | :heavy_check_mark:                                   | N/A                                                  |                                                      |