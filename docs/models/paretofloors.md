# ParetoFloors

Hard minimum scores (0-1, same scale as frontier entries). Models scoring below any floor are rejected before scoring.

## Example Usage

```typescript
import { ParetoFloors } from "@openrouter/sdk/models";

let value: ParetoFloors = {};
```

## Fields

| Field              | Type               | Required           | Description        |
| ------------------ | ------------------ | ------------------ | ------------------ |
| `cost`             | *number*           | :heavy_minus_sign: | N/A                |
| `latency`          | *number*           | :heavy_minus_sign: | N/A                |
| `quality`          | *number*           | :heavy_minus_sign: | N/A                |