# GetCreditsResponse

Total credits purchased and used

## Example Usage

```typescript
import { GetCreditsResponse } from "@openrouter/sdk/models/operations";

let value: GetCreditsResponse = {
  data: {
    totalCredits: 100.5,
    totalUsage: 25.75,
  },
};
```

## Fields

| Field                                                                  | Type                                                                   | Required                                                               | Description                                                            | Example                                                                |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `data`                                                                 | [operations.GetCreditsData](../../models/operations/getcreditsdata.md) | :heavy_check_mark:                                                     | N/A                                                                    | {<br/>"total_credits": 100.5,<br/>"total_usage": 25.75<br/>}           |