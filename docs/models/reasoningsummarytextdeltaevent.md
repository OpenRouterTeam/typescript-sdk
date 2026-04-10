# ReasoningSummaryTextDeltaEvent

Event emitted when reasoning summary text delta is streamed

## Example Usage

```typescript
import { ReasoningSummaryTextDeltaEvent } from "@openrouter/sdk/models";

let value: ReasoningSummaryTextDeltaEvent = {
  delta: "<value>",
  itemId: "<id>",
  outputIndex: 326373,
  sequenceNumber: 0,
  summaryIndex: 214954,
  type: "response.reasoning_summary_text.delta",
};
```

## Fields

| Field                                     | Type                                      | Required                                  | Description                               |
| ----------------------------------------- | ----------------------------------------- | ----------------------------------------- | ----------------------------------------- |
| `delta`                                   | *string*                                  | :heavy_check_mark:                        | N/A                                       |
| `itemId`                                  | *string*                                  | :heavy_check_mark:                        | N/A                                       |
| `outputIndex`                             | *number*                                  | :heavy_check_mark:                        | N/A                                       |
| `sequenceNumber`                          | *number*                                  | :heavy_check_mark:                        | N/A                                       |
| `summaryIndex`                            | *number*                                  | :heavy_check_mark:                        | N/A                                       |
| `type`                                    | *"response.reasoning_summary_text.delta"* | :heavy_check_mark:                        | N/A                                       |