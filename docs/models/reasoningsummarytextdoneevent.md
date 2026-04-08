# ReasoningSummaryTextDoneEvent

Event emitted when reasoning summary text streaming is complete

## Example Usage

```typescript
import { ReasoningSummaryTextDoneEvent } from "@openrouter/sdk/models";

let value: ReasoningSummaryTextDoneEvent = {
  type: "response.reasoning_summary_text.done",
  itemId: "<id>",
  outputIndex: 239944,
  summaryIndex: 543197,
  text: "<value>",
  sequenceNumber: 0,
};
```

## Fields

| Field                                    | Type                                     | Required                                 | Description                              |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| `type`                                   | *"response.reasoning_summary_text.done"* | :heavy_check_mark:                       | N/A                                      |
| `itemId`                                 | *string*                                 | :heavy_check_mark:                       | N/A                                      |
| `outputIndex`                            | *number*                                 | :heavy_check_mark:                       | N/A                                      |
| `summaryIndex`                           | *number*                                 | :heavy_check_mark:                       | N/A                                      |
| `text`                                   | *string*                                 | :heavy_check_mark:                       | N/A                                      |
| `sequenceNumber`                         | *number*                                 | :heavy_check_mark:                       | N/A                                      |