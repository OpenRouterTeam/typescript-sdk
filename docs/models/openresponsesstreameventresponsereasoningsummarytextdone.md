# OpenResponsesStreamEventResponseReasoningSummaryTextDone

Event emitted when reasoning summary text streaming is complete

## Example Usage

```typescript
import { OpenResponsesStreamEventResponseReasoningSummaryTextDone } from "@openrouter/sdk/models";

let value: OpenResponsesStreamEventResponseReasoningSummaryTextDone = {
  type: "response.reasoning_summary_text.done",
  itemId: "item-1",
  outputIndex: 0,
  summaryIndex: 0,
  text: "Analyzing the problem step by step to find the optimal solution.",
  sequenceNumber: 6,
};
```

## Fields

| Field                                                                                            | Type                                                                                             | Required                                                                                         | Description                                                                                      |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `type`                                                                                           | [models.TypeResponseReasoningSummaryTextDone](../models/typeresponsereasoningsummarytextdone.md) | :heavy_check_mark:                                                                               | N/A                                                                                              |
| `itemId`                                                                                         | *string*                                                                                         | :heavy_check_mark:                                                                               | N/A                                                                                              |
| `outputIndex`                                                                                    | *number*                                                                                         | :heavy_check_mark:                                                                               | N/A                                                                                              |
| `summaryIndex`                                                                                   | *number*                                                                                         | :heavy_check_mark:                                                                               | N/A                                                                                              |
| `text`                                                                                           | *string*                                                                                         | :heavy_check_mark:                                                                               | N/A                                                                                              |
| `sequenceNumber`                                                                                 | *number*                                                                                         | :heavy_check_mark:                                                                               | N/A                                                                                              |