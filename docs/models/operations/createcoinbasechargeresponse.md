# CreateCoinbaseChargeResponse

Returns the calldata to fulfill the transaction

## Example Usage

```typescript
import { CreateCoinbaseChargeResponse } from "@openrouter/sdk/models/operations";

let value: CreateCoinbaseChargeResponse = {
  data: {
    id: "<id>",
    createdAt: "1723897831264",
    expiresAt: "1744713163031",
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