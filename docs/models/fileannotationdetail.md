# FileAnnotationDetail

File annotation with content

## Example Usage

```typescript
import { FileAnnotationDetail } from "open-router/models";

let value: FileAnnotationDetail = {
  type: "file",
  file: {
    hash: "<value>",
    content: [],
  },
};
```

## Fields

| Field                                    | Type                                     | Required                                 | Description                              |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| `type`                                   | [models.TypeFile](../models/typefile.md) | :heavy_check_mark:                       | N/A                                      |
| `file`                                   | [models.FileT](../models/filet.md)       | :heavy_check_mark:                       | N/A                                      |