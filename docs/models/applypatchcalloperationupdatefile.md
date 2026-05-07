# ApplyPatchCallOperationUpdateFile

## Example Usage

```typescript
import { ApplyPatchCallOperationUpdateFile } from "@openrouter/sdk/models";

let value: ApplyPatchCallOperationUpdateFile = {
  diff: "@@ function main() {\n+  console.log(\"hi\");\n }",
  path: "/src/main.ts",
  type: "update_file",
};
```

## Fields

| Field              | Type               | Required           | Description        |
| ------------------ | ------------------ | ------------------ | ------------------ |
| `diff`             | *string*           | :heavy_check_mark: | N/A                |
| `path`             | *string*           | :heavy_check_mark: | N/A                |
| `type`             | *"update_file"*    | :heavy_check_mark: | N/A                |