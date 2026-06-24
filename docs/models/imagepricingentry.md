# ImagePricingEntry

One billable pricing line for an image provider.

## Example Usage

```typescript
import { ImagePricingEntry } from "@openrouter/sdk/models";

let value: ImagePricingEntry = {
  billable: "output_image",
  costUsd: 0.05,
  unit: "image",
};
```

## Fields

| Field                                    | Type                                     | Required                                 | Description                              |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| `billable`                               | [models.Billable](../models/billable.md) | :heavy_check_mark:                       | N/A                                      |
| `costUsd`                                | *number*                                 | :heavy_check_mark:                       | N/A                                      |
| `unit`                                   | [models.Unit](../models/unit.md)         | :heavy_check_mark:                       | N/A                                      |
| `variant`                                | *string*                                 | :heavy_minus_sign:                       | N/A                                      |