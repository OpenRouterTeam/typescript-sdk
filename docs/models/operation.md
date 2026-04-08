# Operation


## Supported Types

### `models.OperationCreateFile`

```typescript
const value: models.OperationCreateFile = {
  type: "create_file",
  path: "/usr/libdata",
  diff: "<value>",
};
```

### `models.OperationDeleteFile`

```typescript
const value: models.OperationDeleteFile = {
  type: "delete_file",
  path: "/opt/bin",
};
```

### `models.OperationUpdateFile`

```typescript
const value: models.OperationUpdateFile = {
  type: "update_file",
  path: "/boot/defaults",
  diff: "<value>",
};
```

