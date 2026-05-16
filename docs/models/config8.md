# Config8

## Example Usage

```typescript
import { Config8 } from "@openrouter/sdk/models";

let value: Config8 = {
  licenseKey: "<value>",
};
```

## Fields

| Field                                                           | Type                                                            | Required                                                        | Description                                                     |
| --------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- |
| `headers`                                                       | Record<string, *string*>                                        | :heavy_minus_sign:                                              | Custom HTTP headers to include in requests to this destination. |
| `licenseKey`                                                    | *string*                                                        | :heavy_check_mark:                                              | N/A                                                             |
| `region`                                                        | [models.Region](../models/region.md)                            | :heavy_minus_sign:                                              | N/A                                                             |