# InternalServerResponseErrorData

Error data for InternalServerResponse

## Example Usage

```typescript
import { InternalServerResponseErrorData } from "@openrouter/sdk/models";

let value: InternalServerResponseErrorData = {
  code: 500,
  message: "Internal Server Error",
};
```

## Fields

| Field                                                        | Type                                                         | Required                                                     | Description                                                  | Example                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `code`                                                       | *number*                                                     | :heavy_check_mark:                                           | N/A                                                          |                                                              |
| `message`                                                    | *string*                                                     | :heavy_check_mark:                                           | N/A                                                          |                                                              |
| `metadata`                                                   | Record<string, *any*>                                        | :heavy_minus_sign:                                           | N/A                                                          |                                                              |
| `type`                                                       | *string*                                                     | :heavy_minus_sign:                                           | Machine-readable error type for programmatic classification. | server                                                       |