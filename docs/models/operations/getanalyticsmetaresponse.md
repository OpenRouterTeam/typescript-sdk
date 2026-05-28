# GetAnalyticsMetaResponse

Returns analytics query metadata

## Example Usage

```typescript
import { GetAnalyticsMetaResponse } from "@openrouter/sdk/models/operations";

let value: GetAnalyticsMetaResponse = {
  data: {
    dimensions: [],
    granularities: [
      {
        displayLabel: "Day",
        name: "day",
      },
    ],
    metrics: [
      {
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
  },
};
```

## Fields

| Field                                                                              | Type                                                                               | Required                                                                           | Description                                                                        |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `data`                                                                             | [operations.GetAnalyticsMetaData](../../models/operations/getanalyticsmetadata.md) | :heavy_check_mark:                                                                 | N/A                                                                                |