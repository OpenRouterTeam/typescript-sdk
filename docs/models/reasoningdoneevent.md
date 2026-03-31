# ReasoningDoneEvent

Event emitted when reasoning text streaming is complete

## Example Usage

```typescript
import { ReasoningDoneEvent } from "@openrouter/sdk/models";

let value: ReasoningDoneEvent = {
  type: "response.reasoning_text.done",
  outputIndex: 0,
  itemId: "item-1",
  contentIndex: 0,
  text:
    "First, we need to identify the key components and then combine them logically.",
  sequenceNumber: 6,
};
```

## Fields

| Field                            | Type                             | Required                         | Description                      |
| -------------------------------- | -------------------------------- | -------------------------------- | -------------------------------- |
| `type`                           | *"response.reasoning_text.done"* | :heavy_check_mark:               | N/A                              |
| `outputIndex`                    | *number*                         | :heavy_check_mark:               | N/A                              |
| `itemId`                         | *string*                         | :heavy_check_mark:               | N/A                              |
| `contentIndex`                   | *number*                         | :heavy_check_mark:               | N/A                              |
| `text`                           | *string*                         | :heavy_check_mark:               | N/A                              |
| `sequenceNumber`                 | *number*                         | :heavy_check_mark:               | N/A                              |