# OutputFileSearchCallItem

## Example Usage

```typescript
import { OutputFileSearchCallItem } from "@openrouter/sdk/models";

let value: OutputFileSearchCallItem = {
  type: "file_search_call",
  id: "filesearch-abc123",
  queries: [
    "machine learning algorithms",
    "neural networks",
  ],
  status: "completed",
};
```

## Fields

| Field                                                                            | Type                                                                             | Required                                                                         | Description                                                                      | Example                                                                          |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `type`                                                                           | [models.OutputFileSearchCallItemType](../models/outputfilesearchcallitemtype.md) | :heavy_check_mark:                                                               | N/A                                                                              |                                                                                  |
| `id`                                                                             | *string*                                                                         | :heavy_check_mark:                                                               | N/A                                                                              |                                                                                  |
| `queries`                                                                        | *string*[]                                                                       | :heavy_check_mark:                                                               | N/A                                                                              |                                                                                  |
| `status`                                                                         | [models.WebSearchStatus](../models/websearchstatus.md)                           | :heavy_check_mark:                                                               | N/A                                                                              | completed                                                                        |