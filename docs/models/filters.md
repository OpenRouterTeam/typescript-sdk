# Filters


## Supported Types

### `models.OpenResponsesFileSearchToolFilters`

```typescript
const value: models.OpenResponsesFileSearchToolFilters = {
  key: "<key>",
  type: "ne",
  value: true,
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

