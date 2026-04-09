# OutputWebSearchCallItem

## Example Usage

```typescript
import { OutputWebSearchCallItem } from "@openrouter/sdk/models";

let value: OutputWebSearchCallItem = {
  action: {
    pattern: "<value>",
    type: "find_in_page",
    url: "https://faraway-deduction.net",
  },
  id: "ws-abc123",
  status: "completed",
  type: "web_search_call",
};
```

## Fields

| Field                                                      | Type                                                       | Required                                                   | Description                                                | Example                                                    |
| ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `action`                                                   | *models.Action*                                            | :heavy_check_mark:                                         | N/A                                                        |                                                            |
| `id`                                                       | *string*                                                   | :heavy_check_mark:                                         | N/A                                                        |                                                            |
| `status`                                                   | [models.WebSearchStatus](../models/websearchstatus.md)     | :heavy_check_mark:                                         | N/A                                                        | completed                                                  |
| `type`                                                     | [models.TypeWebSearchCall](../models/typewebsearchcall.md) | :heavy_check_mark:                                         | N/A                                                        |                                                            |