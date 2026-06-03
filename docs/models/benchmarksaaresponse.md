# BenchmarksAAResponse

## Example Usage

```typescript
import { BenchmarksAAResponse } from "@openrouter/sdk/models";

let value: BenchmarksAAResponse = {
  data: [
    {
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
    },
  ],
  meta: {
    asOf: "2026-06-03T12:00:00Z",
    category: null,
    citation:
      "Source: Artificial Analysis (artificialanalysis.ai) via OpenRouter (openrouter.ai/rankings).",
    modelCount: 1,
    source: "artificial-analysis",
    sourceUrl: "https://artificialanalysis.ai",
    version: "v1",
  },
};
```

## Fields

| Field                                                                                                                                                                                                                                                                                 | Type                                                                                                                                                                                                                                                                                  | Required                                                                                                                                                                                                                                                                              | Description                                                                                                                                                                                                                                                                           | Example                                                                                                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`                                                                                                                                                                                                                                                                                | [models.BenchmarksAAItem](../models/benchmarksaaitem.md)[]                                                                                                                                                                                                                            | :heavy_check_mark:                                                                                                                                                                                                                                                                    | N/A                                                                                                                                                                                                                                                                                   |                                                                                                                                                                                                                                                                                       |
| `meta`                                                                                                                                                                                                                                                                                | [models.BenchmarksAAMeta](../models/benchmarksaameta.md)                                                                                                                                                                                                                              | :heavy_check_mark:                                                                                                                                                                                                                                                                    | N/A                                                                                                                                                                                                                                                                                   | {<br/>"as_of": "2026-06-03T12:00:00Z",<br/>"category": null,<br/>"citation": "Source: Artificial Analysis (artificialanalysis.ai) via OpenRouter (openrouter.ai/rankings).",<br/>"model_count": 50,<br/>"source": "artificial-analysis",<br/>"source_url": "https://artificialanalysis.ai",<br/>"version": "v1"<br/>} |