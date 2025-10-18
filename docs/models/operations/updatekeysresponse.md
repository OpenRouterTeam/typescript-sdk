# UpdateKeysResponse


## Supported Types

### `operations.UpdateKeysResponseBody`

```typescript
const value: operations.UpdateKeysResponseBody = {
  data: {
    hash:
      "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",
    name: "Updated API Key Name",
    label: "Updated API Key Name",
    disabled: false,
    limit: 75,
    limitRemaining: 49.5,
    limitReset: "daily",
    includeByokInLimit: true,
    usage: 25.5,
    usageDaily: 25.5,
    usageWeekly: 25.5,
    usageMonthly: 25.5,
    byokUsage: 17.38,
    byokUsageDaily: 17.38,
    byokUsageWeekly: 17.38,
    byokUsageMonthly: 17.38,
    createdAt: "2025-08-24T10:30:00Z",
    updatedAt: "2025-08-24T16:00:00Z",
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

