# GetParametersData

Parameter analytics data

## Example Usage

```typescript
import { GetParametersData } from "@openrouter/sdk/models/operations";

let value: GetParametersData = {
  model: "openai/gpt-4",
  supportedParameters: [
    "temperature",
    "max_tokens",
    "top_p",
    "frequency_penalty",
    "presence_penalty",
  ],
};
```

## Fields

| Field                                                                                                      | Type                                                                                                       | Required                                                                                                   | Description                                                                                                | Example                                                                                                    |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `model`                                                                                                    | *string*                                                                                                   | :heavy_check_mark:                                                                                         | Model identifier                                                                                           | openai/gpt-4                                                                                               |
| `supportedParameters`                                                                                      | [operations.GetParametersSupportedParameter](../../models/operations/getparameterssupportedparameter.md)[] | :heavy_check_mark:                                                                                         | List of parameters supported by this model                                                                 | [<br/>"temperature",<br/>"max_tokens",<br/>"top_p",<br/>"frequency_penalty",<br/>"presence_penalty"<br/>]  |