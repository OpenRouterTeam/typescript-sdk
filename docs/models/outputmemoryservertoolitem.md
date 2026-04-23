# OutputMemoryServerToolItem

An openrouter:memory server tool output item

## Example Usage

```typescript
import { OutputMemoryServerToolItem } from "@openrouter/sdk/models";

let value: OutputMemoryServerToolItem = {
  status: "completed",
  type: "openrouter:memory",
};
```

## Fields

| Field                                                                                | Type                                                                                 | Required                                                                             | Description                                                                          | Example                                                                              |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `action`                                                                             | [models.ActionEnum](../models/actionenum.md)                                         | :heavy_minus_sign:                                                                   | N/A                                                                                  |                                                                                      |
| `id`                                                                                 | *string*                                                                             | :heavy_minus_sign:                                                                   | N/A                                                                                  |                                                                                      |
| `key`                                                                                | *string*                                                                             | :heavy_minus_sign:                                                                   | N/A                                                                                  |                                                                                      |
| `status`                                                                             | [models.ToolCallStatus](../models/toolcallstatus.md)                                 | :heavy_check_mark:                                                                   | N/A                                                                                  | completed                                                                            |
| `type`                                                                               | [models.OutputMemoryServerToolItemType](../models/outputmemoryservertoolitemtype.md) | :heavy_check_mark:                                                                   | N/A                                                                                  |                                                                                      |
| `value`                                                                              | *any*                                                                                | :heavy_minus_sign:                                                                   | N/A                                                                                  |                                                                                      |