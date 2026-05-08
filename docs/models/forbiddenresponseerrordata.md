# ForbiddenResponseErrorData

Error data for ForbiddenResponse

## Example Usage

```typescript
import { ForbiddenResponseErrorData } from "@openrouter/sdk/models";

let value: ForbiddenResponseErrorData = {
  code: 403,
  message: "Your prompt was blocked by a guardrail policy",
};
```

## Fields

| Field                 | Type                  | Required              | Description           |
| --------------------- | --------------------- | --------------------- | --------------------- |
| `code`                | *number*              | :heavy_check_mark:    | N/A                   |
| `message`             | *string*              | :heavy_check_mark:    | N/A                   |
| `metadata`            | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |