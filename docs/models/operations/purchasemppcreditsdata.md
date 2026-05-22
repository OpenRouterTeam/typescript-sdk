# PurchaseMppCreditsData

Credit purchase result

## Example Usage

```typescript
import { PurchaseMppCreditsData } from "@openrouter/sdk/models/operations";

let value: PurchaseMppCreditsData = {
  amount: 10,
  creditId: 42,
  transactionHash: "0xabc123def456",
};
```

## Fields

| Field                                     | Type                                      | Required                                  | Description                               | Example                                   |
| ----------------------------------------- | ----------------------------------------- | ----------------------------------------- | ----------------------------------------- | ----------------------------------------- |
| `amount`                                  | *number*                                  | :heavy_check_mark:                        | Amount of credits purchased in USD        | 10                                        |
| `creditId`                                | *number*                                  | :heavy_check_mark:                        | ID of the created credit record           | 42                                        |
| `transactionHash`                         | *string*                                  | :heavy_check_mark:                        | On-chain transaction hash for the payment | 0xabc123def456                            |