# StreamEventsResponseOutputItemDone

Event emitted when an output item is complete

## Example Usage

```typescript
import { StreamEventsResponseOutputItemDone } from "@openrouter/sdk/models";

let value: StreamEventsResponseOutputItemDone = {
  item: {
    content: [
      {
        text: "Hello! How can I help you today?",
        type: "output_text",
      },
    ],
    id: "msg-abc123",
    role: "assistant",
    type: "message",
  },
  outputIndex: 307595,
  sequenceNumber: 0,
  type: "response.output_item.done",
};
```

## Fields

| Field                                                                                                                                                                       | Type                                                                                                                                                                        | Required                                                                                                                                                                    | Description                                                                                                                                                                 | Example                                                                                                                                                                     |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `item`                                                                                                                                                                      | *models.OutputItems*                                                                                                                                                        | :heavy_check_mark:                                                                                                                                                          | An output item from the response                                                                                                                                            | {<br/>"content": [<br/>{<br/>"text": "Hello! How can I help you today?",<br/>"type": "output_text"<br/>}<br/>],<br/>"id": "msg-abc123",<br/>"role": "assistant",<br/>"status": "completed",<br/>"type": "message"<br/>} |
| `outputIndex`                                                                                                                                                               | *number*                                                                                                                                                                    | :heavy_check_mark:                                                                                                                                                          | N/A                                                                                                                                                                         |                                                                                                                                                                             |
| `sequenceNumber`                                                                                                                                                            | *number*                                                                                                                                                                    | :heavy_check_mark:                                                                                                                                                          | N/A                                                                                                                                                                         |                                                                                                                                                                             |
| `type`                                                                                                                                                                      | *"response.output_item.done"*                                                                                                                                               | :heavy_check_mark:                                                                                                                                                          | N/A                                                                                                                                                                         |                                                                                                                                                                             |