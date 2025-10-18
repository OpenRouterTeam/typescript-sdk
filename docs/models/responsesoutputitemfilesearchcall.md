# ResponsesOutputItemFileSearchCall

## Example Usage

```typescript
import { ResponsesOutputItemFileSearchCall } from "@openrouter/sdk/models";

let value: ResponsesOutputItemFileSearchCall = {
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

| Field                                                                                              | Type                                                                                               | Required                                                                                           | Description                                                                                        | Example                                                                                            |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `type`                                                                                             | [models.ResponsesOutputItemTypeFileSearchCall](../models/responsesoutputitemtypefilesearchcall.md) | :heavy_check_mark:                                                                                 | N/A                                                                                                |                                                                                                    |
| `id`                                                                                               | *string*                                                                                           | :heavy_check_mark:                                                                                 | N/A                                                                                                |                                                                                                    |
| `queries`                                                                                          | *string*[]                                                                                         | :heavy_check_mark:                                                                                 | N/A                                                                                                |                                                                                                    |
| `status`                                                                                           | [models.WebSearchStatus](../models/websearchstatus.md)                                             | :heavy_check_mark:                                                                                 | N/A                                                                                                | completed                                                                                          |