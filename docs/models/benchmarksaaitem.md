# BenchmarksAAItem

## Example Usage

```typescript
import { BenchmarksAAItem } from "@openrouter/sdk/models";

let value: BenchmarksAAItem = {
  aaName: "GPT-4o",
  agenticIndex: 58.3,
  codingIndex: 65.8,
  intelligenceIndex: 71.2,
  modelPermaslug: "openai/gpt-4o",
  pricing: {
    completion: "0.00001",
    prompt: "0.0000025",
  },
};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  | Example                                                                      |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `aaName`                                                                     | *string*                                                                     | :heavy_check_mark:                                                           | Model name as listed on Artificial Analysis.                                 | GPT-4o                                                                       |
| `agenticIndex`                                                               | *number*                                                                     | :heavy_check_mark:                                                           | Artificial Analysis Agentic Index composite score. Higher is better.         | 58.3                                                                         |
| `codingIndex`                                                                | *number*                                                                     | :heavy_check_mark:                                                           | Artificial Analysis Coding Index composite score. Higher is better.          | 65.8                                                                         |
| `intelligenceIndex`                                                          | *number*                                                                     | :heavy_check_mark:                                                           | Artificial Analysis Intelligence Index composite score. Higher is better.    | 71.2                                                                         |
| `modelPermaslug`                                                             | *string*                                                                     | :heavy_check_mark:                                                           | Stable OpenRouter model identifier.                                          | openai/gpt-4o                                                                |
| `pricing`                                                                    | [models.BenchmarkPricing](../models/benchmarkpricing.md)                     | :heavy_check_mark:                                                           | OpenRouter pricing per token for this model. Null if pricing is unavailable. | {<br/>"completion": "0.000015",<br/>"prompt": "0.000003"<br/>}               |