# GenerateRequest

## Example Usage

```typescript
import { GenerateRequest } from "@openrouter/sdk/models/operations";

let value: GenerateRequest = {
  input: [
    "<value 1>",
    "<value 2>",
    "<value 3>",
  ],
  model: "Mustang",
  models: [
    "<value 1>",
    "<value 2>",
  ],
  provider: {
    allowFallbacks: null,
    requireParameters: true,
    dataCollection: null,
    zdr: true,
    order: [
      "<value>",
    ],
    only: [
      "Enfer",
    ],
    ignore: [
      "DeepInfra",
    ],
    quantizations: [
      "int4",
    ],
    sort: null,
    maxPrice: {
      prompt: 6428.54,
      completion: "<value>",
      image: 6844.99,
      audio: 5664.89,
      request: "<value>",
    },
    experimental: {},
  },
  encodingFormat: "base64",
  user: "Elmore.Frami",
};
```

## Fields

| Field                                                                      | Type                                                                       | Required                                                                   | Description                                                                |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `input`                                                                    | *operations.Input*                                                         | :heavy_check_mark:                                                         | N/A                                                                        |
| `model`                                                                    | *string*                                                                   | :heavy_minus_sign:                                                         | N/A                                                                        |
| `models`                                                                   | *string*[]                                                                 | :heavy_minus_sign:                                                         | N/A                                                                        |
| `provider`                                                                 | [operations.GenerateProvider](../../models/operations/generateprovider.md) | :heavy_minus_sign:                                                         | N/A                                                                        |
| `encodingFormat`                                                           | *operations.EncodingFormat*                                                | :heavy_minus_sign:                                                         | N/A                                                                        |
| `user`                                                                     | *string*                                                                   | :heavy_minus_sign:                                                         | N/A                                                                        |