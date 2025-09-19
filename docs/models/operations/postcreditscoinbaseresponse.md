# PostCreditsCoinbaseResponse


## Supported Types

### `operations.PostCreditsCoinbaseResponseBody`

```typescript
const value: operations.PostCreditsCoinbaseResponseBody = {
  data: {
    id: "<id>",
    createdAt: "1706145010107",
    expiresAt: "1745893256492",
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
    code: 451,
    message: "<value>",
  },
};
```

