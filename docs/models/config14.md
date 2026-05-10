# Config14

## Example Usage

```typescript
import { Config14 } from "@openrouter/sdk/models";

let value: Config14 = {
  dsn: "<value>",
  otlpEndpoint: "<value>",
};
```

## Fields

| Field                                                           | Type                                                            | Required                                                        | Description                                                     |
| --------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- |
| `dsn`                                                           | *string*                                                        | :heavy_check_mark:                                              | N/A                                                             |
| `headers`                                                       | Record<string, *string*>                                        | :heavy_minus_sign:                                              | Custom HTTP headers to include in requests to this destination. |
| `otlpEndpoint`                                                  | *string*                                                        | :heavy_check_mark:                                              | N/A                                                             |