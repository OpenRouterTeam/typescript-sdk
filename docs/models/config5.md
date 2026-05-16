# Config5

## Example Usage

```typescript
import { Config5 } from "@openrouter/sdk/models";

let value: Config5 = {
  apiKey: "<value>",
  instanceId: "<id>",
};
```

## Fields

| Field                                                           | Type                                                            | Required                                                        | Description                                                     |
| --------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- |
| `apiKey`                                                        | *string*                                                        | :heavy_check_mark:                                              | N/A                                                             |
| `baseUrl`                                                       | *string*                                                        | :heavy_minus_sign:                                              | N/A                                                             |
| `headers`                                                       | Record<string, *string*>                                        | :heavy_minus_sign:                                              | Custom HTTP headers to include in requests to this destination. |
| `instanceId`                                                    | *string*                                                        | :heavy_check_mark:                                              | N/A                                                             |