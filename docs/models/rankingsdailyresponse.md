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
      modelPermaslug: "anthropic/claude-3.5-sonnet-20241022",
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

| Field                                                                                                                                                                                                                                | Type                                                                                                                                                                                                                                 | Required                                                                                                                                                                                                                             | Description                                                                                                                                                                                                                          | Example                                                                                                                                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `data`                                                                                                                                                                                                                               | [models.RankingsDailyItem](../models/rankingsdailyitem.md)[]                                                                                                                                                                         | :heavy_check_mark:                                                                                                                                                                                                                   | One row per `(date, model_permaslug)` pair, covering every public model that recorded traffic in the window. Rows are sorted by `date` ascending, then by `total_tokens` descending. Ties break alphabetically on `model_permaslug`. |                                                                                                                                                                                                                                      |
| `meta`                                                                                                                                                                                                                               | [models.RankingsDailyMeta](../models/rankingsdailymeta.md)                                                                                                                                                                           | :heavy_check_mark:                                                                                                                                                                                                                   | N/A                                                                                                                                                                                                                                  | {<br/>"as_of": "2026-05-12T02:00:00Z",<br/>"end_date": "2026-05-11",<br/>"start_date": "2026-04-12",<br/>"version": "v1"<br/>}                                                                                                       |