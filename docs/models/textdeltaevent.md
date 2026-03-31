# TextDeltaEvent

Event emitted when a text delta is streamed

## Example Usage

```typescript
import { TextDeltaEvent } from "@openrouter/sdk/models";

let value: TextDeltaEvent = {
  type: "response.output_text.delta",
  logprobs: [],
  outputIndex: 0,
  itemId: "item-1",
  contentIndex: 0,
  delta: "Hello",
  sequenceNumber: 4,
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