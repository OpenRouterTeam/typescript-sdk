# CreateCoinbaseChargeResponse


## Supported Types

### `operations.CreateCoinbaseChargeResponseBody`

```typescript
const value: operations.CreateCoinbaseChargeResponseBody = {
  data: {
    id: "<id>",
    createdAt: "1705315914848",
    expiresAt: "1759618011738",
    web3Data: {
      transferIntent: {
        callData: {
          deadline: "<value>",
          feeAmount: "<value>",
          id: "<id>",
          operator: "<value>",
          prefix: "<value>",
          recipient: "<value>",
          recipientAmount: "<value>",
          recipientCurrency: "<value>",
          refundDestination: "<value>",
          signature: "<value>",
        },
        metadata: {
          chainId: 7497.17,
          contractAddress: "<value>",
          sender: "<value>",
        },
      },
    },
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

