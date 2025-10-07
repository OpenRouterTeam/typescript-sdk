# ResponsesStreamChunkResponseFailed

## Example Usage

```typescript
import { ResponsesStreamChunkResponseFailed } from "@openrouter/sdk/models";

let value: ResponsesStreamChunkResponseFailed = {
  type: "response.failed",
  response: {
    id: "<id>",
    status: "failed",
    error: {
      code: "<value>",
      message: "<value>",
    },
  },
};
```

## Fields

| Field                                                        | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `type`                                                       | [models.TypeResponseFailed](../models/typeresponsefailed.md) | :heavy_check_mark:                                           | N/A                                                          |
| `response`                                                   | [models.ResponseFailed](../models/responsefailed.md)         | :heavy_check_mark:                                           | N/A                                                          |