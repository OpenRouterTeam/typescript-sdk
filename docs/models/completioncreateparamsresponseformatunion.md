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

### `models.ResponseFormatJSONSchema`

```typescript
const value: models.ResponseFormatJSONSchema = {
  type: "json_schema",
  jsonSchema: {
    name: "<value>",
    description: "circa or and",
    schema: {
      "key": "<value>",
      "key1": "<value>",
      "key2": "<value>",
    },
    strict: false,
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

### `models.CompletionCreateParamsResponseFormatPython`

```typescript
const value: models.CompletionCreateParamsResponseFormatPython = {
  type: "python",
};
```

