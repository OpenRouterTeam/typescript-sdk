# TooManyRequestsResponseErrorData

Error data for TooManyRequestsResponse

## Example Usage

```typescript
import { TooManyRequestsResponseErrorData } from "@openrouter/sdk/models";

let value: TooManyRequestsResponseErrorData = {
  code: 429,
  message: "Rate limit exceeded",
  metadata: {
    "key": "<value>",
    "key1": "<value>",
  },
};
```

## Fields

| Field                 | Type                  | Required              | Description           |
| --------------------- | --------------------- | --------------------- | --------------------- |
| `code`                | *number*              | :heavy_check_mark:    | N/A                   |
| `message`             | *string*              | :heavy_check_mark:    | N/A                   |
| `metadata`            | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |