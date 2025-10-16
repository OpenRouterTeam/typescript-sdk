# FileCitationAnnotation

## Example Usage

```typescript
import { FileCitationAnnotation } from "@openrouter/sdk/models";

let value: FileCitationAnnotation = {
  type: "file_citation",
  fileId: "<id>",
  filename: "example.file",
  index: 5362.04,
};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `type`                                                                       | [models.FileCitationAnnotationType](../models/filecitationannotationtype.md) | :heavy_check_mark:                                                           | N/A                                                                          |
| `fileId`                                                                     | *string*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `filename`                                                                   | *string*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |
| `index`                                                                      | *number*                                                                     | :heavy_check_mark:                                                           | N/A                                                                          |