# ItemReasoning2

## Example Usage

```typescript
import { ItemReasoning2 } from "@openrouter/sdk/models";

let value: ItemReasoning2 = {
  type: "reasoning",
  id: "<id>",
  summary: [
    {
      type: "summary_text",
      text: "<value>",
    },
  ],
};
```

## Fields

| Field                                                                              | Type                                                                               | Required                                                                           | Description                                                                        |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `type`                                                                             | [models.ItemTypeReasoning2](../models/itemtypereasoning2.md)                       | :heavy_check_mark:                                                                 | N/A                                                                                |
| `id`                                                                               | *string*                                                                           | :heavy_check_mark:                                                                 | N/A                                                                                |
| `summary`                                                                          | [models.ResponsesStreamChunkSummary2](../models/responsesstreamchunksummary2.md)[] | :heavy_check_mark:                                                                 | N/A                                                                                |