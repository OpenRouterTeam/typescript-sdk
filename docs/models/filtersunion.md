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

