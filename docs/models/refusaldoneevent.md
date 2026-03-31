# RefusalDoneEvent

Event emitted when refusal streaming is complete

## Example Usage

```typescript
import { RefusalDoneEvent } from "@openrouter/sdk/models";

let value: RefusalDoneEvent = {
  type: "response.refusal.done",
  outputIndex: 0,
  itemId: "item-1",
  contentIndex: 0,
  refusal: "I'm sorry, but I can't assist with that request.",
  sequenceNumber: 6,
};
```

## Fields

| Field                     | Type                      | Required                  | Description               |
| ------------------------- | ------------------------- | ------------------------- | ------------------------- |
| `type`                    | *"response.refusal.done"* | :heavy_check_mark:        | N/A                       |
| `outputIndex`             | *number*                  | :heavy_check_mark:        | N/A                       |
| `itemId`                  | *string*                  | :heavy_check_mark:        | N/A                       |
| `contentIndex`            | *number*                  | :heavy_check_mark:        | N/A                       |
| `refusal`                 | *string*                  | :heavy_check_mark:        | N/A                       |
| `sequenceNumber`          | *number*                  | :heavy_check_mark:        | N/A                       |