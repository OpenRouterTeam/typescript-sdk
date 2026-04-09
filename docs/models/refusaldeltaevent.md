# RefusalDeltaEvent

Event emitted when a refusal delta is streamed

## Example Usage

```typescript
import { RefusalDeltaEvent } from "@openrouter/sdk/models";

let value: RefusalDeltaEvent = {
  contentIndex: 217319,
  delta: "<value>",
  itemId: "<id>",
  outputIndex: 604749,
  sequenceNumber: 0,
  type: "response.refusal.delta",
};
```

## Fields

| Field                      | Type                       | Required                   | Description                |
| -------------------------- | -------------------------- | -------------------------- | -------------------------- |
| `contentIndex`             | *number*                   | :heavy_check_mark:         | N/A                        |
| `delta`                    | *string*                   | :heavy_check_mark:         | N/A                        |
| `itemId`                   | *string*                   | :heavy_check_mark:         | N/A                        |
| `outputIndex`              | *number*                   | :heavy_check_mark:         | N/A                        |
| `sequenceNumber`           | *number*                   | :heavy_check_mark:         | N/A                        |
| `type`                     | *"response.refusal.delta"* | :heavy_check_mark:         | N/A                        |