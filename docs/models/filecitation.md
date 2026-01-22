# FileCitation

## Example Usage

```typescript
import { FileCitation } from "@openrouter/sdk/models";

let value: FileCitation = {
  type: "file_citation",
  fileId: "file-abc123",
  filename: "research_paper.pdf",
  index: 0,
};
```

## Fields

| Field              | Type               | Required           | Description        |
| ------------------ | ------------------ | ------------------ | ------------------ |
| `type`             | *"file_citation"*  | :heavy_check_mark: | N/A                |
| `fileId`           | *string*           | :heavy_check_mark: | N/A                |
| `filename`         | *string*           | :heavy_check_mark: | N/A                |
| `index`            | *number*           | :heavy_check_mark: | N/A                |