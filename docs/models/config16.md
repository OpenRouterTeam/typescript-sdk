# Config16

## Example Usage

```typescript
import { Config16 } from "@openrouter/sdk/models";

let value: Config16 = {
  apiKey: "<value>",
  entity: "<value>",
  project: "<value>",
};
```

## Fields

| Field                                                           | Type                                                            | Required                                                        | Description                                                     |
| --------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- |
| `apiKey`                                                        | *string*                                                        | :heavy_check_mark:                                              | N/A                                                             |
| `baseUrl`                                                       | *string*                                                        | :heavy_minus_sign:                                              | N/A                                                             |
| `entity`                                                        | *string*                                                        | :heavy_check_mark:                                              | N/A                                                             |
| `headers`                                                       | Record<string, *string*>                                        | :heavy_minus_sign:                                              | Custom HTTP headers to include in requests to this destination. |
| `project`                                                       | *string*                                                        | :heavy_check_mark:                                              | N/A                                                             |