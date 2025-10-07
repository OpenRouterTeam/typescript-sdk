# CompletionCreateParamsResponseFormatUnion


## Supported Types

### `models.CompletionCreateParamsResponseFormatText`

```typescript
const value: models.CompletionCreateParamsResponseFormatText = {
  type: "text",
};
```

### `models.CompletionCreateParamsResponseFormatJSONObject`

```typescript
const value: models.CompletionCreateParamsResponseFormatJSONObject = {
  type: "json_object",
};
```

### `models.CompletionCreateParamsResponseFormatJSONSchema`

```typescript
const value: models.CompletionCreateParamsResponseFormatJSONSchema = {
  type: "json_schema",
  jsonSchema: {
    name: "<value>",
    description: "athletic decent scuttle among excluding react",
    schema: {
      "key": "<value>",
      "key1": "<value>",
      "key2": "<value>",
    },
    strict: false,
  },
};
```

### `models.CompletionCreateParamsResponseFormatGrammar`

```typescript
const value: models.CompletionCreateParamsResponseFormatGrammar = {
  type: "grammar",
  grammar: "<value>",
};
```

### `models.CompletionCreateParamsResponseFormatPython`

```typescript
const value: models.CompletionCreateParamsResponseFormatPython = {
  type: "python",
};
```

