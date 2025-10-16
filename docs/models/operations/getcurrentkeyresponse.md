# GetCurrentKeyResponse


## Supported Types

### `operations.GetCurrentKeyResponseBody`

```typescript
const value: operations.GetCurrentKeyResponseBody = {
  data: {
    label: "sk-or-v1-au78b3456789012345678901234567890",
    limit: 100,
    usage: 25.5,
    usageDaily: 25.5,
    usageWeekly: 25.5,
    usageMonthly: 25.5,
    byokUsage: 17.38,
    byokUsageDaily: 17.38,
    byokUsageWeekly: 17.38,
    byokUsageMonthly: 17.38,
    isFreeTier: false,
    isProvisioningKey: false,
    limitRemaining: 74.5,
    limitReset: "monthly",
    includeByokInLimit: false,
    rateLimit: {
      requests: 1000,
      interval: "1h",
      note: "This field is deprecated and safe to ignore.",
    },
  },
};
```

### `models.ErrorResponse`

```typescript
const value: models.ErrorResponse = {
  error: {
    code: 451,
    message: "<value>",
    metadata: {
      "key": "<value>",
    },
  },
  userId: "<id>",
};
```

