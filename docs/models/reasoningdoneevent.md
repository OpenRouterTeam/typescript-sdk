# ReasoningDoneEvent

Event emitted when reasoning text streaming is complete

## Example Usage

```typescript
import { ReasoningDoneEvent } from "@openrouter/sdk/models";

let value: ReasoningDoneEvent = {
  type: "response.reasoning_text.done",
  outputIndex: 789397,
  itemId: "<id>",
  contentIndex: 602802,
  text: "<value>",
  sequenceNumber: 0,
};
```

## Fields

| Field                            | Type                             | Required                         | Description                      |
| -------------------------------- | -------------------------------- | -------------------------------- | -------------------------------- |
| `type`                           | *"response.reasoning_text.done"* | :heavy_check_mark:               | N/A                              |
| `outputIndex`                    | *number*                         | :heavy_check_mark:               | N/A                              |
| `itemId`                         | *string*                         | :heavy_check_mark:               | N/A                              |
| `contentIndex`                   | *number*                         | :heavy_check_mark:               | N/A                              |
| `text`                           | *string*                         | :heavy_check_mark:               | N/A                              |
| `sequenceNumber`                 | *number*                         | :heavy_check_mark:               | N/A                              |