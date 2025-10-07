# AddCoinbaseChargeRequest

## Example Usage

```typescript
import { AddCoinbaseChargeRequest } from "@openrouter/sdk/models/operations";

let value: AddCoinbaseChargeRequest = {
  amount: 3397.36,
  sender: "<value>",
  chainId: 137,
};
```

## Fields

| Field                                                    | Type                                                     | Required                                                 | Description                                              |
| -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- |
| `amount`                                                 | *number*                                                 | :heavy_check_mark:                                       | N/A                                                      |
| `sender`                                                 | *any*                                                    | :heavy_check_mark:                                       | N/A                                                      |
| `chainId`                                                | [operations.ChainId](../../models/operations/chainid.md) | :heavy_check_mark:                                       | N/A                                                      |