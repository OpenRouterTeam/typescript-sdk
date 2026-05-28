# OutputWebSearchServerToolItemAction

The search action performed, matching OpenAI web_search_call.action shape. Includes the query the model issued and optional source URLs returned by the search provider.

## Example Usage

```typescript
import { OutputWebSearchServerToolItemAction } from "@openrouter/sdk/models";

let value: OutputWebSearchServerToolItemAction = {
  query: "<value>",
  type: "search",
};
```

## Fields

| Field                                                                                                  | Type                                                                                                   | Required                                                                                               | Description                                                                                            |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `query`                                                                                                | *string*                                                                                               | :heavy_check_mark:                                                                                     | N/A                                                                                                    |
| `sources`                                                                                              | [models.Source](../models/source.md)[]                                                                 | :heavy_minus_sign:                                                                                     | N/A                                                                                                    |
| `type`                                                                                                 | [models.OutputWebSearchServerToolItemTypeSearch](../models/outputwebsearchservertoolitemtypesearch.md) | :heavy_check_mark:                                                                                     | N/A                                                                                                    |