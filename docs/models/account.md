# Account

## Example Usage

```typescript
import { Account } from "@openrouter/sdk/models";

let value: Account = {
  creditsRemaining: 2973.51,
  isFreeTier: true,
};
```

## Fields

| Field                                      | Type                                       | Required                                   | Description                                |
| ------------------------------------------ | ------------------------------------------ | ------------------------------------------ | ------------------------------------------ |
| `autoTopup`                                | *boolean*                                  | :heavy_minus_sign:                         | N/A                                        |
| `creditsRemaining`                         | *number*                                   | :heavy_check_mark:                         | N/A                                        |
| `isFreeTier`                               | *boolean*                                  | :heavy_check_mark:                         | N/A                                        |
| `rateLimit`                                | [models.RateLimit](../models/ratelimit.md) | :heavy_minus_sign:                         | N/A                                        |
| `usageLimit`                               | *number*                                   | :heavy_minus_sign:                         | N/A                                        |