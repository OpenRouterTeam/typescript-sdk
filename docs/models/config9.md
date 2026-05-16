# Config9

## Example Usage

```typescript
import { Config9 } from "@openrouter/sdk/models";

let value: Config9 = {
  apiKey: "<value>",
  projectName: "<value>",
  workspace: "<value>",
};
```

## Fields

| Field                                                           | Type                                                            | Required                                                        | Description                                                     |
| --------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- |
| `apiKey`                                                        | *string*                                                        | :heavy_check_mark:                                              | N/A                                                             |
| `headers`                                                       | Record<string, *string*>                                        | :heavy_minus_sign:                                              | Custom HTTP headers to include in requests to this destination. |
| `projectName`                                                   | *string*                                                        | :heavy_check_mark:                                              | N/A                                                             |
| `workspace`                                                     | *string*                                                        | :heavy_check_mark:                                              | N/A                                                             |