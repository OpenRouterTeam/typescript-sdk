# ReasoningDeltaEvent

Event emitted when reasoning text delta is streamed

## Example Usage

```typescript
import { ReasoningDeltaEvent } from "@openrouter/sdk/models";

let value: ReasoningDeltaEvent = {
  contentIndex: 744455,
  delta: "<value>",
  itemId: "<id>",
  outputIndex: 904446,
  sequenceNumber: 0,
  type: "response.reasoning_text.delta",
};
```

## Fields

| Field                             | Type                              | Required                          | Description                       |
| --------------------------------- | --------------------------------- | --------------------------------- | --------------------------------- |
| `contentIndex`                    | *number*                          | :heavy_check_mark:                | N/A                               |
| `delta`                           | *string*                          | :heavy_check_mark:                | N/A                               |
| `itemId`                          | *string*                          | :heavy_check_mark:                | N/A                               |
| `outputIndex`                     | *number*                          | :heavy_check_mark:                | N/A                               |
| `sequenceNumber`                  | *number*                          | :heavy_check_mark:                | N/A                               |
| `type`                            | *"response.reasoning_text.delta"* | :heavy_check_mark:                | N/A                               |