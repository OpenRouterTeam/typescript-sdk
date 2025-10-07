# GenerateResponse

Embedding response

## Example Usage

```typescript
import { GenerateResponse } from "@openrouter/sdk/models/operations";

let value: GenerateResponse = {
  object: "list",
  data: [],
  model: "Grand Caravan",
  usage: {
    promptTokens: 734.26,
    totalTokens: 4340.36,
    cost: 684.41,
  },
};
```

## Fields

| Field                                                                | Type                                                                 | Required                                                             | Description                                                          |
| -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `object`                                                             | [operations.ObjectT](../../models/operations/objectt.md)             | :heavy_check_mark:                                                   | N/A                                                                  |
| `data`                                                               | [operations.GenerateData](../../models/operations/generatedata.md)[] | :heavy_check_mark:                                                   | N/A                                                                  |
| `model`                                                              | *string*                                                             | :heavy_check_mark:                                                   | N/A                                                                  |
| `usage`                                                              | [operations.Usage](../../models/operations/usage.md)                 | :heavy_minus_sign:                                                   | N/A                                                                  |