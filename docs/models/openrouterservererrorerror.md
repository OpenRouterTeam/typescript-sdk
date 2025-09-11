# OpenRouterServerErrorError

Error object structure

## Example Usage

```typescript
import { OpenRouterServerErrorError } from "open-router/models";

let value: OpenRouterServerErrorError = {
  code: 7105.14,
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