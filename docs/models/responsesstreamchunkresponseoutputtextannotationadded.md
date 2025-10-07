# ResponsesStreamChunkResponseOutputTextAnnotationAdded

## Example Usage

```typescript
import { ResponsesStreamChunkResponseOutputTextAnnotationAdded } from "@openrouter/sdk/models";

let value: ResponsesStreamChunkResponseOutputTextAnnotationAdded = {
  type: "response.output_text.annotation.added",
  annotation: {
    type: "url_citation",
    url: "https://regal-hammock.biz",
    title: "<value>",
    startIndex: 2449.04,
    endIndex: 8529.06,
  },
};
```

## Fields

| Field                                                                                              | Type                                                                                               | Required                                                                                           | Description                                                                                        |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `type`                                                                                             | [models.TypeResponseOutputTextAnnotationAdded](../models/typeresponseoutputtextannotationadded.md) | :heavy_check_mark:                                                                                 | N/A                                                                                                |
| `annotation`                                                                                       | [models.Annotation](../models/annotation.md)                                                       | :heavy_check_mark:                                                                                 | N/A                                                                                                |