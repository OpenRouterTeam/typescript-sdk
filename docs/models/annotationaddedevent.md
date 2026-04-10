# AnnotationAddedEvent

Event emitted when a text annotation is added to output

## Example Usage

```typescript
import { AnnotationAddedEvent } from "@openrouter/sdk/models";

let value: AnnotationAddedEvent = {
  annotation: {
    fileId: "file-abc123",
    filename: "research_paper.pdf",
    index: 0,
    type: "file_citation",
  },
  annotationIndex: 601849,
  contentIndex: 735383,
  itemId: "<id>",
  outputIndex: 124913,
  sequenceNumber: 0,
  type: "response.output_text.annotation.added",
};
```

## Fields

| Field                                                                                               | Type                                                                                                | Required                                                                                            | Description                                                                                         | Example                                                                                             |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `annotation`                                                                                        | *models.OpenAIResponsesAnnotation*                                                                  | :heavy_check_mark:                                                                                  | N/A                                                                                                 | {<br/>"file_id": "file-abc123",<br/>"filename": "research_paper.pdf",<br/>"index": 0,<br/>"type": "file_citation"<br/>} |
| `annotationIndex`                                                                                   | *number*                                                                                            | :heavy_check_mark:                                                                                  | N/A                                                                                                 |                                                                                                     |
| `contentIndex`                                                                                      | *number*                                                                                            | :heavy_check_mark:                                                                                  | N/A                                                                                                 |                                                                                                     |
| `itemId`                                                                                            | *string*                                                                                            | :heavy_check_mark:                                                                                  | N/A                                                                                                 |                                                                                                     |
| `outputIndex`                                                                                       | *number*                                                                                            | :heavy_check_mark:                                                                                  | N/A                                                                                                 |                                                                                                     |
| `sequenceNumber`                                                                                    | *number*                                                                                            | :heavy_check_mark:                                                                                  | N/A                                                                                                 |                                                                                                     |
| `type`                                                                                              | *"response.output_text.annotation.added"*                                                           | :heavy_check_mark:                                                                                  | N/A                                                                                                 |                                                                                                     |