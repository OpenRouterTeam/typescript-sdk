# OpenResponsesInputItemFileSearchCall

## Example Usage

```typescript
import { OpenResponsesInputItemFileSearchCall } from "@openrouter/sdk/models";

let value: OpenResponsesInputItemFileSearchCall = {
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

| Field                                                                                                    | Type                                                                                                     | Required                                                                                                 | Description                                                                                              | Example                                                                                                  |
| -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `type`                                                                                                   | [models.OpenResponsesInputItemTypeFileSearchCall](../models/openresponsesinputitemtypefilesearchcall.md) | :heavy_check_mark:                                                                                       | N/A                                                                                                      |                                                                                                          |
| `id`                                                                                                     | *string*                                                                                                 | :heavy_check_mark:                                                                                       | N/A                                                                                                      |                                                                                                          |
| `queries`                                                                                                | *string*[]                                                                                               | :heavy_check_mark:                                                                                       | N/A                                                                                                      |                                                                                                          |
| `status`                                                                                                 | [models.WebSearchStatus](../models/websearchstatus.md)                                                   | :heavy_check_mark:                                                                                       | N/A                                                                                                      | completed                                                                                                |