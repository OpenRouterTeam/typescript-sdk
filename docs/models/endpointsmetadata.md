# EndpointsMetadata

## Example Usage

```typescript
import { EndpointsMetadata } from "@openrouter/sdk/models";

let value: EndpointsMetadata = {
  available: [
    {
      model: "openai/gpt-4o",
      provider: "OpenAI",
      selected: true,
      sortRank: 0,
      sortValue: 0.005,
    },
  ],
  sort: "price",
  total: 3,
};
```

## Fields

| Field                                              | Type                                               | Required                                           | Description                                        |
| -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- |
| `available`                                        | [models.EndpointInfo](../models/endpointinfo.md)[] | :heavy_check_mark:                                 | N/A                                                |
| `sort`                                             | *string*                                           | :heavy_check_mark:                                 | N/A                                                |
| `sortValue`                                        | *number*                                           | :heavy_minus_sign:                                 | N/A                                                |
| `total`                                            | *number*                                           | :heavy_check_mark:                                 | N/A                                                |