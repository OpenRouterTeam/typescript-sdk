# FileSearchServerToolConfig

Configuration for the openrouter:file_search server tool

## Example Usage

```typescript
import { FileSearchServerToolConfig } from "@openrouter/sdk/models";

let value: FileSearchServerToolConfig = {
  vectorStoreIds: [
    "vs_abc123",
  ],
};
```

## Fields

| Field                                                                    | Type                                                                     | Required                                                                 | Description                                                              | Example                                                                  |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `filters`                                                                | *models.FileSearchServerToolConfigFiltersUnion*                          | :heavy_minus_sign:                                                       | Attribute filters to narrow search results.                              |                                                                          |
| `maxNumResults`                                                          | *number*                                                                 | :heavy_minus_sign:                                                       | Maximum number of results to return. Defaults to provider default.       | 20                                                                       |
| `rankingOptions`                                                         | [models.FileSearchRankingOptions](../models/filesearchrankingoptions.md) | :heavy_minus_sign:                                                       | Ranking options for file search results.                                 | {<br/>"ranker": "auto",<br/>"score_threshold": 0.5<br/>}                 |
| `vectorStoreIds`                                                         | *string*[]                                                               | :heavy_check_mark:                                                       | The IDs of the vector stores to search.                                  | [<br/>"vs_abc123"<br/>]                                                  |