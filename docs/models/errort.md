# ErrorT

Error object structure

## Example Usage

```typescript
import { ErrorT } from "open-router/models";

let value: ErrorT = {
  code: null,
  message: "<value>",
};
```

## Fields

| Field              | Type               | Required           | Description        |
| ------------------ | ------------------ | ------------------ | ------------------ |
| `code`             | *number*           | :heavy_check_mark: | N/A                |
| `message`          | *string*           | :heavy_check_mark: | N/A                |
| `param`            | *string*           | :heavy_minus_sign: | N/A                |
| `type`             | *string*           | :heavy_minus_sign: | N/A                |