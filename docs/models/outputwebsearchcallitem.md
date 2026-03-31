# OutputWebSearchCallItem

## Example Usage

```typescript
import { OutputWebSearchCallItem } from "@openrouter/sdk/models";

let value: OutputWebSearchCallItem = {
  type: "web_search_call",
  id: "search-abc123",
  action: {
    type: "search",
    query: "OpenAI API",
  },
  status: "completed",
};
```

## Fields

| Field                                                      | Type                                                       | Required                                                   | Description                                                | Example                                                    |
| ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `type`                                                     | [models.TypeWebSearchCall](../models/typewebsearchcall.md) | :heavy_check_mark:                                         | N/A                                                        |                                                            |
| `id`                                                       | *string*                                                   | :heavy_check_mark:                                         | N/A                                                        |                                                            |
| `action`                                                   | *models.Action*                                            | :heavy_check_mark:                                         | N/A                                                        |                                                            |
| `status`                                                   | [models.WebSearchStatus](../models/websearchstatus.md)     | :heavy_check_mark:                                         | N/A                                                        | completed                                                  |