# ListProvidersResponse

Returns a list of providers

## Example Usage

```typescript
import { ListProvidersResponse } from "@openrouter/sdk/models/operations";

let value: ListProvidersResponse = {
  data: [
    {
      name: "OpenAI",
      slug: "openai",
      privacyPolicyUrl: "https://openai.com/privacy",
    },
  ],
};
```

## Fields

| Field                                                                          | Type                                                                           | Required                                                                       | Description                                                                    |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| `data`                                                                         | [operations.ListProvidersData](../../models/operations/listprovidersdata.md)[] | :heavy_check_mark:                                                             | N/A                                                                            |