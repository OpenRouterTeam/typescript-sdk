# PaymentRequiredResponseErrorData

Error data for PaymentRequiredResponse

## Example Usage

```typescript
import { PaymentRequiredResponseErrorData } from "@openrouter/sdk/models";

let value: PaymentRequiredResponseErrorData = {
  code: 402,
  message: "Insufficient credits. Add more using https://openrouter.ai/credits",
  metadata: null,
};
```

## Fields

| Field                 | Type                  | Required              | Description           |
| --------------------- | --------------------- | --------------------- | --------------------- |
| `code`                | *number*              | :heavy_check_mark:    | N/A                   |
| `message`             | *string*              | :heavy_check_mark:    | N/A                   |
| `metadata`            | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |