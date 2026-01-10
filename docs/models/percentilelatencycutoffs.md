# PercentileLatencyCutoffs

Percentile-based latency cutoffs. All specified cutoffs must be met for an endpoint to be preferred.

## Example Usage

```typescript
import { PercentileLatencyCutoffs } from "@openrouter/sdk/models";

let value: PercentileLatencyCutoffs = {};
```

## Fields

| Field                         | Type                          | Required                      | Description                   |
| ----------------------------- | ----------------------------- | ----------------------------- | ----------------------------- |
| `p50`                         | *number*                      | :heavy_minus_sign:            | Maximum p50 latency (seconds) |
| `p75`                         | *number*                      | :heavy_minus_sign:            | Maximum p75 latency (seconds) |
| `p90`                         | *number*                      | :heavy_minus_sign:            | Maximum p90 latency (seconds) |
| `p99`                         | *number*                      | :heavy_minus_sign:            | Maximum p99 latency (seconds) |