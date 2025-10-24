# ResponseInputFile

File input content item

## Example Usage

```typescript
import { ResponseInputFile } from "@openrouter/sdk/models";

let value: ResponseInputFile = {
  type: "input_file",
  fileId: "file-abc123",
  fileData: "<value>",
  filename: "document.pdf",
  fileUrl: "https://outstanding-scholarship.name/",
};
```

## Fields

| Field                                                              | Type                                                               | Required                                                           | Description                                                        |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `type`                                                             | [models.ResponseInputFileType](../models/responseinputfiletype.md) | :heavy_check_mark:                                                 | N/A                                                                |
| `fileId`                                                           | *string*                                                           | :heavy_minus_sign:                                                 | N/A                                                                |
| `fileData`                                                         | *string*                                                           | :heavy_minus_sign:                                                 | N/A                                                                |
| `filename`                                                         | *string*                                                           | :heavy_minus_sign:                                                 | N/A                                                                |
| `fileUrl`                                                          | *string*                                                           | :heavy_minus_sign:                                                 | N/A                                                                |