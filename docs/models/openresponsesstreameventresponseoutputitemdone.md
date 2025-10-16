# OpenResponsesStreamEventResponseOutputItemDone

Event emitted when an output item is complete

## Example Usage

```typescript
import { OpenResponsesStreamEventResponseOutputItemDone } from "@openrouter/sdk/models";

let value: OpenResponsesStreamEventResponseOutputItemDone = {
  type: "response.output_item.done",
  outputIndex: 0,
  item: {
    id: "item-1",
    role: "assistant",
    type: "message",
    status: "completed",
    content: [
      {
        type: "output_text",
        text: "Hello! How can I help you?",
        annotations: [],
      },
    ],
  },
  sequenceNumber: 8,
};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `type`                                                                       | [models.TypeResponseOutputItemDone](../models/typeresponseoutputitemdone.md) | :heavy_check_mark:                                                           | N/A                                                                          |
| `outputIndex`                                                                | *number*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `item`                                                                       | *models.ResponsesOutputItem*                                                 | :heavy_check_mark:                                                           | An output item from the response                                             |
| `sequenceNumber`                                                             | *number*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |