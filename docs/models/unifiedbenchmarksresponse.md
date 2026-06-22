# UnifiedBenchmarksResponse

## Example Usage

```typescript
import { UnifiedBenchmarksResponse } from "@openrouter/sdk/models";

let value: UnifiedBenchmarksResponse = {
  data: [
    {
      agenticIndex: 58.3,
      codingIndex: 65.8,
      displayName: "GPT-4o",
      intelligenceIndex: 71.2,
      modelPermaslug: "openai/gpt-4o",
      pricing: {
        completion: "0.00001",
        prompt: "0.0000025",
      },
      source: "artificial-analysis",
    },
  ],
  meta: {
    asOf: "2026-06-03T12:00:00Z",
    citation:
      "Source: Artificial Analysis (artificialanalysis.ai) via OpenRouter (openrouter.ai/rankings).",
    modelCount: 1,
    source: "artificial-analysis",
    sourceUrl: "https://artificialanalysis.ai",
    taskType: null,
    version: "v1",
  },
};
```

## Fields

| Field                                                                                                                                                                                                                                                                                  | Type                                                                                                                                                                                                                                                                                   | Required                                                                                                                                                                                                                                                                               | Description                                                                                                                                                                                                                                                                            | Example                                                                                                                                                                                                                                                                                |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`                                                                                                                                                                                                                                                                                 | *models.UnifiedBenchmarksResponseData*[]                                                                                                                                                                                                                                               | :heavy_check_mark:                                                                                                                                                                                                                                                                     | N/A                                                                                                                                                                                                                                                                                    |                                                                                                                                                                                                                                                                                        |
| `meta`                                                                                                                                                                                                                                                                                 | [models.UnifiedBenchmarksMeta](../models/unifiedbenchmarksmeta.md)                                                                                                                                                                                                                     | :heavy_check_mark:                                                                                                                                                                                                                                                                     | N/A                                                                                                                                                                                                                                                                                    | {<br/>"as_of": "2026-06-03T12:00:00Z",<br/>"citation": "Source: Artificial Analysis (artificialanalysis.ai) via OpenRouter (openrouter.ai/rankings).",<br/>"model_count": 50,<br/>"source": "artificial-analysis",<br/>"source_url": "https://artificialanalysis.ai",<br/>"task_type": null,<br/>"version": "v1"<br/>} |