# GetEndpointsZdrResponse

Returns a list of endpoints

## Example Usage

```typescript
import { GetEndpointsZdrResponse } from "@openrouter/sdk/models/operations";

let value: GetEndpointsZdrResponse = {
  data: [
    {
      name: "<value>",
      modelName: "<value>",
      contextLength: 634.38,
      pricing: {
        prompt: "<value>",
        completion: 4963.6,
      },
      providerName: "SiliconFlow",
      tag: "<value>",
      quantization: "fp8",
      maxCompletionTokens: 6395.43,
      maxPromptTokens: 120.09,
      supportedParameters: [
        "min_p",
      ],
      uptimeLast30m: 7363.78,
      supportsImplicitCaching: true,
    },
  ],
};
```

## Fields

| Field                                                                              | Type                                                                               | Required                                                                           | Description                                                                        |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `data`                                                                             | [operations.GetEndpointsZdrData](../../models/operations/getendpointszdrdata.md)[] | :heavy_check_mark:                                                                 | N/A                                                                                |