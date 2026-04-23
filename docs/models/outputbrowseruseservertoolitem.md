# OutputBrowserUseServerToolItem

An openrouter:browser_use server tool output item

## Example Usage

```typescript
import { OutputBrowserUseServerToolItem } from "@openrouter/sdk/models";

let value: OutputBrowserUseServerToolItem = {
  status: "completed",
  type: "openrouter:browser_use",
};
```

## Fields

| Field                                                                                        | Type                                                                                         | Required                                                                                     | Description                                                                                  | Example                                                                                      |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `action`                                                                                     | *string*                                                                                     | :heavy_minus_sign:                                                                           | N/A                                                                                          |                                                                                              |
| `id`                                                                                         | *string*                                                                                     | :heavy_minus_sign:                                                                           | N/A                                                                                          |                                                                                              |
| `screenshotB64`                                                                              | *string*                                                                                     | :heavy_minus_sign:                                                                           | N/A                                                                                          |                                                                                              |
| `status`                                                                                     | [models.ToolCallStatus](../models/toolcallstatus.md)                                         | :heavy_check_mark:                                                                           | N/A                                                                                          | completed                                                                                    |
| `type`                                                                                       | [models.OutputBrowserUseServerToolItemType](../models/outputbrowseruseservertoolitemtype.md) | :heavy_check_mark:                                                                           | N/A                                                                                          |                                                                                              |