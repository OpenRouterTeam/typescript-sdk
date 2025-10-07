# ResponseFailed

## Example Usage

```typescript
import { ResponseFailed } from "@openrouter/sdk/models";

let value: ResponseFailed = {
  id: "<id>",
  status: "failed",
  error: {
    code: "<value>",
    message: "<value>",
  },
};
```

## Fields

| Field                                            | Type                                             | Required                                         | Description                                      |
| ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ |
| `id`                                             | *string*                                         | :heavy_check_mark:                               | N/A                                              |
| `status`                                         | [models.StatusFailed](../models/statusfailed.md) | :heavy_check_mark:                               | N/A                                              |
| `error`                                          | [models.ErrorFailed](../models/errorfailed.md)   | :heavy_check_mark:                               | N/A                                              |