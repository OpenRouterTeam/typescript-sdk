# NotFoundResponseErrorData

Error data for NotFoundResponse

## Example Usage

```typescript
import { NotFoundResponseErrorData } from "@openrouter/sdk/models";

let value: NotFoundResponseErrorData = {
  code: 404,
  message: "Resource not found",
};
```

## Fields

| Field                                                        | Type                                                         | Required                                                     | Description                                                  | Example                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `code`                                                       | *number*                                                     | :heavy_check_mark:                                           | N/A                                                          |                                                              |
| `message`                                                    | *string*                                                     | :heavy_check_mark:                                           | N/A                                                          |                                                              |
| `metadata`                                                   | Record<string, *any*>                                        | :heavy_minus_sign:                                           | N/A                                                          |                                                              |
| `type`                                                       | *string*                                                     | :heavy_minus_sign:                                           | Machine-readable error type for programmatic classification. | not_found                                                    |