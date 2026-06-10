# GetAnalyticsMetaData

## Example Usage

```typescript
import { GetAnalyticsMetaData } from "@openrouter/sdk/models/operations";

let value: GetAnalyticsMetaData = {
  dimensions: [],
  granularities: [],
  metrics: [
    {
      displayFormat: "number",
      displayLabel: "Request Count",
      isRate: false,
      name: "request_count",
    },
  ],
  operators: [
    {
      name: "eq",
      valueType: "array",
    },
  ],
};
```

## Fields

| Field                                                              | Type                                                               | Required                                                           | Description                                                        |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `dimensions`                                                       | [operations.Dimension](../../models/operations/dimension.md)[]     | :heavy_check_mark:                                                 | N/A                                                                |
| `granularities`                                                    | [operations.Granularity](../../models/operations/granularity.md)[] | :heavy_check_mark:                                                 | N/A                                                                |
| `metrics`                                                          | [operations.Metric](../../models/operations/metric.md)[]           | :heavy_check_mark:                                                 | N/A                                                                |
| `operators`                                                        | [operations.Operator](../../models/operations/operator.md)[]       | :heavy_check_mark:                                                 | N/A                                                                |