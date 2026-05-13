# Operation


## Supported Types

### `models.OperationCreateFile`

```typescript
const value: models.OperationCreateFile = {
  diff: "<value>",
  path: "/usr/libdata",
  type: "create_file",
};
```

### `models.OperationDeleteFile`

```typescript
const value: models.OperationDeleteFile = {
  path: "/opt/bin",
  type: "delete_file",
};
```

### `models.OperationUpdateFile`

```typescript
const value: models.OperationUpdateFile = {
  diff: "<value>",
  path: "/boot/defaults",
  type: "update_file",
};
```

