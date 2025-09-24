# PostCreditsCoinbaseResponse

Returns the calldata to fulfill the transaction

## Example Usage

```typescript
import { PostCreditsCoinbaseResponse } from "@openrouter/sdk/models/operations";

let value: PostCreditsCoinbaseResponse = {
  data: {
    id: "<id>",
    createdAt: "1717165424779",
    expiresAt: "1760656352168",
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

| Field                                                                                    | Type                                                                                     | Required                                                                                 | Description                                                                              |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `data`                                                                                   | [operations.PostCreditsCoinbaseData](../../models/operations/postcreditscoinbasedata.md) | :heavy_check_mark:                                                                       | N/A                                                                                      |