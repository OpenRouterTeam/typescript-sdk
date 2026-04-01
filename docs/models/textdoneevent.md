# TextDoneEvent

Event emitted when text streaming is complete

## Example Usage

```typescript
import { TextDoneEvent } from "@openrouter/sdk/models";

let value: TextDoneEvent = {
  type: "response.output_text.done",
  outputIndex: 5414.85,
  itemId: "<id>",
  contentIndex: 4977.34,
  text: "<value>",
  sequenceNumber: 0,
  logprobs: [
    {
      logprob: -0.1,
      token: "world",
    },
  ],
};
```

## Fields

| Field                                                              | Type                                                               | Required                                                           | Description                                                        |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `type`                                                             | *"response.output_text.done"*                                      | :heavy_check_mark:                                                 | N/A                                                                |
| `outputIndex`                                                      | *number*                                                           | :heavy_check_mark:                                                 | N/A                                                                |
| `itemId`                                                           | *string*                                                           | :heavy_check_mark:                                                 | N/A                                                                |
| `contentIndex`                                                     | *number*                                                           | :heavy_check_mark:                                                 | N/A                                                                |
| `text`                                                             | *string*                                                           | :heavy_check_mark:                                                 | N/A                                                                |
| `sequenceNumber`                                                   | *number*                                                           | :heavy_check_mark:                                                 | N/A                                                                |
| `logprobs`                                                         | [models.TextDoneEventLogprob](../models/textdoneeventlogprob.md)[] | :heavy_check_mark:                                                 | N/A                                                                |