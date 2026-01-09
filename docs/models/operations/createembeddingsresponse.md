# CreateEmbeddingsResponse

Embedding response

## Example Usage

```typescript
import { CreateEmbeddingsResponse } from "@openrouter/sdk/models/operations";

let value: CreateEmbeddingsResponse = {
  object: "list",
  data: [
    {
      object: "embedding",
      embedding: "<value>",
    },
  ],
  model: "Mustang",
};
```

## Fields

| Field                                                                                | Type                                                                                 | Required                                                                             | Description                                                                          |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `id`                                                                                 | *string*                                                                             | :heavy_minus_sign:                                                                   | N/A                                                                                  |
| `object`                                                                             | [operations.ObjectT](../../models/operations/objectt.md)                             | :heavy_check_mark:                                                                   | N/A                                                                                  |
| `data`                                                                               | [operations.CreateEmbeddingsData](../../models/operations/createembeddingsdata.md)[] | :heavy_check_mark:                                                                   | N/A                                                                                  |
| `model`                                                                              | *string*                                                                             | :heavy_check_mark:                                                                   | N/A                                                                                  |
| `usage`                                                                              | [operations.Usage](../../models/operations/usage.md)                                 | :heavy_minus_sign:                                                                   | N/A                                                                                  |