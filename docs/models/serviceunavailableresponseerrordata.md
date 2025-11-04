# ServiceUnavailableResponseErrorData

Error data for ServiceUnavailableResponse

## Example Usage

```typescript
import { ServiceUnavailableResponseErrorData } from "@openrouter/sdk/models";

let value: ServiceUnavailableResponseErrorData = {
  code: 503,
  message: "Service temporarily unavailable",
};
```

## Fields

| Field                 | Type                  | Required              | Description           |
| --------------------- | --------------------- | --------------------- | --------------------- |
| `code`                | *number*              | :heavy_check_mark:    | N/A                   |
| `message`             | *string*              | :heavy_check_mark:    | N/A                   |
| `metadata`            | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |