# UpsertWorkspaceBudgetRequest

## Example Usage

```typescript
import { UpsertWorkspaceBudgetRequest } from "@openrouter/sdk/models";

let value: UpsertWorkspaceBudgetRequest = {
  limitUsd: 100,
};
```

## Fields

| Field                                          | Type                                           | Required                                       | Description                                    | Example                                        |
| ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| `limitUsd`                                     | *number*                                       | :heavy_check_mark:                             | Spending limit in USD. Must be greater than 0. | 100                                            |