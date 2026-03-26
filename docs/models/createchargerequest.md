# CreateChargeRequest

Create a Coinbase charge for crypto payment

## Example Usage

```typescript
import { CreateChargeRequest } from "@openrouter/sdk/models";

let value: CreateChargeRequest = {
  amount: 100,
  sender: "0x1234567890123456789012345678901234567890",
  chainId: 1,
};
```

## Fields

| Field                                  | Type                                   | Required                               | Description                            |
| -------------------------------------- | -------------------------------------- | -------------------------------------- | -------------------------------------- |
| `amount`                               | *number*                               | :heavy_check_mark:                     | N/A                                    |
| `sender`                               | *string*                               | :heavy_check_mark:                     | N/A                                    |
| `chainId`                              | [models.ChainId](../models/chainid.md) | :heavy_check_mark:                     | N/A                                    |