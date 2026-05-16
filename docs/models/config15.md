# Config15

## Example Usage

```typescript
import { Config15 } from "@openrouter/sdk/models";

let value: Config15 = {
  account: "10693239",
  token: "<value>",
};
```

## Fields

| Field                                                           | Type                                                            | Required                                                        | Description                                                     |
| --------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- |
| `account`                                                       | *string*                                                        | :heavy_check_mark:                                              | N/A                                                             |
| `database`                                                      | *string*                                                        | :heavy_minus_sign:                                              | N/A                                                             |
| `headers`                                                       | Record<string, *string*>                                        | :heavy_minus_sign:                                              | Custom HTTP headers to include in requests to this destination. |
| `schema`                                                        | *string*                                                        | :heavy_minus_sign:                                              | N/A                                                             |
| `table`                                                         | *string*                                                        | :heavy_minus_sign:                                              | N/A                                                             |
| `token`                                                         | *string*                                                        | :heavy_check_mark:                                              | N/A                                                             |
| `warehouse`                                                     | *string*                                                        | :heavy_minus_sign:                                              | N/A                                                             |