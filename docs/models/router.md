# Router

## Example Usage

```typescript
import { Router } from "@openrouter/sdk/models";

let value: Router = {
  account: {
    creditsRemaining: 5257.95,
    isFreeTier: true,
  },
  attempt: 401524,
  endpoints: {
    available: [
      {
        model: "Focus",
        provider: "<value>",
        selected: true,
        sortRank: 637155,
        sortValue: 6937.83,
      },
    ],
    sort: "<value>",
    total: 998607,
  },
  isByok: true,
  region: "<value>",
  requested: "<value>",
  strategy: "<value>",
  summary: "<value>",
};
```

## Fields

| Field                                      | Type                                       | Required                                   | Description                                |
| ------------------------------------------ | ------------------------------------------ | ------------------------------------------ | ------------------------------------------ |
| `account`                                  | [models.Account](../models/account.md)     | :heavy_check_mark:                         | N/A                                        |
| `attempt`                                  | *number*                                   | :heavy_check_mark:                         | N/A                                        |
| `attempts`                                 | [models.Attempt](../models/attempt.md)[]   | :heavy_minus_sign:                         | N/A                                        |
| `endpoints`                                | [models.Endpoints](../models/endpoints.md) | :heavy_check_mark:                         | N/A                                        |
| `isByok`                                   | *boolean*                                  | :heavy_check_mark:                         | N/A                                        |
| `latency`                                  | [models.Latency](../models/latency.md)     | :heavy_minus_sign:                         | N/A                                        |
| `params`                                   | [models.Params](../models/params.md)       | :heavy_minus_sign:                         | N/A                                        |
| `pipeline`                                 | [models.Pipeline](../models/pipeline.md)[] | :heavy_minus_sign:                         | N/A                                        |
| `region`                                   | *string*                                   | :heavy_check_mark:                         | N/A                                        |
| `requested`                                | *string*                                   | :heavy_check_mark:                         | N/A                                        |
| `strategy`                                 | *string*                                   | :heavy_check_mark:                         | N/A                                        |
| `summary`                                  | *string*                                   | :heavy_check_mark:                         | N/A                                        |