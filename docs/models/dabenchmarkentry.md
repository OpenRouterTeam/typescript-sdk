# DABenchmarkEntry

A single Design Arena benchmark entry for a specific arena+category

## Example Usage

```typescript
import { DABenchmarkEntry } from "@openrouter/sdk/models";

let value: DABenchmarkEntry = {
  arena: "models",
  category: "website",
  elo: 1385.2,
  rank: 5,
  winRate: 62.5,
};
```

## Fields

| Field                                                                                           | Type                                                                                            | Required                                                                                        | Description                                                                                     | Example                                                                                         |
| ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `arena`                                                                                         | *string*                                                                                        | :heavy_check_mark:                                                                              | Arena type (e.g. models, builders, agents)                                                      | models                                                                                          |
| `category`                                                                                      | *string*                                                                                        | :heavy_check_mark:                                                                              | Category within the arena (e.g. website, gamedev, uicomponent)                                  | website                                                                                         |
| `elo`                                                                                           | *number*                                                                                        | :heavy_check_mark:                                                                              | ELO rating from head-to-head arena battles                                                      | 1385.2                                                                                          |
| `rank`                                                                                          | *number*                                                                                        | :heavy_check_mark:                                                                              | Rank position within this arena+category among models available on OpenRouter (1 = highest ELO) | 5                                                                                               |
| `winRate`                                                                                       | *number*                                                                                        | :heavy_check_mark:                                                                              | Win rate percentage in arena battles                                                            | 62.5                                                                                            |