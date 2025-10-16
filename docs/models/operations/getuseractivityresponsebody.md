# GetUserActivityResponseBody

Returns user activity data grouped by endpoint

## Example Usage

```typescript
import { GetUserActivityResponseBody } from "@openrouter/sdk/models/operations";

let value: GetUserActivityResponseBody = {
  data: [
    {
      date: "2025-08-24",
      model: "openai/gpt-4.1",
      modelPermaslug: "openai/gpt-4.1-2025-04-14",
      endpointId: "550e8400-e29b-41d4-a716-446655440000",
      providerName: "OpenAI",
      usage: 0.015,
      byokUsageInference: 0.012,
      requests: 5,
      promptTokens: 50,
      completionTokens: 125,
      reasoningTokens: 25,
    },
  ],
};
```

## Fields

| Field                                                 | Type                                                  | Required                                              | Description                                           |
| ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- |
| `data`                                                | [models.ActivityItem](../../models/activityitem.md)[] | :heavy_check_mark:                                    | List of activity items                                |