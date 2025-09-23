# GetCreditsResponseBody

Returns the total credits purchased and used

## Example Usage

```typescript
import { GetCreditsResponseBody } from "openrouter/models/operations";

let value: GetCreditsResponseBody = {
  data: {
    totalCredits: 3929.68,
    totalUsage: 9534.38,
  },
};
```

## Fields

| Field                                                                  | Type                                                                   | Required                                                               | Description                                                            |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `data`                                                                 | [operations.GetCreditsData](../../models/operations/getcreditsdata.md) | :heavy_check_mark:                                                     | N/A                                                                    |