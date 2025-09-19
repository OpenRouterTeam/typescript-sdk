# GetProvidersResponse

Returns a list of providers

## Example Usage

```typescript
import { GetProvidersResponse } from "open-router/models/operations";

let value: GetProvidersResponse = {
  data: [
    {
      name: "OpenAI",
      slug: "openai",
      privacyPolicyUrl: "https://openai.com/privacy",
      termsOfServiceUrl: "https://openai.com/terms",
      statusPageUrl: "https://status.openai.com",
    },
  ],
};
```

## Fields

| Field                                                                        | Type                                                                         | Required                                                                     | Description                                                                  |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `data`                                                                       | [operations.GetProvidersData](../../models/operations/getprovidersdata.md)[] | :heavy_check_mark:                                                           | N/A                                                                          |