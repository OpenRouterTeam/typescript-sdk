# GetParametersResponse


## Supported Types

### `operations.GetParametersResponseBody`

```typescript
const value: operations.GetParametersResponseBody = {
  data: {
    model: "openai/gpt-4",
    supportedParameters: [
      "temperature",
      "top_p",
      "max_tokens",
    ],
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

