# QueryAnalyticsRequestBody

## Example Usage

```typescript
import { QueryAnalyticsRequestBody } from "@openrouter/sdk/models/operations";

let value: QueryAnalyticsRequestBody = {
  metrics: [
    "request_count",
  ],
};
```

## Fields

| Field                                                        | Type                                                         | Required                                                     | Description                                                  | Example                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `dimensions`                                                 | *string*[]                                                   | :heavy_minus_sign:                                           | N/A                                                          |                                                              |
| `filters`                                                    | [operations.Filter](../../models/operations/filter.md)[]     | :heavy_minus_sign:                                           | N/A                                                          |                                                              |
| `granularity`                                                | *string*                                                     | :heavy_minus_sign:                                           | Time granularity                                             | day                                                          |
| `limit`                                                      | *number*                                                     | :heavy_minus_sign:                                           | N/A                                                          |                                                              |
| `metrics`                                                    | *string*[]                                                   | :heavy_check_mark:                                           | N/A                                                          |                                                              |
| `orderBy`                                                    | [operations.OrderBy](../../models/operations/orderby.md)     | :heavy_minus_sign:                                           | N/A                                                          |                                                              |
| `timeRange`                                                  | [operations.TimeRange](../../models/operations/timerange.md) | :heavy_minus_sign:                                           | N/A                                                          |                                                              |