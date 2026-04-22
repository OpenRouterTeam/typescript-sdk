# FileSearchRankingOptions

Ranking options for file search results.

## Example Usage

```typescript
import { FileSearchRankingOptions } from "@openrouter/sdk/models";

let value: FileSearchRankingOptions = {};
```

## Fields

| Field                                                                                | Type                                                                                 | Required                                                                             | Description                                                                          | Example                                                                              |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `ranker`                                                                             | [models.FileSearchRankingOptionsRanker](../models/filesearchrankingoptionsranker.md) | :heavy_minus_sign:                                                                   | The ranking algorithm to use.                                                        | auto                                                                                 |
| `scoreThreshold`                                                                     | *number*                                                                             | :heavy_minus_sign:                                                                   | Minimum score threshold for results.                                                 | 0.5                                                                                  |