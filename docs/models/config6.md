# Config6

## Example Usage

```typescript
import { Config6 } from "@openrouter/sdk/models";

let value: Config6 = {
  publicKey: "<value>",
  secretKey: "<value>",
};
```

## Fields

| Field                                                           | Type                                                            | Required                                                        | Description                                                     |
| --------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- |
| `baseUrl`                                                       | *string*                                                        | :heavy_minus_sign:                                              | N/A                                                             |
| `headers`                                                       | Record<string, *string*>                                        | :heavy_minus_sign:                                              | Custom HTTP headers to include in requests to this destination. |
| `publicKey`                                                     | *string*                                                        | :heavy_check_mark:                                              | N/A                                                             |
| `secretKey`                                                     | *string*                                                        | :heavy_check_mark:                                              | N/A                                                             |