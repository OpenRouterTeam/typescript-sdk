# TaskBudget

Task budget for an agentic turn. The model sees a countdown of remaining tokens and uses it to prioritize work and wind down gracefully. Advisory — does not enforce a hard cap.

## Example Usage

```typescript
import { TaskBudget } from "@openrouter/sdk/models";

let value: TaskBudget = {
  total: 400000,
  type: "tokens",
};
```

## Fields

| Field                                        | Type                                         | Required                                     | Description                                  |
| -------------------------------------------- | -------------------------------------------- | -------------------------------------------- | -------------------------------------------- |
| `remaining`                                  | *number*                                     | :heavy_minus_sign:                           | N/A                                          |
| `total`                                      | *number*                                     | :heavy_check_mark:                           | N/A                                          |
| `type`                                       | [models.TypeTokens](../models/typetokens.md) | :heavy_check_mark:                           | N/A                                          |