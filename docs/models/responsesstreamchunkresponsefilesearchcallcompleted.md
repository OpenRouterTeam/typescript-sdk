# ResponsesStreamChunkResponseFileSearchCallCompleted

## Example Usage

```typescript
import { ResponsesStreamChunkResponseFileSearchCallCompleted } from "@openrouter/sdk/models";

let value: ResponsesStreamChunkResponseFileSearchCallCompleted = {
  type: "response.file_search_call.completed",
  itemId: "<id>",
  outputIndex: 5219.2,
  results: [
    {
      fileId: "<id>",
      filename: "example.file",
      score: 9157.25,
    },
  ],
};
```

## Fields

| Field                                                                                          | Type                                                                                           | Required                                                                                       | Description                                                                                    |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `type`                                                                                         | [models.TypeResponseFileSearchCallCompleted](../models/typeresponsefilesearchcallcompleted.md) | :heavy_check_mark:                                                                             | N/A                                                                                            |
| `itemId`                                                                                       | *string*                                                                                       | :heavy_check_mark:                                                                             | N/A                                                                                            |
| `outputIndex`                                                                                  | *number*                                                                                       | :heavy_check_mark:                                                                             | N/A                                                                                            |
| `results`                                                                                      | [models.Result](../models/result.md)[]                                                         | :heavy_check_mark:                                                                             | N/A                                                                                            |