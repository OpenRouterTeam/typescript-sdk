# ReasoningSummaryPartAddedEvent

Event emitted when a reasoning summary part is added

## Example Usage

```typescript
import { ReasoningSummaryPartAddedEvent } from "@openrouter/sdk/models";

let value: ReasoningSummaryPartAddedEvent = {
  itemId: "<id>",
  outputIndex: 648271,
  part: {
    text: "Analyzed the problem using first principles",
    type: "summary_text",
  },
  sequenceNumber: 0,
  summaryIndex: 773896,
  type: "response.reasoning_summary_part.added",
};
```

## Fields

| Field                                                                             | Type                                                                              | Required                                                                          | Description                                                                       | Example                                                                           |
| --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `itemId`                                                                          | *string*                                                                          | :heavy_check_mark:                                                                | N/A                                                                               |                                                                                   |
| `outputIndex`                                                                     | *number*                                                                          | :heavy_check_mark:                                                                | N/A                                                                               |                                                                                   |
| `part`                                                                            | [models.ReasoningSummaryText](../models/reasoningsummarytext.md)                  | :heavy_check_mark:                                                                | N/A                                                                               | {<br/>"text": "Analyzed the problem using first principles",<br/>"type": "summary_text"<br/>} |
| `sequenceNumber`                                                                  | *number*                                                                          | :heavy_check_mark:                                                                | N/A                                                                               |                                                                                   |
| `summaryIndex`                                                                    | *number*                                                                          | :heavy_check_mark:                                                                | N/A                                                                               |                                                                                   |
| `type`                                                                            | *"response.reasoning_summary_part.added"*                                         | :heavy_check_mark:                                                                | N/A                                                                               |                                                                                   |