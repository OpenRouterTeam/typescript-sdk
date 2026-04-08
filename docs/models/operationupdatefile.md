# OperationUpdateFile

## Example Usage

```typescript
import { OperationUpdateFile } from "@openrouter/sdk/models";

let value: OperationUpdateFile = {
  type: "update_file",
  path: "/boot/defaults",
  diff: "<value>",
};
```

## Fields

| Field              | Type               | Required           | Description        |
| ------------------ | ------------------ | ------------------ | ------------------ |
| `type`             | *"update_file"*    | :heavy_check_mark: | N/A                |
| `path`             | *string*           | :heavy_check_mark: | N/A                |
| `diff`             | *string*           | :heavy_check_mark: | N/A                |