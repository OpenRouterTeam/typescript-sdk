# ObservabilityArizeDestinationConfig

## Example Usage

```typescript
import { ObservabilityArizeDestinationConfig } from "@openrouter/sdk/models";

let value: ObservabilityArizeDestinationConfig = {
  apiKey: "<value>",
  modelId: "<id>",
  spaceKey: "<value>",
};
```

## Fields

| Field                                                           | Type                                                            | Required                                                        | Description                                                     |
| --------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- |
| `apiKey`                                                        | *string*                                                        | :heavy_check_mark:                                              | N/A                                                             |
| `baseUrl`                                                       | *string*                                                        | :heavy_minus_sign:                                              | N/A                                                             |
| `headers`                                                       | Record<string, *string*>                                        | :heavy_minus_sign:                                              | Custom HTTP headers to include in requests to this destination. |
| `modelId`                                                       | *string*                                                        | :heavy_check_mark:                                              | N/A                                                             |
| `spaceKey`                                                      | *string*                                                        | :heavy_check_mark:                                              | N/A                                                             |