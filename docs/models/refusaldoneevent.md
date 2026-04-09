# RefusalDoneEvent

Event emitted when refusal streaming is complete

## Example Usage

```typescript
import { RefusalDoneEvent } from "@openrouter/sdk/models";

let value: RefusalDoneEvent = {
  contentIndex: 882616,
  itemId: "<id>",
  outputIndex: 641081,
  refusal: "<value>",
  sequenceNumber: 0,
  type: "response.refusal.done",
};
```

## Fields

| Field                     | Type                      | Required                  | Description               |
| ------------------------- | ------------------------- | ------------------------- | ------------------------- |
| `contentIndex`            | *number*                  | :heavy_check_mark:        | N/A                       |
| `itemId`                  | *string*                  | :heavy_check_mark:        | N/A                       |
| `outputIndex`             | *number*                  | :heavy_check_mark:        | N/A                       |
| `refusal`                 | *string*                  | :heavy_check_mark:        | N/A                       |
| `sequenceNumber`          | *number*                  | :heavy_check_mark:        | N/A                       |
| `type`                    | *"response.refusal.done"* | :heavy_check_mark:        | N/A                       |