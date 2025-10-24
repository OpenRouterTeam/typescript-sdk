# OpenResponsesReasoningSummaryTextDeltaEvent

Event emitted when reasoning summary text delta is streamed

## Example Usage

```typescript
import { OpenResponsesReasoningSummaryTextDeltaEvent } from "@openrouter/sdk/models";

let value: OpenResponsesReasoningSummaryTextDeltaEvent = {
  type: "response.reasoning_summary_text.delta",
  itemId: "item-1",
  outputIndex: 0,
  summaryIndex: 0,
  delta: "Analyzing",
  sequenceNumber: 4,
};
```

## Fields

| Field                                                                                                                  | Type                                                                                                                   | Required                                                                                                               | Description                                                                                                            |
| ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `type`                                                                                                                 | [models.OpenResponsesReasoningSummaryTextDeltaEventType](../models/openresponsesreasoningsummarytextdeltaeventtype.md) | :heavy_check_mark:                                                                                                     | N/A                                                                                                                    |
| `itemId`                                                                                                               | *string*                                                                                                               | :heavy_check_mark:                                                                                                     | N/A                                                                                                                    |
| `outputIndex`                                                                                                          | *number*                                                                                                               | :heavy_check_mark:                                                                                                     | N/A                                                                                                                    |
| `summaryIndex`                                                                                                         | *number*                                                                                                               | :heavy_check_mark:                                                                                                     | N/A                                                                                                                    |
| `delta`                                                                                                                | *string*                                                                                                               | :heavy_check_mark:                                                                                                     | N/A                                                                                                                    |
| `sequenceNumber`                                                                                                       | *number*                                                                                                               | :heavy_check_mark:                                                                                                     | N/A                                                                                                                    |