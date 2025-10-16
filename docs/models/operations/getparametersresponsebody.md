# GetParametersResponseBody

Returns the parameters for the specified model

## Example Usage

```typescript
import { GetParametersResponseBody } from "@openrouter/sdk/models/operations";

let value: GetParametersResponseBody = {
  data: {
    model: "openai/gpt-4",
    supportedParameters: [],
  },
};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `data`                                                                       | [operations.GetParametersData](../../models/operations/getparametersdata.md) | :heavy_check_mark:                                                           | Parameter analytics data                                                     |