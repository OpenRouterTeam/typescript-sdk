# Scores

Composite benchmark index scores.

## Example Usage

```typescript
import { Scores } from "@openrouter/sdk/models";

let value: Scores = {
  agentic: 2984.65,
  coding: 1024.38,
  intelligence: 8311.01,
};
```

## Fields

| Field                                                     | Type                                                      | Required                                                  | Description                                               |
| --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- |
| `agentic`                                                 | *number*                                                  | :heavy_check_mark:                                        | Artificial Analysis Agentic Index score (0–1 scale).      |
| `coding`                                                  | *number*                                                  | :heavy_check_mark:                                        | Artificial Analysis Coding Index score (0–1 scale).       |
| `intelligence`                                            | *number*                                                  | :heavy_check_mark:                                        | Artificial Analysis Intelligence Index score (0–1 scale). |