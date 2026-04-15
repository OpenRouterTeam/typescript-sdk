# Endpoints

## Example Usage

```typescript
import { Endpoints } from "@openrouter/sdk/models";

let value: Endpoints = {
  available: [
    {
      model: "Focus",
      provider: "<value>",
      selected: true,
      sortRank: 637155,
      sortValue: 6937.83,
    },
  ],
  sort: "<value>",
  total: 105032,
};
```

## Fields

| Field                                        | Type                                         | Required                                     | Description                                  |
| -------------------------------------------- | -------------------------------------------- | -------------------------------------------- | -------------------------------------------- |
| `available`                                  | [models.Available](../models/available.md)[] | :heavy_check_mark:                           | N/A                                          |
| `excluded`                                   | [models.Excluded](../models/excluded.md)[]   | :heavy_minus_sign:                           | N/A                                          |
| `sort`                                       | *string*                                     | :heavy_check_mark:                           | N/A                                          |
| `sortValue`                                  | *number*                                     | :heavy_minus_sign:                           | N/A                                          |
| `total`                                      | *number*                                     | :heavy_check_mark:                           | N/A                                          |