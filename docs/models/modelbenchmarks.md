# ModelBenchmarks

Third-party benchmark rankings for this model. Omitted when no benchmark data is available.

## Example Usage

```typescript
import { ModelBenchmarks } from "@openrouter/sdk/models";

let value: ModelBenchmarks = {
  designArena: [
    {
      arena: "models",
      category: "website",
      elo: 1385.2,
      rank: 5,
      winRate: 62.5,
    },
  ],
};
```

## Fields

| Field                                                                                                                                 | Type                                                                                                                                  | Required                                                                                                                              | Description                                                                                                                           | Example                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `artificialAnalysis`                                                                                                                  | [models.AABenchmarkEntry](../models/aabenchmarkentry.md)                                                                              | :heavy_minus_sign:                                                                                                                    | Artificial Analysis composite index scores. Omitted when no data is available for this model.                                         | {<br/>"agentic_index": 58.3,<br/>"coding_index": 65.8,<br/>"intelligence_index": 71.2<br/>}                                           |
| `designArena`                                                                                                                         | [models.DABenchmarkEntry](../models/dabenchmarkentry.md)[]                                                                            | :heavy_check_mark:                                                                                                                    | Design Arena ELO rankings across arena+category pairs. The parent benchmarks object is omitted when the model has not been evaluated. | [<br/>{<br/>"arena": "models",<br/>"category": "website",<br/>"elo": 1385.2,<br/>"rank": 5,<br/>"win_rate": 62.5<br/>}<br/>]          |