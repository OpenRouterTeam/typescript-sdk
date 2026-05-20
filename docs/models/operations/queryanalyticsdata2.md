# QueryAnalyticsData2

## Example Usage

```typescript
import { QueryAnalyticsData2 } from "@openrouter/sdk/models/operations";

let value: QueryAnalyticsData2 = {
  data: [
    {},
  ],
  metadata: {
    queryTimeMs: 928.75,
    rowCount: 203673,
    truncated: false,
  },
};
```

## Fields

| Field                                                                              | Type                                                                               | Required                                                                           | Description                                                                        |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `cachedAt`                                                                         | *number*                                                                           | :heavy_minus_sign:                                                                 | N/A                                                                                |
| `data`                                                                             | [operations.QueryAnalyticsData1](../../models/operations/queryanalyticsdata1.md)[] | :heavy_check_mark:                                                                 | N/A                                                                                |
| `metadata`                                                                         | [operations.Metadata](../../models/operations/metadata.md)                         | :heavy_check_mark:                                                                 | N/A                                                                                |