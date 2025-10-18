# OpenResponsesStreamEventResponseReasoningSummaryPartAdded

Event emitted when a reasoning summary part is added

## Example Usage

```typescript
import { OpenResponsesStreamEventResponseReasoningSummaryPartAdded } from "@openrouter/sdk/models";

let value: OpenResponsesStreamEventResponseReasoningSummaryPartAdded = {
  type: "response.reasoning_summary_part.added",
  outputIndex: 0,
  itemId: "item-1",
  summaryIndex: 0,
  part: {
    type: "summary_text",
    text: "",
  },
  sequenceNumber: 3,
};
```

## Fields

| Field                                                                                              | Type                                                                                               | Required                                                                                           | Description                                                                                        | Example                                                                                            |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `type`                                                                                             | [models.TypeResponseReasoningSummaryPartAdded](../models/typeresponsereasoningsummarypartadded.md) | :heavy_check_mark:                                                                                 | N/A                                                                                                |                                                                                                    |
| `outputIndex`                                                                                      | *number*                                                                                           | :heavy_check_mark:                                                                                 | N/A                                                                                                |                                                                                                    |
| `itemId`                                                                                           | *string*                                                                                           | :heavy_check_mark:                                                                                 | N/A                                                                                                |                                                                                                    |
| `summaryIndex`                                                                                     | *number*                                                                                           | :heavy_check_mark:                                                                                 | N/A                                                                                                |                                                                                                    |
| `part`                                                                                             | [models.ReasoningSummaryText](../models/reasoningsummarytext.md)                                   | :heavy_check_mark:                                                                                 | N/A                                                                                                | {<br/>"type": "summary_text",<br/>"text": "Analyzed the problem using first principles"<br/>}      |
| `sequenceNumber`                                                                                   | *number*                                                                                           | :heavy_check_mark:                                                                                 | N/A                                                                                                |                                                                                                    |