# Analysis

Structured analysis produced by the fusion judge model.

## Example Usage

```typescript
import { Analysis } from "@openrouter/sdk/models";

let value: Analysis = {
  blindSpots: [],
  consensus: [
    "<value 1>",
  ],
  contradictions: [
    {
      stances: [
        {
          model: "Roadster",
          stance: "<value>",
        },
      ],
      topic: "<value>",
    },
  ],
  partialCoverage: [],
};
```

## Fields

| Field                                                    | Type                                                     | Required                                                 | Description                                              |
| -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- |
| `blindSpots`                                             | *string*[]                                               | :heavy_check_mark:                                       | N/A                                                      |
| `consensus`                                              | *string*[]                                               | :heavy_check_mark:                                       | N/A                                                      |
| `contradictions`                                         | [models.Contradiction](../models/contradiction.md)[]     | :heavy_check_mark:                                       | N/A                                                      |
| `partialCoverage`                                        | [models.PartialCoverage](../models/partialcoverage.md)[] | :heavy_check_mark:                                       | N/A                                                      |
| `uniqueInsights`                                         | [models.UniqueInsight](../models/uniqueinsight.md)[]     | :heavy_minus_sign:                                       | N/A                                                      |