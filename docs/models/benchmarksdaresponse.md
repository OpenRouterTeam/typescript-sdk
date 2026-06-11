# BenchmarksDAResponse

## Example Usage

```typescript
import { BenchmarksDAResponse } from "@openrouter/sdk/models";

let value: BenchmarksDAResponse = {
  data: [
    {
      arena: "models",
      avgGenerationTimeMs: 3200,
      category: "codecategories",
      displayName: "Claude Sonnet 4",
      elo: 1423,
      modelPermaslug: "anthropic/claude-sonnet-4",
      pricing: {
        completion: "0.000015",
        prompt: "0.000003",
      },
      tournamentStats: {
        firstPlace: 12,
        fourthPlace: 2,
        secondPlace: 8,
        thirdPlace: 5,
        total: 27,
      },
      winRate: 72,
    },
  ],
  meta: {
    arena: "models",
    asOf: "2026-06-03T12:00:00Z",
    category: null,
    citation:
      "Source: Design Arena (www.designarena.ai) via OpenRouter (openrouter.ai/rankings).",
    eloBounds: {
      max: 1600,
      min: 900,
    },
    modelCount: 1,
    source: "design-arena",
    sourceUrl: "https://www.designarena.ai",
    version: "v1",
  },
};
```

## Fields

| Field                                                                                                                                                                                                                                                                                                                           | Type                                                                                                                                                                                                                                                                                                                            | Required                                                                                                                                                                                                                                                                                                                        | Description                                                                                                                                                                                                                                                                                                                     | Example                                                                                                                                                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`                                                                                                                                                                                                                                                                                                                          | [models.BenchmarksDAItem](../models/benchmarksdaitem.md)[]                                                                                                                                                                                                                                                                      | :heavy_check_mark:                                                                                                                                                                                                                                                                                                              | N/A                                                                                                                                                                                                                                                                                                                             |                                                                                                                                                                                                                                                                                                                                 |
| `meta`                                                                                                                                                                                                                                                                                                                          | [models.BenchmarksDAMeta](../models/benchmarksdameta.md)                                                                                                                                                                                                                                                                        | :heavy_check_mark:                                                                                                                                                                                                                                                                                                              | N/A                                                                                                                                                                                                                                                                                                                             | {<br/>"arena": "models",<br/>"as_of": "2026-06-03T12:00:00Z",<br/>"category": null,<br/>"citation": "Source: Design Arena (www.designarena.ai) via OpenRouter (openrouter.ai/rankings).",<br/>"elo_bounds": {<br/>"max": 1600,<br/>"min": 900<br/>},<br/>"model_count": 50,<br/>"source": "design-arena",<br/>"source_url": "https://www.designarena.ai",<br/>"version": "v1"<br/>} |