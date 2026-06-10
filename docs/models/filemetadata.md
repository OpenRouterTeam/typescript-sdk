# FileMetadata

Metadata describing a stored file.

## Example Usage

```typescript
import { FileMetadata } from "@openrouter/sdk/models";

let value: FileMetadata = {
  createdAt: "2025-01-01T00:00:00Z",
  downloadable: false,
  filename: "document.pdf",
  id: "file_011CNha8iCJcU1wXNR6q4V8w",
  mimeType: "application/pdf",
  sizeBytes: 1024000,
  type: "file",
};
```

## Fields

| Field                                                    | Type                                                     | Required                                                 | Description                                              |
| -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- |
| `createdAt`                                              | *string*                                                 | :heavy_check_mark:                                       | N/A                                                      |
| `downloadable`                                           | *boolean*                                                | :heavy_check_mark:                                       | N/A                                                      |
| `filename`                                               | *string*                                                 | :heavy_check_mark:                                       | N/A                                                      |
| `id`                                                     | *string*                                                 | :heavy_check_mark:                                       | N/A                                                      |
| `mimeType`                                               | *string*                                                 | :heavy_check_mark:                                       | N/A                                                      |
| `sizeBytes`                                              | *number*                                                 | :heavy_check_mark:                                       | N/A                                                      |
| `type`                                                   | [models.FileMetadataType](../models/filemetadatatype.md) | :heavy_check_mark:                                       | N/A                                                      |