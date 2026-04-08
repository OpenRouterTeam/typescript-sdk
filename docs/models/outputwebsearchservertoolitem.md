# OutputWebSearchServerToolItem

An openrouter:web_search server tool output item

## Example Usage

```typescript
import { OutputWebSearchServerToolItem } from "@openrouter/sdk/models";

let value: OutputWebSearchServerToolItem = {
  type: "openrouter:web_search",
  status: "completed",
};
```

## Fields

| Field                                                                                      | Type                                                                                       | Required                                                                                   | Description                                                                                | Example                                                                                    |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `type`                                                                                     | [models.OutputWebSearchServerToolItemType](../models/outputwebsearchservertoolitemtype.md) | :heavy_check_mark:                                                                         | N/A                                                                                        |                                                                                            |
| `id`                                                                                       | *string*                                                                                   | :heavy_minus_sign:                                                                         | N/A                                                                                        |                                                                                            |
| `status`                                                                                   | [models.ToolCallStatus](../models/toolcallstatus.md)                                       | :heavy_check_mark:                                                                         | N/A                                                                                        | completed                                                                                  |
| `additionalProperties`                                                                     | Record<string, *any*>                                                                      | :heavy_minus_sign:                                                                         | N/A                                                                                        | {<br/>"type": "openrouter:web_search",<br/>"id": "ws_tmp_abc123",<br/>"status": "completed"<br/>} |