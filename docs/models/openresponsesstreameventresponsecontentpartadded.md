# OpenResponsesStreamEventResponseContentPartAdded

Event emitted when a new content part is added to an output item

## Example Usage

```typescript
import { OpenResponsesStreamEventResponseContentPartAdded } from "@openrouter/sdk/models";

let value: OpenResponsesStreamEventResponseContentPartAdded = {
  type: "response.content_part.added",
  outputIndex: 0,
  itemId: "item-1",
  contentIndex: 0,
  part: {
    type: "output_text",
    text: "",
  },
  sequenceNumber: 3,
};
```

## Fields

| Field                                                                            | Type                                                                             | Required                                                                         | Description                                                                      |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `type`                                                                           | [models.TypeResponseContentPartAdded](../models/typeresponsecontentpartadded.md) | :heavy_check_mark:                                                               | N/A                                                                              |
| `outputIndex`                                                                    | *number*                                                                         | :heavy_check_mark:                                                               | N/A                                                                              |
| `itemId`                                                                         | *string*                                                                         | :heavy_check_mark:                                                               | N/A                                                                              |
| `contentIndex`                                                                   | *number*                                                                         | :heavy_check_mark:                                                               | N/A                                                                              |
| `part`                                                                           | *models.Part1*                                                                   | :heavy_check_mark:                                                               | N/A                                                                              |
| `sequenceNumber`                                                                 | *number*                                                                         | :heavy_check_mark:                                                               | N/A                                                                              |