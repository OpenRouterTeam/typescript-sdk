# ReasoningDoneEvent

Event emitted when reasoning text streaming is complete

## Example Usage

```typescript
import { ReasoningDoneEvent } from "@openrouter/sdk/models";

let value: ReasoningDoneEvent = {
  contentIndex: 789397,
  itemId: "<id>",
  outputIndex: 602802,
  sequenceNumber: 0,
  text: "<value>",
  type: "response.reasoning_text.done",
};
```

## Fields

| Field                            | Type                             | Required                         | Description                      |
| -------------------------------- | -------------------------------- | -------------------------------- | -------------------------------- |
| `contentIndex`                   | *number*                         | :heavy_check_mark:               | N/A                              |
| `itemId`                         | *string*                         | :heavy_check_mark:               | N/A                              |
| `outputIndex`                    | *number*                         | :heavy_check_mark:               | N/A                              |
| `sequenceNumber`                 | *number*                         | :heavy_check_mark:               | N/A                              |
| `text`                           | *string*                         | :heavy_check_mark:               | N/A                              |
| `type`                           | *"response.reasoning_text.done"* | :heavy_check_mark:               | N/A                              |