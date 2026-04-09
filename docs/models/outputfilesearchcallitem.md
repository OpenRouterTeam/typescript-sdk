# OutputFileSearchCallItem

## Example Usage

```typescript
import { OutputFileSearchCallItem } from "@openrouter/sdk/models";

let value: OutputFileSearchCallItem = {
  id: "fs-abc123",
  queries: [
    "search term",
  ],
  status: "completed",
  type: "file_search_call",
};
```

## Fields

| Field                                                                            | Type                                                                             | Required                                                                         | Description                                                                      | Example                                                                          |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `id`                                                                             | *string*                                                                         | :heavy_check_mark:                                                               | N/A                                                                              |                                                                                  |
| `queries`                                                                        | *string*[]                                                                       | :heavy_check_mark:                                                               | N/A                                                                              |                                                                                  |
| `status`                                                                         | [models.WebSearchStatus](../models/websearchstatus.md)                           | :heavy_check_mark:                                                               | N/A                                                                              | completed                                                                        |
| `type`                                                                           | [models.OutputFileSearchCallItemType](../models/outputfilesearchcallitemtype.md) | :heavy_check_mark:                                                               | N/A                                                                              |                                                                                  |