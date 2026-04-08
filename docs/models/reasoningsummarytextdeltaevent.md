# ReasoningSummaryTextDeltaEvent

Event emitted when reasoning summary text delta is streamed

## Example Usage

```typescript
import { ReasoningSummaryTextDeltaEvent } from "@openrouter/sdk/models";

let value: ReasoningSummaryTextDeltaEvent = {
  type: "response.reasoning_summary_text.delta",
  itemId: "<id>",
  outputIndex: 326373,
  summaryIndex: 214954,
  delta: "<value>",
  sequenceNumber: 0,
};
```

## Fields

| Field                                     | Type                                      | Required                                  | Description                               |
| ----------------------------------------- | ----------------------------------------- | ----------------------------------------- | ----------------------------------------- |
| `type`                                    | *"response.reasoning_summary_text.delta"* | :heavy_check_mark:                        | N/A                                       |
| `itemId`                                  | *string*                                  | :heavy_check_mark:                        | N/A                                       |
| `outputIndex`                             | *number*                                  | :heavy_check_mark:                        | N/A                                       |
| `summaryIndex`                            | *number*                                  | :heavy_check_mark:                        | N/A                                       |
| `delta`                                   | *string*                                  | :heavy_check_mark:                        | N/A                                       |
| `sequenceNumber`                          | *number*                                  | :heavy_check_mark:                        | N/A                                       |