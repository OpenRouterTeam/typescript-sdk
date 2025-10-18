# CreateKeysResponse


## Supported Types

### `operations.CreateKeysResponseBody`

```typescript
const value: operations.CreateKeysResponseBody = {
  data: {
    hash:
      "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",
    name: "My New API Key",
    label: "My New API Key",
    disabled: false,
    limit: 50,
    limitRemaining: 50,
    limitReset: "monthly",
    includeByokInLimit: true,
    usage: 0,
    usageDaily: 0,
    usageWeekly: 0,
    usageMonthly: 0,
    byokUsage: 0,
    byokUsageDaily: 0,
    byokUsageWeekly: 0,
    byokUsageMonthly: 0,
    createdAt: "2025-08-24T10:30:00Z",
    updatedAt: null,
  },
  key:
    "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",
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

