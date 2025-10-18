# ListModelsCountResponse


## Supported Types

### `operations.ListModelsCountResponseBody`

```typescript
const value: operations.ListModelsCountResponseBody = {
  data: {
    count: 150,
  },
};
```

### `models.ErrorResponse`

```typescript
const value: models.ErrorResponse = {
  error: {
    code: 400,
    message: "Invalid request parameters",
    metadata: {
      "field": "temperature",
      "reason": "Must be between 0 and 2",
    },
  },
  userId: "user-abc123",
};
```

