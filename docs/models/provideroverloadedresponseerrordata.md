# ProviderOverloadedResponseErrorData

Error data for ProviderOverloadedResponse

## Example Usage

```typescript
import { ProviderOverloadedResponseErrorData } from "@openrouter/sdk/models";

let value: ProviderOverloadedResponseErrorData = {
  code: 529,
  message: "Provider returned error",
};
```

## Fields

| Field                 | Type                  | Required              | Description           |
| --------------------- | --------------------- | --------------------- | --------------------- |
| `code`                | *number*              | :heavy_check_mark:    | N/A                   |
| `message`             | *string*              | :heavy_check_mark:    | N/A                   |
| `metadata`            | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |