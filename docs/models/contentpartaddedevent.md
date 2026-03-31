# ContentPartAddedEvent

Event emitted when a new content part is added to an output item

## Example Usage

```typescript
import { ContentPartAddedEvent } from "@openrouter/sdk/models";

let value: ContentPartAddedEvent = {
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

| Field                              | Type                               | Required                           | Description                        |
| ---------------------------------- | ---------------------------------- | ---------------------------------- | ---------------------------------- |
| `type`                             | *"response.content_part.added"*    | :heavy_check_mark:                 | N/A                                |
| `outputIndex`                      | *number*                           | :heavy_check_mark:                 | N/A                                |
| `itemId`                           | *string*                           | :heavy_check_mark:                 | N/A                                |
| `contentIndex`                     | *number*                           | :heavy_check_mark:                 | N/A                                |
| `part`                             | *models.ContentPartAddedEventPart* | :heavy_check_mark:                 | N/A                                |
| `sequenceNumber`                   | *number*                           | :heavy_check_mark:                 | N/A                                |