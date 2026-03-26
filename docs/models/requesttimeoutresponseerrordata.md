# RequestTimeoutResponseErrorData

Error data for RequestTimeoutResponse

## Example Usage

```typescript
import { RequestTimeoutResponseErrorData } from "@openrouter/sdk/models";

let value: RequestTimeoutResponseErrorData = {
  code: 408,
  message: "Operation timed out. Please try again later.",
};
```

## Fields

| Field                 | Type                  | Required              | Description           |
| --------------------- | --------------------- | --------------------- | --------------------- |
| `code`                | *number*              | :heavy_check_mark:    | N/A                   |
| `message`             | *string*              | :heavy_check_mark:    | N/A                   |
| `metadata`            | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |