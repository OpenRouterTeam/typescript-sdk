# BenchmarksAAItem

## Example Usage

```typescript
import { BenchmarksAAItem } from "@openrouter/sdk/models";

let value: BenchmarksAAItem = {
  modelPermaslug: "anthropic/claude-sonnet-4",
  name: "Claude Sonnet 4",
  percentiles: {
    agentic: 93,
    coding: 97,
    intelligence: 95,
  },
  pricing: {
    completion: "0.000015",
    prompt: "0.000003",
  },
  scores: {
    agentic: 0.87,
    coding: 0.92,
    intelligence: 0.89,
  },
};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  | Example                                                                      |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `modelPermaslug`                                                             | *string*                                                                     | :heavy_check_mark:                                                           | Stable OpenRouter model identifier (e.g. `anthropic/claude-sonnet-4`).       | anthropic/claude-sonnet-4                                                    |
| `name`                                                                       | *string*                                                                     | :heavy_check_mark:                                                           | Human-readable model name from Artificial Analysis.                          | Claude Sonnet 4                                                              |
| `percentiles`                                                                | [models.Percentiles](../models/percentiles.md)                               | :heavy_check_mark:                                                           | Percentile rankings across all evaluated models.                             |                                                                              |
| `pricing`                                                                    | [models.BenchmarkPricing](../models/benchmarkpricing.md)                     | :heavy_check_mark:                                                           | OpenRouter pricing per token for this model. Null if pricing is unavailable. | {<br/>"completion": "0.000015",<br/>"prompt": "0.000003"<br/>}               |
| `scores`                                                                     | [models.Scores](../models/scores.md)                                         | :heavy_check_mark:                                                           | Composite benchmark index scores.                                            |                                                                              |