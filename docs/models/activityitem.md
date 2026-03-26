# ActivityItem

## Example Usage

```typescript
import { ActivityItem } from "@openrouter/sdk/models";

let value: ActivityItem = {
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
};
```

## Fields

| Field                                               | Type                                                | Required                                            | Description                                         | Example                                             |
| --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- |
| `date`                                              | *string*                                            | :heavy_check_mark:                                  | Date of the activity (YYYY-MM-DD format)            | 2025-08-24                                          |
| `model`                                             | *string*                                            | :heavy_check_mark:                                  | Model slug (e.g., "openai/gpt-4.1")                 | openai/gpt-4.1                                      |
| `modelPermaslug`                                    | *string*                                            | :heavy_check_mark:                                  | Model permaslug (e.g., "openai/gpt-4.1-2025-04-14") | openai/gpt-4.1-2025-04-14                           |
| `endpointId`                                        | *string*                                            | :heavy_check_mark:                                  | Unique identifier for the endpoint                  | 550e8400-e29b-41d4-a716-446655440000                |
| `providerName`                                      | *string*                                            | :heavy_check_mark:                                  | Name of the provider serving this endpoint          | OpenAI                                              |
| `usage`                                             | *number*                                            | :heavy_check_mark:                                  | Total cost in USD (OpenRouter credits spent)        | 0.015                                               |
| `byokUsageInference`                                | *number*                                            | :heavy_check_mark:                                  | BYOK inference cost in USD (external credits spent) | 0.012                                               |
| `requests`                                          | *number*                                            | :heavy_check_mark:                                  | Number of requests made                             | 5                                                   |
| `promptTokens`                                      | *number*                                            | :heavy_check_mark:                                  | Total prompt tokens used                            | 50                                                  |
| `completionTokens`                                  | *number*                                            | :heavy_check_mark:                                  | Total completion tokens generated                   | 125                                                 |
| `reasoningTokens`                                   | *number*                                            | :heavy_check_mark:                                  | Total reasoning tokens used                         | 25                                                  |