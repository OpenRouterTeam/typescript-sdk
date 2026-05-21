# UnauthorizedResponseErrorData

Error data for UnauthorizedResponse

## Example Usage

```typescript
import { UnauthorizedResponseErrorData } from "@openrouter/sdk/models";

let value: UnauthorizedResponseErrorData = {
  code: 401,
  message: "Missing Authentication header",
};
```

## Fields

| Field                                                        | Type                                                         | Required                                                     | Description                                                  | Example                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `code`                                                       | *number*                                                     | :heavy_check_mark:                                           | N/A                                                          |                                                              |
| `message`                                                    | *string*                                                     | :heavy_check_mark:                                           | N/A                                                          |                                                              |
| `metadata`                                                   | Record<string, *any*>                                        | :heavy_minus_sign:                                           | N/A                                                          |                                                              |
| `type`                                                       | *string*                                                     | :heavy_minus_sign:                                           | Machine-readable error type for programmatic classification. | authentication                                               |