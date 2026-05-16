# Config12

## Example Usage

```typescript
import { Config12 } from "@openrouter/sdk/models";

let value: Config12 = {
  apiKey: "<value>",
};
```

## Fields

| Field                                               | Type                                                | Required                                            | Description                                         |
| --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- |
| `apiKey`                                            | *string*                                            | :heavy_check_mark:                                  | Generate this in your Ramp integration settings.    |
| `baseUrl`                                           | *string*                                            | :heavy_minus_sign:                                  | N/A                                                 |
| `headers`                                           | Record<string, *string*>                            | :heavy_minus_sign:                                  | Custom HTTP headers to include in requests to Ramp. |