# StreamEventsResponseOutputItemAdded

Event emitted when a new output item is added to the response

## Example Usage

```typescript
import { StreamEventsResponseOutputItemAdded } from "@openrouter/sdk/models";

let value: StreamEventsResponseOutputItemAdded = {
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
  outputIndex: 253212,
  sequenceNumber: 0,
  type: "response.output_item.added",
};
```

## Fields

| Field                                                                                                                                                                       | Type                                                                                                                                                                        | Required                                                                                                                                                                    | Description                                                                                                                                                                 | Example                                                                                                                                                                     |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `item`                                                                                                                                                                      | *models.OutputItems*                                                                                                                                                        | :heavy_check_mark:                                                                                                                                                          | An output item from the response                                                                                                                                            | {<br/>"content": [<br/>{<br/>"text": "Hello! How can I help you today?",<br/>"type": "output_text"<br/>}<br/>],<br/>"id": "msg-abc123",<br/>"role": "assistant",<br/>"status": "completed",<br/>"type": "message"<br/>} |
| `outputIndex`                                                                                                                                                               | *number*                                                                                                                                                                    | :heavy_check_mark:                                                                                                                                                          | N/A                                                                                                                                                                         |                                                                                                                                                                             |
| `sequenceNumber`                                                                                                                                                            | *number*                                                                                                                                                                    | :heavy_check_mark:                                                                                                                                                          | N/A                                                                                                                                                                         |                                                                                                                                                                             |
| `type`                                                                                                                                                                      | *"response.output_item.added"*                                                                                                                                              | :heavy_check_mark:                                                                                                                                                          | N/A                                                                                                                                                                         |                                                                                                                                                                             |