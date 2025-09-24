# GetModelsCountResponse

Returns the total count of available models

## Example Usage

```typescript
import { GetModelsCountResponse } from "@openrouter/sdk/models/operations";

let value: GetModelsCountResponse = {
  data: {
    count: 150,
  },
};
```

## Fields

| Field                                                                          | Type                                                                           | Required                                                                       | Description                                                                    |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `data`                                                                         | [operations.GetModelsCountData](../../models/operations/getmodelscountdata.md) | :heavy_check_mark:                                                             | Model count data                                                               |