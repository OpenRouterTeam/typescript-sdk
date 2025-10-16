# CreateCoinbaseChargeRequest

## Example Usage

```typescript
import { CreateCoinbaseChargeRequest } from "@openrouter/sdk/models/operations";

let value: CreateCoinbaseChargeRequest = {
  amount: 9777.48,
  sender: "<value>",
  chainId: 8453,
};
```

## Fields

| Field                                                    | Type                                                     | Required                                                 | Description                                              |
| -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- |
| `amount`                                                 | *number*                                                 | :heavy_check_mark:                                       | N/A                                                      |
| `sender`                                                 | *any*                                                    | :heavy_check_mark:                                       | N/A                                                      |
| `chainId`                                                | [operations.ChainId](../../models/operations/chainid.md) | :heavy_check_mark:                                       | N/A                                                      |