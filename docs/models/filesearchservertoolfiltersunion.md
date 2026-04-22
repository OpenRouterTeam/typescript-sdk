# FileSearchServerToolFiltersUnion


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
  filters: [
    {
      "key": "author",
      "type": "eq",
      "value": "Alice",
    },
  ],
  type: "and",
};
```

### `any`

```typescript
const value: any = "<value>";
```

