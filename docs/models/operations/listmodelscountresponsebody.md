# ListModelsCountResponseBody

Returns the total count of available models

## Example Usage

```typescript
import { ListModelsCountResponseBody } from "@openrouter/sdk/models/operations";

let value: ListModelsCountResponseBody = {
  data: {
    count: 150,
  },
};
```

## Fields

| Field                                                                            | Type                                                                             | Required                                                                         | Description                                                                      |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `data`                                                                           | [operations.ListModelsCountData](../../models/operations/listmodelscountdata.md) | :heavy_check_mark:                                                               | Model count data                                                                 |