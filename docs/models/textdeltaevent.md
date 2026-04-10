# TextDeltaEvent

Event emitted when a text delta is streamed

## Example Usage

```typescript
import { TextDeltaEvent } from "@openrouter/sdk/models";

let value: TextDeltaEvent = {
  contentIndex: 391056,
  delta: "<value>",
  itemId: "<id>",
  logprobs: [
    {
      logprob: -0.5,
      token: "Hello",
    },
  ],
  outputIndex: 776894,
  sequenceNumber: 0,
  type: "response.output_text.delta",
};
```

## Fields

| Field                                                | Type                                                 | Required                                             | Description                                          |
| ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| `contentIndex`                                       | *number*                                             | :heavy_check_mark:                                   | N/A                                                  |
| `delta`                                              | *string*                                             | :heavy_check_mark:                                   | N/A                                                  |
| `itemId`                                             | *string*                                             | :heavy_check_mark:                                   | N/A                                                  |
| `logprobs`                                           | [models.StreamLogprob](../models/streamlogprob.md)[] | :heavy_check_mark:                                   | N/A                                                  |
| `outputIndex`                                        | *number*                                             | :heavy_check_mark:                                   | N/A                                                  |
| `sequenceNumber`                                     | *number*                                             | :heavy_check_mark:                                   | N/A                                                  |
| `type`                                               | *"response.output_text.delta"*                       | :heavy_check_mark:                                   | N/A                                                  |