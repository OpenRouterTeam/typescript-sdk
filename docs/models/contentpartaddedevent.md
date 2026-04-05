# ContentPartAddedEvent

Event emitted when a new content part is added to an output item

## Example Usage

```typescript
import { ContentPartAddedEvent } from "@openrouter/sdk/models";

let value: ContentPartAddedEvent = {
  type: "response.content_part.added",
  outputIndex: 286298,
  itemId: "<id>",
  contentIndex: 549137,
  part: {
    type: "output_text",
    text: "The capital of France is Paris.",
  },
  sequenceNumber: 0,
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