# ItemReasoning1

## Example Usage

```typescript
import { ItemReasoning1 } from "@openrouter/sdk/models";

let value: ItemReasoning1 = {
  type: "reasoning",
  id: "<id>",
  summary: [],
  encryptedContent: "<value>",
};
```

## Fields

| Field                                                                              | Type                                                                               | Required                                                                           | Description                                                                        |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `type`                                                                             | [models.ItemTypeReasoning1](../models/itemtypereasoning1.md)                       | :heavy_check_mark:                                                                 | N/A                                                                                |
| `id`                                                                               | *string*                                                                           | :heavy_check_mark:                                                                 | N/A                                                                                |
| `summary`                                                                          | [models.ResponsesStreamChunkSummary1](../models/responsesstreamchunksummary1.md)[] | :heavy_check_mark:                                                                 | N/A                                                                                |
| `encryptedContent`                                                                 | *string*                                                                           | :heavy_minus_sign:                                                                 | N/A                                                                                |