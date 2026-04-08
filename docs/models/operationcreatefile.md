# OperationCreateFile

## Example Usage

```typescript
import { OperationCreateFile } from "@openrouter/sdk/models";

let value: OperationCreateFile = {
  type: "create_file",
  path: "/usr/libdata",
  diff: "<value>",
};
```

## Fields

| Field              | Type               | Required           | Description        |
| ------------------ | ------------------ | ------------------ | ------------------ |
| `type`             | *"create_file"*    | :heavy_check_mark: | N/A                |
| `path`             | *string*           | :heavy_check_mark: | N/A                |
| `diff`             | *string*           | :heavy_check_mark: | N/A                |