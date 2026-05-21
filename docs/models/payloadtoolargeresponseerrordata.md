# PayloadTooLargeResponseErrorData

Error data for PayloadTooLargeResponse

## Example Usage

```typescript
import { PayloadTooLargeResponseErrorData } from "@openrouter/sdk/models";

let value: PayloadTooLargeResponseErrorData = {
  code: 413,
  message: "Request payload too large",
};
```

## Fields

| Field                                                        | Type                                                         | Required                                                     | Description                                                  | Example                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `code`                                                       | *number*                                                     | :heavy_check_mark:                                           | N/A                                                          |                                                              |
| `message`                                                    | *string*                                                     | :heavy_check_mark:                                           | N/A                                                          |                                                              |
| `metadata`                                                   | Record<string, *any*>                                        | :heavy_minus_sign:                                           | N/A                                                          |                                                              |
| `type`                                                       | *string*                                                     | :heavy_minus_sign:                                           | Machine-readable error type for programmatic classification. | payload_too_large                                            |