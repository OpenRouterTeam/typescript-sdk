# GatewayTimeoutResponseErrorData

Error data for GatewayTimeoutResponse

## Example Usage

```typescript
import { GatewayTimeoutResponseErrorData } from "@openrouter/sdk/models";

let value: GatewayTimeoutResponseErrorData = {
  code: 504,
  message: "Request timed out. Please try again later.",
};
```

## Fields

| Field                 | Type                  | Required              | Description           |
| --------------------- | --------------------- | --------------------- | --------------------- |
| `code`                | *number*              | :heavy_check_mark:    | N/A                   |
| `message`             | *string*              | :heavy_check_mark:    | N/A                   |
| `metadata`            | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |