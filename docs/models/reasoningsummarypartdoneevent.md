# ReasoningSummaryPartDoneEvent

Event emitted when a reasoning summary part is complete

## Example Usage

```typescript
import { ReasoningSummaryPartDoneEvent } from "@openrouter/sdk/models";

let value: ReasoningSummaryPartDoneEvent = {
  type: "response.reasoning_summary_part.done",
  outputIndex: 6867.18,
  itemId: "<id>",
  summaryIndex: 4773.32,
  part: {
    type: "summary_text",
    text: "Analyzed the problem using first principles",
  },
  sequenceNumber: 0,
};
```

## Fields

| Field                                                                             | Type                                                                              | Required                                                                          | Description                                                                       | Example                                                                           |
| --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `type`                                                                            | *"response.reasoning_summary_part.done"*                                          | :heavy_check_mark:                                                                | N/A                                                                               |                                                                                   |
| `outputIndex`                                                                     | *number*                                                                          | :heavy_check_mark:                                                                | N/A                                                                               |                                                                                   |
| `itemId`                                                                          | *string*                                                                          | :heavy_check_mark:                                                                | N/A                                                                               |                                                                                   |
| `summaryIndex`                                                                    | *number*                                                                          | :heavy_check_mark:                                                                | N/A                                                                               |                                                                                   |
| `part`                                                                            | [models.ReasoningSummaryText](../models/reasoningsummarytext.md)                  | :heavy_check_mark:                                                                | N/A                                                                               | {<br/>"type": "summary_text",<br/>"text": "Analyzed the problem using first principles"<br/>} |
| `sequenceNumber`                                                                  | *number*                                                                          | :heavy_check_mark:                                                                | N/A                                                                               |                                                                                   |