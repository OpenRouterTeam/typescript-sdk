# GetCreditsResponse

Returns the total credits purchased and used

## Example Usage

```typescript
import { GetCreditsResponse } from "@openrouter/sdk/models/operations";

let value: GetCreditsResponse = {
  data: {
    totalCredits: 2840.87,
    totalUsage: 7061.42,
  },
};
```

## Fields

| Field                                                                  | Type                                                                   | Required                                                               | Description                                                            |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `data`                                                                 | [operations.GetCreditsData](../../models/operations/getcreditsdata.md) | :heavy_check_mark:                                                     | N/A                                                                    |