# ActionSearch

## Example Usage

```typescript
import { ActionSearch } from "@openrouter/sdk/models";

let value: ActionSearch = {
  query: "<value>",
  type: "search",
};
```

## Fields

| Field                                                    | Type                                                     | Required                                                 | Description                                              |
| -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- |
| `queries`                                                | *string*[]                                               | :heavy_minus_sign:                                       | N/A                                                      |
| `query`                                                  | *string*                                                 | :heavy_check_mark:                                       | N/A                                                      |
| `sources`                                                | [models.WebSearchSource](../models/websearchsource.md)[] | :heavy_minus_sign:                                       | N/A                                                      |
| `type`                                                   | *"search"*                                               | :heavy_check_mark:                                       | N/A                                                      |