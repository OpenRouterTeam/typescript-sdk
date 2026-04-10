# OutputFileSearchServerToolItem

An openrouter:file_search server tool output item

## Example Usage

```typescript
import { OutputFileSearchServerToolItem } from "@openrouter/sdk/models";

let value: OutputFileSearchServerToolItem = {
  status: "completed",
  type: "openrouter:file_search",
};
```

## Fields

| Field                                                | Type                                                 | Required                                             | Description                                          | Example                                              |
| ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| `id`                                                 | *string*                                             | :heavy_minus_sign:                                   | N/A                                                  |                                                      |
| `queries`                                            | *string*[]                                           | :heavy_minus_sign:                                   | N/A                                                  |                                                      |
| `status`                                             | [models.ToolCallStatus](../models/toolcallstatus.md) | :heavy_check_mark:                                   | N/A                                                  | completed                                            |
| `type`                                               | *"openrouter:file_search"*                           | :heavy_check_mark:                                   | N/A                                                  |                                                      |