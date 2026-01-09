# BadGatewayResponseErrorData

Error data for BadGatewayResponse

## Example Usage

```typescript
import { BadGatewayResponseErrorData } from "@openrouter/sdk/models";

let value: BadGatewayResponseErrorData = {
  code: 502,
  message: "Provider returned error",
};
```

## Fields

| Field                 | Type                  | Required              | Description           |
| --------------------- | --------------------- | --------------------- | --------------------- |
| `code`                | *number*              | :heavy_check_mark:    | N/A                   |
| `message`             | *string*              | :heavy_check_mark:    | N/A                   |
| `metadata`            | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |