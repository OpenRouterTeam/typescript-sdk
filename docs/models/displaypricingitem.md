# DisplayPricingItem

Structured pricing line item with SKU label and display metadata

## Example Usage

```typescript
import { DisplayPricingItem } from "@openrouter/sdk/models";

let value: DisplayPricingItem = {
  displayMultiplier: 1000000,
  kind: "token",
  price: "0.00000015",
  skuLabel: "Input Price",
  unitLabel: "/M tokens",
};
```

## Fields

| Field                                                                                      | Type                                                                                       | Required                                                                                   | Description                                                                                | Example                                                                                    |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `displayMultiplier`                                                                        | *number*                                                                                   | :heavy_check_mark:                                                                         | Multiplier for display purposes (e.g. 1000000 means price is shown per million tokens)     | 1000000                                                                                    |
| `kind`                                                                                     | [models.Kind](../models/kind.md)                                                           | :heavy_check_mark:                                                                         | Whether this price is per-token ('token') or per-unit ('unit', e.g. per image, per second) | token                                                                                      |
| `price`                                                                                    | *string*                                                                                   | :heavy_check_mark:                                                                         | Price as a decimal string in USD (before applying displayMultiplier)                       | 0.00000015                                                                                 |
| `skuLabel`                                                                                 | *string*                                                                                   | :heavy_check_mark:                                                                         | Human-readable label for this SKU (e.g. "Input Price", "Video Output")                     | Input Price                                                                                |
| `tiers`                                                                                    | [models.DisplayPricingTier](../models/displaypricingtier.md)[]                             | :heavy_minus_sign:                                                                         | Optional pricing tiers (e.g. different resolutions or quality levels)                      |                                                                                            |
| `unitLabel`                                                                                | *string*                                                                                   | :heavy_check_mark:                                                                         | Unit label for display (e.g. "/M tokens", "/image", "/second")                             | /M tokens                                                                                  |