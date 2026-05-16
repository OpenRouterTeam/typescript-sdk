# Config2

## Example Usage

```typescript
import { Config2 } from "@openrouter/sdk/models";

let value: Config2 = {
  apiKey: "<value>",
  projectId: "<id>",
};
```

## Fields

| Field                                                           | Type                                                            | Required                                                        | Description                                                     |
| --------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- |
| `apiKey`                                                        | *string*                                                        | :heavy_check_mark:                                              | N/A                                                             |
| `baseUrl`                                                       | *string*                                                        | :heavy_minus_sign:                                              | N/A                                                             |
| `headers`                                                       | Record<string, *string*>                                        | :heavy_minus_sign:                                              | Custom HTTP headers to include in requests to this destination. |
| `projectId`                                                     | *string*                                                        | :heavy_check_mark:                                              | N/A                                                             |