# RefusalDoneEvent

Event emitted when refusal streaming is complete

## Example Usage

```typescript
import { RefusalDoneEvent } from "@openrouter/sdk/models";

let value: RefusalDoneEvent = {
  type: "response.refusal.done",
  outputIndex: 8826.16,
  itemId: "<id>",
  contentIndex: 6410.81,
  refusal: "<value>",
  sequenceNumber: 0,
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