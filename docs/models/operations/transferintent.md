# TransferIntent

## Example Usage

```typescript
import { TransferIntent } from "@openrouter/sdk/models/operations";

let value: TransferIntent = {
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
};
```

## Fields

| Field                                                      | Type                                                       | Required                                                   | Description                                                |
| ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `callData`                                                 | [operations.CallData](../../models/operations/calldata.md) | :heavy_check_mark:                                         | N/A                                                        |
| `metadata`                                                 | [operations.Metadata](../../models/operations/metadata.md) | :heavy_check_mark:                                         | N/A                                                        |