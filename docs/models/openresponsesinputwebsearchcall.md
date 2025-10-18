# OpenResponsesInputWebSearchCall

## Example Usage

```typescript
import { OpenResponsesInputWebSearchCall } from "@openrouter/sdk/models";

let value: OpenResponsesInputWebSearchCall = {
  type: "web_search_call",
  id: "search-abc123",
  status: "completed",
};
```

## Fields

| Field                                                                                          | Type                                                                                           | Required                                                                                       | Description                                                                                    | Example                                                                                        |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `type`                                                                                         | [models.OpenResponsesInputTypeWebSearchCall](../models/openresponsesinputtypewebsearchcall.md) | :heavy_check_mark:                                                                             | N/A                                                                                            |                                                                                                |
| `id`                                                                                           | *string*                                                                                       | :heavy_check_mark:                                                                             | N/A                                                                                            |                                                                                                |
| `status`                                                                                       | [models.WebSearchStatus](../models/websearchstatus.md)                                         | :heavy_check_mark:                                                                             | N/A                                                                                            | completed                                                                                      |