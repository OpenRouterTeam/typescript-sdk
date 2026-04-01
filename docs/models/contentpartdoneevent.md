# ContentPartDoneEvent

Event emitted when a content part is complete

## Example Usage

```typescript
import { ContentPartDoneEvent } from "@openrouter/sdk/models";

let value: ContentPartDoneEvent = {
  type: "response.content_part.done",
  outputIndex: 9280.75,
  itemId: "<id>",
  contentIndex: 2894.72,
  part: {
    type: "output_text",
    text: "The capital of France is Paris.",
  },
  sequenceNumber: 0,
};
```

## Fields

| Field                             | Type                              | Required                          | Description                       |
| --------------------------------- | --------------------------------- | --------------------------------- | --------------------------------- |
| `type`                            | *"response.content_part.done"*    | :heavy_check_mark:                | N/A                               |
| `outputIndex`                     | *number*                          | :heavy_check_mark:                | N/A                               |
| `itemId`                          | *string*                          | :heavy_check_mark:                | N/A                               |
| `contentIndex`                    | *number*                          | :heavy_check_mark:                | N/A                               |
| `part`                            | *models.ContentPartDoneEventPart* | :heavy_check_mark:                | N/A                               |
| `sequenceNumber`                  | *number*                          | :heavy_check_mark:                | N/A                               |