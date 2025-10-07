# GetCountResponse

Returns the total count of available models

## Example Usage

```typescript
import { GetCountResponse } from "@openrouter/sdk/models/operations";

let value: GetCountResponse = {
  data: {
    count: 150,
  },
};
```

## Fields

| Field                                                              | Type                                                               | Required                                                           | Description                                                        | Example                                                            |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `data`                                                             | [operations.GetCountData](../../models/operations/getcountdata.md) | :heavy_check_mark:                                                 | Model count data                                                   | {<br/>"count": 150<br/>}                                           |