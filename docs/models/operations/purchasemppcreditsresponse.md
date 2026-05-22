# PurchaseMppCreditsResponse

MPP credit purchase response

## Example Usage

```typescript
import { PurchaseMppCreditsResponse } from "@openrouter/sdk/models/operations";

let value: PurchaseMppCreditsResponse = {
  data: {
    amount: 10,
    creditId: 42,
    transactionHash: "0xabc123def456",
  },
};
```

## Fields

| Field                                                                                  | Type                                                                                   | Required                                                                               | Description                                                                            |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `data`                                                                                 | [operations.PurchaseMppCreditsData](../../models/operations/purchasemppcreditsdata.md) | :heavy_check_mark:                                                                     | Credit purchase result                                                                 |