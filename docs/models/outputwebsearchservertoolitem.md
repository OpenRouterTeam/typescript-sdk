# OutputWebSearchServerToolItem

An openrouter:web_search server tool output item

## Example Usage

```typescript
import { OutputWebSearchServerToolItem } from "@openrouter/sdk/models";

let value: OutputWebSearchServerToolItem = {
  status: "completed",
  type: "openrouter:web_search",
};
```

## Fields

| Field                                                                                      | Type                                                                                       | Required                                                                                   | Description                                                                                | Example                                                                                    |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `id`                                                                                       | *string*                                                                                   | :heavy_minus_sign:                                                                         | N/A                                                                                        |                                                                                            |
| `status`                                                                                   | [models.ToolCallStatus](../models/toolcallstatus.md)                                       | :heavy_check_mark:                                                                         | N/A                                                                                        | completed                                                                                  |
| `type`                                                                                     | [models.OutputWebSearchServerToolItemType](../models/outputwebsearchservertoolitemtype.md) | :heavy_check_mark:                                                                         | N/A                                                                                        |                                                                                            |