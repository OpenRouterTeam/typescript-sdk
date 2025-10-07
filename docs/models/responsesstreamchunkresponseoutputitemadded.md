# ResponsesStreamChunkResponseOutputItemAdded

## Example Usage

```typescript
import { ResponsesStreamChunkResponseOutputItemAdded } from "@openrouter/sdk/models";

let value: ResponsesStreamChunkResponseOutputItemAdded = {
  type: "response.output_item.added",
  outputIndex: 3366.31,
  item: {
    type: "web_search_call",
    id: "<id>",
    status: "searching",
  },
};
```

## Fields

| Field                                                                          | Type                                                                           | Required                                                                       | Description                                                                    |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `type`                                                                         | [models.TypeResponseOutputItemAdded](../models/typeresponseoutputitemadded.md) | :heavy_check_mark:                                                             | N/A                                                                            |
| `outputIndex`                                                                  | *number*                                                                       | :heavy_check_mark:                                                             | N/A                                                                            |
| `item`                                                                         | *models.ItemUnion2*                                                            | :heavy_check_mark:                                                             | N/A                                                                            |