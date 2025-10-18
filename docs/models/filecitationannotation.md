# FileCitationAnnotation

## Example Usage

```typescript
import { FileCitationAnnotation } from "@openrouter/sdk/models";

let value: FileCitationAnnotation = {
  type: "file_citation",
  fileId: "file-abc123",
  filename: "research_paper.pdf",
  index: 0,
};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `type`                                                                       | [models.FileCitationAnnotationType](../models/filecitationannotationtype.md) | :heavy_check_mark:                                                           | N/A                                                                          |
| `fileId`                                                                     | *string*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `filename`                                                                   | *string*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `index`                                                                      | *number*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |