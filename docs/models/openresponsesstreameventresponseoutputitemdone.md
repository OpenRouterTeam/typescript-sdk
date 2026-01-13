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
    content: [
      {
        type: "output_text",
        text: "Hello! How can I help you?",
      },
    ],
  },
  sequenceNumber: 8,
};
```

## Fields

| Field                                                                                                                                                                       | Type                                                                                                                                                                        | Required                                                                                                                                                                    | Description                                                                                                                                                                 | Example                                                                                                                                                                     |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`                                                                                                                                                                      | *"response.output_item.done"*                                                                                                                                               | :heavy_check_mark:                                                                                                                                                          | N/A                                                                                                                                                                         |                                                                                                                                                                             |
| `outputIndex`                                                                                                                                                               | *number*                                                                                                                                                                    | :heavy_check_mark:                                                                                                                                                          | N/A                                                                                                                                                                         |                                                                                                                                                                             |
| `item`                                                                                                                                                                      | *models.ResponsesOutputItem*                                                                                                                                                | :heavy_check_mark:                                                                                                                                                          | An output item from the response                                                                                                                                            | {<br/>"id": "msg-abc123",<br/>"role": "assistant",<br/>"type": "message",<br/>"status": "completed",<br/>"content": [<br/>{<br/>"type": "output_text",<br/>"text": "Hello! How can I help you today?"<br/>}<br/>]<br/>} |
| `sequenceNumber`                                                                                                                                                            | *number*                                                                                                                                                                    | :heavy_check_mark:                                                                                                                                                          | N/A                                                                                                                                                                         |                                                                                                                                                                             |