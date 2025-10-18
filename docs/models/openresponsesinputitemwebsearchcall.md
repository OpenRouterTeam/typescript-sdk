# OpenResponsesInputItemWebSearchCall

## Example Usage

```typescript
import { OpenResponsesInputItemWebSearchCall } from "@openrouter/sdk/models";

let value: OpenResponsesInputItemWebSearchCall = {
  type: "web_search_call",
  id: "search-abc123",
  status: "completed",
};
```

## Fields

| Field                                                                                                  | Type                                                                                                   | Required                                                                                               | Description                                                                                            | Example                                                                                                |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `type`                                                                                                 | [models.OpenResponsesInputItemTypeWebSearchCall](../models/openresponsesinputitemtypewebsearchcall.md) | :heavy_check_mark:                                                                                     | N/A                                                                                                    |                                                                                                        |
| `id`                                                                                                   | *string*                                                                                               | :heavy_check_mark:                                                                                     | N/A                                                                                                    |                                                                                                        |
| `status`                                                                                               | [models.WebSearchStatus](../models/websearchstatus.md)                                                 | :heavy_check_mark:                                                                                     | N/A                                                                                                    | completed                                                                                              |