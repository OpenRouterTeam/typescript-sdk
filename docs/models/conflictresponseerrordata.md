# ConflictResponseErrorData

Error data for ConflictResponse

## Example Usage

```typescript
import { ConflictResponseErrorData } from "@openrouter/sdk/models";

let value: ConflictResponseErrorData = {
  code: 409,
  message: "Resource conflict. Please try again later.",
};
```

## Fields

| Field                 | Type                  | Required              | Description           |
| --------------------- | --------------------- | --------------------- | --------------------- |
| `code`                | *number*              | :heavy_check_mark:    | N/A                   |
| `message`             | *string*              | :heavy_check_mark:    | N/A                   |
| `metadata`            | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |