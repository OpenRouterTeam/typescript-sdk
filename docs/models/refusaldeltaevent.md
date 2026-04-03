# RefusalDeltaEvent

Event emitted when a refusal delta is streamed

## Example Usage

```typescript
import { RefusalDeltaEvent } from "@openrouter/sdk/models";

let value: RefusalDeltaEvent = {
  type: "response.refusal.delta",
  outputIndex: 217319,
  itemId: "<id>",
  contentIndex: 604749,
  delta: "<value>",
  sequenceNumber: 0,
};
```

## Fields

| Field                      | Type                       | Required                   | Description                |
| -------------------------- | -------------------------- | -------------------------- | -------------------------- |
| `type`                     | *"response.refusal.delta"* | :heavy_check_mark:         | N/A                        |
| `outputIndex`              | *number*                   | :heavy_check_mark:         | N/A                        |
| `itemId`                   | *string*                   | :heavy_check_mark:         | N/A                        |
| `contentIndex`             | *number*                   | :heavy_check_mark:         | N/A                        |
| `delta`                    | *string*                   | :heavy_check_mark:         | N/A                        |
| `sequenceNumber`           | *number*                   | :heavy_check_mark:         | N/A                        |