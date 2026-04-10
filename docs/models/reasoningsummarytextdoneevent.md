# ReasoningSummaryTextDoneEvent

Event emitted when reasoning summary text streaming is complete

## Example Usage

```typescript
import { ReasoningSummaryTextDoneEvent } from "@openrouter/sdk/models";

let value: ReasoningSummaryTextDoneEvent = {
  itemId: "<id>",
  outputIndex: 239944,
  sequenceNumber: 0,
  summaryIndex: 543197,
  text: "<value>",
  type: "response.reasoning_summary_text.done",
};
```

## Fields

| Field                                    | Type                                     | Required                                 | Description                              |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| `itemId`                                 | *string*                                 | :heavy_check_mark:                       | N/A                                      |
| `outputIndex`                            | *number*                                 | :heavy_check_mark:                       | N/A                                      |
| `sequenceNumber`                         | *number*                                 | :heavy_check_mark:                       | N/A                                      |
| `summaryIndex`                           | *number*                                 | :heavy_check_mark:                       | N/A                                      |
| `text`                                   | *string*                                 | :heavy_check_mark:                       | N/A                                      |
| `type`                                   | *"response.reasoning_summary_text.done"* | :heavy_check_mark:                       | N/A                                      |