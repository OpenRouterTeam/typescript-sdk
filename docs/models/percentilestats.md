# PercentileStats

Latency percentiles in milliseconds over the last 30 minutes. Latency measures time to first token. Only visible when authenticated with an API key or cookie; returns null for unauthenticated requests.

## Example Usage

```typescript
import { PercentileStats } from "@openrouter/sdk/models";

let value: PercentileStats = {
  p50: 25.5,
  p75: 35.2,
  p90: 48.7,
  p99: 85.3,
};
```

## Fields

| Field                    | Type                     | Required                 | Description              | Example                  |
| ------------------------ | ------------------------ | ------------------------ | ------------------------ | ------------------------ |
| `p50`                    | *number*                 | :heavy_check_mark:       | Median (50th percentile) | 25.5                     |
| `p75`                    | *number*                 | :heavy_check_mark:       | 75th percentile          | 35.2                     |
| `p90`                    | *number*                 | :heavy_check_mark:       | 90th percentile          | 48.7                     |
| `p99`                    | *number*                 | :heavy_check_mark:       | 99th percentile          | 85.3                     |