# AddCoinbaseChargeData

## Example Usage

```typescript
import { AddCoinbaseChargeData } from "@openrouter/sdk/models/operations";

let value: AddCoinbaseChargeData = {
  id: "<id>",
  createdAt: "1713656429594",
  expiresAt: "1736043927309",
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
};
```

## Fields

| Field                                                      | Type                                                       | Required                                                   | Description                                                |
| ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `id`                                                       | *string*                                                   | :heavy_check_mark:                                         | N/A                                                        |
| `createdAt`                                                | *string*                                                   | :heavy_check_mark:                                         | N/A                                                        |
| `expiresAt`                                                | *string*                                                   | :heavy_check_mark:                                         | N/A                                                        |
| `web3Data`                                                 | [operations.Web3Data](../../models/operations/web3data.md) | :heavy_check_mark:                                         | N/A                                                        |