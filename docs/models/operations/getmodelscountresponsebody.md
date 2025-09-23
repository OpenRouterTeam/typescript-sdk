# GetModelsCountResponseBody

Returns the total count of available models

## Example Usage

```typescript
import { GetModelsCountResponseBody } from "openrouter/models/operations";

let value: GetModelsCountResponseBody = {
  data: {
    count: 150,
  },
};
```

## Fields

| Field                                                                          | Type                                                                           | Required                                                                       | Description                                                                    |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `data`                                                                         | [operations.GetModelsCountData](../../models/operations/getmodelscountdata.md) | :heavy_check_mark:                                                             | Model count data                                                               |