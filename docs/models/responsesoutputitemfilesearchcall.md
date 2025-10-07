# ResponsesOutputItemFileSearchCall

File search call output item

## Example Usage

```typescript
import { ResponsesOutputItemFileSearchCall } from "@openrouter/sdk/models";

let value: ResponsesOutputItemFileSearchCall = {
  type: "file_search_call",
  id: "<id>",
  queries: [
    "<value 1>",
  ],
  status: "failed",
};
```

## Fields

| Field                                                                                                  | Type                                                                                                   | Required                                                                                               | Description                                                                                            |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `type`                                                                                                 | [models.ResponsesOutputItemFileSearchCallType](../models/responsesoutputitemfilesearchcalltype.md)     | :heavy_check_mark:                                                                                     | N/A                                                                                                    |
| `id`                                                                                                   | *string*                                                                                               | :heavy_check_mark:                                                                                     | N/A                                                                                                    |
| `queries`                                                                                              | *string*[]                                                                                             | :heavy_check_mark:                                                                                     | N/A                                                                                                    |
| `status`                                                                                               | [models.ResponsesOutputItemFileSearchCallStatus](../models/responsesoutputitemfilesearchcallstatus.md) | :heavy_check_mark:                                                                                     | N/A                                                                                                    |