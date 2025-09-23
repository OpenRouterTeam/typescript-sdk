# GetParametersAuthorSlugResponseBody

Returns the parameters for the specified model

## Example Usage

```typescript
import { GetParametersAuthorSlugResponseBody } from "@openrouter/sdk/models/operations";

let value: GetParametersAuthorSlugResponseBody = {
  data: {
    model: "openai/gpt-4",
    supportedParameters: [
      "repetition_penalty",
    ],
  },
};
```

## Fields

| Field                                                                                            | Type                                                                                             | Required                                                                                         | Description                                                                                      |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `data`                                                                                           | [operations.GetParametersAuthorSlugData](../../models/operations/getparametersauthorslugdata.md) | :heavy_check_mark:                                                                               | Parameter analytics data                                                                         |