# UnprocessableEntityResponseErrorData

Error data for UnprocessableEntityResponse

## Example Usage

```typescript
import { UnprocessableEntityResponseErrorData } from "@openrouter/sdk/models";

let value: UnprocessableEntityResponseErrorData = {
  code: 422,
  message: "Invalid argument",
};
```

## Fields

| Field                 | Type                  | Required              | Description           |
| --------------------- | --------------------- | --------------------- | --------------------- |
| `code`                | *number*              | :heavy_check_mark:    | N/A                   |
| `message`             | *string*              | :heavy_check_mark:    | N/A                   |
| `metadata`            | Record<string, *any*> | :heavy_minus_sign:    | N/A                   |