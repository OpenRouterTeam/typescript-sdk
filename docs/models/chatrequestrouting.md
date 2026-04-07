# ChatRequestRouting

Composable routing intent configuration. Alternative to using composable slug syntax (e.g. auto/chat.fast). Currently used alongside slug-based intent resolution.

## Example Usage

```typescript
import { ChatRequestRouting } from "@openrouter/sdk/models";

let value: ChatRequestRouting = {
  intent: {
    task: "chat",
    constraint: "fast",
  },
};
```

## Fields

| Field                                                                                                          | Type                                                                                                           | Required                                                                                                       | Description                                                                                                    | Example                                                                                                        |
| -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `intent`                                                                                                       | [models.ChatRequestIntent](../models/chatrequestintent.md)                                                     | :heavy_check_mark:                                                                                             | The routing intent specifying task and optimization constraint                                                 |                                                                                                                |
| `filters`                                                                                                      | [models.ChatRequestFilters](../models/chatrequestfilters.md)                                                   | :heavy_minus_sign:                                                                                             | Filters to narrow the candidate model set                                                                      |                                                                                                                |
| `strategy`                                                                                                     | [models.ChatRequestStrategy](../models/chatrequeststrategy.md)                                                 | :heavy_minus_sign:                                                                                             | The selection strategy to apply among filtered candidates (latency-first, quality-first, cost-first, balanced) | latency-first                                                                                                  |