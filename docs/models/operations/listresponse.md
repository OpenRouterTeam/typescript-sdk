# ListResponse

List of API keys

## Example Usage

```typescript
import { ListResponse } from "@openrouter/sdk/models/operations";

let value: ListResponse = {
  data: [
    {
      hash: "f01d52606dc8f0a8303a7b5cc3fa07109c2e346cec7c0a16b40de462992ce943",
      name: "My Production Key",
      label: "Production API Key",
      disabled: false,
      limit: 100,
      limitRemaining: 74.5,
      limitReset: "monthly",
      includeByokInLimit: false,
      usage: 25.5,
      usageDaily: 25.5,
      usageWeekly: 25.5,
      usageMonthly: 25.5,
      byokUsage: 17.38,
      byokUsageDaily: 17.38,
      byokUsageWeekly: 17.38,
      byokUsageMonthly: 17.38,
      createdAt: "2025-08-24T10:30:00Z",
      updatedAt: "2025-08-24T15:45:00Z",
    },
  ],
};
```

## Fields

| Field                                                        | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `data`                                                       | [operations.ListData](../../models/operations/listdata.md)[] | :heavy_check_mark:                                           | List of API keys                                             |