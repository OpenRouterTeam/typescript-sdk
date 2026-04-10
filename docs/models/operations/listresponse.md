# ListResponse

List of API keys

## Example Usage

```typescript
import { ListResponse } from "@openrouter/sdk/models/operations";

let value: ListResponse = {
  data: [
    {
      byokUsage: 17.38,
      byokUsageDaily: 17.38,
      byokUsageMonthly: 17.38,
      byokUsageWeekly: 17.38,
      createdAt: "2025-08-24T10:30:00Z",
      creatorUserId: "user_2dHFtVWx2n56w6HkM0000000000",
      disabled: false,
      hash: "f01d52606dc8f0a8303a7b5cc3fa07109c2e346cec7c0a16b40de462992ce943",
      includeByokInLimit: false,
      label: "Production API Key",
      limit: 100,
      limitRemaining: 74.5,
      limitReset: "monthly",
      name: "My Production Key",
      updatedAt: "2025-08-24T15:45:00Z",
      usage: 25.5,
      usageDaily: 25.5,
      usageMonthly: 25.5,
      usageWeekly: 25.5,
    },
  ],
};
```

## Fields

| Field                                                        | Type                                                         | Required                                                     | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `data`                                                       | [operations.ListData](../../models/operations/listdata.md)[] | :heavy_check_mark:                                           | List of API keys                                             |