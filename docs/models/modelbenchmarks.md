# ModelBenchmarks

Third-party benchmark rankings for this model. Null when no benchmark data is available.

## Example Usage

```typescript
import { ModelBenchmarks } from "@openrouter/sdk/models";

let value: ModelBenchmarks = {
  artificialAnalysis: {
    agentic: 0.87,
    coding: 0.92,
    intelligence: 0.89,
  },
  designArena: [
    {
      arena: "models",
      category: "website",
      elo: 1385.2,
      winRate: 62.5,
    },
  ],
};
```

## Fields

| Field                                                                                | Type                                                                                 | Required                                                                             | Description                                                                          | Example                                                                              |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `artificialAnalysis`                                                                 | [models.AAScores](../models/aascores.md)                                             | :heavy_check_mark:                                                                   | Artificial Analysis composite benchmark scores, or null if not evaluated             | {<br/>"agentic": 0.87,<br/>"coding": 0.92,<br/>"intelligence": 0.89<br/>}            |
| `designArena`                                                                        | [models.DABenchmarkEntry](../models/dabenchmarkentry.md)[]                           | :heavy_check_mark:                                                                   | Design Arena ELO rankings across arena+category pairs. Empty array if not evaluated. | [<br/>{<br/>"arena": "models",<br/>"category": "website",<br/>"elo": 1385.2,<br/>"win_rate": 62.5<br/>}<br/>] |