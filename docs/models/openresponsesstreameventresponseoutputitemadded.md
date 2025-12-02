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
    content: [],
  },
  sequenceNumber: 2,
};
```

## Fields

| Field                                                                                                                                                                       | Type                                                                                                                                                                        | Required                                                                                                                                                                    | Description                                                                                                                                                                 | Example                                                                                                                                                                     |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`                                                                                                                                                                      | *"response.output_item.added"*                                                                                                                                              | :heavy_check_mark:                                                                                                                                                          | N/A                                                                                                                                                                         |                                                                                                                                                                             |
| `outputIndex`                                                                                                                                                               | *number*                                                                                                                                                                    | :heavy_check_mark:                                                                                                                                                          | N/A                                                                                                                                                                         |                                                                                                                                                                             |
| `item`                                                                                                                                                                      | *models.ResponsesOutputItem*                                                                                                                                                | :heavy_check_mark:                                                                                                                                                          | An output item from the response                                                                                                                                            | {<br/>"id": "msg-abc123",<br/>"role": "assistant",<br/>"type": "message",<br/>"status": "completed",<br/>"content": [<br/>{<br/>"type": "output_text",<br/>"text": "Hello! How can I help you today?"<br/>}<br/>]<br/>} |
| `sequenceNumber`                                                                                                                                                            | *number*                                                                                                                                                                    | :heavy_check_mark:                                                                                                                                                          | N/A                                                                                                                                                                         |                                                                                                                                                                             |