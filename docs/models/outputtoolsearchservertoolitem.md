# OutputToolSearchServerToolItem

An openrouter:tool_search server tool output item

## Example Usage

```typescript
import { OutputToolSearchServerToolItem } from "@openrouter/sdk/models";

let value: OutputToolSearchServerToolItem = {
  status: "completed",
  type: "openrouter:tool_search",
};
```

## Fields

| Field                                                                                        | Type                                                                                         | Required                                                                                     | Description                                                                                  | Example                                                                                      |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `id`                                                                                         | *string*                                                                                     | :heavy_minus_sign:                                                                           | N/A                                                                                          |                                                                                              |
| `query`                                                                                      | *string*                                                                                     | :heavy_minus_sign:                                                                           | N/A                                                                                          |                                                                                              |
| `status`                                                                                     | [models.ToolCallStatus](../models/toolcallstatus.md)                                         | :heavy_check_mark:                                                                           | N/A                                                                                          | completed                                                                                    |
| `type`                                                                                       | [models.OutputToolSearchServerToolItemType](../models/outputtoolsearchservertoolitemtype.md) | :heavy_check_mark:                                                                           | N/A                                                                                          |                                                                                              |