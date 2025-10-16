# OpenResponsesInputItemFileSearchCall

## Example Usage

```typescript
import { OpenResponsesInputItemFileSearchCall } from "@openrouter/sdk/models";

let value: OpenResponsesInputItemFileSearchCall = {
  type: "file_search_call",
  id: "<id>",
  queries: [
    "<value 1>",
    "<value 2>",
  ],
  status: "failed",
};
```

## Fields

| Field                                                                                                    | Type                                                                                                     | Required                                                                                                 | Description                                                                                              |
| -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `type`                                                                                                   | [models.OpenResponsesInputItemTypeFileSearchCall](../models/openresponsesinputitemtypefilesearchcall.md) | :heavy_check_mark:                                                                                       | N/A                                                                                                      |
| `id`                                                                                                     | *string*                                                                                                 | :heavy_check_mark:                                                                                       | N/A                                                                                                      |
| `queries`                                                                                                | *string*[]                                                                                               | :heavy_check_mark:                                                                                       | N/A                                                                                                      |
| `status`                                                                                                 | [models.WebSearchStatus](../models/websearchstatus.md)                                                   | :heavy_check_mark:                                                                                       | N/A                                                                                                      |