# BenchmarksAAMeta

## Example Usage

```typescript
import { BenchmarksAAMeta } from "@openrouter/sdk/models";

let value: BenchmarksAAMeta = {
  asOf: "2026-06-03T12:00:00Z",
  category: null,
  citation:
    "Source: Artificial Analysis (artificialanalysis.ai) via OpenRouter (openrouter.ai/rankings).",
  modelCount: 50,
  source: "artificial-analysis",
  sourceUrl: "https://artificialanalysis.ai",
  version: "v1",
};
```

## Fields

| Field                                                                                        | Type                                                                                         | Required                                                                                     | Description                                                                                  | Example                                                                                      |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `asOf`                                                                                       | *string*                                                                                     | :heavy_check_mark:                                                                           | ISO-8601 timestamp of when this data was generated.                                          | 2026-06-03T12:00:00Z                                                                         |
| `category`                                                                                   | *string*                                                                                     | :heavy_check_mark:                                                                           | The category filter applied, or null if showing all.                                         |                                                                                              |
| `citation`                                                                                   | *string*                                                                                     | :heavy_check_mark:                                                                           | Required attribution when republishing this data.                                            | Source: Artificial Analysis (artificialanalysis.ai) via OpenRouter (openrouter.ai/rankings). |
| `modelCount`                                                                                 | *number*                                                                                     | :heavy_check_mark:                                                                           | Number of models in the response.                                                            |                                                                                              |
| `source`                                                                                     | [models.BenchmarksAAMetaSource](../models/benchmarksaametasource.md)                         | :heavy_check_mark:                                                                           | Data source identifier.                                                                      |                                                                                              |
| `sourceUrl`                                                                                  | [models.BenchmarksAAMetaSourceUrl](../models/benchmarksaametasourceurl.md)                   | :heavy_check_mark:                                                                           | URL of the upstream data source.                                                             |                                                                                              |
| `version`                                                                                    | [models.BenchmarksAAMetaVersion](../models/benchmarksaametaversion.md)                       | :heavy_check_mark:                                                                           | Dataset version.                                                                             |                                                                                              |