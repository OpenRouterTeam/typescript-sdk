# OpenResponsesStreamEventResponseContentPartDone

Event emitted when a content part is complete

## Example Usage

```typescript
import { OpenResponsesStreamEventResponseContentPartDone } from "@openrouter/sdk/models";

let value: OpenResponsesStreamEventResponseContentPartDone = {
  type: "response.content_part.done",
  outputIndex: 0,
  itemId: "item-1",
  contentIndex: 0,
  part: {
    type: "output_text",
    text: "Hello! How can I help you?",
  },
  sequenceNumber: 7,
};
```

## Fields

| Field                                                                          | Type                                                                           | Required                                                                       | Description                                                                    |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `type`                                                                         | [models.TypeResponseContentPartDone](../models/typeresponsecontentpartdone.md) | :heavy_check_mark:                                                             | N/A                                                                            |
| `outputIndex`                                                                  | *number*                                                                       | :heavy_check_mark:                                                             | N/A                                                                            |
| `itemId`                                                                       | *string*                                                                       | :heavy_check_mark:                                                             | N/A                                                                            |
| `contentIndex`                                                                 | *number*                                                                       | :heavy_check_mark:                                                             | N/A                                                                            |
| `part`                                                                         | *models.Part2*                                                                 | :heavy_check_mark:                                                             | N/A                                                                            |
| `sequenceNumber`                                                               | *number*                                                                       | :heavy_check_mark:                                                             | N/A                                                                            |