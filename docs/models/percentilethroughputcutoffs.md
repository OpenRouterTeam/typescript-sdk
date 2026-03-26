# PercentileThroughputCutoffs

Percentile-based throughput cutoffs. All specified cutoffs must be met for an endpoint to be preferred.

## Example Usage

```typescript
import { PercentileThroughputCutoffs } from "@openrouter/sdk/models";

let value: PercentileThroughputCutoffs = {};
```

## Fields

| Field                               | Type                                | Required                            | Description                         |
| ----------------------------------- | ----------------------------------- | ----------------------------------- | ----------------------------------- |
| `p50`                               | *number*                            | :heavy_minus_sign:                  | Minimum p50 throughput (tokens/sec) |
| `p75`                               | *number*                            | :heavy_minus_sign:                  | Minimum p75 throughput (tokens/sec) |
| `p90`                               | *number*                            | :heavy_minus_sign:                  | Minimum p90 throughput (tokens/sec) |
| `p99`                               | *number*                            | :heavy_minus_sign:                  | Minimum p99 throughput (tokens/sec) |