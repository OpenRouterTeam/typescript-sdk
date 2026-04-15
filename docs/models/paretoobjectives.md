# ParetoObjectives

Custom objective weights (0-1). Higher weight = more influence on model selection. Weights are normalised internally so they do not need to sum to 1. Overrides preset when provided.

## Example Usage

```typescript
import { ParetoObjectives } from "@openrouter/sdk/models";

let value: ParetoObjectives = {};
```

## Fields

| Field              | Type               | Required           | Description        |
| ------------------ | ------------------ | ------------------ | ------------------ |
| `cost`             | *number*           | :heavy_minus_sign: | N/A                |
| `latency`          | *number*           | :heavy_minus_sign: | N/A                |
| `quality`          | *number*           | :heavy_minus_sign: | N/A                |