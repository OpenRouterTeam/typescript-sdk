# ResponsesStreamChunkResponseOutputItemDone

## Example Usage

```typescript
import { ResponsesStreamChunkResponseOutputItemDone } from "@openrouter/sdk/models";

let value: ResponsesStreamChunkResponseOutputItemDone = {
  type: "response.output_item.done",
  outputIndex: 9090.99,
  sequenceNumber: 395.41,
  item: {
    type: "function_call",
    id: "<id>",
    callId: "<id>",
    name: "<value>",
    arguments: "<value>",
  },
};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `type`                                                                       | [models.TypeResponseOutputItemDone](../models/typeresponseoutputitemdone.md) | :heavy_check_mark:                                                           | N/A                                                                          |
| `outputIndex`                                                                | *number*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `sequenceNumber`                                                             | *number*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `item`                                                                       | *models.ItemUnion1*                                                          | :heavy_check_mark:                                                           | N/A                                                                          |