# OutputApplyPatchServerToolItem

An openrouter:apply_patch server tool output item

## Example Usage

```typescript
import { OutputApplyPatchServerToolItem } from "@openrouter/sdk/models";

let value: OutputApplyPatchServerToolItem = {
  status: "completed",
  type: "openrouter:apply_patch",
};
```

## Fields

| Field                                                                                        | Type                                                                                         | Required                                                                                     | Description                                                                                  | Example                                                                                      |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `filePath`                                                                                   | *string*                                                                                     | :heavy_minus_sign:                                                                           | N/A                                                                                          |                                                                                              |
| `id`                                                                                         | *string*                                                                                     | :heavy_minus_sign:                                                                           | N/A                                                                                          |                                                                                              |
| `patch`                                                                                      | *string*                                                                                     | :heavy_minus_sign:                                                                           | N/A                                                                                          |                                                                                              |
| `status`                                                                                     | [models.ToolCallStatus](../models/toolcallstatus.md)                                         | :heavy_check_mark:                                                                           | N/A                                                                                          | completed                                                                                    |
| `type`                                                                                       | [models.OutputApplyPatchServerToolItemType](../models/outputapplypatchservertoolitemtype.md) | :heavy_check_mark:                                                                           | N/A                                                                                          |                                                                                              |