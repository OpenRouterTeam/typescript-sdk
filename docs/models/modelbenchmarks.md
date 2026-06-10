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
| `designArena`                                                                                | [models.DABenchmarkEntry](../models/dabenchmarkentry.md)[]                                   | :heavy_check_mark:                                                                           | Design Arena ELO rankings across arena+category pairs. Empty array if not evaluated.         | [<br/>{<br/>"arena": "models",<br/>"category": "website",<br/>"elo": 1385.2,<br/>"rank": 5,<br/>"win_rate": 62.5<br/>}<br/>] |