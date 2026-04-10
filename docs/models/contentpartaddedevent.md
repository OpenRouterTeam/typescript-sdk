# ContentPartAddedEvent

Event emitted when a new content part is added to an output item

## Example Usage

```typescript
import { ContentPartAddedEvent } from "@openrouter/sdk/models";

let value: ContentPartAddedEvent = {
  contentIndex: 286298,
  itemId: "<id>",
  outputIndex: 549137,
  part: {
    text: "The capital of France is Paris.",
    type: "output_text",
  },
  sequenceNumber: 0,
  type: "response.content_part.added",
};
```

## Fields

| Field                              | Type                               | Required                           | Description                        |
| ---------------------------------- | ---------------------------------- | ---------------------------------- | ---------------------------------- |
| `contentIndex`                     | *number*                           | :heavy_check_mark:                 | N/A                                |
| `itemId`                           | *string*                           | :heavy_check_mark:                 | N/A                                |
| `outputIndex`                      | *number*                           | :heavy_check_mark:                 | N/A                                |
| `part`                             | *models.ContentPartAddedEventPart* | :heavy_check_mark:                 | N/A                                |
| `sequenceNumber`                   | *number*                           | :heavy_check_mark:                 | N/A                                |
| `type`                             | *"response.content_part.added"*    | :heavy_check_mark:                 | N/A                                |