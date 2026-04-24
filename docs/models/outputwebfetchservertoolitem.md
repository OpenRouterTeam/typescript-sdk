# OutputWebFetchServerToolItem

An openrouter:web_fetch server tool output item

## Example Usage

```typescript
import { OutputWebFetchServerToolItem } from "@openrouter/sdk/models";

let value: OutputWebFetchServerToolItem = {
  status: "completed",
  type: "openrouter:web_fetch",
};
```

## Fields

| Field                                                                                    | Type                                                                                     | Required                                                                                 | Description                                                                              | Example                                                                                  |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `content`                                                                                | *string*                                                                                 | :heavy_minus_sign:                                                                       | N/A                                                                                      |                                                                                          |
| `id`                                                                                     | *string*                                                                                 | :heavy_minus_sign:                                                                       | N/A                                                                                      |                                                                                          |
| `status`                                                                                 | [models.ToolCallStatus](../models/toolcallstatus.md)                                     | :heavy_check_mark:                                                                       | N/A                                                                                      | completed                                                                                |
| `title`                                                                                  | *string*                                                                                 | :heavy_minus_sign:                                                                       | N/A                                                                                      |                                                                                          |
| `type`                                                                                   | [models.OutputWebFetchServerToolItemType](../models/outputwebfetchservertoolitemtype.md) | :heavy_check_mark:                                                                       | N/A                                                                                      |                                                                                          |
| `url`                                                                                    | *string*                                                                                 | :heavy_minus_sign:                                                                       | N/A                                                                                      |                                                                                          |