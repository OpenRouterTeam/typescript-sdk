# BadRequestResponseErrorData

Error data for BadRequestResponse

## Example Usage

```typescript
import { BadRequestResponseErrorData } from "@openrouter/sdk/models";

let value: BadRequestResponseErrorData = {
  code: 400,
  message: "Invalid request parameters",
};
```

## Fields

| Field                 | Type                  | Required              | Description           |
| --------------------- | --------------------- | --------------------- | --------------------- |
| `code`                | *number*              | :heavy_check_mark:    | N/A                   |
| `message`             | *string*              | :heavy_check_mark:    | N/A                   |
| `metadata`            | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |