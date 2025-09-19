# Web3Data

## Example Usage

```typescript
import { Web3Data } from "open-router/models/operations";

let value: Web3Data = {
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
};
```

## Fields

| Field                                                                  | Type                                                                   | Required                                                               | Description                                                            |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `transferIntent`                                                       | [operations.TransferIntent](../../models/operations/transferintent.md) | :heavy_check_mark:                                                     | N/A                                                                    |