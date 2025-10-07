# ResponseFormatTextConfig

Text response format configuration


## Supported Types

### `models.ResponseFormatText`

```typescript
const value: models.ResponseFormatText = {
  type: "text",
};
```

### `models.ResponseFormatJSONObject`

```typescript
const value: models.ResponseFormatJSONObject = {
  type: "json_object",
};
```

### `models.ResponseFormatJSONSchema`

```typescript
const value: models.ResponseFormatJSONSchema = {
  type: "json_schema",
  name: "<value>",
  description: "circa or and",
  strict: false,
  schema: {
    "key": "<value>",
    "key1": "<value>",
    "key2": "<value>",
  },
};
```

