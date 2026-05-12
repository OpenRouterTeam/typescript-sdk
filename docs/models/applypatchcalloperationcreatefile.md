# ApplyPatchCallOperationCreateFile

## Example Usage

```typescript
import { ApplyPatchCallOperationCreateFile } from "@openrouter/sdk/models";

let value: ApplyPatchCallOperationCreateFile = {
  diff: "@@ function main() {\n+  console.log(\"hi\");\n }",
  path: "/src/main.ts",
  type: "create_file",
};
```

## Fields

| Field              | Type               | Required           | Description        |
| ------------------ | ------------------ | ------------------ | ------------------ |
| `diff`             | *string*           | :heavy_check_mark: | N/A                |
| `path`             | *string*           | :heavy_check_mark: | N/A                |
| `type`             | *"create_file"*    | :heavy_check_mark: | N/A                |