# BenchmarksAAResponse

## Example Usage

```typescript
import { BenchmarksAAResponse } from "@openrouter/sdk/models";

let value: BenchmarksAAResponse = {
  data: [
    {
      aaName: "GPT-4o",
      agenticIndex: 58.3,
      codingIndex: 65.8,
      intelligenceIndex: 71.2,
      modelPermaslug: "openai/gpt-4o",
      pricing: {
        completion: "0.00001",
        prompt: "0.0000025",
      },
    },
  ],
  meta: {
    asOf: "2026-06-03T12:00:00Z",
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

| Field                                                                                                                                                                                                                                                               | Type                                                                                                                                                                                                                                                                | Required                                                                                                                                                                                                                                                            | Description                                                                                                                                                                                                                                                         | Example                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`                                                                                                                                                                                                                                                              | [models.BenchmarksAAItem](../models/benchmarksaaitem.md)[]                                                                                                                                                                                                          | :heavy_check_mark:                                                                                                                                                                                                                                                  | N/A                                                                                                                                                                                                                                                                 |                                                                                                                                                                                                                                                                     |
| `meta`                                                                                                                                                                                                                                                              | [models.BenchmarksAAMeta](../models/benchmarksaameta.md)                                                                                                                                                                                                            | :heavy_check_mark:                                                                                                                                                                                                                                                  | N/A                                                                                                                                                                                                                                                                 | {<br/>"as_of": "2026-06-03T12:00:00Z",<br/>"citation": "Source: Artificial Analysis (artificialanalysis.ai) via OpenRouter (openrouter.ai/rankings).",<br/>"model_count": 50,<br/>"source": "artificial-analysis",<br/>"source_url": "https://artificialanalysis.ai",<br/>"version": "v1"<br/>} |