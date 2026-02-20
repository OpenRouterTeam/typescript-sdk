# ErrorT

Error information

## Example Usage

```typescript
import { ErrorT } from "@openrouter/sdk/models";

let value: ErrorT = {
  message: "Rate limit exceeded",
  code: 429,
};
```

## Fields

| Field               | Type                | Required            | Description         | Example             |
| ------------------- | ------------------- | ------------------- | ------------------- | ------------------- |
| `message`           | *string*            | :heavy_check_mark:  | Error message       | Rate limit exceeded |
| `code`              | *number*            | :heavy_check_mark:  | Error code          | 429                 |