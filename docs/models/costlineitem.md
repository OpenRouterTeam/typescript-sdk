# CostLineItem

A single billing line item showing what was charged and why. Supported in image generation responses only, more modalities coming soon.

## Example Usage

```typescript
import { CostLineItem } from "@openrouter/sdk/models";

let value: CostLineItem = {
  cost: 0.04,
  quantity: 1,
  skuLabel: "Image Output",
  unitPrice: 0.04,
};
```

## Fields

| Field                                                 | Type                                                  | Required                                              | Description                                           |
| ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- |
| `cost`                                                | *number*                                              | :heavy_check_mark:                                    | Total cost for this line item (quantity * unit_price) |
| `quantity`                                            | *number*                                              | :heavy_check_mark:                                    | Number of units consumed                              |
| `skuLabel`                                            | *string*                                              | :heavy_check_mark:                                    | Human-readable label for this billing line item       |
| `unitPrice`                                           | *number*                                              | :heavy_check_mark:                                    | Price per unit in USD                                 |