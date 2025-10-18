# GetUserActivityResponse


## Supported Types

### `operations.GetUserActivityResponseBody`

```typescript
const value: operations.GetUserActivityResponseBody = {
  data: [
    {
      date: "2025-08-24",
      model: "openai/gpt-4.1",
      modelPermaslug: "openai/gpt-4.1-2025-04-14",
      endpointId: "550e8400-e29b-41d4-a716-446655440000",
      providerName: "OpenAI",
      usage: 0.015,
      byokUsageInference: 0.012,
      requests: 5,
      promptTokens: 50,
      completionTokens: 125,
      reasoningTokens: 25,
    },
  ],
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

