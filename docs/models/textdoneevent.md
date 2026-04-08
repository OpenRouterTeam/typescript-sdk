# TextDoneEvent

Event emitted when text streaming is complete

## Example Usage

```typescript
import { TextDoneEvent } from "@openrouter/sdk/models";

let value: TextDoneEvent = {
  contentIndex: 541485,
  itemId: "<id>",
  logprobs: [
    {
      logprob: -0.5,
      token: "Hello",
    },
  ],
  outputIndex: 497734,
  sequenceNumber: 0,
  text: "<value>",
  type: "response.output_text.done",
};
```

## Fields

| Field                                                | Type                                                 | Required                                             | Description                                          |
| ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| `contentIndex`                                       | *number*                                             | :heavy_check_mark:                                   | N/A                                                  |
| `itemId`                                             | *string*                                             | :heavy_check_mark:                                   | N/A                                                  |
| `logprobs`                                           | [models.StreamLogprob](../models/streamlogprob.md)[] | :heavy_check_mark:                                   | N/A                                                  |
| `outputIndex`                                        | *number*                                             | :heavy_check_mark:                                   | N/A                                                  |
| `sequenceNumber`                                     | *number*                                             | :heavy_check_mark:                                   | N/A                                                  |
| `text`                                               | *string*                                             | :heavy_check_mark:                                   | N/A                                                  |
| `type`                                               | *"response.output_text.done"*                        | :heavy_check_mark:                                   | N/A                                                  |