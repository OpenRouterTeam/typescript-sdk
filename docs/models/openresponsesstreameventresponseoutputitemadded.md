# OpenResponsesStreamEventResponseOutputItemAdded

Event emitted when a new output item is added to the response

## Example Usage

```typescript
import { OpenResponsesStreamEventResponseOutputItemAdded } from "@openrouter/sdk/models";

let value: OpenResponsesStreamEventResponseOutputItemAdded = {
  type: "response.output_item.added",
  outputIndex: 0,
  item: {
    id: "item-1",
    role: "assistant",
    type: "message",
    status: "in_progress",
    content: [],
  },
  sequenceNumber: 2,
};
```

## Fields

| Field                                                                          | Type                                                                           | Required                                                                       | Description                                                                    |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `type`                                                                         | [models.TypeResponseOutputItemAdded](../models/typeresponseoutputitemadded.md) | :heavy_check_mark:                                                             | N/A                                                                            |
| `outputIndex`                                                                  | *number*                                                                       | :heavy_check_mark:                                                             | N/A                                                                            |
| `item`                                                                         | *models.ResponsesOutputItem*                                                   | :heavy_check_mark:                                                             | An output item from the response                                               |
| `sequenceNumber`                                                               | *number*                                                                       | :heavy_check_mark:                                                             | N/A                                                                            |