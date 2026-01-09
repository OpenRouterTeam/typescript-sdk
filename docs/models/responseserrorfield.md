# ResponsesErrorField

Error information returned from the API

## Example Usage

```typescript
import { ResponsesErrorField } from "@openrouter/sdk/models";

let value: ResponsesErrorField = {
  code: "rate_limit_exceeded",
  message: "Rate limit exceeded. Please try again later.",
};
```

## Fields

| Field                                    | Type                                     | Required                                 | Description                              |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| `code`                                   | [models.CodeEnum](../models/codeenum.md) | :heavy_check_mark:                       | N/A                                      |
| `message`                                | *string*                                 | :heavy_check_mark:                       | N/A                                      |