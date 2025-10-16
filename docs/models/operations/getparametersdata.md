# GetParametersData

Parameter analytics data

## Example Usage

```typescript
import { GetParametersData } from "@openrouter/sdk/models/operations";

let value: GetParametersData = {
  model: "openai/gpt-4",
  supportedParameters: [
    "verbosity",
  ],
};
```

## Fields

| Field                                                                            | Type                                                                             | Required                                                                         | Description                                                                      | Example                                                                          |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `model`                                                                          | *string*                                                                         | :heavy_check_mark:                                                               | Model identifier                                                                 | openai/gpt-4                                                                     |
| `supportedParameters`                                                            | [operations.SupportedParameter](../../models/operations/supportedparameter.md)[] | :heavy_check_mark:                                                               | List of parameters supported by this model                                       |                                                                                  |