# GetProvidersError

Error details

## Example Usage

```typescript
import { GetProvidersError } from "@openrouter/sdk/models/operations";

let value: GetProvidersError = {
  code: 400,
  message: "Bad Request",
};
```

## Fields

| Field              | Type               | Required           | Description        | Example            |
| ------------------ | ------------------ | ------------------ | ------------------ | ------------------ |
| `code`             | *number*           | :heavy_check_mark: | Error code         | 400                |
| `message`          | *string*           | :heavy_check_mark: | Error message      | Bad Request        |