# OpenResponsesReasoningDeltaEvent

Event emitted when reasoning text delta is streamed

## Example Usage

```typescript
import { OpenResponsesReasoningDeltaEvent } from "@openrouter/sdk/models";

let value: OpenResponsesReasoningDeltaEvent = {
  type: "response.reasoning_text.delta",
  outputIndex: 0,
  itemId: "item-1",
  contentIndex: 0,
  delta: "First, we need",
  sequenceNumber: 4,
};
```

## Fields

| Field                             | Type                              | Required                          | Description                       |
| --------------------------------- | --------------------------------- | --------------------------------- | --------------------------------- |
| `type`                            | *"response.reasoning_text.delta"* | :heavy_check_mark:                | N/A                               |
| `outputIndex`                     | *number*                          | :heavy_check_mark:                | N/A                               |
| `itemId`                          | *string*                          | :heavy_check_mark:                | N/A                               |
| `contentIndex`                    | *number*                          | :heavy_check_mark:                | N/A                               |
| `delta`                           | *string*                          | :heavy_check_mark:                | N/A                               |
| `sequenceNumber`                  | *number*                          | :heavy_check_mark:                | N/A                               |