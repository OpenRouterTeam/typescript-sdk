# AddCoinbaseChargeResponse

Returns the calldata to fulfill the transaction

## Example Usage

```typescript
import { AddCoinbaseChargeResponse } from "@openrouter/sdk/models/operations";

let value: AddCoinbaseChargeResponse = {
  data: {
    id: "<id>",
    createdAt: "1714545851476",
    expiresAt: "1741250581602",
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

| Field                                                                                | Type                                                                                 | Required                                                                             | Description                                                                          |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `data`                                                                               | [operations.AddCoinbaseChargeData](../../models/operations/addcoinbasechargedata.md) | :heavy_check_mark:                                                                   | N/A                                                                                  |