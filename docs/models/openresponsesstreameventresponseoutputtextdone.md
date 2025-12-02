# OpenResponsesStreamEventResponseOutputTextDone

Event emitted when text streaming is complete

## Example Usage

```typescript
import { OpenResponsesStreamEventResponseOutputTextDone } from "@openrouter/sdk/models";

let value: OpenResponsesStreamEventResponseOutputTextDone = {
  type: "response.output_text.done",
  outputIndex: 0,
  itemId: "item-1",
  contentIndex: 0,
  text: "Hello! How can I help you?",
  sequenceNumber: 6,
  logprobs: [],
};
```

## Fields

| Field                                                                | Type                                                                 | Required                                                             | Description                                                          |
| -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `type`                                                               | *"response.output_text.done"*                                        | :heavy_check_mark:                                                   | N/A                                                                  |
| `outputIndex`                                                        | *number*                                                             | :heavy_check_mark:                                                   | N/A                                                                  |
| `itemId`                                                             | *string*                                                             | :heavy_check_mark:                                                   | N/A                                                                  |
| `contentIndex`                                                       | *number*                                                             | :heavy_check_mark:                                                   | N/A                                                                  |
| `text`                                                               | *string*                                                             | :heavy_check_mark:                                                   | N/A                                                                  |
| `sequenceNumber`                                                     | *number*                                                             | :heavy_check_mark:                                                   | N/A                                                                  |
| `logprobs`                                                           | [models.OpenResponsesLogProbs](../models/openresponseslogprobs.md)[] | :heavy_check_mark:                                                   | N/A                                                                  |