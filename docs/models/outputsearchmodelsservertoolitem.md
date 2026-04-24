# OutputSearchModelsServerToolItem

An openrouter:experimental__search_models server tool output item

## Example Usage

```typescript
import { OutputSearchModelsServerToolItem } from "@openrouter/sdk/models";

let value: OutputSearchModelsServerToolItem = {
  status: "completed",
  type: "openrouter:experimental__search_models",
};
```

## Fields

| Field                                                                                            | Type                                                                                             | Required                                                                                         | Description                                                                                      | Example                                                                                          |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `arguments`                                                                                      | *string*                                                                                         | :heavy_minus_sign:                                                                               | The JSON arguments submitted to the search tool (e.g. {"query":"Claude"})                        |                                                                                                  |
| `id`                                                                                             | *string*                                                                                         | :heavy_minus_sign:                                                                               | N/A                                                                                              |                                                                                                  |
| `query`                                                                                          | *string*                                                                                         | :heavy_minus_sign:                                                                               | N/A                                                                                              |                                                                                                  |
| `status`                                                                                         | [models.ToolCallStatus](../models/toolcallstatus.md)                                             | :heavy_check_mark:                                                                               | N/A                                                                                              | completed                                                                                        |
| `type`                                                                                           | [models.OutputSearchModelsServerToolItemType](../models/outputsearchmodelsservertoolitemtype.md) | :heavy_check_mark:                                                                               | N/A                                                                                              |                                                                                                  |