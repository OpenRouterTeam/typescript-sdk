# ResponseFormat

Response format configuration


## Supported Types

### `models.ChatFormatGrammarConfig`

```typescript
const value: models.ChatFormatGrammarConfig = {
  grammar: "root ::= \"yes\" | \"no\"",
  type: "grammar",
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
  jsonSchema: {
    name: "math_response",
  },
  type: "json_schema",
};
```

### `models.ChatFormatPythonConfig`

```typescript
const value: models.ChatFormatPythonConfig = {
  type: "python",
};
```

### `models.ChatFormatTextConfig`

```typescript
const value: models.ChatFormatTextConfig = {
  type: "text",
};
```

