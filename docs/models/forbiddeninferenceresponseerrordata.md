# ForbiddenInferenceResponseErrorData

Error data for ForbiddenInferenceResponse

## Example Usage

```typescript
import { ForbiddenInferenceResponseErrorData } from "@openrouter/sdk/models";

let value: ForbiddenInferenceResponseErrorData = {
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