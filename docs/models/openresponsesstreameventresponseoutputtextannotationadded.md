# OpenResponsesStreamEventResponseOutputTextAnnotationAdded

Event emitted when a text annotation is added to output

## Example Usage

```typescript
import { OpenResponsesStreamEventResponseOutputTextAnnotationAdded } from "@openrouter/sdk/models";

let value: OpenResponsesStreamEventResponseOutputTextAnnotationAdded = {
  type: "response.output_text.annotation.added",
  outputIndex: 0,
  itemId: "item-1",
  contentIndex: 0,
  sequenceNumber: 5,
  annotationIndex: 0,
  annotation: {
    type: "url_citation",
    endIndex: 7,
    startIndex: 0,
    title: "Example",
    url: "https://example.com",
  },
};
```

## Fields

| Field                                                                                              | Type                                                                                               | Required                                                                                           | Description                                                                                        |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `type`                                                                                             | [models.TypeResponseOutputTextAnnotationAdded](../models/typeresponseoutputtextannotationadded.md) | :heavy_check_mark:                                                                                 | N/A                                                                                                |
| `outputIndex`                                                                                      | *number*                                                                                           | :heavy_check_mark:                                                                                 | N/A                                                                                                |
| `itemId`                                                                                           | *string*                                                                                           | :heavy_check_mark:                                                                                 | N/A                                                                                                |
| `contentIndex`                                                                                     | *number*                                                                                           | :heavy_check_mark:                                                                                 | N/A                                                                                                |
| `sequenceNumber`                                                                                   | *number*                                                                                           | :heavy_check_mark:                                                                                 | N/A                                                                                                |
| `annotationIndex`                                                                                  | *number*                                                                                           | :heavy_check_mark:                                                                                 | N/A                                                                                                |
| `annotation`                                                                                       | *models.OpenAIResponsesAnnotation*                                                                 | :heavy_check_mark:                                                                                 | N/A                                                                                                |