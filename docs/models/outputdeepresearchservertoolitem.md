# OutputDeepResearchServerToolItem

An openrouter:deep_research server tool output item

## Example Usage

```typescript
import { OutputDeepResearchServerToolItem } from "@openrouter/sdk/models";

let value: OutputDeepResearchServerToolItem = {
  status: "completed",
  type: "openrouter:deep_research",
};
```

## Fields

| Field                                                                  | Type                                                                   | Required                                                               | Description                                                            | Example                                                                |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `fetchedUrls`                                                          | *string*[]                                                             | :heavy_minus_sign:                                                     | The URLs of pages fetched during this deep research call.              |                                                                        |
| `id`                                                                   | *string*                                                               | :heavy_minus_sign:                                                     | N/A                                                                    |                                                                        |
| `query`                                                                | *string*                                                               | :heavy_minus_sign:                                                     | N/A                                                                    |                                                                        |
| `status`                                                               | [models.ToolCallStatus](../models/toolcallstatus.md)                   | :heavy_check_mark:                                                     | N/A                                                                    | completed                                                              |
| `totalFetches`                                                         | *number*                                                               | :heavy_minus_sign:                                                     | The total number of pages fetched across all sub-queries.              |                                                                        |
| `totalSearches`                                                        | *number*                                                               | :heavy_minus_sign:                                                     | The total number of web search calls (primary + sub-queries) executed. |                                                                        |
| `type`                                                                 | *"openrouter:deep_research"*                                           | :heavy_check_mark:                                                     | N/A                                                                    |                                                                        |