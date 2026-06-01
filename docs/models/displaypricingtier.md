# DisplayPricingTier

A pricing tier within a display pricing item

## Example Usage

```typescript
import { DisplayPricingTier } from "@openrouter/sdk/models";

let value: DisplayPricingTier = {
  price: "0.05",
  skuLabel: "720p",
};
```

## Fields

| Field                                                          | Type                                                           | Required                                                       | Description                                                    | Example                                                        |
| -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- |
| `price`                                                        | *string*                                                       | :heavy_check_mark:                                             | Price for this tier as a decimal string in USD                 | 0.05                                                           |
| `skuLabel`                                                     | *string*                                                       | :heavy_check_mark:                                             | Label for this pricing tier (e.g. resolution or quality level) | 720p                                                           |