# AAScores

Artificial Analysis composite benchmark scores, or null if not evaluated

## Example Usage

```typescript
import { AAScores } from "@openrouter/sdk/models";

let value: AAScores = {
  agentic: 0.87,
  coding: 0.92,
  intelligence: 0.89,
};
```

## Fields

| Field                                        | Type                                         | Required                                     | Description                                  | Example                                      |
| -------------------------------------------- | -------------------------------------------- | -------------------------------------------- | -------------------------------------------- | -------------------------------------------- |
| `agentic`                                    | *number*                                     | :heavy_check_mark:                           | Artificial Analysis agentic index score      | 0.87                                         |
| `coding`                                     | *number*                                     | :heavy_check_mark:                           | Artificial Analysis coding index score       | 0.92                                         |
| `intelligence`                               | *number*                                     | :heavy_check_mark:                           | Artificial Analysis intelligence index score | 0.89                                         |