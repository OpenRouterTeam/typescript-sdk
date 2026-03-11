# OpenResponsesFileSearchTool

File search tool configuration

## Example Usage

```typescript
import { OpenResponsesFileSearchTool } from "@openrouter/sdk/models";

let value: OpenResponsesFileSearchTool = {
  type: "file_search",
  vectorStoreIds: [
    "vs_abc123",
  ],
};
```

## Fields

| Field                                                | Type                                                 | Required                                             | Description                                          |
| ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| `type`                                               | *"file_search"*                                      | :heavy_check_mark:                                   | N/A                                                  |
| `vectorStoreIds`                                     | *string*[]                                           | :heavy_check_mark:                                   | N/A                                                  |
| `filters`                                            | *models.Filters*                                     | :heavy_minus_sign:                                   | N/A                                                  |
| `maxNumResults`                                      | *number*                                             | :heavy_minus_sign:                                   | N/A                                                  |
| `rankingOptions`                                     | [models.RankingOptions](../models/rankingoptions.md) | :heavy_minus_sign:                                   | N/A                                                  |