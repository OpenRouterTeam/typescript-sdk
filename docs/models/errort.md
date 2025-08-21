# ErrorT

Error object structure

## Example Usage

```typescript
import { ErrorT } from "open-router/models";

let value: ErrorT = {
  code: null,
  message: "<value>",
  param: "<value>",
  type: "<value>",
};
```

## Fields

| Field              | Type               | Required           | Description        |
| ------------------ | ------------------ | ------------------ | ------------------ |
| `code`             | *string*           | :heavy_check_mark: | N/A                |
| `message`          | *string*           | :heavy_check_mark: | N/A                |
| `param`            | *string*           | :heavy_check_mark: | N/A                |
| `type`             | *string*           | :heavy_check_mark: | N/A                |