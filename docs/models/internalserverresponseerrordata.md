# InternalServerResponseErrorData

Error data for InternalServerResponse

## Example Usage

```typescript
import { InternalServerResponseErrorData } from "@openrouter/sdk/models";

let value: InternalServerResponseErrorData = {
  code: 500,
  message: "Internal Server Error",
  metadata: null,
};
```

## Fields

| Field                 | Type                  | Required              | Description           |
| --------------------- | --------------------- | --------------------- | --------------------- |
| `code`                | *number*              | :heavy_check_mark:    | N/A                   |
| `message`             | *string*              | :heavy_check_mark:    | N/A                   |
| `metadata`            | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |