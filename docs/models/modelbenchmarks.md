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

| Field                                                                                        | Type                                                                                         | Required                                                                                     | Description                                                                                  | Example                                                                                      |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `artificialAnalysis`                                                                         | [models.AABenchmarkEntry](../models/aabenchmarkentry.md)                                     | :heavy_minus_sign:                                                                           | Artificial Analysis benchmark index scores.                                                  | {<br/>"agentic_index": 55.8,<br/>"coding_index": 63.2,<br/>"intelligence_index": 71.4<br/>}  |
| `designArena`                                                                                | [models.DABenchmarkEntry](../models/dabenchmarkentry.md)[]                                   | :heavy_check_mark:                                                                           | Design Arena ELO rankings across arena+category pairs.                                       | [<br/>{<br/>"arena": "models",<br/>"category": "website",<br/>"elo": 1385.2,<br/>"rank": 5,<br/>"win_rate": 62.5<br/>}<br/>] |