# ActivityResponse

## Example Usage

```typescript
import { ActivityResponse } from "@openrouter/sdk/models";

let value: ActivityResponse = {
  data: [
    {
      byokUsageInference: 0.012,
      completionTokens: 125,
      date: "2025-08-24",
      endpointId: "550e8400-e29b-41d4-a716-446655440000",
      model: "openai/gpt-4.1",
      modelPermaslug: "openai/gpt-4.1-2025-04-14",
      promptTokens: 50,
      providerName: "OpenAI",
      reasoningTokens: 25,
      requests: 5,
      usage: 0.015,
    },
  ],
};
```

## Fields

| Field                                              | Type                                               | Required                                           | Description                                        |
| -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- |
| `data`                                             | [models.ActivityItem](../models/activityitem.md)[] | :heavy_check_mark:                                 | List of activity items                             |