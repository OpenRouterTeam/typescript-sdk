# ResponseFormat

Response format configuration


## Supported Types

### `models.ChatFormatTextConfig`

```typescript
const value: models.ChatFormatTextConfig = {
  type: "text",
};
```

### `models.FormatJsonObjectConfig`

```typescript
const value: models.FormatJsonObjectConfig = {
  type: "json_object",
};
```

### `models.ChatFormatJsonSchemaConfig`

```typescript
const value: models.ChatFormatJsonSchemaConfig = {
  type: "json_schema",
  jsonSchema: {
    name: "math_response",
  },
};
```

### `models.ChatFormatGrammarConfig`

```typescript
const value: models.ChatFormatGrammarConfig = {
  type: "grammar",
  grammar: "root ::= \"yes\" | \"no\"",
};
```

### `models.ChatFormatPythonConfig`

```typescript
const value: models.ChatFormatPythonConfig = {
  type: "python",
};
```

