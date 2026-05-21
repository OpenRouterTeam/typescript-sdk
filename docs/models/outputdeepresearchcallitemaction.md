# OutputDeepResearchCallItemAction

The research action describing the query and current status.

## Example Usage

```typescript
import { OutputDeepResearchCallItemAction } from "@openrouter/sdk/models";

let value: OutputDeepResearchCallItemAction = {
  query: "<value>",
  status: "<value>",
  type: "research",
};
```

## Fields

| Field                                            | Type                                             | Required                                         | Description                                      |
| ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------ |
| `query`                                          | *string*                                         | :heavy_check_mark:                               | N/A                                              |
| `status`                                         | *string*                                         | :heavy_check_mark:                               | N/A                                              |
| `type`                                           | [models.TypeResearch](../models/typeresearch.md) | :heavy_check_mark:                               | N/A                                              |