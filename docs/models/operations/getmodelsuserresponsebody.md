# GetModelsUserResponseBody

Returns a list of models filtered by user provider preferences

## Example Usage

```typescript
import { GetModelsUserResponseBody } from "openrouter/models/operations";

let value: GetModelsUserResponseBody = {
  data: [],
};
```

## Fields

| Field                                                                          | Type                                                                           | Required                                                                       | Description                                                                    |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `data`                                                                         | [operations.GetModelsUserData](../../models/operations/getmodelsuserdata.md)[] | :heavy_check_mark:                                                             | List of available models                                                       |