# ChatGenerationParamsResponseFormatUnion


## Supported Types

### `models.ChatGenerationParamsResponseFormatText`

```typescript
const value: models.ChatGenerationParamsResponseFormatText = {
  type: "text",
};
```

### `models.ChatGenerationParamsResponseFormatJSONObject`

```typescript
const value: models.ChatGenerationParamsResponseFormatJSONObject = {
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

### `models.ChatGenerationParamsResponseFormatPython`

```typescript
const value: models.ChatGenerationParamsResponseFormatPython = {
  type: "python",
};
```

