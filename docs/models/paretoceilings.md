# ParetoCeilings

Hard maximum raw-value caps. Models exceeding a ceiling are penalised (score halved) but not removed. latency_ms is in milliseconds. cost_usd is per-token cost (sum of prompt + completion per-token prices).

## Example Usage

```typescript
import { ParetoCeilings } from "@openrouter/sdk/models";

let value: ParetoCeilings = {};
```

## Fields

| Field              | Type               | Required           | Description        |
| ------------------ | ------------------ | ------------------ | ------------------ |
| `costUsd`          | *number*           | :heavy_minus_sign: | N/A                |
| `latencyMs`        | *number*           | :heavy_minus_sign: | N/A                |