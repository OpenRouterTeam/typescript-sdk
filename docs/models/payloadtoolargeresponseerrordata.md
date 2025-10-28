# PayloadTooLargeResponseErrorData

Error data for PayloadTooLargeResponse

## Example Usage

```typescript
import { PayloadTooLargeResponseErrorData } from "@openrouter/sdk/models";

let value: PayloadTooLargeResponseErrorData = {
  code: 413,
  message: "Request payload too large",
  metadata: {
    "key": "<value>",
    "key1": "<value>",
    "key2": "<value>",
  },
};
```

## Fields

| Field                 | Type                  | Required              | Description           |
| --------------------- | --------------------- | --------------------- | --------------------- |
| `code`                | *number*              | :heavy_check_mark:    | N/A                   |
| `message`             | *string*              | :heavy_check_mark:    | N/A                   |
| `metadata`            | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |