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
  type: "and",
  filters: [
    {
      "key": "author",
      "type": "eq",
      "value": "Alice",
    },
  ],
};
```

### `any`

```typescript
const value: any = "<value>";
```

