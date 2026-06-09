# Metric

## Example Usage

```typescript
import { Metric } from "@openrouter/sdk/models/operations";

let value: Metric = {
  displayLabel: "Request Count",
  isRate: false,
  name: "request_count",
};
```

## Fields

| Field                                                      | Type                                                       | Required                                                   | Description                                                | Example                                                    |
| ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `displayLabel`                                             | *string*                                                   | :heavy_check_mark:                                         | Human-readable label                                       | Request Count                                              |
| `isRate`                                                   | *boolean*                                                  | :heavy_check_mark:                                         | Whether this metric is a rate/ratio (averaged, not summed) |                                                            |
| `name`                                                     | *string*                                                   | :heavy_check_mark:                                         | Metric identifier used in query requests                   | request_count                                              |