# ErrorResponseError

## Example Usage

```typescript
import { ErrorResponseError } from "@openrouter/sdk/models";

let value: ErrorResponseError = {
  code: 511,
  message: "<value>",
};
```

## Fields

| Field                                    | Type                                     | Required                                 | Description                              |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| `code`                                   | [models.CodeEnum](../models/codeenum.md) | :heavy_check_mark:                       | N/A                                      |
| `message`                                | *string*                                 | :heavy_check_mark:                       | N/A                                      |
| `metadata`                               | Record<string, *any*>                    | :heavy_minus_sign:                       | N/A                                      |