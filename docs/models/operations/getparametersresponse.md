# GetParametersResponse

Returns the parameters for the specified model

## Example Usage

```typescript
import { GetParametersResponse } from "@openrouter/sdk/models/operations";

let value: GetParametersResponse = {
  data: {
    model: "openai/gpt-4",
    supportedParameters: [
      "temperature",
      "max_tokens",
      "top_p",
      "frequency_penalty",
      "presence_penalty",
    ],
  },
};
```

## Fields

| Field                                                                                                                                  | Type                                                                                                                                   | Required                                                                                                                               | Description                                                                                                                            | Example                                                                                                                                |
| -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `data`                                                                                                                                 | [operations.GetParametersData](../../models/operations/getparametersdata.md)                                                           | :heavy_check_mark:                                                                                                                     | Parameter analytics data                                                                                                               | {<br/>"model": "openai/gpt-4",<br/>"supported_parameters": [<br/>"temperature",<br/>"max_tokens",<br/>"top_p",<br/>"frequency_penalty",<br/>"presence_penalty"<br/>]<br/>} |