# ErrorResponse

Error response

## Example Usage

```typescript
import { ErrorResponse } from "@openrouter/sdk/models";

let value: ErrorResponse = {
  error: {
    code: 451,
    message: "<value>",
    metadata: {
      "key": "<value>",
    },
  },
  userId: "<id>",
};
```

## Fields

| Field                                                        | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `error`                                                      | [models.ErrorResponseError](../models/errorresponseerror.md) | :heavy_check_mark:                                           | N/A                                                          |
| `userId`                                                     | *string*                                                     | :heavy_minus_sign:                                           | N/A                                                          |