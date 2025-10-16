# OpenResponsesStreamEventResponseReasoningSummaryPartDone

Event emitted when a reasoning summary part is complete

## Example Usage

```typescript
import { OpenResponsesStreamEventResponseReasoningSummaryPartDone } from "@openrouter/sdk/models";

let value: OpenResponsesStreamEventResponseReasoningSummaryPartDone = {
  type: "response.reasoning_summary_part.done",
  outputIndex: 0,
  itemId: "item-1",
  summaryIndex: 0,
  part: {
    type: "summary_text",
    text: "Analyzing the problem step by step to find the optimal solution.",
  },
  sequenceNumber: 7,
};
```

## Fields

| Field                                                                                            | Type                                                                                             | Required                                                                                         | Description                                                                                      |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `type`                                                                                           | [models.TypeResponseReasoningSummaryPartDone](../models/typeresponsereasoningsummarypartdone.md) | :heavy_check_mark:                                                                               | N/A                                                                                              |
| `outputIndex`                                                                                    | *number*                                                                                         | :heavy_check_mark:                                                                               | N/A                                                                                              |
| `itemId`                                                                                         | *string*                                                                                         | :heavy_check_mark:                                                                               | N/A                                                                                              |
| `summaryIndex`                                                                                   | *number*                                                                                         | :heavy_check_mark:                                                                               | N/A                                                                                              |
| `part`                                                                                           | [models.ReasoningSummaryText](../models/reasoningsummarytext.md)                                 | :heavy_check_mark:                                                                               | N/A                                                                                              |
| `sequenceNumber`                                                                                 | *number*                                                                                         | :heavy_check_mark:                                                                               | N/A                                                                                              |