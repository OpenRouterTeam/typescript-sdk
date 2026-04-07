# ReasoningDeltaEvent

Event emitted when reasoning text delta is streamed

## Example Usage

```typescript
import { ReasoningDeltaEvent } from "@openrouter/sdk/models";

let value: ReasoningDeltaEvent = {
  type: "response.reasoning_text.delta",
  outputIndex: 744455,
  itemId: "<id>",
  contentIndex: 904446,
  delta: "<value>",
  sequenceNumber: 0,
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