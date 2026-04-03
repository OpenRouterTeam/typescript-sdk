# GoneResponseErrorData

Error data for GoneResponse

## Example Usage

```typescript
import { GoneResponseErrorData } from "@openrouter/sdk/models";

let value: GoneResponseErrorData = {
  code: 410,
  message:
    "The Coinbase APIs used by this endpoint have been deprecated, so the Coinbase Commerce credits API has been removed. Use the web credits purchase flow instead.",
};
```

## Fields

| Field                 | Type                  | Required              | Description           |
| --------------------- | --------------------- | --------------------- | --------------------- |
| `code`                | *number*              | :heavy_check_mark:    | N/A                   |
| `message`             | *string*              | :heavy_check_mark:    | N/A                   |
| `metadata`            | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |