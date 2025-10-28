# UnauthorizedResponseErrorData

Error data for UnauthorizedResponse

## Example Usage

```typescript
import { UnauthorizedResponseErrorData } from "@openrouter/sdk/models";

let value: UnauthorizedResponseErrorData = {
  code: 401,
  message: "Missing Authentication header",
  metadata: null,
};
```

## Fields

| Field                 | Type                  | Required              | Description           |
| --------------------- | --------------------- | --------------------- | --------------------- |
| `code`                | *number*              | :heavy_check_mark:    | N/A                   |
| `message`             | *string*              | :heavy_check_mark:    | N/A                   |
| `metadata`            | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |