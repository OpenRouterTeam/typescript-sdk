# ErrorT

Error details

## Example Usage

```typescript
import { ErrorT } from "openrouter/models/operations";

let value: ErrorT = {
  code: 400,
  message: "Bad Request",
};
```

## Fields

| Field              | Type               | Required           | Description        | Example            |
| ------------------ | ------------------ | ------------------ | ------------------ | ------------------ |
| `code`             | *number*           | :heavy_check_mark: | Error code         | 400                |
| `message`          | *string*           | :heavy_check_mark: | Error message      | Bad Request        |