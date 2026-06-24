# ImageGenStreamErrorEventError

Provider error details

## Example Usage

```typescript
import { ImageGenStreamErrorEventError } from "@openrouter/sdk/models";

let value: ImageGenStreamErrorEventError = {
  message: "<value>",
};
```

## Fields

| Field                                                      | Type                                                       | Required                                                   | Description                                                |
| ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `code`                                                     | *string*                                                   | :heavy_minus_sign:                                         | Provider error code, when supplied                         |
| `message`                                                  | *string*                                                   | :heavy_check_mark:                                         | Provider error message                                     |
| `param`                                                    | *string*                                                   | :heavy_minus_sign:                                         | Request parameter associated with the error, when supplied |
| `type`                                                     | *string*                                                   | :heavy_minus_sign:                                         | Provider error type, when supplied                         |