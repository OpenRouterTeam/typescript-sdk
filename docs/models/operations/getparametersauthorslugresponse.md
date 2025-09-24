# GetParametersAuthorSlugResponse

Returns the parameters for the specified model

## Example Usage

```typescript
import { GetParametersAuthorSlugResponse } from "@openrouter/sdk/models/operations";

let value: GetParametersAuthorSlugResponse = {
  data: {
    model: "openai/gpt-4",
    supportedParameters: [],
  },
};
```

## Fields

| Field                                                                                            | Type                                                                                             | Required                                                                                         | Description                                                                                      |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `data`                                                                                           | [operations.GetParametersAuthorSlugData](../../models/operations/getparametersauthorslugdata.md) | :heavy_check_mark:                                                                               | Parameter analytics data                                                                         |