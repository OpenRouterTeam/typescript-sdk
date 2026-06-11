# FileListResponse

A page of files belonging to the requesting workspace.

## Example Usage

```typescript
import { FileListResponse } from "@openrouter/sdk/models";

let value: FileListResponse = {
  cursor: null,
  data: [
    {
      createdAt: "2025-01-01T00:00:00Z",
      downloadable: false,
      filename: "document.pdf",
      id: "file_011CNha8iCJcU1wXNR6q4V8w",
      mimeType: "application/pdf",
      sizeBytes: 1024000,
      type: "file",
    },
  ],
  firstId: "file_011CNha8iCJcU1wXNR6q4V8w",
  hasMore: false,
  lastId: "file_011CNha8iCJcU1wXNR6q4V8w",
};
```

## Fields

| Field                                                                 | Type                                                                  | Required                                                              | Description                                                           |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `cursor`                                                              | *string*                                                              | :heavy_check_mark:                                                    | Opaque cursor for the next page; null when there are no more results. |
| `data`                                                                | [models.FileMetadata](../models/filemetadata.md)[]                    | :heavy_check_mark:                                                    | N/A                                                                   |
| `firstId`                                                             | *string*                                                              | :heavy_check_mark:                                                    | N/A                                                                   |
| `hasMore`                                                             | *boolean*                                                             | :heavy_check_mark:                                                    | N/A                                                                   |
| `lastId`                                                              | *string*                                                              | :heavy_check_mark:                                                    | N/A                                                                   |