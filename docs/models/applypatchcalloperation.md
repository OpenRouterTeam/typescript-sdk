# ApplyPatchCallOperation

The patch operation requested by an `apply_patch_call`. `create_file` and `update_file` carry a V4A diff; `delete_file` omits it.


## Supported Types

### `models.ApplyPatchCallOperationCreateFile`

```typescript
const value: models.ApplyPatchCallOperationCreateFile = {
  diff: "@@ function main() {\n+  console.log(\"hi\");\n }",
  path: "/src/main.ts",
  type: "create_file",
};
```

### `models.ApplyPatchCallOperationUpdateFile`

```typescript
const value: models.ApplyPatchCallOperationUpdateFile = {
  diff: "@@ function main() {\n+  console.log(\"hi\");\n }",
  path: "/src/main.ts",
  type: "update_file",
};
```

### `models.ApplyPatchCallOperationDeleteFile`

```typescript
const value: models.ApplyPatchCallOperationDeleteFile = {
  path: "/src/main.ts",
  type: "delete_file",
};
```

