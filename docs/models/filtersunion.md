# FiltersUnion


## Supported Types

### `models.Filters`

```typescript
const value: models.Filters = {
  key: "<key>",
  type: "eq",
  value: [],
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

