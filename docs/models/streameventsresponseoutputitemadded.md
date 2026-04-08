# StreamEventsResponseOutputItemAdded

Event emitted when a new output item is added to the response

## Example Usage

```typescript
import { StreamEventsResponseOutputItemAdded } from "@openrouter/sdk/models";

let value: StreamEventsResponseOutputItemAdded = {
  type: "response.output_item.added",
  outputIndex: 253212,
  item: {
    id: "msg-abc123",
    role: "assistant",
    type: "message",
    content: [
      {
        type: "output_text",
        text: "Hello! How can I help you today?",
      },
    ],
  },
  sequenceNumber: 0,
};
```

## Fields

| Field                                                                                                                                                                       | Type                                                                                                                                                                        | Required                                                                                                                                                                    | Description                                                                                                                                                                 | Example                                                                                                                                                                     |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`                                                                                                                                                                      | *"response.output_item.added"*                                                                                                                                              | :heavy_check_mark:                                                                                                                                                          | N/A                                                                                                                                                                         |                                                                                                                                                                             |
| `outputIndex`                                                                                                                                                               | *number*                                                                                                                                                                    | :heavy_check_mark:                                                                                                                                                          | N/A                                                                                                                                                                         |                                                                                                                                                                             |
| `item`                                                                                                                                                                      | *models.OutputItems*                                                                                                                                                        | :heavy_check_mark:                                                                                                                                                          | An output item from the response                                                                                                                                            | {<br/>"id": "msg-abc123",<br/>"role": "assistant",<br/>"type": "message",<br/>"status": "completed",<br/>"content": [<br/>{<br/>"type": "output_text",<br/>"text": "Hello! How can I help you today?"<br/>}<br/>]<br/>} |
| `sequenceNumber`                                                                                                                                                            | *number*                                                                                                                                                                    | :heavy_check_mark:                                                                                                                                                          | N/A                                                                                                                                                                         |                                                                                                                                                                             |