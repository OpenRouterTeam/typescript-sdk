# Config3

## Example Usage

```typescript
import { Config3 } from "@openrouter/sdk/models";

let value: Config3 = {
  database: "<value>",
  host: "irresponsible-secrecy.info",
  password: "lLI9DE0afsitPRS",
  username: "Green.Beahan",
};
```

## Fields

| Field                                                                                  | Type                                                                                   | Required                                                                               | Description                                                                            |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `database`                                                                             | *string*                                                                               | :heavy_check_mark:                                                                     | N/A                                                                                    |
| `headers`                                                                              | Record<string, *string*>                                                               | :heavy_minus_sign:                                                                     | Custom HTTP headers to include in requests to this destination.                        |
| `host`                                                                                 | *string*                                                                               | :heavy_check_mark:                                                                     | N/A                                                                                    |
| `password`                                                                             | *string*                                                                               | :heavy_check_mark:                                                                     | N/A                                                                                    |
| `table`                                                                                | *string*                                                                               | :heavy_minus_sign:                                                                     | N/A                                                                                    |
| `username`                                                                             | *string*                                                                               | :heavy_check_mark:                                                                     | If you have not set a specific username in ClickHouse, simply type in 'default' below. |