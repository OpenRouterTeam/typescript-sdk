# ToolPerCallPricing

Per-call flat-credit pricing for a catalog tool engine.

## Example Usage

```typescript
import { ToolPerCallPricing } from "@openrouter/sdk/models";

let value: ToolPerCallPricing = {
  authorShareBps: 7000,
  currency: "credits",
  flatCredits: 100,
  mode: "per_call",
};
```

## Fields

| Field                                    | Type                                     | Required                                 | Description                              |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| `authorShareBps`                         | *number*                                 | :heavy_check_mark:                       | N/A                                      |
| `currency`                               | [models.Currency](../models/currency.md) | :heavy_check_mark:                       | N/A                                      |
| `flatCredits`                            | *number*                                 | :heavy_check_mark:                       | N/A                                      |
| `freeTierCallsPerMonth`                  | *number*                                 | :heavy_minus_sign:                       | N/A                                      |
| `mode`                                   | *"per_call"*                             | :heavy_check_mark:                       | N/A                                      |