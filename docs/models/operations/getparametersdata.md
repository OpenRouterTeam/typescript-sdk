# GetParametersData

Parameter analytics data

## Example Usage

```typescript
import { GetParametersData } from "@openrouter/sdk/models/operations";

let value: GetParametersData = {
  model: "openai/gpt-4",
  supportedParameters: [
    "temperature",
    "top_p",
    "max_tokens",
  ],
};
```

## Fields

| Field                                                                            | Type                                                                             | Required                                                                         | Description                                                                      | Example                                                                          |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `model`                                                                          | *string*                                                                         | :heavy_check_mark:                                                               | Model identifier                                                                 | openai/gpt-4                                                                     |
| `supportedParameters`                                                            | [operations.SupportedParameter](../../models/operations/supportedparameter.md)[] | :heavy_check_mark:                                                               | List of parameters supported by this model                                       | [<br/>"temperature",<br/>"top_p",<br/>"max_tokens"<br/>]                         |