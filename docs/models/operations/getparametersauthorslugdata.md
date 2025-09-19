# GetParametersAuthorSlugData

Parameter analytics data

## Example Usage

```typescript
import { GetParametersAuthorSlugData } from "open-router/models/operations";

let value: GetParametersAuthorSlugData = {
  model: "openai/gpt-4",
  supportedParameters: [
    "verbosity",
  ],
};
```

## Fields

| Field                                                                                                                          | Type                                                                                                                           | Required                                                                                                                       | Description                                                                                                                    | Example                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `model`                                                                                                                        | *string*                                                                                                                       | :heavy_check_mark:                                                                                                             | Model identifier                                                                                                               | openai/gpt-4                                                                                                                   |
| `supportedParameters`                                                                                                          | [operations.GetParametersAuthorSlugSupportedParameter](../../models/operations/getparametersauthorslugsupportedparameter.md)[] | :heavy_check_mark:                                                                                                             | List of parameters supported by this model                                                                                     |                                                                                                                                |