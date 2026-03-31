# Filters


## Supported Types

### `models.FileSearchServerToolFilters`

```typescript
const value: models.FileSearchServerToolFilters = {
  key: "<key>",
  type: "lt",
  value: "<value>",
};
```

### `models.CompoundFilter`

```typescript
const value: models.CompoundFilter = {
  type: "or",
  filters: [
    {},
    {
      "key": "<value>",
    },
    {
      "key": "<value>",
      "key1": "<value>",
    },
  ],
};
```

### `any`

```typescript
const value: any = "<value>";
```

