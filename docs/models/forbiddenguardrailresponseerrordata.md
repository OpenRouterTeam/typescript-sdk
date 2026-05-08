# ForbiddenGuardrailResponseErrorData

Error data for ForbiddenGuardrailResponse

## Example Usage

```typescript
import { ForbiddenGuardrailResponseErrorData } from "@openrouter/sdk/models";

let value: ForbiddenGuardrailResponseErrorData = {
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