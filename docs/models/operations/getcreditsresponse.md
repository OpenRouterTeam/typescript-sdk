# GetCreditsResponse


## Supported Types

### `operations.GetCreditsResponseBody`

```typescript
const value: operations.GetCreditsResponseBody = {
  data: {
    totalCredits: 100.5,
    totalUsage: 25.75,
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

