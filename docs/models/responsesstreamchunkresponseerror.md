# ResponsesStreamChunkResponseError

## Example Usage

```typescript
import { ResponsesStreamChunkResponseError } from "@openrouter/sdk/models";

let value: ResponsesStreamChunkResponseError = {
  type: "response.error",
  error: {
    code: "<value>",
    message: "<value>",
  },
};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `type`                                                                       | [models.TypeResponseError](../models/typeresponseerror.md)                   | :heavy_check_mark:                                                           | N/A                                                                          |
| `error`                                                                      | [models.ResponsesStreamChunkError1](../models/responsesstreamchunkerror1.md) | :heavy_check_mark:                                                           | N/A                                                                          |