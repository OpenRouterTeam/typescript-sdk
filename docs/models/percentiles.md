# Percentiles

Percentile rankings across all evaluated models.

## Example Usage

```typescript
import { Percentiles } from "@openrouter/sdk/models";

let value: Percentiles = {
  agentic: 9263.32,
  coding: 919.86,
  intelligence: 2305.8,
};
```

## Fields

| Field                                               | Type                                                | Required                                            | Description                                         |
| --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- |
| `agentic`                                           | *number*                                            | :heavy_check_mark:                                  | Percentile rank for the agentic index (0–100).      |
| `coding`                                            | *number*                                            | :heavy_check_mark:                                  | Percentile rank for the coding index (0–100).       |
| `intelligence`                                      | *number*                                            | :heavy_check_mark:                                  | Percentile rank for the intelligence index (0–100). |