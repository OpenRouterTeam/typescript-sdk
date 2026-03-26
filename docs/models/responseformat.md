# ResponseFormat

Response format configuration


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
    name: "math_response",
  },
};
```

### `models.ResponseFormatTextGrammar`

```typescript
const value: models.ResponseFormatTextGrammar = {
  type: "grammar",
  grammar: "root ::= \"yes\" | \"no\"",
};
```

### `models.ResponseFormatTextPython`

```typescript
const value: models.ResponseFormatTextPython = {
  type: "python",
};
```

