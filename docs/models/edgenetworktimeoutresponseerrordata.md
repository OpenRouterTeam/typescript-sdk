# EdgeNetworkTimeoutResponseErrorData

Error data for EdgeNetworkTimeoutResponse

## Example Usage

```typescript
import { EdgeNetworkTimeoutResponseErrorData } from "@openrouter/sdk/models";

let value: EdgeNetworkTimeoutResponseErrorData = {
  code: 524,
  message: "Request timed out. Please try again later.",
  metadata: {
    "key": "<value>",
  },
};
```

## Fields

| Field                 | Type                  | Required              | Description           |
| --------------------- | --------------------- | --------------------- | --------------------- |
| `code`                | *number*              | :heavy_check_mark:    | N/A                   |
| `message`             | *string*              | :heavy_check_mark:    | N/A                   |
| `metadata`            | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |