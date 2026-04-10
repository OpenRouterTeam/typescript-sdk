# ContentPartDoneEvent

Event emitted when a content part is complete

## Example Usage

```typescript
import { ContentPartDoneEvent } from "@openrouter/sdk/models";

let value: ContentPartDoneEvent = {
  contentIndex: 928075,
  itemId: "<id>",
  outputIndex: 289472,
  part: {
    text: "The capital of France is Paris.",
    type: "output_text",
  },
  sequenceNumber: 0,
  type: "response.content_part.done",
};
```

## Fields

| Field                             | Type                              | Required                          | Description                       |
| --------------------------------- | --------------------------------- | --------------------------------- | --------------------------------- |
| `contentIndex`                    | *number*                          | :heavy_check_mark:                | N/A                               |
| `itemId`                          | *string*                          | :heavy_check_mark:                | N/A                               |
| `outputIndex`                     | *number*                          | :heavy_check_mark:                | N/A                               |
| `part`                            | *models.ContentPartDoneEventPart* | :heavy_check_mark:                | N/A                               |
| `sequenceNumber`                  | *number*                          | :heavy_check_mark:                | N/A                               |
| `type`                            | *"response.content_part.done"*    | :heavy_check_mark:                | N/A                               |