# RankingsDailyResponse

## Example Usage

```typescript
import { RankingsDailyResponse } from "@openrouter/sdk/models";

let value: RankingsDailyResponse = {
  data: [
    {
      date: "2026-05-11",
      modelPermaslug: "openai/gpt-4o-2024-05-13",
      totalTokens: "12345678",
    },
    {
      date: "2026-05-11",
      modelPermaslug: "other",
      totalTokens: "9876543",
    },
  ],
  meta: {
    asOf: "2026-05-12T02:00:00Z",
    endDate: "2026-05-11",
    startDate: "2026-04-12",
    version: "v1",
  },
};
```

## Fields

| Field                                                                                                                                                                                                                            | Type                                                                                                                                                                                                                             | Required                                                                                                                                                                                                                         | Description                                                                                                                                                                                                                      | Example                                                                                                                                                                                                                          |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`                                                                                                                                                                                                                           | [models.RankingsDailyItem](../models/rankingsdailyitem.md)[]                                                                                                                                                                     | :heavy_check_mark:                                                                                                                                                                                                               | Rows are sorted by `date` ascending. Within each date the top-N entries are sorted by `total_tokens` descending, and the `other` row (if present) always appears last — after all top-N entries — regardless of its token count. |                                                                                                                                                                                                                                  |
| `meta`                                                                                                                                                                                                                           | [models.RankingsDailyMeta](../models/rankingsdailymeta.md)                                                                                                                                                                       | :heavy_check_mark:                                                                                                                                                                                                               | N/A                                                                                                                                                                                                                              | {<br/>"as_of": "2026-05-12T02:00:00Z",<br/>"end_date": "2026-05-11",<br/>"start_date": "2026-04-12",<br/>"version": "v1"<br/>}                                                                                                   |