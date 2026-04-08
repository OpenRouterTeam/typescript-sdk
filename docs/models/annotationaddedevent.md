# AnnotationAddedEvent

Event emitted when a text annotation is added to output

## Example Usage

```typescript
import { AnnotationAddedEvent } from "@openrouter/sdk/models";

let value: AnnotationAddedEvent = {
  type: "response.output_text.annotation.added",
  outputIndex: 601849,
  itemId: "<id>",
  contentIndex: 735383,
  sequenceNumber: 0,
  annotationIndex: 124913,
  annotation: {
    type: "file_citation",
    fileId: "file-abc123",
    filename: "research_paper.pdf",
    index: 0,
  },
};
```

## Fields

| Field                                                                                               | Type                                                                                                | Required                                                                                            | Description                                                                                         | Example                                                                                             |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `type`                                                                                              | *"response.output_text.annotation.added"*                                                           | :heavy_check_mark:                                                                                  | N/A                                                                                                 |                                                                                                     |
| `outputIndex`                                                                                       | *number*                                                                                            | :heavy_check_mark:                                                                                  | N/A                                                                                                 |                                                                                                     |
| `itemId`                                                                                            | *string*                                                                                            | :heavy_check_mark:                                                                                  | N/A                                                                                                 |                                                                                                     |
| `contentIndex`                                                                                      | *number*                                                                                            | :heavy_check_mark:                                                                                  | N/A                                                                                                 |                                                                                                     |
| `sequenceNumber`                                                                                    | *number*                                                                                            | :heavy_check_mark:                                                                                  | N/A                                                                                                 |                                                                                                     |
| `annotationIndex`                                                                                   | *number*                                                                                            | :heavy_check_mark:                                                                                  | N/A                                                                                                 |                                                                                                     |
| `annotation`                                                                                        | *models.OpenAIResponsesAnnotation*                                                                  | :heavy_check_mark:                                                                                  | N/A                                                                                                 | {<br/>"type": "file_citation",<br/>"file_id": "file-abc123",<br/>"filename": "research_paper.pdf",<br/>"index": 0<br/>} |