# ActivityItem

## Example Usage

```typescript
import { ActivityItem } from "@openrouter/sdk/models";

let value: ActivityItem = {
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
};
```

## Fields

| Field                                               | Type                                                | Required                                            | Description                                         | Example                                             |
| --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- |
| `byokUsageInference`                                | *number*                                            | :heavy_check_mark:                                  | BYOK inference cost in USD (external credits spent) | 0.012                                               |
| `completionTokens`                                  | *number*                                            | :heavy_check_mark:                                  | Total completion tokens generated                   | 125                                                 |
| `date`                                              | *string*                                            | :heavy_check_mark:                                  | Date of the activity (YYYY-MM-DD format)            | 2025-08-24                                          |
| `endpointId`                                        | *string*                                            | :heavy_check_mark:                                  | Unique identifier for the endpoint                  | 550e8400-e29b-41d4-a716-446655440000                |
| `model`                                             | *string*                                            | :heavy_check_mark:                                  | Model slug (e.g., "openai/gpt-4.1")                 | openai/gpt-4.1                                      |
| `modelPermaslug`                                    | *string*                                            | :heavy_check_mark:                                  | Model permaslug (e.g., "openai/gpt-4.1-2025-04-14") | openai/gpt-4.1-2025-04-14                           |
| `promptTokens`                                      | *number*                                            | :heavy_check_mark:                                  | Total prompt tokens used                            | 50                                                  |
| `providerName`                                      | *string*                                            | :heavy_check_mark:                                  | Name of the provider serving this endpoint          | OpenAI                                              |
| `reasoningTokens`                                   | *number*                                            | :heavy_check_mark:                                  | Total reasoning tokens used                         | 25                                                  |
| `requests`                                          | *number*                                            | :heavy_check_mark:                                  | Number of requests made                             | 5                                                   |
| `usage`                                             | *number*                                            | :heavy_check_mark:                                  | Total cost in USD (OpenRouter credits spent)        | 0.015                                               |