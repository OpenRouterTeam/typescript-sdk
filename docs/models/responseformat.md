# ResponseFormat


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
  jsonSchema: {
    name: "<value>",
  },
};
```

### `models.ResponseFormatTextGrammar`

```typescript
const value: models.ResponseFormatTextGrammar = {
  type: "grammar",
  grammar: "<value>",
};
```

### `models.ResponseFormatPython`

```typescript
const value: models.ResponseFormatPython = {
  type: "python",
};
```

