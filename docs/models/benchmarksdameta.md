# BenchmarksDAMeta

## Example Usage

```typescript
import { BenchmarksDAMeta } from "@openrouter/sdk/models";

let value: BenchmarksDAMeta = {
  arena: "models",
  asOf: "2026-06-03T12:00:00Z",
  category: null,
  citation:
    "Source: Design Arena (www.designarena.ai) via OpenRouter (openrouter.ai/rankings).",
  eloBounds: {
    max: 1600,
    min: 900,
  },
  modelCount: 50,
  source: "design-arena",
  sourceUrl: "https://www.designarena.ai",
  version: "v1",
};
```

## Fields

| Field                                                                              | Type                                                                               | Required                                                                           | Description                                                                        | Example                                                                            |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `arena`                                                                            | *string*                                                                           | :heavy_check_mark:                                                                 | The arena filter applied.                                                          |                                                                                    |
| `asOf`                                                                             | *string*                                                                           | :heavy_check_mark:                                                                 | ISO-8601 timestamp of when this data was generated.                                | 2026-06-03T12:00:00Z                                                               |
| `category`                                                                         | *string*                                                                           | :heavy_check_mark:                                                                 | The category filter applied, or null if showing all.                               |                                                                                    |
| `citation`                                                                         | *string*                                                                           | :heavy_check_mark:                                                                 | Required attribution when republishing this data.                                  | Source: Design Arena (www.designarena.ai) via OpenRouter (openrouter.ai/rankings). |
| `eloBounds`                                                                        | [models.EloBounds](../models/elobounds.md)                                         | :heavy_check_mark:                                                                 | ELO range across all returned models for normalization.                            |                                                                                    |
| `modelCount`                                                                       | *number*                                                                           | :heavy_check_mark:                                                                 | Number of unique models in the response.                                           |                                                                                    |
| `source`                                                                           | [models.SourceEnum](../models/sourceenum.md)                                       | :heavy_check_mark:                                                                 | Data source identifier.                                                            |                                                                                    |
| `sourceUrl`                                                                        | [models.SourceUrl](../models/sourceurl.md)                                         | :heavy_check_mark:                                                                 | URL of the upstream data source.                                                   |                                                                                    |
| `version`                                                                          | [models.BenchmarksDAMetaVersion](../models/benchmarksdametaversion.md)             | :heavy_check_mark:                                                                 | Dataset version.                                                                   |                                                                                    |