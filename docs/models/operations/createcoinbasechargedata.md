# CreateCoinbaseChargeData

## Example Usage

```typescript
import { CreateCoinbaseChargeData } from "@openrouter/sdk/models/operations";

let value: CreateCoinbaseChargeData = {
  id: "<id>",
  createdAt: "1730810681036",
  expiresAt: "1742058293127",
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