# GetAuthKeyResponse


## Supported Types

### `operations.GetAuthKeyResponseBody`

```typescript
const value: operations.GetAuthKeyResponseBody = {
  data: {
    label: "sk-or-v1-au78b3456789012345678901234567890",
    limit: 100,
    usage: 25.5,
    isFreeTier: false,
    isProvisioningKey: false,
    limitRemaining: 74.5,
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
  },
};
```

