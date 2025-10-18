# OpenResponsesStreamEventResponseReasoningTextDone

Event emitted when reasoning text streaming is complete

## Example Usage

```typescript
import { OpenResponsesStreamEventResponseReasoningTextDone } from "@openrouter/sdk/models";

let value: OpenResponsesStreamEventResponseReasoningTextDone = {
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

| Field                                                                              | Type                                                                               | Required                                                                           | Description                                                                        |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `type`                                                                             | [models.TypeResponseReasoningTextDone](../models/typeresponsereasoningtextdone.md) | :heavy_check_mark:                                                                 | N/A                                                                                |
| `outputIndex`                                                                      | *number*                                                                           | :heavy_check_mark:                                                                 | N/A                                                                                |
| `itemId`                                                                           | *string*                                                                           | :heavy_check_mark:                                                                 | N/A                                                                                |
| `contentIndex`                                                                     | *number*                                                                           | :heavy_check_mark:                                                                 | N/A                                                                                |
| `text`                                                                             | *string*                                                                           | :heavy_check_mark:                                                                 | N/A                                                                                |
| `sequenceNumber`                                                                   | *number*                                                                           | :heavy_check_mark:                                                                 | N/A                                                                                |