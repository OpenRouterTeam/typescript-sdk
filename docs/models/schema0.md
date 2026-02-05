# Schema0

## Example Usage

```typescript
import { Schema0 } from "@openrouter/sdk/models";

let value: Schema0 = {};
```

## Fields

| Field                                    | Type                                     | Required                                 | Description                              |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| `allowFallbacks`                         | *boolean*                                | :heavy_minus_sign:                       | N/A                                      |
| `requireParameters`                      | *boolean*                                | :heavy_minus_sign:                       | N/A                                      |
| `dataCollection`                         | [models.Schema3](../models/schema3.md)   | :heavy_minus_sign:                       | N/A                                      |
| `zdr`                                    | *boolean*                                | :heavy_minus_sign:                       | N/A                                      |
| `enforceDistillableText`                 | *boolean*                                | :heavy_minus_sign:                       | N/A                                      |
| `order`                                  | *models.Schema5*[]                       | :heavy_minus_sign:                       | N/A                                      |
| `only`                                   | *models.Schema5*[]                       | :heavy_minus_sign:                       | N/A                                      |
| `ignore`                                 | *models.Schema5*[]                       | :heavy_minus_sign:                       | N/A                                      |
| `quantizations`                          | [models.Schema8](../models/schema8.md)[] | :heavy_minus_sign:                       | N/A                                      |
| `sort`                                   | *models.ProviderSortUnion*               | :heavy_minus_sign:                       | N/A                                      |
| `maxPrice`                               | [models.Schema10](../models/schema10.md) | :heavy_minus_sign:                       | N/A                                      |
| `preferredMinThroughput`                 | *models.Schema15Union*                   | :heavy_minus_sign:                       | N/A                                      |
| `preferredMaxLatency`                    | *models.Schema15Union*                   | :heavy_minus_sign:                       | N/A                                      |