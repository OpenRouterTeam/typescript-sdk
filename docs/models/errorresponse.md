# ErrorResponse

Error response

## Example Usage

```typescript
import { ErrorResponse } from "@openrouter/sdk/models";

let value: ErrorResponse = {
  error: {
    code: 400,
    message: "Invalid request parameters",
    metadata: {
      "field": "temperature",
      "reason": "Must be between 0 and 2",
    },
  },
  userId: "user-abc123",
};
```

## Fields

| Field                                                        | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `error`                                                      | [models.ErrorResponseError](../models/errorresponseerror.md) | :heavy_check_mark:                                           | N/A                                                          |
| `userId`                                                     | *string*                                                     | :heavy_minus_sign:                                           | N/A                                                          |