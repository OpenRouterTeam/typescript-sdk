# CreateEmbeddingsResponseBody

Embedding response

## Example Usage

```typescript
import { CreateEmbeddingsResponseBody } from "@openrouter/sdk/models/operations";

let value: CreateEmbeddingsResponseBody = {
  object: "list",
  data: [],
  model: "Focus",
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