# TextDeltaEvent

Event emitted when a text delta is streamed

## Example Usage

```typescript
import { TextDeltaEvent } from "@openrouter/sdk/models";

let value: TextDeltaEvent = {
  type: "response.output_text.delta",
  logprobs: [
    {
      logprob: -0.1,
      token: "world",
    },
  ],
  outputIndex: 3910.56,
  itemId: "<id>",
  contentIndex: 7768.94,
  delta: "<value>",
  sequenceNumber: 0,
};
```

## Fields

| Field                                                                | Type                                                                 | Required                                                             | Description                                                          |
| -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `type`                                                               | *"response.output_text.delta"*                                       | :heavy_check_mark:                                                   | N/A                                                                  |
| `logprobs`                                                           | [models.TextDeltaEventLogprob](../models/textdeltaeventlogprob.md)[] | :heavy_check_mark:                                                   | N/A                                                                  |
| `outputIndex`                                                        | *number*                                                             | :heavy_check_mark:                                                   | N/A                                                                  |
| `itemId`                                                             | *string*                                                             | :heavy_check_mark:                                                   | N/A                                                                  |
| `contentIndex`                                                       | *number*                                                             | :heavy_check_mark:                                                   | N/A                                                                  |
| `delta`                                                              | *string*                                                             | :heavy_check_mark:                                                   | N/A                                                                  |
| `sequenceNumber`                                                     | *number*                                                             | :heavy_check_mark:                                                   | N/A                                                                  |