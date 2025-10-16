# CreateCoinbaseChargeResponseBody

Returns the calldata to fulfill the transaction

## Example Usage

```typescript
import { CreateCoinbaseChargeResponseBody } from "@openrouter/sdk/models/operations";

let value: CreateCoinbaseChargeResponseBody = {
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

## Fields

| Field                                                                                      | Type                                                                                       | Required                                                                                   | Description                                                                                |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `data`                                                                                     | [operations.CreateCoinbaseChargeData](../../models/operations/createcoinbasechargedata.md) | :heavy_check_mark:                                                                         | N/A                                                                                        |